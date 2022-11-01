<!--
 * @Author: boyyang
 * @Date: 2022-04-04 22:44:53
 * @LastEditTime: 2022-09-15 16:32:17
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog_web\src\views\404\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { useRouter } from 'vue-router'
    import { BackGround } from '@/components/Background'
    import bgImage from '@/assets/森林冒险的少女画画5k壁纸_彼岸图网.jpg'
    import img404 from '@/assets/404.png'

    const router = useRouter()
    const back = () => {
        router.replace('/')
    }
</script>

<template>
    <back-ground :url="bgImage" width="100vw" height="100vh">
        <div class="container w-full h-full mx-auto">
            <div class="h-full flex flex-col justify-center items-center">
                <n-image :src="img404" height="300" width="400" :preview-disabled="true"></n-image>
                <n-button type="success" @click="back">~~~~~返回首页~~~~~</n-button>
            </div>
        </div>
    </back-ground>
</template>

<style scoped lang="less"></style>
