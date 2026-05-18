# Vercel Deployment

This project is configured to deploy on **Vercel** (Node 20 Serverless Function).

## What changed (vs original Cloudflare setup)

- `vite.config.ts` — replaced Lovable/Cloudflare preset with plain `tanstackStart()`.
- `wrangler.jsonc` — deleted.
- `src/server.ts` — now exports a Web Fetch `handleRequest(request)`.
- `api/index.ts` — Vercel Node Serverless entry. Adapts Node req/res → Web Fetch → SSR handler.
- `vercel.json` — routes all non-`/assets/*` requests to `api/index.ts`; static client assets served from `dist/client`.

## Deploy steps

1. Push the repo to GitHub (Lovable → Plus menu → GitHub → Create Repository).
2. In Vercel, **Import Project** → pick the repo.
3. Framework Preset: **Other** (vercel.json drives the build).
4. Build Command: leave blank (vercel.json sets `vite build`).
5. Output Directory: leave blank (vercel.json sets `dist/client`).
6. Add any environment variables under Vercel → Project → Settings → Environment Variables.
7. Deploy. Attach `cyberhawk-ug.store` under Vercel → Project → Settings → Domains.

## Local commands

```bash
npm install
npm run dev      # local dev server
npm run build    # produces dist/client + SSR bundle
```

## Important caveats

- **Lovable Publish / preview no longer works for this project** — the Lovable preview depends on the Cloudflare adapter that was removed.
- DNS for `cyberhawk-ug.store` must point at Vercel (Vercel will show you A / CNAME records when you add the domain).
- The `@cloudflare/vite-plugin` and `@lovable.dev/vite-tanstack-config` packages remain in `package.json` but are no longer imported. You can remove them with `npm uninstall @cloudflare/vite-plugin @lovable.dev/vite-tanstack-config` if you want a clean tree.
