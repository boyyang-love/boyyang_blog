import {Http} from './http'
import {Result} from './types'
import {transForm} from './transform'

const createHttp = () => {
    const http = new Http(
        {
            baseURL: '',
            requestOptions: {
                // 序列化请求参数
                serializeParams: true,
                // 是否显示提示信息
                isShowMessage: true,
                // 是否显示成功信息
                isShowSuccessMessage: true,
                // 是否显示失败信息
                isShowErrorMessage: true,
                // 是否添加时间戳
                joinTime: true,
                // 是否携带token
                withToken: true,
            },
            transform: transForm,
        },
    )

    return http
}

const http = createHttp()

interface innn {
    name: string
    age: number
}

export {
    http,
}