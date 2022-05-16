/**
 * @Author: boyyang
 * @Date: 2022-04-04 17:25:00
 * @LastEditTime: 2022-05-07 11:25:11
 * @LastEditors: boyyang
 * @Description: 异步路由
 * @FilePath: \drawingBed\src\router\asyncRoutes.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/layout'

const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/layout',
        name: 'Layout',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index.vue')
            },
            {
                path: '/blog',
                name: 'Blog',
                component: () => import('@/views/blog/index.vue'),
                meta: { title: '博客' }
            },
            {
                path: '/image',
                name: 'Image',
                component: () => import('@/views/image/index.vue'),
            }
        ]
    },
]

export {
    asyncRoutes
}