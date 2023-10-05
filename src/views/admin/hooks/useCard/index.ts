import {Component, markRaw} from 'vue'
import {People, Images, Create, Notifications, PaperPlane, CloudDownload} from '@vicons/ionicons5'

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
    const cards: CardItem[] = [
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
    ]

    const actionCards: ActionCardItem[] = [
        {
            text: '修改公告',
            icon: markRaw(Notifications),
        },
    ]

    return {
        cards,
        actionCards
    }
}

export {
    useCard,
}