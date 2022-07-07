/**
 * @Author: boyyang
 * @Date: 2022-04-04 17:25:00
 * @LastEditTime: 2022-07-06 19:26:31
 * @LastEditors: boyyang
 * @Description: 异步路由
 * @FilePath: \blog\web\src\router\asyncRoutes.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { RouteRecordRaw } from 'vue-router'

const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/admin',
        name: 'Admin',
        meta: {
            title: '管理后台',
            roles: ['admin'],
        },
        component: () => import('@/views/admin/index.vue'),
    },
    {
        path: '/blog',
        name: 'Blog',
        meta: {
            title: '发布博客',
        },
        component: () => import('@/views/blog/index.vue'),
    },
    {
        path: '/blogList',
        name: 'BlogList',
        meta: {
            title: '博客列表',
        },
        component: () => import('@/views/blog/blogList.vue'),
    },
    {
        path: '/blogDetail/:id',
        name: 'BlogDetail',
        meta: {
            title: '博客详情',
        },
        component: () => import('@/views/blog/blogDetail.vue'),
    },
]

export { asyncRoutes }
