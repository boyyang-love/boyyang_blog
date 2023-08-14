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
    // backgroundColor: '#080b30',
    legend: {
      show: true,
      data: ['图片上传', '博客上传'],
      right: 10,
      itemStyle: {
        color: '#b7bfd7',
      },
      textStyle: {
        color: '#b7bfd7',
      },
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0, 255, 233,0)',
              },
              {
                offset: 0.5,
                color: 'rgba(255, 255, 255,1)',
              },
              {
                offset: 1,
                color: 'rgba(0, 255, 233,0)',
              },
            ],
            global: false,
          },
        },
      },
    },
    grid: {
      top: '15%',
      left: '5%',
      right: '5%',
      bottom: '15%',
      // containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisLine: {
          show: true,
        },
        axisLabel: {
          color: 'rgb(183,191,215, 1)',
          padding: [10, 0, 0, 0],
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: xData,
      },
    ],

    yAxis: [
      {
        type: 'value',
        min: 0,
        splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)',
          },
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          show: true,
          margin: 20,
          color: 'rgb(183,191,215)',
        },
        axisTick: {
          show: true,
        },
      },
    ],
    series: [
      {
        name: '博客上传',
        type: 'line',
        // smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: 'circle',
        symbolSize: 15,

        lineStyle: {
          color: '#dc3bce',
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 5,
          shadowOffsetX: 5,
        },
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          fontSize: 15,
        },
        itemStyle: {
          color: '#dc3bce',
          borderColor: '#fff',
          borderWidth: 3,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2,
        },
        tooltip: {
          show: false,
        },
        areaStyle: {
          shadowColor: 'rgba(108,80,243, 0.9)',
          shadowBlur: 20,
          color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(108,80,243,0.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(108,80,243,0)',
                },
              ],
              false,
          ),
        },
        data: yData1,
      },
      {
        name: '图片上传',
        type: 'line',
        // smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: 'circle',
        symbolSize: 15,
        lineStyle: {
          color: '#00ca95',
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 5,
          shadowOffsetX: 5,
        },
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          fontSize: 15,
        },

        itemStyle: {
          color: '#00ca95',
          borderColor: '#fff',
          borderWidth: 3,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2,
        },
        tooltip: {
          show: false,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0,202,149,0.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(0,202,149,0)',
                },
              ],
              false,
          ),
          shadowColor: 'rgba(0,202,149, 0.9)',
          shadowBlur: 20,
        },
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