import qs from 'qs'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestOptions, Result, TransForm } from './types'
const transForm: TransForm = {
    // 请求前
    beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions) => {
        const { joinTime, serializeParams, withToken } = options

        if (joinTime) {
            if (config.method?.toUpperCase() === 'GET') {
                config.params = {
                    ...config.params,
                    _t: new Date().getTime(),
                }
            }
        }

        if (serializeParams) {
            if (config.method?.toUpperCase() === 'POST') {
                config.data = qs.stringify(config.data)
            }
        }

        if (withToken) {
            config.headers = {
                ...config.headers,
                Authorization: '',
            }
        }
        return config
    },
    // 请求后
    transformResponseData: (res: AxiosResponse<Result<any>, any>, options: RequestOptions) => {
        const { isTransformResponse } = options
        if (!isTransformResponse) {
            return res
        }
        
    },
}

export { transForm }
