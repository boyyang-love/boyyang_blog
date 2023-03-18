<!--
 * @Author: boyyang
 * @Date: 2023-01-30 17:29:09
 * @LastEditTime: 2023-02-02 14:55:03
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\dashboard\components\rightChart.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
import {computed} from 'vue'
import qiunVueUcharts from '@qiun/vue-ucharts'

interface roseData {
    name: string
    value: string | number
}

interface rightChartProps {
    roseData: roseData[]
}

const props = withDefaults(defineProps<rightChartProps>(), {
    roseData: () => [
        {name: '点赞', value: 0},
        {name: '发布', value: 0},
        {name: '收藏', value: 0},
    ],
})
// opt
const opts = {
    color: [
        '#1890FF',
        '#91CB74',
        '#FAC858',
        '#EE6666',
        '#73C0DE',
        '#3CA272',
        '#FC8452',
        '#9A60B4',
        '#ea7ccc',
    ],
    padding: [10, 10, 10, 10],
    enableScroll: false,
    legend: {
        show: true,
        position: 'bottom',
        lineHeight: 25,
    },
    extra: {
        rose: {
            type: 'area',
            minRadius: 50,
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 2,
            borderColor: '#FFFFFF',
        },
    },
}

const chartData = computed(() => {
    return {
        series: [
            {
                data: props.roseData,
            },
        ],
    }
})
</script>

<template>
    <qiun-vue-ucharts type="rose" :opts="opts" :chartData="chartData"/>
</template>

<style scoped></style>
