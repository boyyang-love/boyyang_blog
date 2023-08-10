import {Http} from './http'
import {transForm} from './transform'
import {env} from '@/utils/env'

const createHttp = () => {
    return new Http(
        {
            baseURL: env.VITE_APP_API_URL,
            timeout: 20 * 1000,
            // 以下配置都可以在接口配置中直接配置，接口配置会覆盖以下配置
            requestOptions: {
                // POST请求是否序列化请求参数
                serializeParams: true,
                // 是否显示提示信息
                isShowMessage: true,
                // 是否显示成功信息
                isShowSuccessMessage: true,
                // 是否显示失败信息
                isShowErrorMessage: true,
                // GET请求是否添加时间戳
                joinTime: true,
                // 是否携带token
                withToken: true,
                // token key
                tokenKey: 'Authorization',
                // token value 可以在这儿直接配置 也可以直接在接口配置中直接配置
                token: '',
                // 是否有返回
                isReturn: true,

            },
            transform: transForm,
        },
    )
}

const http = createHttp()

export {
    http,
}