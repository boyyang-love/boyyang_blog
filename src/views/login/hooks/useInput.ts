import {Component} from 'vue'
import {EyeOff, Earth, PhonePortrait} from '@vicons/ionicons5'

interface Input {
    login: LoginAndRegisterInput[]
    register: LoginAndRegisterInput[]
}

interface LoginAndRegisterInput {
    icon: Component
    iconSize: number
    placeholder: string
    inputType: 'textarea' | 'text' | 'password'
    key: string
    inputWidth?: string
}

const input: Input = {
    login: [
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
    ],
    register: [
        {
            icon: Earth,
            iconSize: 22,
            placeholder: '请输入用户名',
            inputType: 'text',
            key: 'r_username',
        },
        {
            icon: PhonePortrait,
            iconSize: 22,
            placeholder: '请输入电话号码',
            inputType: 'text',
            key: 'r_tel',
        },
        {
            icon: EyeOff,
            iconSize: 22,
            placeholder: '请输入密码',
            inputType: 'password',
            key: 'r_password',
        },
        {
            icon: EyeOff,
            iconSize: 22,
            placeholder: '请输入密码',
            inputType: 'password',
            key: 'r_repassword',
        },
    ],
}


export const useInput = (type: 'login' | 'register'): LoginAndRegisterInput[] => {
    return input[type]
}