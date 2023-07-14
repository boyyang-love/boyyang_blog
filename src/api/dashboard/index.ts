import {http} from '@/utils/http'

export const dashboard = () => {
    return http.request<Dashboard.DashboardRes>(
        {
            url: '/dashboard',
            method: 'get',
        },
        {
            isShowSuccessMessage: false,
        },
    )
}
