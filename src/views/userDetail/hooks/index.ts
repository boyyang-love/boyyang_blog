import {Component, computed, markRaw, reactive, ref} from 'vue'
import {Image, Sparkles, SparklesOutline, Heart, CloudDownload, People, CloudUpload} from '@vicons/ionicons5'
import {userDetail} from '@/api/user'
import {User} from '@/api/user/type'
import {env} from '@/utils/env'
import {router} from '@/router'
import {follow} from '@/api/follow'
import {useUserStoreWithOut} from '@/store/modules/user'

interface IconItem {
    icon: Component
    num: number
}

interface TabItem {
    name: string
    icon: Component
    id: number
}

const data = reactive({
    type: 1,
    page: 1,
    limit: 12,
    count: 0,
    list: [] as User.Exhibition[],
    user_info: {} as User.Info,
    follow_ids: [] as number[],
})

const useUserDetail = () => {
    const icons = ref<IconItem[]>([
        {
            icon: markRaw(Image),
            num: 0,
        },
        {
            icon: markRaw(Sparkles),
            num: 0,
        },
        {
            icon: markRaw(Heart),
            num: 0,
        },
        {
            icon: markRaw(CloudDownload),
            num: 0,
        },
        {
            icon: markRaw(People),
            num: 0,
        },
    ])

    const pageSizes = [
        {
            label: '12/每页',
            value: 12,
        },
        {
            label: '24/每页',
            value: 24,
        },
        {
            label: '32/每页',
            value: 32,
        },
    ]

    const tabs: TabItem[] = [
        {
            id: 1,
            name: '上传',
            icon: markRaw(CloudUpload),
        },
        {
            id: 2,
            name: '收藏',
            icon: markRaw(Heart),
        },
    ]

    const getList = (uid: number) => {
        const params = {
            page: data.page,
            limit: data.limit,
            uid: uid,
            type: data.type,
        }
        userDetail(params).then((res) => {
            icons.value[0].num = res.data.upload
            icons.value[1].num = res.data.star
            icons.value[2].num = res.data.like
            icons.value[3].num = res.data.download
            icons.value[4].num = res.data.follow
            data.count = res.data.count
            data.list = res.data.exhibition && res.data.exhibition.map((e) => {
                return {
                    ...e,
                    cover: `${env.VITE_APP_IMG_URL}/${e.cover}`,
                }
            }) || []
            data.user_info = {
                ...res.data.user_info,
                avatar_url: `${env.VITE_APP_IMG_URL}/${res.data.user_info.avatar_url}`,
                background_image: `${env.VITE_APP_IMG_URL}/${res.data.user_info.background_image}`,
            }
            data.follow_ids = res.data.follow_ids
        })
    }

    const bgUrl = computed(() => {
        return `url("${new URL(data.user_info.background_image, import.meta.url).href}")`
    })

    const toImageDetail = (image_id: number) => {
        router.push({
            path: '/detail',
            query: {
                uid: image_id,
                type: 'userDetail',
            },
        })
        // const url = router.resolve({
        //     path: '/detail',
        //     query: {
        //         uid: image_id,
        //         type: 'userDetail'
        //     },
        // })
        //
        // window.open(url.href, 'black')
    }

    const addFollow = async () => {
        const userStore = useUserStoreWithOut()
        const params = {
            follow_id: data.user_info.uid,
            follow_type: data.follow_ids.includes(userStore.info.uid) ? 0 : 1,
        } as const
        await follow(params)
        if (data.follow_ids.includes(userStore.info.uid)) {
            data.follow_ids = data.follow_ids.filter(id => id != userStore.info.uid)
        } else {
            data.follow_ids.push(userStore.info.uid)
        }
    }

    const pageChange = (n: number) => {
        data.page = n
    }

    const pageSizeChange = (n: number) => {
        data.page = 1
        data.limit = n
    }

    return {
        data,
        icons,
        tabs,
        pageSizes,
        bgUrl,
        getList,
        toImageDetail,
        pageChange,
        pageSizeChange,
        addFollow,
    }
}

export {
    useUserDetail,
}