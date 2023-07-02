<script setup lang="ts">
import {computed, nextTick, onMounted, ref, watchEffect} from 'vue'
import * as echarts from 'echarts'
import {EChartsOption, EChartsType} from 'echarts'

interface Props {
  id: string
  options: EChartsOption
}

const props = defineProps<Props>()
const chartElement = ref<HTMLElement | null>(null)

const myEcharts = ref<EChartsType | null>()

watchEffect(() => {
  if (props.options && myEcharts.value !== null) {
    myEcharts.value?.setOption(props.options)
  }
})


onMounted(() => {
  nextTick(() => {
    myEcharts.value = echarts.init(chartElement.value as HTMLElement)
  })
})

</script>

<template>
  <div class="echarts-wrapper">
    <div class="echart" :id="props.id" ref="chartElement"></div>
  </div>
</template>

<style scoped lang="less">
.echarts-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  .echart {
    width: 100%;
    height: 100%;
  }
}
</style>