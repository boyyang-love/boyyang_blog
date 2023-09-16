import {
    CloudUploadSharp,
    RocketSharp,
    Create,
} from '@vicons/ionicons5'
import {Component, markRaw} from 'vue'
import {Menu} from '@/views/home/components/menu/types'
import {router} from '@/router'

export interface MenuItem {
    name: string
    com: Component
    path: string
    text: string
    color?: string
}

const useMenuList = () => {
    const menu: MenuItem[] = [
        {
            name: 'Publish',
            com: markRaw(RocketSharp),
            path: '/publish',
            text: '上传博客',
            // color: '#00b8a9',
        },
        {
            name: 'Upload',
            com: markRaw(CloudUploadSharp),
            path: '/upload',
            text: '上传壁纸',
            // color: '#fc5185',
        },
        {
            name: 'Editor',
            com: markRaw(Create),
            path: '/editor',
            text: '上传文章',
            // color: '#fc5185',
        },
    ]

    const menuClick = (item: Menu.menuList, index: number) => {
        router.push({
            name: item.name,
        }).then()
    }

    return {
        menu,
        menuClick,
    }

}

export {
    useMenuList,
}