import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const certificatePath = path.resolve('C:/Users/roysu/user_certificates/cert.pem');
const keyPath = path.resolve('C:/Users/roysu/user_certificates/key.pem');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certificatePath)
    },
    port: 5173,
    open: true
  }
})
