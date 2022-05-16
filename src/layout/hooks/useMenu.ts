/**
 * @Author: boyyang
 * @Date: 2022-04-09 14:16:16
 * @LastEditTime: 2022-04-09 16:14:37
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\layout\hooks\useMenu.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { ref } from 'vue'
import type { MenuOption } from 'naive-ui'
import { HomeFilled, PictureFilled, EditFilled } from '@vicons/antd'
import { router } from '@/router'
import { renderIcon } from '@/utils/renderIcon'

const currentMenu = ref<string>('Home')

const menuOptions: MenuOption[] = [
    {
        label: '首页',
        key: 'Home',
        icon: renderIcon(HomeFilled),
    },
    {
        label: '图片',
        key: 'Image',
        icon: renderIcon(PictureFilled),
    },
    {
        label: '博客',
        key: 'Blog',
        icon: renderIcon(EditFilled),
    },
]

const menuClick = (key: string, item: MenuOption) => {
    currentMenu.value = item.key as string
    router.push({
        name: item.key as string
    })
}

export {
    menuOptions,
    menuClick,
    currentMenu
}