import {Component} from 'vue'
import {EyeOff, Earth} from '@vicons/ionicons5'

interface InputType {
    icon: Component
    iconSize: number
    placeholder: string
    inputType: 'textarea' | 'text' | 'password'
    key: string
}

const INPUT: InputType[] = [
    {
        icon: Earth,
        iconSize: 22,
        placeholder: '请输入账号',
        inputType: 'text',
        key: 'username',
    },
    {
        icon: EyeOff,
        iconSize: 22,
        placeholder: '请输入密码',
        inputType: 'password',
        key: 'password',
    },
]

export const useRegister = () => {

    return {
        INPUT,
    }
}