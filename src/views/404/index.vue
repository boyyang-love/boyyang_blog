<script lang="ts" setup>
import Input from './input.vue'
import type {F404Props} from './Props'
import {ref} from "vue"

const name = ref<any>({name: 'yang', age: 10})

console.log(name.value)
</script>

<template>
  <div class="container">
    <div class="name">
      <div class="age" style="color: whitesmoke;">2222222{{ name }}</div>

      <Input v-model="name"></Input>
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