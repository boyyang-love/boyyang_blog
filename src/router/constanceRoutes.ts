/**
 * @Author: boyyang
 * @Date: 2022-04-04 16:23:46
 * @LastEditTime: 2022-06-12 01:46:14
 * @LastEditors: boyyang
 * @Description: 静态路由
 * @FilePath: \drawingBed\src\router\constanceRoutes.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { RouteRecordRaw } from 'vue-router'
const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '首页',
        },
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录注册',
        },
        component: () => import('@/views/login/index.vue'),
    },
]

export { constantRoutes }
