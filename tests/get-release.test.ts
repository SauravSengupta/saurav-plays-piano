import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGetCollection = vi.fn();
vi.mock('astro:content', () => ({
    getCollection: (...args: any[]) => mockGetCollection(...args),
}));

import { getReleaseData, getReleaseLinks, getAllReleaseLinks } from '../src/utils/get-release';

const arrayFormatRelease = {
    id: 'moonlight-reflections',
    data: {
        title: 'Moonlight Reflections',
        image: '/images/moonlight.png',
        releaseDate: new Date('2026-03-27'),
        youtubeUrl: 'https://www.youtube.com/watch?v=abc123',
        links: [
            { platform: 'spotify', href: 'https://open.spotify.com/track/123' },
            { platform: 'apple-music', href: 'https://music.apple.com/123' },
            { platform: 'bandcamp', href: '#' },
            { platform: 'other', href: 'https://tidal.com/123', label: 'Tidal' },
        ],
    },
};

const legacyFormatRelease = {
    id: 'old-release',
    data: {
        title: 'Old Release',
        image: '/images/old.png',
        releaseDate: new Date('2025-06-01'),
        youtubeUrl: undefined,
        links: {
            Spotify: 'https://open.spotify.com/track/old',
            'Apple Music': 'https://music.apple.com/old',
            Tidal: 'https://tidal.com/old',
            Deezer: 'https://deezer.com/old',
        } as Record<string, string>,
    },
};

const noLinksRelease = {
    id: 'no-links',
    data: {
        title: 'No Links',
        image: '/images/none.png',
        releaseDate: new Date('2025-01-01'),
        links: undefined,
    },
};

beforeEach(() => {
    mockGetCollection.mockResolvedValue([arrayFormatRelease, legacyFormatRelease, noLinksRelease]);
});

describe('getReleaseData', () => {
    it('returns release metadata', async () => {
        const data = await getReleaseData('moonlight-reflections');
        expect(data).toEqual({
            title: 'Moonlight Reflections',
            image: '/images/moonlight.png',
            releaseDate: new Date('2026-03-27'),
            youtubeUrl: 'https://www.youtube.com/watch?v=abc123',
        });
    });

    it('returns null for non-existent release', async () => {
        expect(await getReleaseData('does-not-exist')).toBeNull();
    });
});

describe('getReleaseLinks (array format)', () => {
    it('returns all links preserving platform and href', async () => {
        const links = await getReleaseLinks('moonlight-reflections');
        expect(links).toHaveLength(4);
        expect(links[0]).toEqual({ platform: 'spotify', href: 'https://open.spotify.com/track/123', label: undefined });
    });

    it('preserves label on other-platform links', async () => {
        const links = await getReleaseLinks('moonlight-reflections');
        const tidal = links.find((l) => l.label === 'Tidal');
        expect(tidal).toBeDefined();
        expect(tidal!.platform).toBe('other');
    });
});

describe('getReleaseLinks (legacy record format)', () => {
    it('converts main platforms to kebab-case keys', async () => {
        const links = await getReleaseLinks('old-release');
        const spotify = links.find((l) => l.platform === 'spotify');
        expect(spotify).toBeDefined();
        expect(spotify!.href).toBe('https://open.spotify.com/track/old');

        const apple = links.find((l) => l.platform === 'apple-music');
        expect(apple).toBeDefined();
    });

    it('puts non-main platforms under "other" with label', async () => {
        const links = await getReleaseLinks('old-release');
        const others = links.filter((l) => l.platform === 'other');
        expect(others).toHaveLength(2);
        expect(others.map((o) => o.label).sort()).toEqual(['Deezer', 'Tidal']);
    });
});

describe('getReleaseLinks edge cases', () => {
    it('returns empty array for release with no links', async () => {
        expect(await getReleaseLinks('no-links')).toEqual([]);
    });

    it('returns empty array for non-existent release', async () => {
        expect(await getReleaseLinks('does-not-exist')).toEqual([]);
    });
});

describe('getAllReleaseLinks', () => {
    it('returns flat name/href array for array format', async () => {
        const links = await getAllReleaseLinks('moonlight-reflections');
        expect(links[0]).toEqual({ name: 'spotify', href: 'https://open.spotify.com/track/123' });
        expect(links[3]).toEqual({ name: 'Tidal', href: 'https://tidal.com/123' });
    });

    it('returns flat name/href array for legacy format', async () => {
        const links = await getAllReleaseLinks('old-release');
        expect(links).toContainEqual({ name: 'Spotify', href: 'https://open.spotify.com/track/old' });
        expect(links).toContainEqual({ name: 'Tidal', href: 'https://tidal.com/old' });
    });

    it('returns empty array for release with no links', async () => {
        expect(await getAllReleaseLinks('no-links')).toEqual([]);
    });
});
