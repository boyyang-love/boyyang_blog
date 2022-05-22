<!--
 * @Author: boyyang
 * @Date: 2022-05-08 14:22:16
 * @LastEditTime: 2022-05-20 23:14:26
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\components\upload.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import pixDialog from '@/components/pixDialog/index.vue'
    import { env } from '@/utils/env'
    import { useUserStore } from '@/store/modules/user'
    import { UploadFileInfo } from 'naive-ui'
    import { reactive } from 'vue'
    interface UploadEmits {
        (e: 'submit', value: any): void
    }
    const emits = defineEmits<UploadEmits>()
    const userStore = useUserStore()
    const headers = {
        token: userStore.getToken,
    }
    const uploadData = reactive({
        file_name: '',
        name: '',
        des: '',
        url: '',
        showModal: false,
        modalText: '',
    })
    const finish = (options: { file: UploadFileInfo; event?: ProgressEvent }) => {
        let res = JSON.parse((event?.target as any).response as any)
        console.log(res)
        uploadData.url = res.data.url
        uploadData.file_name = res.data.fileName
    }
    const submit = () => {
        if (uploadData.name.trim() == '' || uploadData.des.trim() == '' || uploadData.url.trim() == '') {
            uploadData.showModal = true
            uploadData.modalText = '图片名称，图片描述和图片为必填项'
            return
        }
        emits('submit', uploadData)
    }
</script>

<template>
    <div class="upload-container nes-container is-dark with-title">
        <p class="title">
            <span class="text">图片上传</span>
        </p>
        <div class="nes-field">
            <label for="name_field">
                <span class="text">图片名称</span>
            </label>
            <input type="text" id="name_field" class="nes-input is-success is-dark" v-model="uploadData.name" />
        </div>
        <div class="nes-field">
            <label for="name_field">
                <span class="text">图片描述</span>
            </label>
            <textarea
                maxlength="100"
                id="textarea_field"
                class="nes-textarea is-error is-dark"
                v-model="uploadData.des"
            ></textarea>
        </div>
        <n-space vertical >
            <n-upload
                show-download-button
                :action="env.VITE_APP_API_URL + '/api/upload'"
                :headers="headers"
                :max="1"
                accept="image/*"
                @finish="finish"
                class="mt-5"
            >
                <div>
                    <button type="button" class="upload-btn nes-btn is-error">
                        <span class="text">上传图片</span>
                    </button>
                </div>
            </n-upload>
            <div>
                <button type="button" class="upload-btn nes-btn is-success" @click="submit">
                    <span class="text">确定</span>
                </button>
            </div>
        </n-space>
    </div>
    <pix-dialog v-model:is-show="uploadData.showModal" :content="uploadData.modalText"></pix-dialog>
</template>

<style scoped lang="less">
    .upload-btn{
        width: 510px;
    }
    .text {
        font-family: zpix;
    }
</style>
