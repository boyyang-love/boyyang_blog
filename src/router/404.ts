import {RouteRecordRaw} from 'vue-router'

const errRoutes: RouteRecordRaw = {
    path: '/:path(.*)*',
    name: '404',
    meta: {
        title: '404',
    },
    component: () => import('@/views/404/index.vue'),
}

export {
    errRoutes,
}