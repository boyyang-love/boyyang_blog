<script setup lang="ts">
import {EChartsOption} from 'echarts'
import EchartsCompt from '@/components/EchartsCompt/index.vue'
import {computed, watchEffect} from 'vue'

interface ChartData {
  categories: string[]
  seriesDataBlog: number[] | string[]
  seriesDataExhibition: number[] | string[]
}

const props = defineProps<ChartData>()

const options = computed<EChartsOption>(() => {
  let xData = props.categories
  let yData1 = props.seriesDataBlog
  let yData2 = props.seriesDataExhibition
  return {
    // color: ['#63caff', '#49beff', 'rgb(2,47,87)', 'rgb(2,47,87)'],
    grid: {
      top: '15%',
      left: '3%',
      right: '3%',
      bottom: '5%',
      containLabel: true,
    },
    legend: {
      show: true,
      icon: 'circle',
      left: 'right',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontSize: 12,
        color: '#6A93B9',
        height: 8,
        rich: {
          a: {
            verticalAlign: 'bottom',
          },
        },
      },
      data: ['博客发布', '图片上传'],
    },
    tooltip: {
      show: true,
      trigger: 'item', // 触发类型。坐标轴触发
      axisPointer: {
        // 坐标轴指示器配置项
        type: 'cross', // 指示器类型 十字准星指示器
        label: {
          // 坐标轴指示器的文本标签
          backgroundColor: '#e6b600', // 文本标签的背景颜色就是x轴y轴上的内容
        },
      },
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#BDD8FB',
          fontSize: 12,
        },
      },
      axisLabel: {
        // interval:0,
        color: '#BDD8FB',
        fontSize: 12,
      },
      axisTick: {
        show: false,
      },
      data: xData,
    },
    yAxis: {
      type: 'value',
      min: 0,
      minInterval: 1,
      nameTextStyle: {
        fontSize: 12,
        color: '#BDD8FB',
        align: 'center',
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
        },
      },
      splitArea: {show: false},
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        fontFamily: 'Bebas',
        color: '#BDD8FB',
      },
    },
    series: [
      {
        type: 'line',
        smooth: true, // 是否曲线
        name: '博客发布', // 图例对应类别
        data: yData1, // 纵坐标数据
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,  //右
            y: 0,  //下
            x2: 0,  //左
            y2: 1,  //上
            colorStops: [
              {
                offset: 0.1,
                color: '#dc3bce', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#987295', // 100% 处的颜色
              },
            ],
          },
        },
      },
      {
        type: 'line',
        smooth: true,
        name: '图片上传',
        data: yData2,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,  //右
            y: 0,  //下
            x2: 0,  //左
            y2: 1,  //上
            colorStops: [
              {
                offset: 0.1,
                color: '#01B3E4', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#86DCF300', // 100% 处的颜色
              },
            ],
          },
        },
      },
    ],
  }
})


</script>

<template>
  <div class="publish-chart">
    <EchartsCompt id="publish-chart" :options="options"></EchartsCompt>
  </div>
</template>

<style scoped lang="less">
.publish-chart {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>