<!--
 * @Author: boyyang
 * @Date: 2023-01-18 11:04:10
 * @LastEditTime: 2023-03-06 15:11:13
 * @LastEditors: boyyang
 * @Description: 后台管理
 * @FilePath: \blog_web\src\views\admin\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>

import {computed} from 'vue'
interface adminProps {
    name: string
    age: number
}

const props = withDefaults(defineProps<adminProps>(), {
    name: "yang",
    age: 18,
})

const nn = computed(() => props.name)

</script>

<template>
    <div class="ttt">11111111111111111111</div>
    <div class="test">
        <div></div>
    </div>
</template>

<style scoped lang="less">

</style>
