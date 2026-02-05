import { getCollection } from 'astro:content';

export async function getPreReleaseData(preReleaseId: string) {
    const preReleases = await getCollection('pre-releases');
    const preRelease = preReleases.find((r) => r.id === preReleaseId);

    if (!preRelease) {
        return null;
    }

    return {
        title: preRelease.data.title,
        image: preRelease.data.image,
        releaseDateText: preRelease.data.releaseDateText,
        preSaveUrl: preRelease.data.preSaveUrl,
        ctaText: preRelease.data.ctaText
    };
}
