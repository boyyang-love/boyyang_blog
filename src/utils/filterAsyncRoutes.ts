/**
 * @Author: boyyang
 * @Date: 2022-04-08 21:56:47
 * @LastEditTime: 2022-07-21 09:01:42
 * @LastEditors: boyyang
 * @Description:  异步路由
 * @FilePath: \blog\web\src\utils\filterAsyncRoutes.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { RouteRecordRaw } from 'vue-router'

const hasPermission = <T = string>(route: RouteRecordRaw, roles: string[]): boolean => {
    const { meta } = route || {}
    if (meta && meta.roles) {
        return roles.some(role => (meta.roles as Array<T>).includes(role as unknown as T))
    } else {
        return true
    }
}

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] => {
    const res: RouteRecordRaw[] = []
    routes.forEach(route => {
        const tmp: RouteRecordRaw = { ...route }
        if (hasPermission(tmp, roles)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}

export { filterAsyncRoutes }
