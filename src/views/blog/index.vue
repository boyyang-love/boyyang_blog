<!--
 * @Author: boyyang
 * @Date: 2022-04-08 20:47:58
 * @LastEditTime: 2022-07-05 17:17:29
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog\web\src\views\blog\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { nextTick, ref } from 'vue'
    import { FormInst } from 'naive-ui'
    import Background from '@/components/Background/index.vue'
    import { useBlog } from './hooks/useBlog'
    // hooks
    const { blogData, blogRules, blogSubmit } = useBlog()

    // 渲染背景
    nextTick(() => {
        window.VANTA.WAVES({
            el: '#WAVES',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
        })
    })

    // domRef
    const blogDomRef = ref<FormInst | null>(null)
</script>

<template>
    <background width="100vw" height="100vh" id="WAVES">
        <div class="container mx-auto w-full h-full flex flex-col justify-center items-center">
            <div class="w-full">
                <n-form :model="blogData" :rules="blogRules" ref="blogDomRef">
                    <n-form-item label="标题" path="title">
                        <n-input
                            placeholder="请输入文章标题"
                            maxlength="150"
                            show-count
                            v-model:value="blogData.title"
                        ></n-input>
                    </n-form-item>
                    <n-form-item label="描述" path="des">
                        <n-input
                            placeholder="请输入文章描述"
                            type="textarea"
                            maxlength="255"
                            show-count
                            v-model:value="blogData.des"
                        ></n-input>
                    </n-form-item>
                    <n-form-item label="内容" path="content">
                        <v-md-editor v-model="blogData.content" height="60vh"></v-md-editor>
                    </n-form-item>
                </n-form>
            </div>
            <div class="button mt-2">
                <n-space>
                    <n-button type="error" @click="$router.back()">退出</n-button>
                    <n-button type="success" @click="blogSubmit(blogDomRef)">发布</n-button>
                </n-space>
            </div>
        </div>
    </background>
</template>

<style scoped></style>
