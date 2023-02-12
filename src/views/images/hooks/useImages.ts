import { reactive, watchEffect } from 'vue'
import { env } from '@/utils/env'

// api
import { exhibitionList } from '@/api/exhibition'

const imagesData = reactive({
    page: 1,
    limit: 12,
    count: 0,
    list: [] as exhibitionsInfo[],
    pageSizes: [
        {
            label: '12 每页',
            value: 12,
        },
        {
            label: '24 每页',
            value: 24,
        },
        {
            label: '36 每页',
            value: 36,
        },
    ],
})

const paginationOpt = {
    pageSizes: [
        {
            label: '12 每页',
            value: 12,
        },
        {
            label: '24 每页',
            value: 24,
        },
        {
            label: '36 每页',
            value: 36,
        },
    ],
}

const useImages = () => {
    return {
        imagesData,
        getList,
        paginationOpt,
        pageChange,
        pageSizeChange,
    }
}

const getList = () => {
    let params = {
        page: imagesData.page,
        limit: imagesData.limit,
    }
    exhibitionList(params).then(res => {
        imagesData.count = res.data.count
        imagesData.list =
            res.data.exhibitions &&
            res.data.exhibitions.map(item => {
                item.cover = `${env.VITE_APP_IMG_URL}${item.cover}`
                return item
            })
    })
}


const pageChange = (n: number) => {
    imagesData.page = n
    getList()
}

const pageSizeChange = (n: number) => {
    imagesData.page = 1
    imagesData.limit = n
    getList()
}

export { useImages }
