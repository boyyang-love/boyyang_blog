/**
 * @Author: boyyang
 * @Date: 2022-04-04 16:23:46
 * @LastEditTime: 2022-05-10 09:43:37
 * @LastEditors: boyyang
 * @Description: 静态路由
 * @FilePath: \drawingBed\src\router\constanceRoutes.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { Layout } from '@/layout'
import { RouteRecordRaw } from 'vue-router'
const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
    },
]

export {
    constantRoutes
}