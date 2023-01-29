/**
 * @Author: boyyang
 * @Date: 2022-12-30 15:32:26
 * @LastEditTime: 2023-01-10 15:41:42
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog_web\src\views\home\hooks\useExhibition.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'
import { exhibitionList } from '@/api/exhibition'
import { env } from '@/utils/env'

const exhibitionData = reactive({
    exhibitionList: [] as exhibitionsInfo[],
    currentIndex: 0,
    page: 1,
    limit: 10,
    count: 0,
})

const pageSizes = [
    {
        label: '10/页',
        value: 10,
    },
    {
        label: '20/页',
        value: 20,
    },
    {
        label: '30/页',
        value: 30,
    },
    {
        label: '50/页',
        value: 50,
    },
]

// 获取首页图片列表
const getExhibitionList = () => {
    let params = {
        page: exhibitionData.page,
        limit: exhibitionData.limit,
    }
    exhibitionList(params).then(res => {
        exhibitionData.count = res.data.count
        exhibitionData.exhibitionList =
            res.data.exhibitions &&
            res.data.exhibitions.map(item => {
                item.cover = `${env.VITE_APP_IMG_URL}${item.cover}`
                return item
            })
    })
}

// 分页
const pageChange = (e: number) => {
    exhibitionData.page = e
    getExhibitionList()
}
const pageSizeChange = (e: number) => {
    exhibitionData.limit = e
    getExhibitionList()
}

const useExhibition = () => {
    return {
        exhibitionData,
        pageSizes,
        getExhibitionList,
        pageChange,
        pageSizeChange,
    }
}

export { useExhibition }
