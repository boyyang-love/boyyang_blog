<script setup lang="ts">
import {Component, markRaw} from 'vue'
import {CheckmarkCircle, CloseCircle, Rocket} from '@vicons/ionicons5'

interface Props {
  btnIcon?: Component
  text?: string
  errorBtn?: boolean
  errorBtnIcon?: Component
  infoBtnIcon?: Component
  width?: string
  isError?: boolean
}

interface Emit {
  (e: 'btnClick'): void
}

const props = withDefaults(defineProps<Props>(), {
  btnIcon: Rocket,
  errorBtn: true,
  errorBtnIcon: markRaw(CloseCircle),
  normalBtnIcon: markRaw(CheckmarkCircle),
  width: '100%',
  isError: true,
})

const emit = defineEmits<Emit>()

const btnClick = () => {
  emit('btnClick')
}
</script>

<template>
  <div class="btn-wrapper">
    <div class="btn" @click="btnClick">
      <NIcon
          :component="props.btnIcon as any"
          :size="24"
      ></NIcon>
      <span v-if="props.text">
        {{ props.text }}
      </span>
    </div>
    <div class="error-btn" v-if="props.errorBtn">
      <NIcon
          :component="props.isError ? CloseCircle as any : CheckmarkCircle as any"
          :color="props.isError ? '#c2516b' : '#23D69B'"
          :size="24"
      ></NIcon>
    </div>
  </div>
</template>

<style scoped lang="less">
.btn-wrapper {
  box-sizing: border-box;
  width: v-bind('props.width');
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .btn {
    box-sizing: border-box;
    width: calc(100% - 65px);
    height: 45px;
    border-radius: 5px;
    box-shadow: 6px 6px 10px #c4cacf,-6px -6px 10px #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #393e46;
    font-weight: bolder;
  }

  .error-btn {
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 6px 6px 10px #c4cacf,-6px -6px 10px #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
  }
}
</style>