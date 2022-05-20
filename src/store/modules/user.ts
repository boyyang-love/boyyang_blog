/**
 * @Author: boyyang
 * @Date: 2022-04-04 22:23:14
 * @LastEditTime: 2022-05-20 19:23:33
 * @LastEditors: boyyang
 * @Description: user store
 * @FilePath: \drawingBed\src\store\modules\user.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { store } from '@/store'
// import {store} from '../../main'
import { defineStore } from 'pinia'
import { createStorage } from '@/utils/storage'

const storage = createStorage('user', localStorage)

interface UserState {
    token: string
    userInfo: object
}

const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => {
        return {
            token: '',
            userInfo: {},
        }
    },
    getters: {
        getToken: (state: UserState) => state.token,
        getUserInfo: (state: UserState) => state.userInfo,
    },
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setUserinfo(userInfo: object) {
            this.userInfo = userInfo
        },
        getInfo() {
            return new Promise(resolve => {
                console.log(this.userInfo)
                resolve(this.userInfo)
            })
        },
    },
    //开启持久化
    persist: true
})

const useUserStoreWithOut = () => {
    // store.use(piniaPersist)
    return useUserStore(store)
}

export { useUserStore, useUserStoreWithOut }
