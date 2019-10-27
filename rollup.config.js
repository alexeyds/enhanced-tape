import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  {
    input: 'lib/enhanced_tape.js',
    output: { file: 'dist/enhanced-tape.js', format: 'cjs', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [babel()]
  }
];