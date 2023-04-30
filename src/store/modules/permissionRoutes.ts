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

