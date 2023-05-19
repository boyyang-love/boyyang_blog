<script lang="ts" setup>
import type {F404Props} from './Props'

const Props = withDefaults(defineProps<F404Props.Props>(), {
  name: 'boyyang'
})

console.log(Props.name)
</script>

<template>
  <div class="container">
    <div class="name">
      <div class="age"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  .name {
    .age {
    }
  }
}
</style>