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
        releaseDate: release.data.releaseDate,
        youtubeUrl: release.data.youtubeUrl
    };
}
export async function getReleaseLinks(releaseId: string): Promise<StreamingLink[]> {
    const releases = await getCollection('releases');
    const release = releases.find((r) => r.id === releaseId);

    if (!release || !release.data.links) {
        return [];
    }

    // Handle new array format from content collection
    if (Array.isArray(release.data.links)) {
        return release.data.links.map((link: any) => ({
            platform: link.platform,
            href: link.href,
            label: link.label
        }));
    }

    // Extract only the main platforms
    const links: StreamingLink[] = [];
    const linkData = release.data.links as Record<string, string>;

    // 1. Add Main Platforms
    for (const platform of mainPlatforms) {
        if (linkData[platform]) {
            const href = linkData[platform];
            // Convert platform name to kebab-case for the platform key
            const platformKey = platform.toLowerCase().replace(/\s+/g, '-') as
                | 'spotify'
                | 'apple-music'
                | 'youtube-music'
                | 'amazon-music';
            links.push({ platform: platformKey, href });
        }
    }

    // 2. Add Other Platforms (anything not in mainPlatforms)
    for (const [key, href] of Object.entries(linkData)) {
        if (!mainPlatforms.includes(key)) {
            links.push({
                platform: 'other',
                href: href,
                label: key // Use the key (e.g., "Tidal") as the label
            });
        }
    }

    return links;
}

export async function getAllReleaseLinks(releaseId: string): Promise<Array<{ name: string; href: string }>> {
    const releases = await getCollection('releases');
    const release = releases.find((r) => r.id === releaseId);

    if (!release || !release.data.links) {
        return [];
    }

    if (Array.isArray(release.data.links)) {
        return release.data.links.map((link: any) => ({
            name: link.label || link.platform,
            href: link.href
        }));
    }

    return Object.entries(release.data.links).map(([name, href]) => ({
        name,
        href: href as string
    }));
}
