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

export const userInfo = (params?: { id?: number }) => {
    return http.request<User.UserInfo>(
        {
            url: '/users/info',
            method: 'get',
            params,
        },
        {
            isShowSuccessMessage: false,
        },
    )
}