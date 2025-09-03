import federation from "@originjs/vite-plugin-federation";
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'students',
      filename: 'remoteEntry.js',
      exposes: {
        "./StudentsModule": "./src/App.tsx"
      },
      shared: ["react", "react-dom"]
    })
  ],
  server: { port: 3001, strictPort: true },
  preview: { port: 3001, strictPort: true }
})

