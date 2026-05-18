import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Vercel deployment build.
// We no longer bundle for Cloudflare Workers — the SSR output is wrapped
// by `api/index.ts` as a Vercel Node Serverless Function.
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Use our own server wrapper at src/server.ts (Web Fetch handler)
      // which api/index.ts adapts to Node req/res for Vercel.
      server: { entry: "/src/server.ts" },
    }),
    viteReact(),
  ],
  build: {
    target: "node20",
  },
});
