import { describe, it, expect } from 'vitest';
import { spawnSync } from 'child_process';
import { resolve } from 'path';

describe('build', () => {
    it('astro build completes without errors', () => {
        const isWindows = process.platform === 'win32';
        const astro = resolve('node_modules/.bin', isWindows ? 'astro.cmd' : 'astro');
        const result = spawnSync(astro, ['build'], {
            cwd: process.cwd(),
            encoding: 'utf-8',
            timeout: 60_000,
            shell: isWindows,
        });
        expect(result.status).toBe(0);
        expect(result.stdout + result.stderr).toContain('Complete');
    });
}, 60_000);
