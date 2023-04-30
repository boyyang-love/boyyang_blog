import {Router, RouteRecordRaw} from 'vue-router'
import {useUserStoreWithOut} from '@/store/modules/user'
import {usePermissionRotesStoreWithOut} from '@/store/modules/permissionRoutes'
import {errRoutes} from '@/router/404'

const createRouterGuards = (router: Router) => {
    // userStore routesStore
    const userStore = useUserStoreWithOut()
    const routesStore = usePermissionRotesStoreWithOut()
    // 路由前置守卫
    router.beforeEach(async (to, from, next) => {
        document.title = to.meta.title as string
        // console.log(
        //     `%c 路由 %c from：${from.path} %c to: ${to.path} %c`,
        //     'background:#00e079; border-radius: 3px 0 0 3px;  color: #fff;line-height: 30px;',
        //     'background:#ff4e20; color: #fff;line-height: 30px;',
        //     'background:#3d3b4f; border-radius: 0 3px 3px 0;  color: #fff;line-height: 30px;',
        //     'background:transparent'
        // )
        if (to.path === '/login') {
            next()
            return
        }
        const token = userStore.getToken
        if (token) {
            if (to.path === '/login') {
                next({path: '/'})
                return
            } else {
                // 添加权限路由
                await routesStore.setRoutes(['admin'])
                const permissionRoutes = routesStore.getRoutes
                permissionRoutes.forEach((item: RouteRecordRaw) => {
                    router.addRoute(item)
                })
                // 添加404路由
                router.addRoute(errRoutes)
                if (to.matched.length === 0) {
                    next(to.fullPath)
                } else {
                    next()
                }
            }
        } else {
            next({path: '/login'})
            return
        }
    })
    // 路由错误
    router.onError(() => {
        console.log(
            `%c 错误： %c 路由错误  %c`,
            'background:red ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
            'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
            'background:transparent',
        )
    })
}

export {createRouterGuards}
