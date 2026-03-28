import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';

const seoSchema = z.object({
    title: z.string().min(5).max(120).optional(),
    description: z.string().min(15).max(160).optional(),
    pageType: z.enum(['website', 'article']).default('website'),
});

const platformEnum = z.enum(['spotify', 'apple-music', 'youtube-music', 'amazon-music', 'bandcamp', 'other']);

const linkSchema = z.object({
    platform: platformEnum,
    href: z.string().url().or(z.literal('#')),
    label: z.string().optional(),
});

const linksSchema = z.union([
    z.record(z.string(), z.string().url().or(z.literal('#'))),
    z.array(linkSchema),
]);

describe('SEO schema', () => {
    it('accepts valid SEO data', () => {
        const result = seoSchema.safeParse({
            title: 'A Valid Title',
            description: 'A valid description that is long enough',
            pageType: 'article',
        });
        expect(result.success).toBe(true);
    });

    it('rejects title shorter than 5 chars', () => {
        const result = seoSchema.safeParse({ title: 'Hi' });
        expect(result.success).toBe(false);
    });

    it('rejects title longer than 120 chars', () => {
        const result = seoSchema.safeParse({ title: 'x'.repeat(121) });
        expect(result.success).toBe(false);
    });

    it('rejects description shorter than 15 chars', () => {
        const result = seoSchema.safeParse({ description: 'Too short' });
        expect(result.success).toBe(false);
    });

    it('rejects description longer than 160 chars', () => {
        const result = seoSchema.safeParse({ description: 'x'.repeat(161) });
        expect(result.success).toBe(false);
    });

    it('rejects invalid pageType', () => {
        const result = seoSchema.safeParse({ pageType: 'blog' });
        expect(result.success).toBe(false);
    });

    it('defaults pageType to website', () => {
        const result = seoSchema.parse({});
        expect(result.pageType).toBe('website');
    });
});

describe('platform enum', () => {
    it.each(['spotify', 'apple-music', 'youtube-music', 'amazon-music', 'bandcamp', 'other'] as const)(
        'accepts "%s"',
        (platform) => {
            expect(platformEnum.safeParse(platform).success).toBe(true);
        }
    );

    it('rejects unknown platform', () => {
        expect(platformEnum.safeParse('soundcloud').success).toBe(false);
    });
});

describe('link schema', () => {
    it('accepts a valid link', () => {
        const result = linkSchema.safeParse({
            platform: 'spotify',
            href: 'https://open.spotify.com/track/123',
        });
        expect(result.success).toBe(true);
    });

    it('accepts # as href for disabled links', () => {
        const result = linkSchema.safeParse({
            platform: 'bandcamp',
            href: '#',
        });
        expect(result.success).toBe(true);
    });

    it('rejects non-URL, non-# href', () => {
        const result = linkSchema.safeParse({
            platform: 'spotify',
            href: 'not-a-url',
        });
        expect(result.success).toBe(false);
    });

    it('accepts optional label', () => {
        const result = linkSchema.safeParse({
            platform: 'other',
            href: 'https://tidal.com/123',
            label: 'Tidal',
        });
        expect(result.success).toBe(true);
    });
});

describe('links schema (union)', () => {
    it('accepts array format', () => {
        const result = linksSchema.safeParse([
            { platform: 'spotify', href: 'https://open.spotify.com/track/123' },
            { platform: 'other', href: '#', label: 'Deezer' },
        ]);
        expect(result.success).toBe(true);
    });

    it('accepts legacy record format with URLs', () => {
        const result = linksSchema.safeParse({
            Spotify: 'https://open.spotify.com/track/123',
            Tidal: 'https://tidal.com/track/456',
        });
        expect(result.success).toBe(true);
    });

    it('accepts legacy record format with # placeholder', () => {
        const result = linksSchema.safeParse({
            Deezer: '#',
        });
        expect(result.success).toBe(true);
    });
});
