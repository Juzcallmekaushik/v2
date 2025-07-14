import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      host: true,
      port: 3000,
      hmr: {
        overlay: true,
      },
      watch: {
        usePolling: true,
      },
    },
    define: {
      "process.env.CONTENTFUL_SPACE_ID": JSON.stringify(env.CONTENTFUL_SPACE_ID),
      "process.env.CONTENTFUL_ACCESS_TOKEN": JSON.stringify(env.CONTENTFUL_ACCESS_TOKEN),
      "process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN": JSON.stringify(env.CONTENTFUL_PREVIEW_ACCESS_TOKEN),
      "process.env.FIREBASE_API_KEY": JSON.stringify(env.FIREBASE_API_KEY),
      "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(env.FIREBASE_AUTH_DOMAIN),
      "process.env.FIREBASE_PROJECT_ID": JSON.stringify(env.FIREBASE_PROJECT_ID),
      "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(env.FIREBASE_STORAGE_BUCKET),
      "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(env.FIREBASE_MESSAGING_SENDER_ID),
      "process.env.FIREBASE_APP_ID": JSON.stringify(env.FIREBASE_APP_ID),
      "process.env.FIREBASE_MEASUREMENT_ID": JSON.stringify(env.FIREBASE_MEASUREMENT_ID),
    },
    plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  };
});
