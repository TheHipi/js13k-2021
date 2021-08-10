import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import html from '@rollup/plugin-html'
import kontra from 'rollup-plugin-kontra'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import template from './src/lib/template'
import zip from 'rollup-plugin-zip'

import cssnano from 'cssnano'

export default [{
  input: 'src/js/game.js',
  output: {
    name: 'game',
    dir: 'build',
    format: 'iife'
  },
  plugins: [
    resolve({
      jsnext: true,
      browser: true,
      dedupe: ['kontra']
    }),
    kontra({
      gameObject: {
        acceleration: true,
        anchor: true,
        group: true,
        opacity: true,
        rotation: true,
        ttl: true,
        velocity: true
      },
      vector: {
        length: true
      },
      debug: true
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    html({
      title: 'rollup-boilerplate',
      template
    }),
    postcss({
      extensions: ['.css'],
      plugins: [cssnano()]
    }),
    terser({
      mangle: true
    }),
    filesize({
      showBeforeSizes: false
    }),
    zip()
  ]
}]
