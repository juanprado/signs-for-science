const includePaths = require('rollup-plugin-includepaths');
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

export default {
  entry: './src/js/index.js',
  plugins: [
    includePaths({ 
      paths: ['src/js'] 
    }),
    nodeResolve({ jsnext: true }),
    commonjs({ 
      include: 'node_modules/**'
    }),
    babel({ exclude: 'node_modules/**'}),
  ],
  format: 'iife',
}