import {reactive} from 'vue'
import {exhibitionList} from '@/api/exhibition'
import {env} from '@/utils/env'

const exhibitionData = reactive({
    exhibitionList: [] as Exhibition.ExhibitionsInfo[],
    page: 1,
    limit: 20,
})

// 获取首页图片列表
const getExhibitionList = () => {
    let params = {
        page: exhibitionData.page,
        limit: exhibitionData.limit,
        type: 2,
        sort: 'thumbs_up desc'
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

const useExhibitionData = () => {
    return {
        exhibitionData,
    }
}

const useExhibitionMethods = () => {
    return {
        getExhibitionList,
    }
}

export {useExhibitionData, useExhibitionMethods}
