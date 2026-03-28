import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGetCollection = vi.fn();
vi.mock('astro:content', () => ({
    getCollection: (...args: any[]) => mockGetCollection(...args),
}));

import { getPreReleaseData } from '../src/utils/get-pre-release';

beforeEach(() => {
    mockGetCollection.mockResolvedValue([
        {
            id: 'moonlight-reflections',
            data: {
                title: 'Moonlight Reflections',
                image: '/images/moonlight.png',
                releaseDateText: 'Coming March 27',
                preSaveUrl: 'https://ffm.to/moonlightreflections',
                ctaText: undefined,
            },
        },
    ]);
});

describe('getPreReleaseData', () => {
    it('returns pre-release metadata', async () => {
        const data = await getPreReleaseData('moonlight-reflections');
        expect(data).toEqual({
            title: 'Moonlight Reflections',
            image: '/images/moonlight.png',
            releaseDateText: 'Coming March 27',
            preSaveUrl: 'https://ffm.to/moonlightreflections',
            ctaText: undefined,
        });
    });

    it('returns null for non-existent pre-release', async () => {
        expect(await getPreReleaseData('does-not-exist')).toBeNull();
    });
});
