import {Component, computed, markRaw, onMounted, reactive} from 'vue'
import {LocationQuery} from 'vue-router'
import {router} from '@/router'
import {exhibitionList, similarExhibition, updateDownload} from '@/api/exhibition'
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
    Sparkles
} from '@vicons/ionicons5'
import {tagsInfo} from '@/api/tag'
import {imageDownload} from '@/utils/fileDownload'

export interface DetailMessage {
    label: string
    key: string
    render: (key: Exhibition.ExhibitionsInfo) => string | number
    icon: Component
}

const useImageDetail = (query: LocationQuery) => {
    const detailData = reactive({
        exhibitionInfo: {} as Exhibition.ExhibitionsInfo,
        similarExhibits: [] as Exhibition.ExhibitionsInfo[],
        tags: [] as Tag.TagInfo[],
        isLoading: false,
    })
    const detailMessage: DetailMessage[] = [
        {
            label: '图片编号',
            key: 'id',
            icon: Leaf,
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
            render(detailData: Exhibition.ExhibitionsInfo): string {
                return `图片来自互联网(侵权请联系删)`
            },
        },
    ]
    onMounted(() => {
        getImageDetail()
    })

    const getImageDetail = () => {
        let params = {
            uids: query.uid as string,
            type: 2,
        }
        window.$loadingBar.start()
        exhibitionList(params).then((res) => {
            detailData.exhibitionInfo = res.data.exhibitions.map(ex => {
                return {
                    ...ex,
                    cover: `${env.VITE_APP_IMG_URL}${ex.cover}`,
                }
            })[0]

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

    return {
        detailData,
        detailMessage,
        imagesDownload,
    }

}

export {
    useImageDetail,
}