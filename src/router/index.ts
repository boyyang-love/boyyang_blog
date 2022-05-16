/**
 * @Author: boyyang
 * @Date: 2022-04-04 16:20:50
 * @LastEditTime: 2022-04-05 02:13:48
 * @LastEditors: boyyang
 * @Description: router
 * @FilePath: \drawingBed\src\router\index.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './constanceRoutes'
import { createRouterGuards } from './routerGuards'

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

const setupRoutes = (app: App) => {
    app.use(router)
    createRouterGuards(router)
}

export {
    router,
    setupRoutes
}
