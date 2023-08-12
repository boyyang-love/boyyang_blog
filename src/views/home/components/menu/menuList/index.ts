import {markRaw} from 'vue'
import {Menu} from '../types'
import {
    Image,
    Home,
    CloudUploadSharp,
    GitCommit,
    PersonCircleSharp,
    SettingsSharp,
    RocketSharp,
} from '@vicons/ionicons5'

const menuList: Menu.menuList[] = [
    {
        name: 'Home',
        com: markRaw(Home),
        path: '/home',
        text: '首页',
        // color: '#ffde7d',
    },
    {
        name: 'Images',
        com: markRaw(Image),
        path: '/images',
        text: '壁纸',
        // color: '#f6416c',
    },
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
        name: 'TimeAxis',
        com: markRaw(GitCommit),
        path: '/timeAxis',
        text: '时间轴',
        // color: '#ff9a00',
    },
    {
        name: 'User',
        com: markRaw(PersonCircleSharp),
        path: '/user',
        text: '我的',
        // color: '#3ec1d3',
    },
    {
        name: 'Admin',
        com: markRaw(SettingsSharp),
        path: '/admin',
        text: '设置',
        // color: '#9896f1',
    },
]

export {
    menuList,
}