import {http} from '@/utils/http'
import {Result} from '@/utils/http/types'

export const dashboard = (): Promise<Result<Dashboard.DashboardRes>> => {
    return http.request(
        {
            url: '/dashboard',
            method: 'get',
        },
        {
            isShowSuccessMessage: false,
        },
    )
}
