import { http } from '@/utils/http'
export const upload = () => {
    return http.request({
        url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx20773192bbf7b3b8&secret=309f0b28ace40739a7f15d4772537774',
        method: 'get',
    })
}
