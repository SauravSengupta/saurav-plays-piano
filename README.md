# Saurav Plays Piano 🎹

A minimalist ambient music portfolio built with **Astro** and **Tailwind CSS**.
This site is the home for my original piano compositions — cinematic, relaxing
pieces inspired by the Pacific Northwest — alongside writing about the tools and
ideas behind the music.

Live at **[sauravplayspiano.com](https://sauravplayspiano.com)**.

## ✨ Features

- **Music releases** — each track gets a page with cover art, a YouTube embed,
  and links out to every streaming platform (Spotify, Apple Music, YouTube
  Music, Amazon Music, Bandcamp, Tidal, and more).
- **Pre-release pages** — promote upcoming tracks with cover art, a release date,
  and a pre-save call-to-action.
- **Configurable home hero** — show a standard hero, the latest release, or an
  upcoming pre-release, controlled from a single config value.
- **Musings** — a blog for writing, with tags, featured posts, and an RSS feed.
- **Light / dark theme** with a persisted toggle.
- **SEO built in** — Open Graph + Twitter cards, canonical URLs, sitemap, and RSS.
- **Newsletter signup** — MailerLite subscribe form with a honeypot bot check.
- **Optimized images** via `sharp`.

## 🧱 Tech Stack

- **Framework**: [Astro](https://astro.build) 6 (static output)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4 (via `@tailwindcss/vite`)
- **Content**: Markdown / MDX through Astro content collections
- **Language**: TypeScript
- **Testing**: [Vitest](https://vitest.dev)
- **Deployment**: Static build (`dist/`) — deployable to any static host
  (Cloudflare Pages, Netlify, Vercel, etc.)

## 🛠️ Getting Started

**Prerequisites:** Node.js 20+ and npm.

```bash
# 1. Clone
git clone https://github.com/SauravSengupta/saurav-plays-piano.git
cd saurav-plays-piano

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:4321)
npm run dev
```

### Commands

| Command           | Action                                            |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start the local dev server at `localhost:4321`    |
| `npm run build`   | Build the production site to `dist/`              |
| `npm run preview` | Preview the production build locally              |
| `npm test`        | Run the test suite with Vitest                    |
| `npm run astro`   | Run Astro CLI commands (e.g. `astro check`)       |

## 📁 Project Structure

```
src/
├── assets/         Images and icons (optimized at build time)
├── components/     Astro UI components (Hero, TrackPreview, Nav, ...)
├── content/        Markdown/MDX content collections (see below)
├── data/           site-config.ts — global site settings
├── layouts/        Page layouts
├── pages/          Routes (music, musings, tags, RSS, dynamic pages)
├── styles/         Global CSS / Tailwind theme
└── utils/          Helpers for releases, tags, slugs, dates
public/             Static assets served as-is (audio, favicon, social image)
tests/              Vitest unit + build tests
```

## 📝 Content Model

All content lives in `src/content/`, organized into five collections. Schemas
are defined and validated in [`src/content.config.ts`](src/content.config.ts).

### `music` — track detail pages

```yaml
---
title: Longing For The Open Sea
description: A wistful piano melody layered with ocean sounds.
publishDate: 2026-04-24
badge: "Released April 24"     # optional pill shown on the card
actionText: "Listen Now"        # optional CTA label
showInList: true                # show in the music index
seo:
  image:
    src: '../../assets/images/covers/longing-for-the-open-sea-cover.png'
    alt: Longing For The Open Sea cover art
---
```

### `releases` — released tracks with streaming links

```yaml
---
title: Mist & Mushrooms
image: ../../assets/images/covers/mist-and-mushrooms-cover.jpg
releaseDate: 2026-01-16
youtubeUrl: https://www.youtube.com/watch?v=_jZoaN76BVk
links:
  - platform: spotify        # spotify | apple-music | youtube-music
    href: 'https://open.spotify.com/track/...'  # amazon-music | bandcamp | other
  - platform: other
    label: Tidal             # 'label' is required for 'other'
    href: 'https://tidal.com/album/...'
---
```

### `pre-releases` — upcoming tracks with pre-save

```yaml
---
title: Longing For The Open Sea
image: ../../assets/images/covers/longing-for-the-open-sea-cover.png
releaseDateText: Coming April 24
preSaveUrl: https://artists.landr.com/longing-for-the-open-sea
ctaText: Pre-save            # optional, defaults to a sensible label
---
```

### `musings` — blog posts

```yaml
---
title: "Phrase Maker: Teaching My Computer Music Theory"
excerpt: "How hard can it be to get a computer to make music?"
publishDate: 2026-01-24
updatedDate: 2026-02-01      # optional
isFeatured: true             # optional, default false
tags: [music, code]          # optional
---
```

### `pages` — standalone pages (About, Connect, Terms)

```yaml
---
title: Get in Touch
showSubscribe: true          # render the newsletter form on this page
seo:
  title: Connect
  description: Get in touch through email or social media!
---
```

## ⚙️ Configuration

Global settings live in [`src/data/site-config.ts`](src/data/site-config.ts):
site title and description, header/footer nav, social links, the hero,
newsletter form, and pagination sizes. Set `homeHeroType` to `'hero'`,
`'releaseHero'`, or `'preReleaseHero'` to control what the homepage features.

## 🙏 Credits

Built on the [Dante](https://github.com/JustGoodUI/dante-astro-theme) Astro
theme by [JustGoodUI](https://github.com/JustGoodUI), used under the GPL-3.0
license. The site's structure, base components, and styling derive from Dante;
the music, writing, and the release/track features are my own additions.

## 📄 License

Licensed under the [GNU General Public License v3.0](LICENSE), inherited from
the Dante theme. This covers the **site code only** — all music, compositions,
audio, and written content are © Saurav Sengupta, all rights reserved.
