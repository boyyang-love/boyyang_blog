import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRoutes } from '@/router'
import { setupStore } from '@/store'
import { setupNaive } from '@/plugin/naive'
import { setupGlobal } from '@/plugin/global'

// tailwindcss
import '@/tailwind/index.css'

const bootstrap = async () => {
    const app = createApp(App)
    // 初始化全局组件
    setupGlobal(app)
    // 初始化路由
    setupRoutes(app)
    // 初始化 store
    setupStore(app)
    // 路由加载完成后，挂载到 #app
    await router.isReady()
    // 加载插件
    setupNaive(app)
    // 挂载
    app.mount('#app')
}

void bootstrap()
