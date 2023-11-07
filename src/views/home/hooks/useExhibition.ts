import {reactive} from 'vue'
import {exhibitionList} from '@/api/exhibition'
import {env} from '@/utils/env'
import {Exhibition} from '@/api/exhibition/type'


const useExhibition = () => {
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
            type: 4,
            sort: 'created desc',
        }
        exhibitionList(params).then(res => {
            exhibitionData.exhibitionList =
                res.data.exhibitions &&
                res.data.exhibitions.map((item: Exhibition.ExhibitionsInfo) => {
                    item.cover = `${env.VITE_APP_IMG_URL}${item.cover}`
                    return item
                })
        })
    }
    return {
        exhibitionData,
        getExhibitionList,
    }
}

export {
    useExhibition,
}
