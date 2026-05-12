import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/cyber/Navbar";
import { Footer } from "@/components/cyber/Footer";
import { Ticker } from "@/components/cyber/Ticker";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-mono-cyber text-accent text-xs tracking-[0.3em] mb-4">
          ERROR_CODE: 0x404
        </div>
        <h1 className="font-display font-black text-7xl text-cyber-white text-glow">404</h1>
        <h2 className="mt-4 font-display font-bold text-xl text-cyber-white uppercase tracking-widest">
          Signal Lost
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The route you're targeting is offline or has been decommissioned.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-cyber">Return to Base</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-mono-cyber text-cyber-red text-xs tracking-[0.3em] mb-4">
          SYSTEM_FAULT
        </div>
        <h1 className="font-display font-black text-2xl text-cyber-white uppercase tracking-widest">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing or head back to base.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-cyber"
          >
            Try Again
          </button>
          <Link to="/" className="btn-ghost-cyber">Go Home</Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CyberSec Updates — Real-Time Threat Intelligence" },
      { name: "description", content: "Real-time cybersecurity news, threat intelligence, deep-dive insights, and curated resources for security professionals." },
      { name: "author", content: "CyberSec Updates" },
      { property: "og:title", content: "CyberSec Updates — Real-Time Threat Intelligence" },
      { property: "og:description", content: "Real-time cybersecurity news, threat intelligence, and deep-dive analysis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Ticker />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
