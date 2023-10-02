import {markRaw} from 'vue'
import type {Component} from 'vue'

import {
    Image,
    CloudUploadSharp,
    GitCommit,
    PersonCircleSharp,
    RocketSharp,
    Exit,
    Create,
} from '@vicons/ionicons5'
import {router} from '@/router'
import {useMenuStoreWithOut} from '@/store/modules/menu'

export interface MenuItem {
    name: string
    com: Component
    path: string
    text: string
    color?: string
    isChangeActive?: boolean
}

const menuList: MenuItem[] = [
    // {
    //     name: 'Home',
    //     com: markRaw(Home),
    //     path: '/home',
    //     text: '首页',
    //     color: 'rgb(255,222,125, 0.5)',
    //     isChangeActive: true,
    // },
    {
        name: 'Images',
        com: markRaw(Image),
        path: '/images',
        text: '壁纸',
        color: 'rgb(246,65,108, 0.5)',
        isChangeActive: true,
    },
    {
        name: 'TimeAxis',
        com: markRaw(GitCommit),
        path: '/timeAxis',
        text: '时间轴',
        color: 'rgb(255,154,0, 0.5)',
        isChangeActive: true,
    },
    {
        name: 'User',
        com: markRaw(PersonCircleSharp),
        path: '/user',
        text: '我的',
        color: 'rgb(62,193,211, 0.5)',
        isChangeActive: true,
    },
    {
        name: 'Exit',
        com: markRaw(Exit),
        path: '',
        text: '退出',
        color: 'rgb(152,150,241, 0.5)',
        isChangeActive: false,
    },
    {
        name: 'Publish',
        com: markRaw(RocketSharp),
        path: '/publish',
        text: '上传博客',
        color: 'rgba(196,113,237, 0.5)',
        isChangeActive: false,
    },
    {
        name: 'Upload',
        com: markRaw(CloudUploadSharp),
        path: '/upload',
        text: '上传壁纸',
        color: 'rgba(191,36,42, 0.5)',
        isChangeActive: false,
    },
    {
        name: 'Editor',
        com: markRaw(Create),
        path: '/editor',
        text: '上传文章',
        color: 'rgba(0,163,129, 0.5)',
        isChangeActive: false,
    },
]

const useMenuList = () => {
    const menuStore = useMenuStoreWithOut()
    const menuClick = (item: MenuItem) => {
        if (item.path !== '') {
            router.push({name: item.name}).then(() => {
                if (item.isChangeActive) {
                    menuStore.setActive(item.name)
                }
            })
        } else {
            if (item.name === 'Exit') {
                window.$dialog.warning({
                    title: '提示',
                    content: '是否退出登录？',
                    negativeText: '算了',
                    positiveText: '确定',
                    onPositiveClick: () => {
                        window.sessionStorage.clear()
                        router.replace(
                            {
                                name: 'Login',
                            },
                        ).then(() => {
                            menuStore.setActive('Home')
                        })
                    },
                })
                return
            }
        }
    }

    return {
        menuList,
        menuClick,
    }
}


export {
    useMenuList,
}