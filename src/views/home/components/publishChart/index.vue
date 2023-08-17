<script setup lang="ts">
import {EChartsOption} from 'echarts'
import EchartsCompt from '@/components/EchartsCompt/index.vue'
import {computed} from 'vue'
import * as echarts from 'echarts'

interface ChartData {
  categories: string[]
  seriesDataBlog: number[] | string[]
  seriesDataExhibition: number[] | string[]
}

const props = defineProps<ChartData>()

const options = computed<EChartsOption>((): EChartsOption => {
  let xData = props.categories
  let yData1 = props.seriesDataBlog
  let yData2 = props.seriesDataExhibition

  return {
    grid: {
      top: '30',
      bottom: 20,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.1)',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
          backgroundColor: '#7B7DDC',
          color: '#fff',
        },
      },
      textStyle: {
        color: '#fff',
      },
    },
    legend: {
      data: ['博客发布数', '图片上传数'],
      textStyle: {
        color: '#fff',
      },
      top: 5,
      right: 10,
    },
    xAxis: {
      data: xData,
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        splitLine: {show: false},
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },

        axisLabel: {
          formatter: '{value} ',
        },
      },
      {
        splitLine: {show: false},
        axisLine: {
          lineStyle: {
            color: '#B4B4B4',
          },
        },
        axisLabel: {
          formatter: '{value} ',
        },
      },
    ],

    series: [
      {
        name: '博客发布数',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: '#12c2e9'},
            {offset: 0.2, color: '#c471ed'},
            {offset: 1, color: '#f64f59'},
          ]),
        },
        data: yData1,
      },

      {
        name: '图片上传数',
        type: 'bar',
        // barGap: '-100%',
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: '#c6ffdd'},
            {offset: 0.2, color: '#fbd786'},
            {offset: 1, color: '#f7797d'},
          ]),
        },
        z: -12,
        data: yData2,
      },
    ],
  }


})

</script>

<template>
  <div class="publish-chart">
    <EchartsCompt
        id="publish-chart"
        :options="options"
    ></EchartsCompt>
  </div>
</template>

<style scoped lang="less">
.publish-chart {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>