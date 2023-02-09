/**
 * @Author: boyyang
 * @Date: 2022-04-04 17:25:00
 * @LastEditTime: 2023-02-09 09:51:15
 * @LastEditors: boyyang
 * @Description: 异步路由
 * @FilePath: \blog_web\src\router\asyncRoutes.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { RouteRecordRaw } from 'vue-router'

const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '首页',
        },
        redirect: '/homePage',
        component: () => import('@/views/home/index.vue'),
        children: [
            {
                path: 'homePage',
                name: 'HomePage',
                component: () => import('@/views/home/components/home.vue')
            },
            // 仪表盘
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index.vue'),
            },
            // 图片展示
            {
                path: 'images',
                name: 'Images',
                meta: {
                    title: '图片',
                    // roles: ['admin'],
                },
                component: () => import('@/views/images/index.vue'),
            },
            // 发布作品
            {
                path: 'publish',
                name: 'Publish',
                meta: {
                    title: '发布作品',
                    // roles: ['admin'],
                },
                component: () => import('@/views/publish/index.vue'),
            },
            // 用户
            {
                path: 'user',
                name: 'User',
                meta: {
                    title: '用户',
                    // roles: ['admin'],
                },
                component: () => import('@/views/user/index.vue'),
            },
            {
                path: 'admin',
                name: 'Admin',
                meta: {
                    title: '管理后台',
                    // roles: ['admin'],
                },
                component: () => import('@/views/admin/index.vue'),
            },
        ],
    },
]

export { asyncRoutes }
