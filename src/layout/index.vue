<!--
 * @Author: boyyang
 * @Date: 2022-04-08 21:18:42
 * @LastEditTime: 2022-05-07 11:23:55
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\layout\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<template>
    <div class="layout">
        <back-ground>
            <router-view></router-view>
        </back-ground>
    </div>
</template>

<script lang="ts" setup>
    import BackGround from '@/components/Background/index.vue'
</script>

<style scoped lang="less">
    @import '@/style/index.less';
    .layout {
        width: 100vw;
        height: 100vh;
        background-color: rgb(2, 2, 2);
        // background-color: @theme-color;
    }
</style>
