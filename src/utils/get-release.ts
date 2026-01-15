import { getCollection } from 'astro:content';
import type { StreamingLink } from '../components/StreamingLinks.astro';

const mainPlatforms = ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music'];

export async function getReleaseData(releaseId: string) {
    const releases = await getCollection('releases');
    const release = releases.find((r) => r.id === releaseId);

    if (!release) {
        return null;
    }

    return {
        title: release.data.title,
        image: release.data.image,
        releaseDate: release.data.releaseDate
    };
}
export async function getReleaseLinks(releaseId: string): Promise<StreamingLink[]> {
    const releases = await getCollection('releases');
    const release = releases.find((r) => r.id === releaseId);

    if (!release || !release.data.links) {
        return [];
    }

    // Extract only the main platforms
    const links: StreamingLink[] = [];

    for (const platform of mainPlatforms) {
        const href = release.data.links[platform] || '#';
        // Convert platform name to kebab-case for the platform key
        const platformKey = platform.toLowerCase().replace(/\s+/g, '-') as
            | 'spotify'
            | 'apple-music'
            | 'youtube-music'
            | 'amazon-music';
        links.push({ platform: platformKey, href });
    }

    // Add "other" link pointing to the release page
    links.push({
        platform: 'other',
        href: `/releases/${releaseId}`
    });

    return links;
}

export async function getAllReleaseLinks(releaseId: string): Promise<Array<{ name: string; href: string }>> {
    const releases = await getCollection('releases');
    const release = releases.find((r) => r.id === releaseId);

    if (!release || !release.data.links) {
        return [];
    }

    return Object.entries(release.data.links).map(([name, href]) => ({
        name,
        href: href as string
    }));
}
