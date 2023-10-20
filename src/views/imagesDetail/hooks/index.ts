import {Component, onMounted, reactive} from 'vue'
import {exhibitionList, updateDownload} from '@/api/exhibition'
import {Exhibition} from '@/api/exhibition/type'
import {Tag} from '@/api/tag'
import {env} from '@/utils/env'
import moment from 'moment'
import {
    Leaf,
    Shapes,
    Images,
    Tv,
    Calendar,
    CloudDownload,
    Person,
    Earth,
    Sparkles,
    FingerPrint,
} from '@vicons/ionicons5'
import {tagsInfo} from '@/api/tag'
import {imageDownload} from '@/utils/fileDownload'
import {useUserStoreWithOut} from '@/store/modules/user'
import {updateUserInfo} from '@/api/user'
import {changelike} from '@/api/like'

export interface DetailMessage {
    label: string
    key: string
    render: (key: Exhibition.ExhibitionsInfo) => string | number
    icon: Component
}

const useImageDetail = () => {
    const detailData = reactive({
        exhibitionInfo: {} as Exhibition.ExhibitionsInfo & {
            url: string
        },
        similarExhibits: [] as Exhibition.ExhibitionsInfo[],
        tags: [] as Tag.TagInfo[],
        isLoading: false,
        likes_ids: [] as number[],
    })
    const detailMessage: DetailMessage[] = [
        {
            label: '图片编号',
            key: 'id',
            icon: FingerPrint,
            render(detailData: Exhibition.ExhibitionsInfo): number {
                return detailData.uid
            },
        },
        {
            label: '名称',
            key: 'title',
            icon: Leaf,
            render(detailData: Exhibition.ExhibitionsInfo): string {
                return detailData.title
            },
        },
        {
            label: '大小',
            key: 'size',
            icon: Shapes,
            render(detailData: Exhibition.ExhibitionsInfo): string {
                return `${((detailData.size || 0) / (1024 * 1024)).toFixed(2)}M` || '0'
            },
        },
        {
            label: '类型',
            key: 'type',
            icon: Images,
            render(detailData: Exhibition.ExhibitionsInfo): string {
                return detailData.type
            },
        },
        {
            label: '分辨率',
            key: 'px',
            icon: Tv,
            render(detailData: Exhibition.ExhibitionsInfo): string {
                return detailData.px
            },
        },
        {
            label: '发布日期',
            key: 'created',
            icon: Calendar,
            render(detailData: Exhibition.ExhibitionsInfo): string {
                return moment(detailData.created * 1000).format('YYYY-MM-DD hh:mm:ss')
            },
        },
        {
            label: '点赞数',
            key: 'star',
            icon: Sparkles,
            render(detailData: Exhibition.ExhibitionsInfo): number {
                return detailData.thumbs_up
            },
        },
        {
            label: '下载次数',
            key: 'download',
            icon: CloudDownload,
            render(detailData: Exhibition.ExhibitionsInfo): number {
                return detailData.download
            },
        },
        {
            label: '发布者',
            key: 'user',
            icon: Person,
            render(detailData: Exhibition.ExhibitionsInfo): string {
                return detailData.user_info ? detailData.user_info.username : ''
            },
        },
        {
            label: '图片来源',
            key: 'from',
            icon: Earth,
            render(): string {
                return `图片来自互联网(侵权请联系删除)`
            },
        },
    ]

    const getImageDetail = (uid: number) => {
        const params = {
            uids: uid,
            type: 2,
            public: true,
        }
        window.$loadingBar.start()
        exhibitionList(params).then((res) => {
            detailData.exhibitionInfo = res.data.exhibitions.map(ex => {
                return {
                    ...ex,
                    url: ex.cover,
                    cover: `${env.VITE_APP_IMG_URL}${ex.cover}`,
                }
            })[0]

            detailData.likes_ids = res.data.likes_ids || []

            window.$loadingBar.finish()

            tagsInfo({type: 'image', uids: detailData.exhibitionInfo.tags}).then((res) => {
                detailData.tags = res.data.tags_info
            })
        })
    }

    const imagesDownload = (url: string) => {
        if (detailData.isLoading) {
            window.$message.warning('图片正在下载中...')
            return
        }
        detailData.isLoading = true
        let name = url.split('/').pop() as string
        imageDownload(url, name).then(async () => {
            detailData.isLoading = false
            await updateDownload({uid: detailData.exhibitionInfo.uid})
            detailData.exhibitionInfo.download += 1
            window.$message.success('图片下载成功!')
        }).catch(() => {
            detailData.isLoading = false
        })
    }

    const addLike = (status: boolean, uid: number) => {
        changelike({uid: uid, likes_type: !status ? 1 : 0, type: 1}).then(() => {
            if (!status) {
                detailData.likes_ids.push(uid)
            } else {
                detailData.likes_ids = detailData.likes_ids.filter(it => it !== uid)
            }
        })
    }

    return {
        detailData,
        detailMessage,
        getImageDetail,
        imagesDownload,
        addLike,
    }

}

const setBackground = async (url: string, full_url: string) => {
    const userStore = useUserStoreWithOut()
    let params = {
        uid: userStore.info.uid,
        background_image: url,
    }

    window.$loadingBar.start()
    await updateUserInfo(params)
    window.$loadingBar.finish()

    userStore.$patch((state) => {
        state.info.background_image = url
    })
}

export {
    useImageDetail,
    setBackground,
}