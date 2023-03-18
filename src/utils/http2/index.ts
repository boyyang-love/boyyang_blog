import {Axios} from './axios'

const createHttp = () => {
    return new Axios({
        baseURL: '',
        timeout: 5 * 1000,
        requestOptions: {},
    })
}

const http = createHttp()

http.request({url: '', method: 'GET', baseURL: ''})

export {http}
