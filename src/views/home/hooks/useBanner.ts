/**
 * @Author: boyyang
 * @Date: 2022-04-05 14:46:46
 * @LastEditTime: 2022-06-04 13:57:45
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\views\home\hooks\useBanner.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive, watchEffect } from 'vue'
import { banner } from '@/api/banner'
import { env } from '@/utils/env'

const bannerData = reactive({
    list: [] as any,
})

const useBanner = () => {
    const getBannerList = async () => {
        let params = {
            page: 1,
            limit: 10,
        }
        const res = await banner(params)
        bannerData.list =
            res.data &&
            res.data.map((item: any) => {
                item.url = `${env.VITE_APP_IMG_URL}${item.url}`
                return item
            })
    }
    watchEffect(() => {
        getBannerList()
    })
    return { bannerData }
}

export { useBanner }
