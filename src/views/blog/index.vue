<!--
 * @Author: boyyang
 * @Date: 2022-04-08 20:47:58
 * @LastEditTime: 2022-07-06 13:23:16
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog\web\src\views\blog\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { nextTick, ref } from 'vue'
    import { FormInst } from 'naive-ui'
    import { env } from '@/utils/env'
    import { CloudUploadOutlined } from '@vicons/antd'
    import Background from '@/components/Background/index.vue'
    import { useBlog } from './hooks/useBlog'
    // hooks
    const {
        blogData,
        blogRules,
        blogSubmit,
        submitPostive,
        submitNegative,
        headers,
        finish,
        remove,
    } = useBlog()

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
    <!-- 博客图片上传 -->
    <n-modal
        v-model:show="blogData.uploadModal"
        preset="dialog"
        title="上传博客背景图片"
        positive-text="发布"
        negative-text="取消"
        @positive-click="submitPostive"
        @negative-click="submitNegative"
    >
        <n-upload
            directory-dnd
            :action="env.VITE_APP_IMG_UPLOAD_URL"
            :headers="headers"
            :max="1"
            accept="image/*"
            @finish="finish"
            @remove="remove"
            class="mt-2"
        >
            <n-upload-dragger>
                <div style="margin-bottom: 12px; margin-top: 10px;">
                    <n-icon size="48" :depth="3">
                        <CloudUploadOutlined />
                    </n-icon>
                </div>
                <n-text style="font-size: 16px">点击或者拖动文件到该区域来上传</n-text>
                <n-p depth="3" style="margin: 8px 0 0 0">
                    请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
                </n-p>
            </n-upload-dragger>
        </n-upload>
    </n-modal>
</template>

<style scoped></style>
