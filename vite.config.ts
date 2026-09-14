import { defineConfig, loadEnv, type UserConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

// Hand-rolled replacement for the old @lovable.dev/vite-tanstack-config wrapper
// (dropped once we stopped using the Lovable platform). This keeps only what
// actually matters for local dev and the Cloudflare Workers build — the
// wrapper's sandbox-only pieces (HMR gate, asset proxy, dev-server bridge,
// error-diagnostics loggers) aren't needed outside Lovable's own environment.
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const define: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    define[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  const config: UserConfig = {
    define,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      ignoreOutdatedRequests: true,
    },
    server: {
      host: "::",
      port: 8080,
      // Debounce file-change events — this repo lives inside a OneDrive-synced
      // folder, which can briefly touch files mid-write.
      watch: { awaitWriteFinish: { stabilityThreshold: 1000, pollInterval: 100 } },
    },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        server: { entry: "server" },
      }),
      // nitro builds the deploy output — only needed for `vite build`. Output paths
      // are pinned to match wrangler.json (dist/server/server.js + dist/client),
      // since nitro's own zero-config default would otherwise write to .output/.
      ...(command === "build"
        ? [
            nitro({
              preset: "cloudflare-module",
              output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
              cloudflare: { nodeCompat: true, deployConfig: true },
            }),
          ]
        : []),
      viteReact(),
    ],
  };

  if (command === "build" && mode === "development") {
    config.environments = {
      client: { define: { "process.env.NODE_ENV": JSON.stringify("development") } },
    };
    config.esbuild = { keepNames: true } as UserConfig["esbuild"];
  }

  return config;
});
