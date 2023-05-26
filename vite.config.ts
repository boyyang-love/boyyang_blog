import {defineConfig, ConfigEnv, loadEnv, UserConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv): UserConfig => {
        const root = process.cwd()
        const env = loadEnv(mode, root)
        return {
            base: env.VITE_APP_BASE_URL,
            resolve: {
                alias: {
                    '@': '/src',
                },
            },
            plugins: [vue({
                script: {
                    defineModel: true,
                    propsDestructure: true,
                }
            })],
            server: {
                port: Number(env.VITE_APP_PORT) || 3000,
                host: '0.0.0.0',
                // proxy: {
                //     '/api': {
                //         target: 'https://golang-ynhc-26761-6-1301921121.sh.run.tcloudbase.com',
                //         changeOrigin: true,
                //         rewrite: (path) => path.replace(/^\/api/, '/api/')
                //     }
                // }
            },
            build: {
                assetsDir: 'assets',
                target: 'es2020',
                chunkSizeWarningLimit: 1000,
            },
        }
    },
)
