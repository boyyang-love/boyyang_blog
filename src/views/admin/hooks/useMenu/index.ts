import {CheckmarkCircle, CloseCircle, Create, Exit} from '@vicons/ionicons5'
import {Component, ref} from 'vue'

export interface MenuItem {
    id: number
    name: string
    icon: Component
    color: string
}

const useMenu = () => {
    const active = ref<number>(1)
    const menu: MenuItem[] = [
        {
            id: 1,
            name: '审核中',
            icon: Create,
            color: '#fff',
        },
        {
            id: 2,
            name: '审核通过',
            icon: CheckmarkCircle,
            color: '#00adb5',
        },
        {
            id: 3,
            name: '审核驳回',
            icon: CloseCircle,
            color: '#fc5185',
        },
        {
            id: 4,
            name: '返回',
            icon: Exit,
            color: '#fce38a',
        },
    ]

    const menuClick = (id: number) => {
        if (id !== 4) {
            active.value = id
        }
    }

    return {
        active,
        menu,
        menuClick,
    }
}

export {
    useMenu,
}