const mri = require('mri');

const pkg = require('./package.json');

const command = mri(process.argv.slice(2), {
  default: {
    watch: false,
    sourcemap: false,
  },
});

require('esbuild').build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'esnext',
  watch: command.watch,
  format: 'cjs',
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  outfile: 'dist/index.js',
  minify: !command.sourcemap,
  sourcemap: command.sourcemap ? 'inline' : false,
});
