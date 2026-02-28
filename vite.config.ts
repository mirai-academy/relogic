import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // GitHub PagesのURL（https://mirai-academy.github.io/relogic/）に合わせて設定
    base: '/relogic/', 
    plugins: [react(), tailwindcss()],
    define: {
      // client-sideで使えるように定義
      'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    // ビルド時のエラーを防ぐための設定
    build: {
      outDir: 'dist',
    }
  };
});