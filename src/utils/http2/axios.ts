import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { RequestOptions, Result, AxiosOptions } from './types'
import { transForm } from './transform'

class Axios {
    private options: AxiosOptions
    private axiosInstance: AxiosInstance
    constructor(options: AxiosOptions) {
        this.options = options
        this.axiosInstance = axios.create(options)
    }

    public request<T = any>(
        config: AxiosRequestConfig,
        options?: RequestOptions
    ): Promise<Result<T | any>> {
        const { requestOptions } = this.options
        const { beforeRequestHook, transformResponseData } = transForm || {}
        const opt: RequestOptions = Object.assign({}, requestOptions, options)
        if (beforeRequestHook) {
            config = beforeRequestHook(config, opt)
        }
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<any, AxiosResponse<Result<T>>>(config)
                .then((response: AxiosResponse<Result<T>>) => {
                    if (transformResponseData) {
                        const res = transformResponseData(response, opt)
                        resolve(res)
                    } else {
                        resolve(response as unknown as Promise<Result<T>>)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export { Axios }
