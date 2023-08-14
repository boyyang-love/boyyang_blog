import {store} from '@/store'
import {defineStore} from 'pinia'
import {User} from '@/api/user/type'

export interface Info {
    id: number
    username: string
    tel: number | string
    avatar_url: string
    gender: number | string
    background_image: string
}

export interface UserState {
    token: string
    userInfo: Info
    info: User.Info
    detail: User.Detail
}

const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => {
        return {
            // 登录成功返回的用户信息
            token: '',
            userInfo: {
                id: 0,
                username: '',
                tel: '',
                avatar_url: '',
                gender: '',
                background_image: ''
            },
            // 用户详细信息
            info: {} as User.Info,
            detail: {} as User.Detail,
        }
    },
    getters: {
        getToken: (state: UserState): string => state.token,
        getUserInfo: (state: UserState): Info => state.userInfo,
    },
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setUserinfo(userInfo: Info) {
            this.userInfo = {...userInfo}
        },
        setInfo(info: User.Info) {
            this.info = info
        },
        setDetail(detail: User.Detail) {
            this.detail = detail
        }
    },
    //开启持久化
    persist: {
        key: 'app-user',
        storage: window.sessionStorage,
        paths: ['token', 'userInfo', 'info', 'detail'],
    },
})

const useUserStoreWithOut = () => {
    // store.use(piniaPersist)
    return useUserStore(store)
}

export {useUserStore, useUserStoreWithOut}
