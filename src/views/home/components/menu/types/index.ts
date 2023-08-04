import {Component} from 'vue'

export declare namespace Menu {
    interface menuProps {
        menuList?: menuList[]
    }

    interface menuList {
        name: string
        com: Component
        path: string
        text: string
        color: string
    }
}