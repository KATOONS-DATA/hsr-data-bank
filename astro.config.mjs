// @ts-check
import { defineConfig } from 'astro/config';
import { site } from './site.config.ts';

// https://astro.build/config
export default defineConfig({
  site: site.url,
  base: site.base,
  output: 'static',
});
