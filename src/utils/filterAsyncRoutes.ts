import {RouteRecordRaw} from 'vue-router'

const hasPermission = <T = string>(route: RouteRecordRaw, roles: string[]): boolean => {
    const {meta} = route || {}
    if (meta && meta.roles) {
        return roles.some(role => (meta.roles as Array<T>).includes(role as unknown as T))
    } else {
        return true
    }
}

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] => {
    const res: RouteRecordRaw[] = []
    routes.forEach(route => {
        const tmp: RouteRecordRaw = {...route}
        if (hasPermission(tmp, roles)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}

export {filterAsyncRoutes}
