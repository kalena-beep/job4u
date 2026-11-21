# Jobs4U.sg — Website

Public landing page for Jobs4U.sg, built with TanStack Start, React, TypeScript and Tailwind CSS.

All images (logo and section photos) are included locally in `src/assets/`, and the site icon is in `public/favicon.png`.

## Requirements
- Node.js 20 or newer (or Bun)

## Install dependencies
```sh
npm install
# or: bun install
```

## Run locally
```sh
npm run dev
```
Then open the address shown in the terminal (usually http://localhost:8080 or http://localhost:5173).

## Build for production
```sh
npm run build
```
The production output is created in the `dist/` folder.

## Deploy
The project is set up for Cloudflare Workers by default.
- **Cloudflare:** run `npm run build`, then `npx nitro deploy --prebuilt` from the project folder (log in with `npx wrangler login` first).
- **Other hosts (Vercel, Netlify, Node server):** the build uses Nitro, so you can change the deploy target in `vite.config.ts` by following the TanStack Start hosting guide: https://tanstack.com/start/latest/docs/framework/react/hosting

## Contact link
The WhatsApp button opens https://wa.me/6593752892 (+65 9375 2892).
