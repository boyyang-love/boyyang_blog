import {reactive, watchEffect} from 'vue'
import {env} from '@/utils/env'
import {exhibitionList, changeExhibitionStatus} from '@/api/exhibition'

const userData = reactive({
    page: 1,
    limit: 9,
    total: 0,
    list: [] as Exhibition.ExhibitionsInfo[],
    type: 1,
    approved: 0,
    in_review: 0,
    review_rjection: 0,
})

const getExhibitionList = (type: number) => {
    let params = {
        page: userData.page,
        limit: userData.limit,
        type: type,
    }

    exhibitionList(params).then((res) => {
        userData.total = res.data.count
        userData.approved = res.data.approved
        userData.in_review = res.data.in_review
        userData.review_rjection = res.data.review_rjection
        userData.list = res.data.exhibitions && res.data.exhibitions.map((ex) => {
            ex.cover = `${env.VITE_APP_IMG_URL}/${ex.cover}`
            return ex
        })
    })
}

const tabChange = (type: number) => {
    userData.type = type
    userData.page = 1
}

const changeStatus = async (type: number, id: number, reason: string) => {
    let data = {
        id,
        status: type,
        reason: reason,
    }

    await changeExhibitionStatus(data)

    getExhibitionList(userData.type)
}
watchEffect(() => {
    getExhibitionList(userData.type)
})

const useUserData = () => {

    return {
        userData,
    }
}

const useUserMethods = () => {
    return {
        getExhibitionList,
        tabChange,
        changeStatus,
    }
}

export {
    useUserData,
    useUserMethods,
}