<script lang="ts" setup>
import {Props} from './Props'

const Props = withDefaults(defineProps<Props>(), {
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