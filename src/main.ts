import App from './App.vue'
import {createApp} from 'vue'
import {router, setupRoutes} from '@/router'
import {setupStore} from '@/store'
import {setupNaive} from '@/plugin/naive'
import {setupGlobal} from '@/plugin/global'
import {setupVanta} from '@/plugin/vanta'
import {setupMarkDown} from '@/plugin/markDown'
import {setupTailwind} from '@/plugin/tailwind'

import 'wow.js/css/libs/animate.css'


const bootstrap = async () => {
    const app = createApp(App)
    // 初始化 store
    setupStore(app)
    // 初始化全局组件
    setupGlobal(app)
    // 初始化 tailwind css
    setupTailwind(app)
    // 初始化路由
    setupRoutes(app)
    // 路由加载完成后，挂载到 #app
    await router.isReady()
    // 加载 naive ui 组件
    setupNaive(app)
    // 加载 vanta 插件
    setupVanta(app)
    // 加载 markdown 编辑器
    setupMarkDown(app)
    // 挂载
    app.mount('#app')
}

void bootstrap()
