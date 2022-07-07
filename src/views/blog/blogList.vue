<!--
 * @Author: boyyang
 * @Date: 2022-07-05 18:22:06
 * @LastEditTime: 2022-07-06 13:56:46
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog\web\src\views\blog\blogList.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { nextTick } from 'vue'
    import Background from '@/components/Background/index.vue'
    import { useBlog } from './hooks/useBlog'

    // hooks
    const { getBlogList, blogData, toBlogDetail } = useBlog()
    nextTick(() => {
        window.VANTA.CELLS({
            el: '#CELLS',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
        })
    })

    getBlogList()
</script>

<template>
    <background width="100vw" height="100vh" id="CELLS">
        <div class="container mx-auto w-full h-full">
            <n-space>
                <div class="w-80" v-for="item in blogData.blogList" :key="item.id">
                    <n-card>
                        <template #header>
                            {{ item.title }}
                        </template>
                        <div class="" @click="toBlogDetail(item.id)">
                            <n-image :src="item.image" :preview-disabled="true"></n-image>
                        </div>
                        {{ item.subtitle }}
                    </n-card>
                </div>
            </n-space>
        </div>
    </background>
</template>

<style scoped></style>
