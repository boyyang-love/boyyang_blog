import type {ECElementEvent, EChartsOption} from 'echarts'
import {init} from './init'

type Cb = (e: ECElementEvent) => void

const useEcharts = (dom: HTMLElement, options: EChartsOption | null, cb: Cb) => {

    const instance = init(dom)

    if (instance && options) {
        instance.setOption(options)

        instance.on('click', (e) => {
            cb.call(instance, e)
        })
    }

}


export {
    useEcharts,
}