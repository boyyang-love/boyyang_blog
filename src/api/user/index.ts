import {http} from '@/utils/http'
import {User} from './type'

export const updateUserInfo = (data: User.UpdateUserInfo) => {
    return http.request(
        {
            url: '/users/update',
            method: 'POST',
            data,
        },
    )
}

export const userInfo = (params?: { uid?: number }) => {
    return http.request<User.UserInfo>(
        {
            url: '/users/info',
            method: 'GET',
            params,
        },
        {
            isShowSuccessMessage: false,
        },
    )
}

export const updatePassword = (data: {password: string}) => {
    return http.request(
        {
            url: '/users/update/password',
            method: 'POST',
            data
        }
    )
}