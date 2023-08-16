import {reactive, watchEffect} from 'vue'
import {env} from '@/utils/env'

import {useUserStoreWithOut} from '@/store/modules/user'

// api
import {exhibitionList, deleteExhibition} from '@/api/exhibition'
import {likeList} from '@/api/like'
import {updateUserInfo} from '@/api/user'

const imagesData = reactive({
    page: 1,
    limit: 12,
    count: 0,
    list: [] as Exhibition.ExhibitionsInfo[],
    likes: [] as number[],
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


const getList = () => {
    let params = {
        page: imagesData.page,
        limit: imagesData.limit,
        type: 2,
        public: true,
    }
    exhibitionList(params).then(res => {
        imagesData.count = res.data.count
        imagesData.list =
            res.data.exhibitions &&
            res.data.exhibitions.map(item => {
                item.cover_url = item.cover
                item.cover = `${env.VITE_APP_IMG_URL}${item.cover}`
                return item
            })
        imagesData.likes = res.data.likes_ids || []
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

const del = (id: number | string) => {
    window.$dialog.create({
        type: 'error',
        title: '提示',
        content: '确定要删除吗？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
            deleteExhibition({uid: id}).then(res => {
                window.$notification.success({
                    title: '提示',
                    content: '图片删除成功',
                    duration: 3000,
                })
                getList()
            })
        },
    })
}

const like = (id: number | string, isLike: boolean) => {
    likeList({uid: id, likes_type: isLike ? 1 : 0, type: 1}).then(() => {
        if (isLike) {
            imagesData.likes.push(id as number)
        } else {
            imagesData.likes = imagesData.likes.filter(it => it !== (id as number))
        }
    })
}

const setBackground = async (id: number | string) => {
    const userStore = useUserStoreWithOut()
    const background_image = imagesData.list.filter(it => it.uid === id)[0].cover_url
    let params = {
        uid: userStore.userInfo.uid,
        background_image: background_image,
    }



    await updateUserInfo(params)

    userStore.$patch((state) => {
        state.userInfo.background_image = background_image
        state.info.background_image = background_image
    })
}

const useImagesData = () => {
    return {
        imagesData,

    }
}

const useImagesMethods = () => {
    return {
        getList,
        pageChange,
        pageSizeChange,
        del,
        like,
        setBackground,
    }
}

export {useImagesData, useImagesMethods}
