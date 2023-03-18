<!--
 * @Author: boyyang
 * @Date: 2023-01-30 17:26:26
 * @LastEditTime: 2023-02-02 14:53:33
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\dashboard\components\bottomChart.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
import {computed, ref} from 'vue'
import qiunVueUcharts from '@qiun/vue-ucharts'

interface chartProps {
    chartData: chartInfo[]
}

interface chartInfo {
    name: string,
    value: string | number
}

const props = withDefaults(defineProps<chartProps>(), {
    chartData: () => [],
})

const opts = {
    color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
    padding: [30, 30, 15, 5],
    enableScroll: false,
    xAxis: {
        disableGrid: true,
        showTitle: true,
        title: '时间',
    },
    yAxis: {
        splitNumber: 4,
        showTitle: true,
        data: [
            {
                title: '作品上传数',
            },
        ],
    },
    extra: {
        mount: {
            type: 'mount',
            widthRatio: 1.5,
            borderWidth: 0,
            linearType: 'custom',
        },
    },
}

const chartData = computed(() => {
    return {
        series: [
            {
                data: props.chartData,
            },
        ],
    }
})

</script>

<template>
    <qiun-vue-ucharts type="mount" :opts="opts" :chartData="chartData"/>
</template>

<style scoped>

</style>
