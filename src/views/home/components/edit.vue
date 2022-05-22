<!--
 * @Author: boyyang
 * @Date: 2022-05-21 18:03:48
 * @LastEditTime: 2022-05-21 18:26:10
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\components\edit.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { useImages } from '../hooks/useImages'

    // hooks
    const { imagesData, editSubmit } = useImages()
</script>

<template>
    <div class="upload-container nes-container is-dark with-title">
        <p class="title">
            <span class="text">图片修改</span>
        </p>
        <div class="flex justify-center">
            <n-image :src="imagesData.edit.url" :width="500"></n-image>
        </div>
        <div class="nes-field">
            <label for="name_field">
                <span class="text">图片名称</span>
            </label>
            <input type="text" id="name_field" class="nes-input is-success is-dark" v-model="imagesData.edit.title" />
        </div>
        <div class="nes-field">
            <label for="name_field">
                <span class="text">图片描述</span>
            </label>
            <textarea
                maxlength="100"
                id="textarea_field"
                class="nes-textarea is-error is-dark"
                v-model="imagesData.edit.des"
            ></textarea>
        </div>
        <n-space vertical>
            <div class="mt-3">
                <button type="button" class="upload-btn nes-btn is-success" @click="editSubmit">
                    <span class="text">确定</span>
                </button>
            </div>
        </n-space>
    </div>
</template>

<style scoped lang="less">
    .upload-btn {
        width: 510px;
    }
</style>
