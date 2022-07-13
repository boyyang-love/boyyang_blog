/**
 * @Author: boyyang
 * @Date: 2022-04-04 22:23:14
 * @LastEditTime: 2022-07-12 19:16:10
 * @LastEditors: boyyang
 * @Description: user store
 * @FilePath: \blog\web\src\store\modules\user.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { store } from '@/store'
// import {store} from '../../main'
import { defineStore } from 'pinia'
import { createStorage } from '@/utils/storage'

interface info {
    username: string
    email: string
    birthday: number
    qq: number
    sex: number
    blog_url: string
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
                username: '',
                email: '',
                birthday: new Date().getTime(),
                qq: 0,
                sex: 1,
                blog_url: '',
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
            info.birthday = Number(info.birthday)
            info.qq = Number(info.qq)
            this.userInfo = info
        },
        getInfo(): Promise<info> {
            return new Promise(resolve => {
                resolve(this.userInfo)
            })
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
