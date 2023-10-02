import {store} from '@/store'
import {defineStore} from 'pinia'
import {User} from '@/api/user/type'
import {userInfo} from '@/api/user'

export interface MenuState {
    active: string
}

const useMenuStore = defineStore({
    id: 'app-menu',
    state: (): MenuState => {
        return {
            active: 'Home',
        }
    },
    actions: {
        setActive(active: string) {
            this.active = active
        },
    },
    //开启持久化
    persist: {
        key: 'app-menu',
        storage: window.sessionStorage,
        paths: ['active'],
    },
})

const useMenuStoreWithOut = () => {
    // store.use(piniaPersist)
    return useMenuStore(store)
}

export {useMenuStore, useMenuStoreWithOut}
