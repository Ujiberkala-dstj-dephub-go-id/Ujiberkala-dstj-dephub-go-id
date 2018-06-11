import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const banner = `/*!
* ${pkg.name} - v${pkg.version}
* ${pkg.description}
* https://github.com/onokumus${pkg.name}#readme
*
* Made by Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under ${pkg.license} License
*/`;


export default [
  {
    input: 'dist/modules/index.js',
    output: [
      {
        file: pkg.main,
        banner,
        format: 'cjs',
      },
    ],
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'dist/cjs/index.js',
    output: [
      {
        name: 'OnoffCanvas',
        banner,
        file: pkg.browser,
        format: 'umd',
        sourcemap: true,
        external: ['events']
      },
    ],
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve({
        preferBuiltins: false,
      }),
      commonjs()
    ],
  },
];
