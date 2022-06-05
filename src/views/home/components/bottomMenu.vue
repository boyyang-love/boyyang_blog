<!--
 * @Author: boyyang
 * @Date: 2022-06-05 13:38:29
 * @LastEditTime: 2022-06-05 18:30:41
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\components\bottomMenu.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { ref } from 'vue'
    import { FormInst } from 'naive-ui'
    import { CloudUploadOutlined, CodeSandboxOutlined } from '@vicons/antd'
    import { env } from '@/utils/env'
    import { useUserStore } from '@/store/modules/user'
    import { useImages } from '../hooks/useImages'
    import { useBanner } from '../hooks/useBanner'

    // hooks
    const { imagesData, submit, finish } = useImages()
    const { showAll } = useBanner()

    const formDomRef = ref<FormInst | null>(null)

    const userStore = useUserStore()
    const headers = {
        token: userStore.getToken,
    }
</script>

<template>
    <n-space justify="center" align="center">
        <n-icon
            :component="CloudUploadOutlined"
            :size="25"
            class="cursor-pointer"
            @click="imagesData.showModal = true"
        ></n-icon>
        <n-icon
            :component="CodeSandboxOutlined"
            :size="25"
            class="cursor-pointer"
            @click="showAll"
        ></n-icon>
    </n-space>
    <n-modal
        v-model:show="imagesData.showModal"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
        preset="dialog"
        title="图片上传"
        positive-text="确认"
        negative-text="取消"
        @positive-click="submit(formDomRef)"
    >
        <n-form ref="formDomRef" :model="imagesData.uploadData" :rules="imagesData.uploadRules">
            <n-form-item path="url">
                <n-upload
                    :action="env.VITE_APP_API_URL + '/api/upload'"
                    :headers="headers"
                    :max="1"
                    list-type="image-card"
                    accept="image/*"
                    @finish="finish"
                />
            </n-form-item>
            <n-form-item label="图片名称：" path="name">
                <n-input
                    v-model:value="imagesData.uploadData.name"
                    maxlength="20"
                    show-count
                    type="text"
                    placeholder="请输入图片名称"
                ></n-input>
            </n-form-item>
            <n-form-item label="图片描述：" path="des">
                <n-input
                    v-model:value="imagesData.uploadData.des"
                    maxlength="50"
                    show-count
                    type="textarea"
                    placeholder="请输入图片描述"
                ></n-input>
            </n-form-item>
        </n-form>
    </n-modal>
</template>

<style scoped></style>
