import {CheckmarkCircle, CloseCircle, Create, Exit} from '@vicons/ionicons5'
import {Component, ref} from 'vue'

export interface MenuItem {
    id: number
    name: string
    icon: Component
}

const useMenu = () => {
    const active = ref<number>(1)
    const menu: MenuItem[] = [
        {
            id: 1,
            name: '审核中',
            icon: Create,
        },
        {
            id: 2,
            name: '审核通过',
            icon: CheckmarkCircle,
        },
        {
            id: 3,
            name: '审核驳回',
            icon: CloseCircle,
        },
        {
            id: 4,
            name: '返回',
            icon: Exit,
        },
    ]

    const menuClick = (id: number) => {
        active.value = id
    }

    return {
        active,
        menu,
        menuClick
    }
}

export {
    useMenu,
}