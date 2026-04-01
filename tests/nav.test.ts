import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import siteConfig from '../src/data/site-config';

describe('header navigation config', () => {
    const navLinks = siteConfig.headerNavLinks ?? [];

    it('has at least one nav link', () => {
        expect(navLinks.length).toBeGreaterThan(0);
    });

    it('every link has text and href', () => {
        for (const link of navLinks) {
            expect(link.text).toBeTruthy();
            expect(link.href).toBeTruthy();
        }
    });

    it('every internal href starts with /', () => {
        for (const link of navLinks) {
            expect(link.href).toMatch(/^\//);
        }
    });

    it('contains expected nav items in order', () => {
        const texts = navLinks.map((l) => l.text);
        expect(texts).toEqual(['Music', 'Musings', 'About', 'Connect']);
    });
});

describe('Play link in Nav component', () => {
    const navSource = readFileSync(resolve('src/components/Nav.astro'), 'utf-8');

    it('links to play.sauravplayspiano.com', () => {
        expect(navSource).toContain('href="https://play.sauravplayspiano.com"');
    });

    it('opens in a new tab', () => {
        expect(navSource).toContain('target="_blank"');
    });

    it('has noopener noreferrer for security', () => {
        expect(navSource).toContain('rel="noopener noreferrer"');
    });

    it('displays "Play" as the link text', () => {
        expect(navSource).toMatch(/>\s*Play\s*<\//);
    });
});
