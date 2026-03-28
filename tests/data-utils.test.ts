import { describe, it, expect, vi } from 'vitest';

vi.mock('astro:content', () => ({}));

import { sortItemsByDateDesc, getAllTags, getPostsByTag } from '../src/utils/data-utils';

describe('sortItemsByDateDesc', () => {
    const makeItem = (dateStr: string) => ({ data: { publishDate: new Date(dateStr) } });

    it('sorts newer items first', () => {
        const a = makeItem('2026-01-01');
        const b = makeItem('2026-03-01');
        expect(sortItemsByDateDesc(a, b)).toBeGreaterThan(0);
    });

    it('sorts older items last', () => {
        const a = makeItem('2026-03-01');
        const b = makeItem('2026-01-01');
        expect(sortItemsByDateDesc(a, b)).toBeLessThan(0);
    });

    it('returns 0 for same date', () => {
        const a = makeItem('2026-02-01');
        const b = makeItem('2026-02-01');
        expect(sortItemsByDateDesc(a, b)).toBe(0);
    });

    it('works with Array.sort', () => {
        const items = [
            makeItem('2026-01-16'),
            makeItem('2026-03-27'),
            makeItem('2026-02-20'),
        ];
        items.sort(sortItemsByDateDesc);
        expect(items[0].data.publishDate).toEqual(new Date('2026-03-27'));
        expect(items[2].data.publishDate).toEqual(new Date('2026-01-16'));
    });
});

function makePost(tags: string[]) {
    return { data: { tags } } as any;
}

describe('getAllTags', () => {
    it('extracts unique tags with slugified IDs', () => {
        const posts = [
            makePost(['Piano', 'Ambient']),
            makePost(['Piano', 'Generative']),
        ];
        const tags = getAllTags(posts);
        expect(tags).toEqual([
            { name: 'Piano', id: 'piano' },
            { name: 'Ambient', id: 'ambient' },
            { name: 'Generative', id: 'generative' },
        ]);
    });

    it('deduplicates tags that slugify to the same ID', () => {
        const posts = [
            makePost(['Piano Music']),
            makePost(['piano-music']),
        ];
        const tags = getAllTags(posts);
        expect(tags).toHaveLength(1);
        expect(tags[0].id).toBe('piano-music');
    });

    it('returns empty array for posts with no tags', () => {
        const posts = [makePost([]), makePost([])];
        expect(getAllTags(posts)).toEqual([]);
    });

    it('handles posts with undefined tags', () => {
        const posts = [{ data: {} } as any];
        expect(getAllTags(posts)).toEqual([]);
    });
});

describe('getPostsByTag', () => {
    const posts = [
        makePost(['Piano', 'Ambient']),
        makePost(['Generative']),
        makePost(['Piano']),
    ];

    it('filters posts by slugified tag ID', () => {
        const result = getPostsByTag(posts, 'piano');
        expect(result).toHaveLength(2);
    });

    it('returns empty array for non-existent tag', () => {
        expect(getPostsByTag(posts, 'jazz')).toEqual([]);
    });

    it('matches case-insensitively via slugify', () => {
        const result = getPostsByTag(posts, 'ambient');
        expect(result).toHaveLength(1);
    });
});
