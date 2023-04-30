import type {App} from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import {constantRoutes} from './constanceRoutes'
import {createRouterGuards} from './routerGuards'

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
})

const setupRoutes = (app: App) => {
    app.use(router)
    createRouterGuards(router)
}

export {
    router,
    setupRoutes,
}
