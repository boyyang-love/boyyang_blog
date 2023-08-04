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