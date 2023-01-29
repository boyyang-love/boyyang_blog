<!--
 * @Author: boyyang
 * @Date: 2022-12-28 14:30:33
 * @LastEditTime: 2023-01-09 10:07:51
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\login\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
import bgImg from "@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg"
import { BackGround } from '@/components/Background'
import signInAndUp from "./components/signInAndUp.vue"
</script>

<template>
    <BackGround width="100vw" height="100vh" :url="bgImg" type="image">
        <signInAndUp></signInAndUp>
    </BackGround>
</template>

<style scoped>

</style>