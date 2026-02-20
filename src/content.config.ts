import { glob } from 'astro/loaders';
import { defineCollection, z, type ImageFunction } from 'astro:content';

const imageSchema = (image: ImageFunction) =>
    z.object({
        src: image(),
        alt: z.string().optional()
    });

const seoSchema = (image: ImageFunction) =>
    z.object({
        title: z.string().min(5).max(120).optional(),
        description: z.string().min(15).max(160).optional(),
        image: imageSchema(image).optional(),
        pageType: z.enum(['website', 'article']).default('website')
    });

const musings = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/musings' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            excerpt: z.string().optional(),
            publishDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            isFeatured: z.boolean().default(false),
            tags: z.array(z.string()).default([]),
            seo: seoSchema(image).optional()
        })
});

const pages = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            showSubscribe: z.boolean().optional().default(false),
            seo: seoSchema(image).optional()
        })
});

const music = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/music' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            publishDate: z.coerce.date(),
            showInList: z.boolean().default(false),
            seo: seoSchema(image).optional(),
            badge: z.string().optional(),
            actionText: z.string().optional()
        })
});

const releases = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/releases' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            image: image(),
            releaseDate: z.coerce.date(),
            youtubeUrl: z.string().url().optional(),
            links: z.union([
                z.record(z.string().url().or(z.literal('#'))),
                z.array(
                    z.object({
                        platform: z.enum(['spotify', 'apple-music', 'youtube-music', 'amazon-music', 'bandcamp', 'other']),
                        href: z.string().url().or(z.literal('#')),
                        label: z.string().optional()
                    })
                )
            ]).optional()
        })
});

const preReleases = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pre-releases' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            image: image(),
            releaseDateText: z.string(),
            preSaveUrl: z.string().url(),
            ctaText: z.string().optional()
        })
});

export const collections = { musings, pages, music, releases, 'pre-releases': preReleases };
