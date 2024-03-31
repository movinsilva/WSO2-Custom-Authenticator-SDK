/**
 *  PLUGINS:
 *      'esbuild-sass-plugin': handle Sass & SCSS files.
 *      'esbuild-plugin-svgr':  support for *.svg file imports as React components.
 */

import { build } from 'esbuild';
import path from 'path';
import {sassPlugin} from 'esbuild-sass-plugin'
import svgr from 'esbuild-plugin-svgr'
import packageJson from './package.json' assert {type: 'json'};

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  outdir: path.dirname(packageJson.main),
  format: 'cjs',
  platform: 'node',
  plugins: [
    sassPlugin(),
    svgr(),
  ]
}).catch(() => process.exit(1));


build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    sourcemap: true,
    outdir: path.dirname(packageJson.module),
    format: 'esm',
    platform: 'browser',
    external: ['react', 'react-dom'],
    plugins: [
        sassPlugin(),
        svgr(),
    ]
  }).catch(() => process.exit(1));