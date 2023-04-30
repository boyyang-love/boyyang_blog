import type {AxiosRequestConfig, AxiosResponse} from 'axios'

export interface Result<T = any> {
    code: number
    msg: string
    data: T
}

export interface AxiosOptions extends AxiosRequestConfig {
    transform: TransForm
    requestOptions?: RequestOptions
}

export interface RequestOptions {
    // 序列化请求参数
    serializeParams?: boolean
    // 是否显示提示信息
    isShowMessage?: boolean
    // 是否显示成功信息
    isShowSuccessMessage?: boolean
    // 是否显示失败信息
    isShowErrorMessage?: boolean
    // 是否添加时间戳
    joinTime?: boolean
    // 是否携带token
    withToken?: boolean
}

export abstract class TransForm {
    /**
     * @description: 请求之前处理配置
     * @description: Process configuration before request
     */
    beforeRequestHook?: (axiosRequestConfig: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

    /**
     * @description: 请求成功处理
     */
    transformRequestData?: (res: AxiosResponse<Result>, options: RequestOptions) => any

    /**
     * @description: 请求失败处理
     */
    requestCatch?: (e: any, options: RequestOptions) => Promise<any>

    /**
     * @description: 请求之前的拦截器
     */
    requestInterceptors?: (axiosRequestConfig: AxiosRequestConfig, options: AxiosOptions) => AxiosRequestConfig

    /**
     * @description: 请求之后的拦截器
     */
    responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

    /**
     * @description: 请求之前的拦截器错误处理
     */
    requestInterceptorsCatch?: (error: Error) => void

    /**
     * @description: 请求之后的拦截器错误处理
     */
    responseInterceptorsCatch?: (error: Error) => void
}