/**
 *  PLUGINS:
 *      'esbuild-sass-plugin': handle Sass & SCSS files.
 *      'esbuild-plugin-svgr':  support for *.svg file imports as React components.
 */

import { build } from 'esbuild';
import path from 'path';
import {sassPlugin} from 'esbuild-sass-plugin'
import svgr from 'esbuild-plugin-svgr'
import { dtsPlugin } from "esbuild-plugin-d.ts"
import { polyfillNode } from "esbuild-plugin-polyfill-node";

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
    minify: true,
    outdir: path.dirname(packageJson.module),
    format: 'esm',
    platform: 'browser',
    plugins: [
        sassPlugin(),
        svgr(),
    ]
  }).catch(() => process.exit(1));