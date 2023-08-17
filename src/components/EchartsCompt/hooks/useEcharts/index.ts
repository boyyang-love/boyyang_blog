import type {ECElementEvent, ECharts, EChartsOption} from 'echarts'
import _ from 'lodash'
import {init} from './init'

const useEcharts = (
    dom: HTMLElement | null,
    options: EChartsOption | null,
    chartClick?: (e: ECElementEvent) => void,
): ECharts | null => {

    const instance = init(dom)

    if (instance && options) {
        instance.setOption(options, true)
        instance.on('click', (e) => {
            chartClick && _.isFunction(chartClick) && chartClick.call(null, e)
        })
    }

    return instance
}


export {
    useEcharts,
}