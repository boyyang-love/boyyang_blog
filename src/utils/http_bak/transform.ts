import qs from 'qs'
import {TransForm, RequestOptions, Result, AxiosOptions} from './types'
import {AxiosResponse, AxiosRequestConfig} from 'axios'
import {useUserStoreWithOut} from '@/store/modules/user'
import {router} from '@/router'

const userStore = useUserStoreWithOut()
const transForm: TransForm = {
    // 请求前hook
    beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions) => {
        const {serializeParams, joinTime, withToken} = options
        if (serializeParams) {
            // 序列化参数
            if (config.method?.toUpperCase() === 'GET') {
                if (joinTime) {
                    // 是否拼接时间戳
                    config.params = {
                        ...config.params,
                        _t: Date.now(),
                    }
                }
            } else {
                config.data = qs.stringify(config.data)
            }
        }
        if (withToken) {
            // 如果需要带上token
            config.headers = {
                ...config.headers,
                Authorization: userStore.getToken,
            }
        }
        return config
    },
    // 转换请求数据
    transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
        const {
            isShowMessage,
            isShowSuccessMessage,
            isShowErrorMessage,
            isReturnNativeResponse,
            isTransformResponse,
        } = options
        const {data, config} = res

        const {code, msg} = data
        // 是否显示请求成功信息
        if (isShowMessage) {
            if (isShowSuccessMessage) {
                if (code === 0 && msg) {
                    // 成功
                    window.$message.success(msg)
                }
            }
            if (isShowErrorMessage) {
                if (code === 1 && msg) {
                    // 失败
                    window.$message.error(msg)
                }
            }
        }
        // 是否返回原生响应头
        if (isReturnNativeResponse) {
            return res
        }
        // 是否进行任何处理，直接返回
        if (isTransformResponse) {
            return data
        }
    },
    // 请求拦截器
    requestInterceptors: (
        config: AxiosRequestConfig,
        options: AxiosOptions,
    ): AxiosRequestConfig => {
        return config
    },
    // 响应拦截器
    responseInterceptors: (res: AxiosResponse<any>): AxiosResponse<any> => {
        return res
    },
    responseInterceptorsCatch: (error: Error) => {
        console.log(error)
    },
    requestCatch: (error: any) => {
        const {data, status} = error.response || {}
        const {msg} = data
        // token 过期
        if (status === 401) {
            window.$message.error('token过期！')
            router.push({
                name: 'Login',
            })

            return
        }
        window.$message.error(msg)
        return error
    },
}

export {transForm}
