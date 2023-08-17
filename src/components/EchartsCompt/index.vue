<script setup lang="ts">
import {nextTick, onMounted, PropType, ref, watch} from 'vue'
import {ECElementEvent, ECharts, EChartsOption} from 'echarts'
import {useEcharts} from './hooks/useEcharts'
import Erd from 'element-resize-detector'

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
let instance: ECharts | null = null

watch(
    () => props.options,
    (n_options) => {
      instance && instance.clear()
      instance && instance.setOption(n_options, true)
    },
)

onMounted(() => {
  nextTick(() => {
    instance = useEcharts(
        chartElement.value,
        props.options,
        (e) => {
          emits('chartClick', e)
        },
    )

    const erd = Erd()
    erd.listenTo(document.getElementById('echarts-wrapper') as HTMLElement, () => {
      instance?.resize()
    })
  })
})

</script>

<template>
  <div class="echarts-wrapper" id="echarts-wrapper">
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