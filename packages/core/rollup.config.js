import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/umd/bundle.js',
        format: 'umd',
        name: 'core',
        sourcemap: true,
      },
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ],
  },
];
