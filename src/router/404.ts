/**
 * @Author: boyyang
 * @Date: 2022-04-04 22:43:24
 * @LastEditTime: 2022-09-03 13:36:16
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\router\404.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { RouteRecordRaw } from 'vue-router'
const errRoutes: RouteRecordRaw = {
    path: '/:path(.*)*',
    name: '404',
    meta: {
        title: "404",
    },
    component: () => import('@/views/404/index.vue')
}

export {
    errRoutes
}