/**
 * @Author: boyyang
 * @Date: 2022-04-16 11:29:46
 * @LastEditTime: 2022-12-30 15:15:43
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog_web\src\utils\http\http.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosOptions, RequestOptions, Result } from './types'

class Axios {
    private axiosInstance: AxiosInstance
    private options: AxiosOptions
    constructor(options: AxiosOptions) {
        this.options = options
        this.axiosInstance = axios.create(options)
        this.setupInterceptors()
    }
    // 初始化拦截器
    private setupInterceptors() {
        const { requestInterceptorsCatch } = this.getTransForm() || {}
        // 请求之前的拦截器
        this.axiosInstance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                const { requestInterceptors } = this.getTransForm() || {}
                if (requestInterceptors) {
                    config = requestInterceptors(config, this.options)
                }
                return config
            },
            (error: any) => {
                return Promise.reject(error)
            }
        )
        // 请求之后的拦截器
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse<any>) => {
                const { responseInterceptors } = this.getTransForm() || {}
                if (responseInterceptors) {
                    response = responseInterceptors(response)
                }
                return response
            },
            (error: any) => {
                return Promise.reject(error)
            }
        )
    }
    // 请求
    public request<T = any>(
        config: AxiosRequestConfig,
        options?: RequestOptions
    ): Promise<Result | T> {
        const transForm = this.getTransForm()
        const { beforeRequestHook } = transForm || {}
        const { requestOptions } = this.options || {}
        const opt: RequestOptions = Object.assign({}, requestOptions, options)
        if (beforeRequestHook) {
            config = beforeRequestHook(config, opt)
        }
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<any, AxiosResponse<Result>>(config)
                .then((response: AxiosResponse<Result>) => {
                    const { transformRequestData } = this.getTransForm() || {}
                    if (transformRequestData) {
                        try {
                            const res = transformRequestData(response, opt)
                            resolve(res)
                        } catch (err) {
                            reject(err || new Error('request error!'))
                        }
                        return
                    }
                    resolve(response as unknown as Promise<T>)
                })
                .catch((error: any) => {
                    const { requestCatch } = this.getTransForm() || {}
                    if (requestCatch) {
                        requestCatch(error)
                    }
                    reject(error)
                })
        })
    }
    // 获取转换器
    private getTransForm() {
        const { transForm } = this.options
        return transForm
    }
}

export { Axios }
