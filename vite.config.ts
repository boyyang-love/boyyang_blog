import { defineConfig, ConfigEnv, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)
    return {
        base: env.VITE_APP_BASE_URL,
        resolve: {
            alias: {
                '@': '/src',
            },
        },
        plugins: [vue()],
        server: {
            port: Number(env.VITE_APP_PORT) || 3000,
            host: '0.0.0.0',
            // proxy: {
            //     '/api': {
            //         target: 'localhost:3001',
            //         changeOrigin: true,
            //         rewrite: (path) => path.replace(/^\/api/, '/api/')
            //     }
            // }
        },
        build: {
            assetsDir: 'assets',
        },
    }
})
