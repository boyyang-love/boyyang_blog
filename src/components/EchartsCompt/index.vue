<script setup lang="ts">
import {nextTick, onMounted, ref, watch, watchEffect} from 'vue'
import {ECElementEvent, ECharts, EChartsOption, EChartsType} from 'echarts'
import {useEcharts} from '@/hooks/useEcharts'

interface Props {
  id: string
  options: EChartsOption
}

interface Emits {
  (e: 'chartClick', p: ECElementEvent): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const chartElement = ref<HTMLElement | null>(null)
const instance = ref<ECharts | null>()

watch(
    () => props.options,
    (n_options) => {
      instance.value && instance.value?.setOption(n_options)
    },
)

onMounted(() => {
  nextTick(() => {
    instance.value = useEcharts(
        chartElement.value,
        props.options,
        (e) => {
          emits('chartClick', e)
        })
  })
})


</script>

<template>
  <div class="echarts-wrapper">
    <div
        ref="chartElement"
        class="echart"
        :id="props.id"
    ></div>
  </div>
</template>

<style scoped lang="less">
.echarts-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px;

  .echart {
    width: 100%;
    height: 100%;
  }
}
</style>