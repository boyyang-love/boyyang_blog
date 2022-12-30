/**
 * @Author: boyyang
 * @Date: 2022-04-04 22:23:14
 * @LastEditTime: 2022-12-30 11:13:20
 * @LastEditors: boyyang
 * @Description: user store
 * @FilePath: \blog_web\src\store\modules\user.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { store } from '@/store'
import { defineStore } from 'pinia'
interface info {
    id: number
    username: string
    tel: number | string
    avatarUrl: string
    gender: number | string
}

interface UserState {
    token: string
    userInfo: info
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
                avatarUrl: '',
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
            let info = { ...userInfo }
            this.userInfo = info
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

export { useUserStore, useUserStoreWithOut }
