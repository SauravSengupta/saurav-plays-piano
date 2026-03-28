import { describe, it, expect } from 'vitest';
import { getYouTubeVideoId, slugify } from '../src/utils/common-utils';

describe('getYouTubeVideoId', () => {
    it('extracts ID from standard watch URL', () => {
        expect(getYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    });

    it('extracts ID from short URL', () => {
        expect(getYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    });

    it('extracts ID when extra params follow', () => {
        expect(getYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=120')).toBe('dQw4w9WgXcQ');
    });

    it('returns null for undefined', () => {
        expect(getYouTubeVideoId(undefined)).toBeNull();
    });

    it('returns null for empty string', () => {
        expect(getYouTubeVideoId('')).toBeNull();
    });

    it('returns null for non-YouTube URL', () => {
        expect(getYouTubeVideoId('https://vimeo.com/12345')).toBeNull();
    });

    it('returns null for malformed URL', () => {
        expect(getYouTubeVideoId('not a url')).toBeNull();
    });
});

describe('slugify', () => {
    it('converts to lowercase kebab-case', () => {
        expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes accents', () => {
        expect(slugify('café résumé')).toBe('cafe-resume');
    });

    it('replaces special characters with spaces then hyphens', () => {
        expect(slugify('hello@world!')).toBe('hello-world');
    });

    it('collapses multiple spaces and hyphens', () => {
        expect(slugify('hello   ---   world')).toBe('hello-world');
    });

    it('trims leading and trailing whitespace', () => {
        expect(slugify('  hello world  ')).toBe('hello-world');
    });

    it('returns empty string for undefined', () => {
        expect(slugify(undefined)).toBe('');
    });

    it('returns empty string for empty string', () => {
        expect(slugify('')).toBe('');
    });

    it('handles numbers', () => {
        expect(slugify('Track 42')).toBe('track-42');
    });

    it('handles already-slugified input', () => {
        expect(slugify('already-a-slug')).toBe('already-a-slug');
    });
});
