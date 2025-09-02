import federation from "@originjs/vite-plugin-federation";
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "teachers",
      filename: "remoteEntry.js",
      exposes: {
        "./teachersModule": "./src/App.tsx"
      },
      shared: ["react", "react-dom"],
    })
  ],
  server: {
    port: 3002,
    cors: true,
  },
  build: {
    target: 'esnext',
    minify: false,
  },
})
