import {markRaw} from 'vue'
import {Menu} from '../types'
import {renderIcon} from '@/utils/renderIcon'
import {
    Image,
    Home,
    GitCommit,
    PersonCircleSharp,
    Create,
    Power,
    Book,
    FingerPrint,
} from '@vicons/ionicons5'

const menuList: Menu.menuList[] = [
    {
        name: 'Home',
        com: markRaw(Home),
        path: '/home',
        text: '首页',
        color: '#ffde7d',
    },
    {
        name: 'Images',
        com: markRaw(Image),
        path: '/images',
        text: '壁纸',
        color: '#f6416c',
    },
    {
        name: 'Article',
        com: markRaw(Book),
        path: '/article',
        text: '文章',
        color: '#11999e',
    },
    // {
    //     name: 'Publish',
    //     com: markRaw(RocketSharp),
    //     path: '/publish',
    //     text: '上传博客',
    //     // color: '#00b8a9',
    // },
    // {
    //     name: 'Upload',
    //     com: markRaw(CloudUploadSharp),
    //     path: '/upload',
    //     text: '上传壁纸',
    //     // color: '#fc5185',
    // },
    // {
    //     name: 'Editor',
    //     com: markRaw(Create),
    //     path: '/editor',
    //     text: '上传文章',
    //     // color: '#fc5185',
    // },
    {
        name: 'TimeAxis',
        com: markRaw(GitCommit),
        path: '/timeAxis',
        text: '时间轴',
        color: '#ff9a00',
    },
    {
        name: 'User',
        com: markRaw(PersonCircleSharp),
        path: '/user',
        text: '我的',
        color: '#3ec1d3',
    },
    // {
    //     name: '退出',
    //     com: markRaw(Power),
    //     path: '',
    //     text: '退出',
    //     color: '#9896f1',
    // },
]

const options = [
    {
        label: '修改信息',
        key: 'editInfo',
        icon: renderIcon(FingerPrint),
    },
    {
        label: '修改密码',
        key: 'editPassword',
        icon: renderIcon(Create),
    },
    {
        label: '退出登录',
        key: 'logout',
        icon: renderIcon(Power),
    },
]

export {
    menuList,
    options,
}