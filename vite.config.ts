// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

export default defineConfig({
  vite: {
    // Keep generated asset URLs portable when the site is uploaded under any path.
    base: "./",
  },
  tanstackStart: {
    // Keep the existing wrapper available while the page is prerendered.
    server: { entry: "server" },
    // Render the only application route at build time for static hosting.
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      crawlLinks: true,
      failOnError: true,
      onSuccess: async () => {
        // TanStack Start prefixes Vite's relative module-preload URLs with `/`.
        const staticHtml = resolve("dist/client/index.html");
        const html = await readFile(staticHtml, "utf8");
        await writeFile(staticHtml, html.replace(/(src|href)=(["'])\/\.\//g, "$1=$2./"));
      },
    },
  },
  // This site is deployed as files only; no production server bundle is emitted.
  nitro: false,
});
