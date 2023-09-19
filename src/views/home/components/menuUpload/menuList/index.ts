import {
    CloudUploadSharp,
    RocketSharp,
    Create,
    ShieldHalf
} from '@vicons/ionicons5'
import {Component, markRaw} from 'vue'
import {Menu} from '@/views/home/components/menu/types'
import {router} from '@/router'
import {useUserStoreWithOut} from '@/store/modules/user'

export interface MenuItem {
    name: string
    com: Component
    path: string
    text: string
    color?: string
    role?: string[]
}

const useMenuList = () => {
    const userStore = useUserStoreWithOut()
    const menu: MenuItem[] = [
        {
            name: 'Publish',
            com: markRaw(RocketSharp),
            path: '/publish',
            text: '上传博客',
            role: ['user', 'admin'],
        },
        {
            name: 'Upload',
            com: markRaw(CloudUploadSharp),
            path: '/upload',
            text: '上传壁纸',
            role: ['user', 'admin'],
        },
        {
            name: 'Editor',
            com: markRaw(Create),
            path: '/editor',
            text: '上传文章',
            role: ['user', 'admin'],
        },
        {
            name: 'Admin',
            com: markRaw(ShieldHalf),
            path: '/admin',
            text: '管理员',
            role: ['admin'],
        },
    ].filter(m => m.role.includes(userStore.info.role))

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