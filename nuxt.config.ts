import { cp, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const isCloudflare = process.env.SITE_RUNTIME === 'cloudflare';
const database = isCloudflare ? 'cloudflare' : 'sqlite';

export default defineNuxtConfig({
  compatibilityDate: '2025-11-01',
  devtools: { enabled: false },
  modules: ['nuxt-svgo', '@nuxt/eslint'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['@fontsource-variable/inter', '~/assets/scss/index.scss'],
  svgo: { autoImportPath: false, dts: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: { additionalData: '@use "~/assets/scss/abstracts" as *;' },
      },
    },
  },
  alias: {
    '#order-database': fileURLToPath(new URL(`./server/database/${database}.ts`, import.meta.url)),
  },
  nitro: {
    preset: isCloudflare ? 'cloudflare_module' : 'node-server',
    output: isCloudflare
      ? { dir: 'dist', serverDir: 'dist/server', publicDir: 'dist/client' }
      : undefined,
    serverAssets: isCloudflare
      ? []
      : [{ baseName: 'migrations', dir: fileURLToPath(new URL('./drizzle', import.meta.url)), pattern: '*.sql' }],
    cloudflare: isCloudflare
      ? { deployConfig: true, nodeCompat: true, wrangler: { name: 'press-play-ps5-rental' } }
      : undefined,
  },
  hooks: {
    'nitro:init'(nitro) {
      if (!isCloudflare) return;

      nitro.hooks.hook('compiled', async ({ options }) => {
        // Sites expects an index.js entry point while Nitro emits index.mjs.
        await writeFile(join(options.output.serverDir, 'index.js'), 'export { default } from "./index.mjs";\n');
        const metadata = join(options.output.dir, '.openai');
        await mkdir(metadata, { recursive: true });
        await cp('.openai/hosting.json', join(metadata, 'hosting.json'));
        await cp('drizzle', join(metadata, 'drizzle'), { recursive: true });
      });
    },
  },
  runtimeConfig: { orderDatabasePath: '.data/orders.sqlite' },
  routeRules: {
    '/api/**': { headers: { 'cache-control': 'no-store' } },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [{ name: 'theme-color', content: '#100d18' }],
    },
  },
  typescript: { strict: true },
});
