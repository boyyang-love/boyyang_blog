import {ref, watchEffect} from 'vue'
import {exhibitionList} from '@/api/exhibition'


export type Fun<P, D> = (args: P) => Promise<D>

const usePagenaition = <P, D>(fn: Fun<P, D>, params: any) => {
    const page = ref<number>(0)
    const limit = ref<number>(10)
    const total = ref<number>(0)
    const data = ref<any>([])
    const next = () => {
        page.value += 1
    }

    const prev = () => {
    }

    const changeLimit = (_limit: number) => {
    }

    watchEffect(async () => {
        let _params = {...params, page: page.value, limit: limit.value}
        const {data} = await fn.call(null, _params)
        data.value = data
    })

    return {
        page,
        limit,
        total,
        data,
        next,
        prev,
        changeLimit,
    }
}

const {data} = usePagenaition(exhibitionList, null)

console.log(data.value)

export {
    usePagenaition,
}