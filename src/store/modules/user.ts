import {store} from '@/store'
import {defineStore} from 'pinia'

export interface Info {
    id: number
    username: string
    tel: number | string
    avatar_url: string
    gender: number | string
}

export interface UserState {
    token: string
    userInfo: Info
}

const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => {
        return {
            token: '',
            userInfo: {
                id: 0,
                username: '',
                tel: '',
                avatar_url: '',
                gender: '',
            },
        }
    },
    getters: {
        getToken: (state: UserState): string => state.token,
        getUserInfo: (state: UserState): info => state.userInfo,
    },
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setUserinfo(userInfo: info) {
            this.userInfo = {...userInfo}
        },
    },
    //开启持久化
    persist: {
        key: 'app-user',
        storage: window.sessionStorage,
        paths: ['token', 'userInfo'],
    },
})

const useUserStoreWithOut = () => {
    // store.use(piniaPersist)
    return useUserStore(store)
}

export {useUserStore, useUserStoreWithOut}
