import { execFileSync } from 'node:child_process';
import { cp, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const isCloudflare = process.env.SITE_RUNTIME === 'cloudflare';

export default defineNuxtConfig({
  compatibilityDate: '2025-11-01',
  devtools: { enabled: false },
  modules: ['nuxt-svgo', '@nuxt/eslint'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/scss/index.scss'],
  experimental: {
    defaults: { nuxtLink: { prefetchOn: { visibility: false, interaction: true } } },
  },
  svgo: { autoImportPath: false, dts: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: { additionalData: '@use "~/assets/scss/abstracts" as *;' },
      },
    },
  },
  nitro: {
    preset: isCloudflare ? 'cloudflare_module' : undefined,
    output: isCloudflare
      ? { dir: 'dist', serverDir: 'dist/server', publicDir: 'dist/client' }
      : undefined,
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

        const revision = getCommittedRevision();
        if (revision) {
          await writeFile(join(options.output.publicDir, 'press-play-deployment.json'), JSON.stringify({ revision }));
        }
      });
    },
  },
  runtimeConfig: {
    public: { whatsappNumber: '' },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'ru' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [{ name: 'theme-color', content: '#100d18' }],
    },
  },
  typescript: { strict: true },
});

function getCommittedRevision() {
  try {
    const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return git('status', '--porcelain') ? undefined : git('rev-parse', '--verify', 'HEAD');
  } catch {
    return undefined;
  }
}
