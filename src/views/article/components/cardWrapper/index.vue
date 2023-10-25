<script setup lang="ts">
import {Add} from '@vicons/ionicons5'

interface Props {
  title: string
  showSuffix?: boolean
}

interface Emits {
  (e: 'iconClick'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  showSuffix: false,
})

const emits = defineEmits<Emits>()
</script>

<template>
  <div class="card-wrapper">
    <div class="card-title">
      {{ props.title }}
      <div class="suffix" v-if="props.showSuffix">
        <n-icon size="20" color="#fff" @click="emits('iconClick')">
          <Add></Add>
        </n-icon>
      </div>
    </div>
    <div class="card-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.card-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px;
  background-color: rgba(245, 245, 245, 0.4);
  backdrop-filter: saturate(120%) blur(50px);
  border-radius: 5px;

  .card-title {
    color: whitesmoke;
    font-weight: bold;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #0f172a;
    border-radius: 5px;
    padding: 5px 0;
    margin-bottom: 5px;

    .suffix {
      position: absolute;
      right: 15px;
      cursor: pointer;
    }
  }
}
</style>