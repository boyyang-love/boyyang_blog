import {onMounted, reactive, watch, watchEffect} from 'vue'
import {env} from '@/utils/env'
import {Exhibition} from '@/api/exhibition/type'
import {exhibitionList, changeExhibitionStatus, deleteExhibition} from '@/api/exhibition'
import {delUpload} from '@/api/upload'

const useUser = () => {

    const userData = reactive({
        page: 1,
        limit: 9,
        total: 0,
        list: [] as (Exhibition.ExhibitionsInfo & { path: string })[],
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
            sort: 'created desc',
        }

        exhibitionList(params).then((res) => {
            userData.total = res.data.count
            userData.approved = res.data.approved
            userData.in_review = res.data.in_review
            userData.review_rjection = res.data.review_rjection
            userData.list = res.data.exhibitions && res.data.exhibitions.map((ex: Exhibition.ExhibitionsInfo) => {
                return {
                    ...ex,
                    path: ex.cover,
                    cover: `${env.VITE_APP_IMG_URL}/${ex.cover}`,
                }
            }) || []
        })
    }


    const del = (id: number | string, path: string) => {
        window.$dialog.create({
            type: 'error',
            title: '提示',
            content: '确定要删除吗？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
                deleteExhibition({uid: id}).then(() => {
                    window.$notification.success({
                        title: '提示',
                        content: '图片删除成功',
                        duration: 3000,
                    })

                    delUpload({key: path}).then(() => {
                        getExhibitionList(userData.type)
                    })
                })

            },
        })
    }

    const tabChange = (type: number) => {
        userData.type = type
        userData.page = 1
        getExhibitionList(userData.type)
    }

    const changeStatus = async (type: number, id: number, reason: string) => {
        let data = {
            uid: id,
            status: type,
            reason: reason,
        }

        await changeExhibitionStatus(data)

        getExhibitionList(userData.type)
    }

    watch(
        [
            () => userData.page,
            () => userData.limit,
        ],
        () => {
            getExhibitionList(userData.type)
        },
    )
    onMounted(() => {
        getExhibitionList(userData.type)
    })
    return {
        userData,
        getExhibitionList,
        tabChange,
        changeStatus,
        del,
    }
}

export {
    useUser,
}