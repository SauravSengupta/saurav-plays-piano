export type ImageInput = {
    src: ImageMetadata | string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: ImageInput;
    actions?: (Link & { image?: string; label?: string })[];
};

export type PlatformLink = {
    platform: 'spotify' | 'apple-music' | 'youtube-music' | 'amazon-music' | 'bandcamp' | 'other';
    href: string;
};

export type ReleaseHero = {
    image?: ImageInput;
    links?: PlatformLink[];
    releaseId?: string;
};

export type SubscribeForm = {
    action: string;
    emailFieldName?: string;
    hiddenFields?: { name: string; value: string }[];
    honeypotFieldName?: string;
};

export type Subscribe = {
    enabled?: boolean;
    title?: string;
    text?: string;
    form?: SubscribeForm;
};

export type SiteConfig = {
    website: string;
    avatar?: ImageInput;
    title: string;
    subtitle?: string;
    description: string;
    image?: ImageInput;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    releaseHero?: ReleaseHero;
    homeHeroType?: 'hero' | 'releaseHero';
    subscribe?: Subscribe;
    postsPerPage?: number;
    tracksPerPage?: number;
    avatar?: ImageMetadata;
};
