import {RouteRecordRaw} from 'vue-router'

const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        redirect: '/homePage',
        meta: {
            title: '首页',
        },
        children: [],
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
    {
        path: '/privacyPolicy',
        name: 'PrivacyPolicy',
        meta: {
            title: '隐私政策'
        },
        component: () => import('@/views/privacyPolicy/index.vue'),
    }
]

export {constantRoutes}
