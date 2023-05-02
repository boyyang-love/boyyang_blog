import {http} from '@/utils/http'
import {Result} from '@/utils/http/types'

interface beforeUploadRes {
    url: string
    token: string
    authorization: string
    file_id: string
    cos_file_id: string
    key: string
}

export const upload = async (params: { file_name: string; file: File }):Promise<beforeUploadRes> => {
    let res = await http.request(
        {
            url: '/cos/upload',
            method: 'get',
            params: {
                file_name: params.file_name,
            },
        },
        {
            isShowMessage: false,
        },
    )

    const data = new FormData()
    data.append('key', res.data.key)
    data.append('Signature', res.data.authorization)
    data.append('x-cos-security-token', res.data.token)
    data.append('x-cos-meta-fileid', res.data.cos_file_id)
    data.append('file', params.file)

    return new Promise(async (resolve, reject) => {
        let r = await http.request(
            {
                url: res.data.url,
                method: 'post',
                data: data,
            },
            {
                serializeParams: false,
                isShowMessage: false,
                isReturnNativeResponse: true,
                isTransformResponse: false,
            },
        )

        resolve(res.data)
    })
}
