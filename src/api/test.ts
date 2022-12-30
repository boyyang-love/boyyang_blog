import axios from 'axios'

interface AppleReq {
    pageNum: number
    pageSize?: number
}

interface AppleRes {
    code: number
    data: string
}

interface AppleRes {
    code: number
    data: string
}
interface AppleReq {
    pageNum: number
}

interface BananaRes {
    code: number
    data: object
}
interface BananaReq {
    pageSize: number
}

//...

// 关键: 在 ApiMaps 绑定它们的映射关系
interface ApiMaps {
    '/apple': { req: AppleReq; res: AppleRes }
    '/banana': { req: BananaReq; res: BananaRes }
}

type AppleApiMap = ApiMaps['/apple']

// 获得请求路径的类型集合：
type ApiKeys = keyof ApiMaps

console.log(ApiKeys)

async function sendRequest<T extends ApiKeys = ApiKeys>(url: T, params?: ApiMaps[T]['req']) {
    const response = await axios.get<ApiMaps[T]['res']>(url, { params })
    return response
}

const apple = sendRequest('/apple', { pageNum: 1 })
apple.then((res) => {
  const blah = res.data.data // -> string
  console.log(1111111)
})

const banana = sendRequest('/banana', { pageSize: 1 })
banana.then((res) => {
  const blah = res.data.data // -> boolean
})
