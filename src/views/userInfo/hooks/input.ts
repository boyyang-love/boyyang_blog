import {Component} from 'vue'
import {
    PersonCircle,
    CallSharp,
    LogoWechat,
    LogoGithub,
    Create,
} from '@vicons/ionicons5'
import {QqOutlined} from '@vicons/antd'

interface InputOptions {
    key: string
    placeholder: string
    type: 'text' | 'textarea' | 'number'
    icon: Component
}

const inputOptions: InputOptions[] = [
    {
        key: 'username',
        placeholder: '请输入用户名',
        type: 'text',
        icon: PersonCircle,
    },
    {
        key: 'tel',
        placeholder: '请输入电话号码',
        type: 'number',
        icon: CallSharp,
    },
    {
        key: 'qq',
        placeholder: '请输入QQ',
        type: 'number',
        icon: QqOutlined,
    },
    {
        key: 'wechat',
        placeholder: '请输入微信',
        type: 'text',
        icon: LogoWechat,
    },
    {
        key: 'git_hub',
        placeholder: '请输入GitHub',
        type: 'text',
        icon: LogoGithub,
    },
    {
        key: 'motto',
        placeholder: '请输入个性签名',
        type: 'textarea',
        icon: Create,
    },
]

export {
    inputOptions,
}