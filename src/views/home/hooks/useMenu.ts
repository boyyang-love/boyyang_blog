/**
 * @Author: boyyang
 * @Date: 2022-07-03 15:51:11
 * @LastEditTime: 2022-07-05 18:24:02
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\views\home\hooks\useMenu.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'
import { router } from '@/router'
import {
    CloudUploadOutlined,
    UserOutlined,
    FileImageFilled,
    EditTwotone,
    CodeSandboxOutlined,
} from '@vicons/antd'
import { renderIcon } from '@/utils/renderIcon'
// hooks
import { useImages } from './useImages'
import { useUser } from './useUser'
import { useBanner } from './useBanner'

const { imagesData } = useImages()
const { userData } = useUser()
const { showAll } = useBanner()

const menuData = reactive({})

const menuOptions = [
    {
        label: '修改资料',
        key: 'edit',
        icon: renderIcon(UserOutlined),
    },
    {
        label: '上传作品',
        key: 'upload',
        icon: renderIcon(CloudUploadOutlined),
    },
    {
        label: '列表展示',
        key: 'list',
        icon: renderIcon(FileImageFilled),
    },
    {
        label: '发布博客',
        key: 'blog',
        icon: renderIcon(EditTwotone),
    },
    {
        label: '查看博客',
        key: 'blogList',
        icon: renderIcon(CodeSandboxOutlined),
    },
]

const useMenu = () => {
    // 菜单
    const menuClick = (key: string) => {
        switch (key) {
            case 'upload':
                imagesData.showModal = true
                break
            case 'edit':
                userData.isShowEdit = true
                break
            case 'list':
                showAll()
                break
            case 'blog':
                router.push({
                    name: 'Blog',
                })
                break
            case 'blogList':
                router.push({
                    name: 'BlogList',
                })
                break
            default:
                break
        }
    }
    return {
        menuData,
        menuOptions,
        menuClick,
    }
}

export { useMenu }
