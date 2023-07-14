import {useUserStoreWithOut} from '@/store/modules/user'

const userStore = useUserStoreWithOut()

const token = (): string => {
    return userStore.getToken
}

export {
    token
}