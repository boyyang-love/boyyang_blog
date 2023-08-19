import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {AxiosOptions, RequestOptions, Result} from './types'

class Http {
    private axiosInstance: AxiosInstance
    private readonly options: AxiosOptions

    constructor(options: AxiosOptions) {
        this.options = options
        this.axiosInstance = axios.create(options)
    }

    public request<T = any>(axiosRequestConfig: AxiosRequestConfig, opt?: RequestOptions): Promise<Result<T>> {
        // transform before request
        const {
            transform,
            requestOptions,
        } = this.options

        const {
            beforeRequestHook,
            transformRequestData,
            requestCatch,
        } = transform

        const options: RequestOptions = {...requestOptions, ...opt}

        if (beforeRequestHook) {
            axiosRequestConfig = beforeRequestHook(axiosRequestConfig, options)
        }

        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<any, AxiosResponse<Result>>(axiosRequestConfig)
                .then(
                    (res: AxiosResponse<Result>) => {
                        if (transformRequestData) {
                            res = transformRequestData(res, options)
                        }

                        if (res.data.code === 1) {
                            reject(res.data.msg)
                        }

                        if (res.data.code === 0) {
                            resolve(res.data as unknown as Promise<Result<T>>)
                        }
                    },
                )
                .catch((err) => {
                    if (requestCatch) {
                        err = requestCatch(err, options)
                    }

                    reject(err)
                })
        })
    }
}

export {
    Http,
}