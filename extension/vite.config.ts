import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./public/manifest.json";

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  server: {
    port: 5173,
    strictPort: true,
  },
  // Vite 6+ requires a token for WebSocket HMR; CRXJS dev service worker cannot pass it.
  legacy: {
    skipWebSocketTokenCheck: true,
  },
});
