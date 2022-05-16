/**
 * @Author: boyyang
 * @Date: 2022-04-08 21:56:47
 * @LastEditTime: 2022-04-09 14:23:46
 * @LastEditors: boyyang
 * @Description:  异步路由
 * @FilePath: \drawingBed\src\utils\filterAsyncRoutes.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { RouteRecordRaw } from 'vue-router'

const hasPermission = (route: RouteRecordRaw, roles: string[],): boolean => {
    const { meta } = route as any
    if (meta && meta.roles) {
        return roles.some(role => meta.roles.includes(role))
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

export {
    filterAsyncRoutes
}
