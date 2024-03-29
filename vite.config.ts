import { defineConfig } from 'vite';
import RubyPlugin from 'vite-plugin-ruby';
import react from '@vitejs/plugin-react';
import dynamicImport from 'vite-plugin-dynamic-import';

export default defineConfig({
    plugins: [dynamicImport(), react(), RubyPlugin()],
    build: {
        target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    },
});
