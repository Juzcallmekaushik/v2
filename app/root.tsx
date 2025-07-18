import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/remix";
import { Analytics } from "@vercel/analytics/react";


export const links: LinksFunction = () => [
  { rel: "preload", href: "/fonts/Inter.ttf", as: "font", type: "font/ttf", crossOrigin: "anonymous" },
  { rel: "preload", href: "/fonts/Ubuntu-Regular.ttf", as: "font", type: "font/ttf", crossOrigin: "anonymous" },
  { rel: "preload", href: "/fonts/Ubuntu-Medium.ttf", as: "font", type: "font/ttf", crossOrigin: "anonymous" },
  { rel: "preload", href: "/fonts/Ubuntu-Bold.ttf", as: "font", type: "font/ttf", crossOrigin: "anonymous" },
];

export default function App() {
  const [showInfo, setShowInfo] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      setShowInfo(atBottom);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-black text-white font-ubuntu transition-colors duration-300">
        <main>
          <Outlet />
        </main>
        {showInfo && (
          <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50 }}>
          </div>
        )}
        <ScrollRestoration />
        <Scripts />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">
            {error.status} {error.statusText}
          </h1>
          <p className="text-gray-400">{error.data}</p>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-400 mb-4">{error.message}</p>
          <p className="text-sm text-gray-500">Check the console for more details</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Unknown Error</h1>
          <p className="text-gray-400">Something went wrong</p>
        </div>
      </div>
    );
  }
}
