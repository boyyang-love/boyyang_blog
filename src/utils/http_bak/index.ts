import {Axios} from './http'
import {transForm} from './transform'
import {env} from '@/utils/env'

const createHttp = () => {
    return new Axios({
        baseURL: env.VITE_APP_API_URL,
        timeout: 20 * 1000,
        transForm: transForm,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
            // 是否返回原生响应头 比如：需要获取响应头时使用该属性
            isReturnNativeResponse: false,
            // 需要对返回数据进行处理
            isTransformResponse: true,
            // get请求添加时间戳
            joinTime: true,
            // 是否携带token
            withToken: true,
            // 显示请求后message
            isShowMessage: true,
            // 显示请求成功message
            isShowSuccessMessage: true,
            // 显示请求失败message
            isShowErrorMessage: true,
            // 序列化请求参数 post formData
            serializeParams: true,
        },
    })
}

const http = createHttp()

export {
    http,
}
