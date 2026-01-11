import avatar from '../assets/images/avatar.jpg';
import hero from '../assets/images/hero.jpg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://sauravplayspiano.com',
    avatar: {
        src: avatar,
        alt: 'Saurav Plays Piano'
    },
    title: 'Saurav Plays Piano',
    subtitle: 'Relaxing Ambient Piano Music',
    description: 'Cinematic and relaxing ambient piano music by Saurav',
    image: {
        src: '/social-preview.jpg',
        alt: 'Saurav Plays Piano - Cinematic and relaxing ambient piano music by Saurav'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Music',
            href: '/music'
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
                    text: 'Blog',
                    href: '/blog'
                },
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
        title: 'Music for quiet moments',
        text: "Minimalist piano compositions inspired by the misty Pacific Northwest.",
        image: {
            src: hero,
            alt: 'A cinematic shot of a misty evergreen forest'
        },
        actions: [
            {
                text: 'Mist & Mushrooms - my debut track',
                href: '/music/mist-and-mushrooms'
            }
        ]
    },
    subscribe: {
        enabled: true,
        title: 'Join my mailing list',
        text: 'No spam, I promise. Only updates when I have something new to share. You can unsubscribe at any time.',
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
    projectsPerPage: 8
};

export default siteConfig;
