import { build } from 'esbuild';

// Build analytics script
await build({
  entryPoints: ['src/analytics.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  outfile: 'assets/js/analytics.js',
  platform: 'browser',
});

console.log('✓ Analytics script built successfully');
