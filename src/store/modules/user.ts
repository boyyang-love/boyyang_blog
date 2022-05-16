/**
 * @Author: boyyang
 * @Date: 2022-04-04 22:23:14
 * @LastEditTime: 2022-05-15 13:08:13
 * @LastEditors: boyyang
 * @Description: user store
 * @FilePath: \drawingBed\src\store\modules\user.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { store } from '@/store'
import { defineStore } from 'pinia'
import { createStorage } from '@/utils/storage'
import piniaPersist from 'pinia-plugin-persist'

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
    persist: {
        enabled: true,
        // storage:sessionStorage/localStorage,还可以自定义如下
        // https://seb-l.github.io/pinia-plugin-persist/
        // import Cookies from 'js-cookie'
        // const cookiesStorage: Storage = {
        //   setItem (key, state) {
        //     return Cookies.set('accessToken', state.accessToken, { expires: 3 })
        //   },
        //   getItem (key) {
        //     return JSON.stringify({
        //       accessToken: Cookies.getJSON('accessToken'),
        //     })
        //   },
        // }
        // strategies: [{ storage: localStorage, paths: ['token', 'userName'] }],
    },
})

const useUserStoreWithOut = () => {
    // store.use(piniaPersist)
    return useUserStore(store)
}

export { useUserStore, useUserStoreWithOut }
