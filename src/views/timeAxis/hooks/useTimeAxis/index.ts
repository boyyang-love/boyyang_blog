import {reactive} from 'vue'
import {exhibitionList} from '@/api/exhibition'
import {Exhibition} from '@/api/exhibition/type'
import {env} from '@/utils/env'


const timeAxisData = reactive(
    {
        count: 0,
        list: [] as Exhibition.ExhibitionsInfo[],
    },
)

const getData = () => {
    let params = {
        // page: 1,
        // limit: 10,
        type: 2,
        sort: 'created desc'
    }
    exhibitionList(params).then(res => {
        timeAxisData.count = res.data.count
        timeAxisData.list =
            res.data.exhibitions &&
            res.data.exhibitions.map((item: Exhibition.ExhibitionsInfo) => {
                item.cover = `${env.VITE_APP_IMG_URL}${item.cover}`
                return item
            })
    })
}

const useTimeAxisData = () => {
    return {
        timeAxisData,
    }
}

const useTimeAxisMethods = () => {
    return {
        getData,
    }
}

export {
    useTimeAxisData,
    useTimeAxisMethods,
}

