import {Component, markRaw, onMounted, reactive, ref} from 'vue'
import {People, Images, Create, Notifications, PaperPlane, CloudDownload} from '@vicons/ionicons5'
import {adminStat, createNotice} from '@/api/admin'

export interface CardItem {
    text: string
    num: number
    icon: Component
}

export interface ActionCardItem {
    text: string
    icon: Component,
}

const useCard = () => {
    const noticeData = reactive({
        isShow: false,
        content: '',
    })
    const cards = ref<CardItem[]>([
        {
            text: '用户数',
            num: 0,
            icon: markRaw(People),
        },
        {
            text: '图片发布数',
            num: 0,
            icon: markRaw(Images),
        },
        {
            text: '博客发布数',
            num: 0,
            icon: markRaw(Create),
        },
        {
            text: '文章发布数',
            num: 0,
            icon: markRaw(PaperPlane),
        },
        {
            text: '图片下载数',
            num: 0,
            icon: markRaw(CloudDownload),
        },
    ])

    const actionCards: ActionCardItem[] = [
        {
            text: '修改公告',
            icon: markRaw(Notifications),
        },
    ]


    const getSta = () => {
        adminStat().then(res => {
            console.log(res)
            cards.value[0].num = res.data.user_count
            cards.value[1].num = res.data.image_count
            cards.value[2].num = res.data.blog_count
            cards.value[3].num = res.data.article_count
            cards.value[4].num = res.data.image_download_count
        })
    }

    onMounted(() => {
        getSta()
    })

    const actionCardClick = (item: ActionCardItem) => {
        noticeData.isShow = true
    }

    const noticeSubmit = async () => {
        if (noticeData.content.trim() === "") {
            window.$message.error("请输入公告信息")
            return false
        }

        await createNotice({content: noticeData.content})
    }


    return {
        noticeData,
        noticeSubmit,
        cards,
        actionCards,
        actionCardClick,
    }
}

export {
    useCard,
}