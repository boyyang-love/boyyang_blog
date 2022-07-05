<!--
 * @Author: boyyang
 * @Date: 2022-07-05 18:00:44
 * @LastEditTime: 2022-07-05 18:21:31
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog\web\src\views\blog\blogDetail.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { nextTick } from 'vue'
    import Background from '@/components/Background/index.vue'

    nextTick(() => {
        window.VANTA.FOG({
            el: '#FOG',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
        })
    })
</script>

<template>
    <background width="100vw" height="100vh" id="FOG">
        <div class="container mx-auto w-full h-full">
            
        </div>
    </background>
</template>

<style scoped></style>
