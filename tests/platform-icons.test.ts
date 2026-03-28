import { describe, it, expect } from 'vitest';
import { platformIcons, platformLabels } from '../src/utils/platform-icons';

describe('platformIcons', () => {
    const expectedPlatforms = ['spotify', 'apple-music', 'youtube-music', 'amazon-music', 'bandcamp', 'other'];

    it('has an icon for every expected platform', () => {
        for (const platform of expectedPlatforms) {
            expect(platformIcons[platform], `missing icon for ${platform}`).toBeDefined();
        }
    });

    it('all icons contain valid SVG content', () => {
        for (const [platform, svg] of Object.entries(platformIcons)) {
            expect(svg, `empty SVG for ${platform}`).toBeTruthy();
            expect(svg, `${platform} icon should contain SVG elements`).toMatch(/<(path|circle)/);
        }
    });
});

describe('platformLabels', () => {
    it('has a label for every expected platform', () => {
        const expectedLabels: Record<string, string> = {
            spotify: 'Spotify',
            'apple-music': 'Apple Music',
            'youtube-music': 'YouTube Music',
            'amazon-music': 'Amazon Music',
            bandcamp: 'Bandcamp',
            other: 'Other Platforms',
        };

        for (const [key, label] of Object.entries(expectedLabels)) {
            expect(platformLabels[key]).toBe(label);
        }
    });

    it('every icon platform has a corresponding label', () => {
        for (const platform of Object.keys(platformIcons)) {
            expect(platformLabels[platform], `missing label for ${platform}`).toBeDefined();
        }
    });
});
