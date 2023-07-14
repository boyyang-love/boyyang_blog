import {Result, TransForm} from './types'
import {AxiosResponse} from 'axios'
import qs from 'qs'

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
            config.headers = {
                ...config.headers,
                [opt.tokenKey as string]: opt.token,
            }
        }

        return config
    },

    transformRequestData(res: AxiosResponse<Result>, opt) {
        const {
            isShowMessage,
            isShowSuccessMessage,
            isShowErrorMessage,
        } = opt

        const {code, msg, data} = res.data

        return res.data
    },
}

export {
    transForm,
}