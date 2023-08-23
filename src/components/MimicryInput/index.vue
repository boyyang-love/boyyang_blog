<script setup lang="ts">
import {Component, computed, markRaw, PropType} from 'vue'
import {NIcon, NInput, NInputNumber, InputProps, InputNumberProps} from 'naive-ui'
import {AirplaneSharp} from '@vicons/ionicons5'

interface Props {
  icon?: Component
  iconSize?: number
  iconColor?: string
  placeholder?: string
  inputType?: 'text' | 'password' | 'textarea' | 'number'
  inputWidth?: string
  moreProps?: InputProps | InputNumberProps
}

const props = withDefaults(defineProps<Props>(), {
  icon: markRaw(AirplaneSharp),
  iconSize: 22,
  placeholder: '',
  inputType: 'text',
  inputWidth: '250px',
})

const modelValue = defineModel<any>()

</script>

<template>
  <div class="input-wrapper">
    <div class="icon">
      <NIcon
          :component="props.icon"
          :size="props.iconSize"
          :color="props.iconColor"
      ></NIcon>
    </div>
    <div class="inner-input user-name">
      <NInput
          :bordered="false"
          :placeholder="props.placeholder"
          :type="props.inputType"
          v-model:value="modelValue as string"
          v-bind="{...props.moreProps}"
          class="input"
          size="large"
      ></NInput>
    </div>
  </div>
</template>

<style scoped lang="less">
.input-wrapper {
  display: flex;
  align-items: center;

  .icon {
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 6px 6px 10px #c4cacf,-6px -6px 10px #ffffff;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inner-input {
    box-sizing: border-box;
    width: v-bind('props.inputWidth');
    border-radius: 5px;
    box-shadow: 6px 6px 10px #c4cacf,
      -6px -6px 10px #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;

    .input {
      border: none;
      background: none;
      margin: 0 auto;
      font-size: 15px;
    }
  }
}

.n-input .n-input-wrapper {
  background: none;
}
</style>