import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import image from '@rollup/plugin-image';
import styles from 'rollup-plugin-styles';
import nodePolyfills from 'rollup-plugin-polyfill-node';

import packageJson from './package.json' assert {type: 'json'};

export default [
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom'],
    onwarn: function (warning, warn) {
      // Suppress this error message... there are hundreds of them
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
      // Use default for everything else
      warn(warning);
    },
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: true,
      }),
      commonjs(),
      typescript({tsconfig: './tsconfig.json'}),
      styles({
        mode: 'inject'
    }),
      image(),
      nodePolyfills({
        buffer: true,
      })
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'esm'}],
    external: [/\.(sass|scss|css)$/] /* ignore style files */,
    plugins: [dts()],
  },
];
