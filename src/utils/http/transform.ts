import {RequestOptions, Result, TransForm} from './types'
import {AxiosError, AxiosResponse} from 'axios'
import qs from 'qs'
import {useUserStore} from '@/store/modules/user'
import {router} from '@/router'

const transForm: TransForm = {
    beforeRequestHook(config, opt) {
        const {
            serializeParams,
            joinTime,
            withToken,
        } = opt

        // post 序列化参数
        if (serializeParams) {
            if (config.method?.toUpperCase() === 'POST') {
                config.data = qs.stringify(config.data)
            }
        }
        // get 添加时间戳
        if (joinTime) {
            if (config.method?.toUpperCase() === 'GET') {
                config.params = {
                    ...config.params,
                    _t: new Date().getTime(),
                }
            }
        }
        // 是否加上 token
        if (withToken) {
            const userStore = useUserStore()
            config.headers = {
                ...config.headers,
                [opt.tokenKey as string]: opt.token || userStore.getToken,
            }
        }

        return config
    },

    transformRequestData(res: AxiosResponse<Result>, opt) {
        const {
            isShowMessage,
            isShowSuccessMessage,
            isShowErrorMessage,
            isReturn,
        } = opt

        const {code, msg, data} = res.data

        if (isShowMessage) {
            if (isShowSuccessMessage && code === 0) {
                window.$message.success(msg)
            }

            if (isShowErrorMessage && code === 1) {
                window.$message.error(msg)
            }
        }

        if (!isReturn) {
            return {data: {code: 0, msg: ''}}
        }


        return res
    },

    responseInterceptors(res: AxiosResponse<Result, any>): AxiosResponse<Result, any> {
        return res
    },

    requestCatch(e: AxiosError, options: RequestOptions) {
        if (e?.response?.status === 401) {
            window.$notification.error({
                title: '提示',
                content: 'token 过期即将重新登录',
                duration: 2000,
            })

            window.sessionStorage.clear()
            router.replace({name: 'Login'}).then(() => {
            })
        }

    },
}

export {
    transForm,
}