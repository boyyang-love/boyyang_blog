/**
 * @Author: boyyang
 * @Date: 2022-12-30 15:32:26
 * @LastEditTime: 2023-02-14 13:57:56
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog_web\src\views\home\hooks\useExhibition.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import {reactive} from 'vue'
import {exhibitionList} from '@/api/exhibition'
import {env} from '@/utils/env'

const exhibitionData = reactive({
    exhibitionList: [] as exhibitionsInfo[],
    page: 1,
    limit: 10,
})

// 获取首页图片列表
const getExhibitionList = () => {
    let params = {
        page: exhibitionData.page,
        limit: exhibitionData.limit,
    }
    exhibitionList(params).then(res => {
        exhibitionData.exhibitionList =
            res.data.exhibitions &&
            res.data.exhibitions.map(item => {
                item.cover = `${env.VITE_APP_IMG_URL}${item.cover}`
                return item
            })
    })
}

const useExhibition = () => {
    return {
        exhibitionData,
        getExhibitionList,
    }
}

export {useExhibition}
