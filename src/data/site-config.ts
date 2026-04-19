import avatar from '../assets/images/avatar.jpg';
import hero from '../assets/images/hero.jpg';
import logo from '../assets/images/logo.svg';
import mistCover from '../assets/images/mist-and-mushrooms-cover.jpg';
import phraseMakerUi from '../assets/images/phrase-maker-ui.png';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://sauravplayspiano.com',
    avatar: {
        src: avatar,
        alt: 'Saurav Plays Piano'
    },
    logo: {
        src: logo,
        alt: 'Saurav Plays Piano'
    },
    title: 'Saurav Plays Piano',
    subtitle: 'For the quiet moments',
    description: 'Cinematic and relaxing ambient piano music by Saurav',
    image: {
        src: '/social-preview.webp',
        alt: 'Saurav Plays Piano - Cinematic and relaxing ambient piano music by Saurav'
    },
    headerNavLinks: [
        {
            text: 'Music',
            href: '/music'
        },
        {
            text: 'Musings',
            href: '/musings'
        },
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Connect',
            href: '/connect'
        },
        /*
        {
            text: 'Tags',
            href: '/tags'
        }
        */
    ],
    footerNavLinks: [
        {
            text: 'Terms',
            href: '/terms'
        }
    ],
    socialLinks: [
        {
            text: 'YouTube',
            href: 'https://www.youtube.com/@SauravPlaysPiano'
        },
        {
            text: 'Instagram',
            href: 'https://www.instagram.com/sauravplayspiano/'
        }
    ],
    hero: {
        text: "Minimalist piano compositions inspired by the Pacific Northwest.",
        image: {
            src: hero,
            alt: 'A cinematic shot of a misty evergreen forest'
        },
        actions: [
            {
                text: 'Mist & Mushrooms',
                href: '/music/mist-and-mushrooms',
                label: 'Released January 16 • Listen Now',
                image: mistCover.src
            },
            {
                text: 'Phrase Maker: Teaching My Computer Music Theory',
                href: '/musings/phrase-maker',
                label: 'Read Latest Post',
                image: phraseMakerUi.src
            }
        ]
    },
    // Set to 'releaseHero' or 'preReleaseHero' to show release/pre-release hero instead of regular hero
    homeHeroType: 'preReleaseHero' as const,
    releaseHero: {
        releaseId: 'moonlight-reflections' // Image and links are fetched from releases collection
    },
    preReleaseHero: {
        preReleaseId: 'longing-for-the-open-sea' // Image and data are fetched from pre-releases collection
    },
    subscribe: {
        enabled: true,
        title: 'Join my mailing list',
        text: 'Occasional updates on new music. Unsubscribe anytime.',
        form: {
            action: 'https://assets.mailerlite.com/jsonp/2030410/forms/176325572793730648/subscribe',
            emailFieldName: 'fields[email]',
            // MailerLite uses "anticsrf" as a basic bot check
            honeypotFieldName: 'anticsrf',
            // This matches the <input type="hidden" name="ml-submit" value="1"> in your code
            hiddenFields: [
                { name: 'ml-submit', value: '1' }
            ]
        }
    },
    postsPerPage: 8,
    tracksPerPage: 8
};

export default siteConfig;
