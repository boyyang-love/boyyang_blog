<!--
 * @Author: boyyang
 * @Date: 2022-04-10 17:00:17
 * @LastEditTime: 2022-04-18 16:34:59
 * @LastEditors: boyyang
 * @Description: 图片发布
 * @FilePath: \drawingBed\src\views\home\components\publish.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import { env } from '@/utils/env'
    import { ref } from 'vue'

    // hooks
    import { publishData, submit, finish } from '../hooks/usePublish'

    // domRef
    const publisRef = ref<any>(null)
</script>

<template>
    <n-modal
        v-model:show="publishData.showModel"
        preset="dialog"
        title="图片上传"
        content="你确认?"
        positive-text="确认"
        negative-text="算了"
        :show-icon="false"
        @positive-click="submit(publisRef)"
        @negative-click="publishData.showModel = false"
        style="width: 465px"
    >
        <div class="upload-box">
            <n-form :model="publishData.form" :rules="publishData.rules" ref="publisRef">
                <n-form-item path="url">
                    <n-upload
                        :action="env.VITE_APP_API_URL + '/api/upload'"
                        :headers="publishData.headers"
                        :max="1"
                        accept="image/*"
                        list-type="image-card"
                        @finish="finish"
                    />
                </n-form-item>
                <n-form-item label="作品名称" path="name">
                    <n-input
                        :maxlength="30"
                        :show-count="true"
                        clearable
                        placeholder="给作品一个名称吧"
                        v-model:value="publishData.form.name"
                    ></n-input>
                </n-form-item>
                <n-form-item label="作品描述" path="description">
                    <n-input
                        :maxlength="200"
                        :show-count="true"
                        clearable
                        type="textarea"
                        placeholder="简单描述一下作品吧"
                        v-model:value="publishData.form.description"
                    ></n-input>
                </n-form-item>
            </n-form>
        </div>
    </n-modal>
</template>

<style scoped lang="less">
    .upload-box {
        // display: flex;
        // justify-content: center;
        max-height: 400px;
        overflow: auto;
    }
</style>
