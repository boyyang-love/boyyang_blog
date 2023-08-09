<script lang="ts" setup>
import {computed} from 'vue'

interface Props {
  label?: string
  status: number // 1待审核 2审核通过 3未通过审核
  url: string
}

const props = withDefaults(defineProps<Props>(), {
  status: 1,
})

const status = computed(() => {
  let _status = {
    label: '',
    color: 'deeppink',
  }
  switch (props.status) {
    case 1:
      _status = {
        label: props.label ? props.label : '审核中',
        color: 'deeppink',
      }
      break
    case 2:
      _status = {
        label: props.label ? props.label : '审核通过',
        color: '#00e09e',
      }
      break
    case 3:
      _status = {
        label: props.label ? props.label : '未通过审核',
        color: '#f00056',
      }
      break
    default:
      break
  }

  return _status
})
</script>

<template>
  <div class="like-list-wrapper">
    <div class="img-wrapper">
      <img alt="" :src="url">
    </div>

    <div :style="{'--color': status.color}" class="status-wrapper">
      <div class="status-point"></div>
      <div class="status-text">{{ status.label }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.like-list-wrapper {
  @statusH: 35px;
  @radius: 5px;
  box-sizing: border-box;
  height: 250px;
  background-color: #e0e6ec;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 5px 5px 6px #c4cacf,
    -5px -5px 5px #ffffff;

  .img-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - @statusH);
    padding: 10px;

    img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      box-shadow: 5px 5px 6px #c4cacf,
        -6px -6px 6px #ffffff;
      object-fit: cover;
      border-radius: 10px;
    }
  }

  .status-wrapper {
    @wh: 10px;
    box-sizing: border-box;
    width: 100%;
    height: @statusH;
    display: flex;
    align-items: center;
    padding: 0 10px;

    .status-point {
      box-sizing: border-box;
      width: @wh;
      height: @wh;
      border-radius: 100%;
      background-color: var(--color);
      box-shadow: 2px 2px 3px #c4cacf,
        -2px -2px 3px #ffffff;
    }

    .status-text {
      font-size: 15px;
      color: var(--color);
      padding: 0 10px;
    }
  }
}
</style>