/**
 * @Author: boyyang
 * @Date: 2022-04-05 14:46:46
 * @LastEditTime: 2022-04-17 17:37:30
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\hooks\useBanner.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'
import { banner } from '@/api/banner'
import { env } from '@/utils/env'

const imgUrl = env.VITE_APP_IMG_URL

const bannerData = reactive({
    list: [] as any
})

const getBannerList = async () => {
    let params = {
        page: 1,
        limit: 10
    }
    const res = await banner(params)
    
    bannerData.list = res.data && res.data.map((item: any) => {
        item.url = `${env.VITE_APP_IMG_URL}${item.url}`
        return item
    })
}

export {
    bannerData,
    getBannerList,
    imgUrl
}