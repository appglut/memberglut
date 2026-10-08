import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { existsSync } from 'fs';

/** One entry per admin screen: build name → React page file in assets/src/pages. */
const PAGES = {
  dashboard: 'Dashboard',
  members: 'Members',
  'member-detail': 'MemberDetail',
  plans: 'Plans',
  'plan-editor': 'PlanEditor',
  'content-rules': 'ContentRules',
  'rule-editor': 'RuleEditor',
  roles: 'Roles',
  payments: 'Payments',
  coupons: 'Coupons',
  emails: 'Emails',
  'forms-pages': 'FormsPages',
  settings: 'Settings',
  tools: 'Tools',
  'pro-features': 'ProFeatures',
};

const input = {};
for (const [name, file] of Object.entries(PAGES)) {
  const entry = resolve(__dirname, `assets/src/entries/${name}.jsx`);
  if (existsSync(entry)) input[name] = entry;
}

export default defineConfig({
  plugins: [react()],
  // Relative URLs: assets (fonts) are served from the plugin folder, not the site root.
  base: './',
  build: {
    outDir: 'resources',
    emptyOutDir: true,
    rollupOptions: {
      input,
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
    sourcemap: false,
    minify: false,
  },
  server: {
    hmr: false,
  },
});
