import * as echarts from 'echarts'
import type {ECharts, EChartsType} from 'echarts'

const init = (dom: HTMLElement | null): EChartsType | null => {
    let instance: ECharts | null = null
    if (dom) {
        instance = echarts.init(dom)
    } else {
        throw new Error('dom 元素为必传项')
    }
    return instance
}

export {
    init,
}