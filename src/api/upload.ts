import { Result } from './../utils/http/types'
import { http } from '@/utils/http'

interface beforeUploadRes {
    url: string
    token: string
    authorization: string
    file_id: string
    cos_file_id: string
}

export const upload = async (params: { file_name: string; file: File }) => {
    let res = (await http.request({
        url: '/cos/upload',
        method: 'get',
        params: {
            file_name: params.file_name,
        },
    })) as beforeUploadRes

    const data = new FormData()
    data.append('key', `images/${params.file_name}`)
    data.append('Signature', res.authorization)
    data.append('x-cos-security-token', res.token)
    data.append('x-cos-meta-fileid', res.cos_file_id)
    data.append('file', params.file)

    return new Promise(async (resolve, reject) => {
        let r = await http.request(
            {
                url: res.url,
                method: 'post',
                data: data,
            },
            {
                serializeParams: false,
                isShowMessage: false,
                isReturnNativeResponse: true,
                isTransformResponse: false
            }
        )

        resolve(res)
    })

}
