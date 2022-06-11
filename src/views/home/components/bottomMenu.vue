<!--
 * @Author: boyyang
 * @Date: 2022-06-05 13:38:29
 * @LastEditTime: 2022-06-11 19:40:35
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\components\bottomMenu.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { CSSProperties, ref } from 'vue'
    import { FormInst } from 'naive-ui'
    import { CloudUploadOutlined, SyncOutlined } from '@vicons/antd'
    import { env } from '@/utils/env'
    import { useUserStore } from '@/store/modules/user'
    import { useImages } from '../hooks/useImages'
    import { useBanner } from '../hooks/useBanner'

    // hooks
    const { imagesData, submit, finish, remove } = useImages()
    const { showAll, bannerData, getBannerList, edit } = useBanner()

    const formDomRefUpload = ref<FormInst | null>(null)
    const formDomRefEdit = ref<FormInst | null>(null)

    const userStore = useUserStore()
    const headers = {
        token: userStore.getToken,
    }

    const railStyle = ({ focused, checked }: { focused: boolean; checked: boolean }) => {
        const style: CSSProperties = {}
        if (checked) {
            style.background = '#d03050'
            if (focused) {
                style.boxShadow = '0 0 0 2px #d0305040'
            }
        } else {
            style.background = '#2080f0'
            if (focused) {
                style.boxShadow = '0 0 0 2px #2080f040'
            }
        }
        return style
    }
</script>

<template>
    <n-space justify="center" align="center" class="relative w-full">
        <div class="h-full flex justify-content-center">
            <n-tooltip trigger="hover">
                <template #trigger>
                    <n-icon
                        :component="CloudUploadOutlined"
                        :size="25"
                        class="cursor-pointer"
                        color="white"
                        @click="imagesData.showModal = true"
                    ></n-icon>
                </template>
                上传作品
            </n-tooltip>
        </div>
        <div class="h-full flex justify-content-center">
            <n-spin
                :show="bannerData.isLoading"
                size="small"
                class="h-full flex justify-content-center"
            >
                <template #icon>
                    <n-icon>
                        <SyncOutlined />
                    </n-icon>
                </template>
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-icon
                            :component="SyncOutlined"
                            :size="25"
                            @click="showAll"
                            class="cursor-pointer mt-2"
                            color="white"
                        ></n-icon>
                    </template>
                    切换
                </n-tooltip>
            </n-spin>
        </div>
        <div class="absolute right-4 top-2 h-full">
            <n-pagination
                :item-count="bannerData.count"
                :page-size="bannerData.limit"
                size="small"
                v-model:page="bannerData.page"
                @update:page="getBannerList"
            />
        </div>
    </n-space>

    <!-- 上传 -->
    <n-modal
        v-model:show="imagesData.showModal"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }"
        :show-icon="false"
        preset="dialog"
        title="作品上传"
        positive-text="确认"
        negative-text="取消"
        @positive-click="submit(formDomRefUpload)"
    >
        <n-form
            ref="formDomRefUpload"
            :model="imagesData.uploadData"
            :rules="imagesData.uploadRules"
        >
            <n-form-item path="url">
                <n-upload
                    :action="env.VITE_APP_API_URL + '/api/upload'"
                    :headers="headers"
                    :max="1"
                    list-type="image-card"
                    accept="image/*"
                    @finish="finish"
                    @remove="remove"
                />
            </n-form-item>
            <n-form-item label="图片名称：" path="name">
                <n-input
                    v-model:value="imagesData.uploadData.name"
                    maxlength="30"
                    show-count
                    type="textarea"
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
            <n-form-item label="标签：">
                <n-dynamic-tags v-model:value="imagesData.uploadData.tags" />
            </n-form-item>
        </n-form>
    </n-modal>
    <!-- 修改 -->
    <n-modal
        v-model:show="bannerData.isShowEdit"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }"
        :show-icon="false"
        :loading="bannerData.isEditLoading"
        preset="dialog"
        title="作品编辑"
        positive-text="确认"
        negative-text="取消"
        @positive-click="edit(formDomRefEdit)"
    >
        <n-form ref="formDomRefEdit" :model="bannerData.editData" :rules="imagesData.uploadRules">
            <n-form-item path="url">
                <n-image :src="bannerData.editData.url"></n-image>
            </n-form-item>
            <n-form-item label="图片名称：" path="name">
                <n-input
                    v-model:value="bannerData.editData.name"
                    maxlength="30"
                    show-count
                    type="textarea"
                    placeholder="请输入图片名称"
                ></n-input>
            </n-form-item>
            <n-form-item label="图片描述：" path="des">
                <n-input
                    v-model:value="bannerData.editData.des"
                    maxlength="50"
                    show-count
                    type="textarea"
                    placeholder="请输入图片描述"
                ></n-input>
            </n-form-item>
            <n-form-item label="标签：">
                <n-dynamic-tags v-model:value="bannerData.editData.tags"></n-dynamic-tags>
            </n-form-item>
        </n-form>
    </n-modal>
</template>

<style scoped></style>
