/**
 * @Author: boyyang
 * @Date: 2022-04-04 17:25:00
 * @LastEditTime: 2022-06-04 13:24:32
 * @LastEditors: boyyang
 * @Description: 异步路由
 * @FilePath: \drawingBed\src\router\asyncRoutes.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { RouteRecordRaw } from 'vue-router'

const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/admin',
        name: 'Admin',
        meta: {
            title: '管理后台',
            roles: ['admin']
        },
        component: () => import('@/views/admin/index.vue'),
    },
]

export { asyncRoutes }
