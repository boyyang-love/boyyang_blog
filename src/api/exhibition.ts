/**
 * @Author: boyyang
 * @Date: 2022-12-30 15:34:26
 * @LastEditTime: 2023-01-10 13:45:02
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog_web\src\api\exhibition.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { http } from '@/utils/http'
import { Result } from '@/utils/http/types'

export const exhibitionList = (params: {
    ids?: string
    page?: number
    limit?: number
}): Promise<Result<exhibitionListRes>> => {
    return http.request(
        {
            url: '/exhibition/info',
            method: 'get',
            params,
        },
        {
            isShowSuccessMessage: false,
        }
    )
}