/**
 * @Author: boyyang
 * @Date: 2022-04-08 21:44:27
 * @LastEditTime: 2022-04-08 22:08:57
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\store\modules\permissionRoutes.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import {defineStore} from 'pinia'
import {store} from '@/store'
import {RouteRecordRaw} from 'vue-router'
import {asyncRoutes} from '@/router/asyncRoutes'
import {filterAsyncRoutes} from '@/utils/filterAsyncRoutes'

const usePermissionRotesStore = defineStore({
    id: 'app-permission-routes',
    state: () => ({
        routes: [] as RouteRecordRaw[],
    }),
    getters: {
        getRoutes(): RouteRecordRaw[] {
            return this.routes
        },
    },
    actions: {
        async setRoutes(roles: string[]) {
            this.routes = filterAsyncRoutes(asyncRoutes, roles)
        },
    },
})

const usePermissionRotesStoreWithOut = () => {
    return usePermissionRotesStore(store)
}

export {
    usePermissionRotesStore,
    usePermissionRotesStoreWithOut,
}

