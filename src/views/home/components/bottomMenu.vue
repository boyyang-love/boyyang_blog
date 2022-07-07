<!--
 * @Author: boyyang
 * @Date: 2022-06-05 13:38:29
 * @LastEditTime: 2022-07-07 13:37:37
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog\web\src\views\home\components\bottomMenu.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { ref } from 'vue'
    import { FormInst } from 'naive-ui'
    import { SyncOutlined, TagsFilled } from '@vicons/antd'
    import { env } from '@/utils/env'
    import { useImages } from '../hooks/useImages'
    import { useBanner } from '../hooks/useBanner'
    import { useUser } from '../hooks/useUser'
    // hooks
    const { imagesData, submit, finish, remove } = useImages()
    const { showAll, bannerData, getBannerList, edit } = useBanner()
    const { userData, editUser } = useUser()
    // domRef
    const formDomRefUpload = ref<FormInst | null>(null)
    const formDomRefEdit = ref<FormInst | null>(null)
</script>

<template>
    <n-space justify="center" align="center" class="relative w-full">
        <div class="h-full absolute left-5 top-1">
            <n-space>
                <n-avatar
                    :size="40"
                    round
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                    @click="userData.isShowEdit = true"
                />
                <div class="flex flex-col">
                    <n-gradient-text :size="13" type="warning">
                        {{ imagesData.userInfo.username }}
                    </n-gradient-text>
                    <n-gradient-text :size="10" type="success">
                        {{ imagesData.userInfo.email }}
                    </n-gradient-text>
                </div>
            </n-space>
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
        <div class="absolute right-12 top-3 h-full">
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
                    :headers="imagesData.headers"
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
                <template #label>
                    <n-icon :component="TagsFilled" :size="25"></n-icon>
                </template>
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
        <n-form ref="formDomRefEdit" :model="bannerData.editData" :rules="bannerData.editDataRules">
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
                <template #label>
                    <n-icon :component="TagsFilled" :size="25"></n-icon>
                </template>
                <n-dynamic-tags v-model:value="bannerData.editData.tags"></n-dynamic-tags>
            </n-form-item>
        </n-form>
    </n-modal>
    <!-- 修改用户信息 -->
    <n-modal
        v-model:show="userData.isShowEdit"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }"
        :show-icon="false"
        :loading="userData.isEditLoading"
        preset="dialog"
        title="用户信息编辑"
        positive-text="确认"
        negative-text="取消"
        @positive-click="editUser"
    >
        <n-form label-placement="left" label-width="80">
            <n-form-item label="昵称：">
                <n-input v-model:value="userData.user.username"></n-input>
            </n-form-item>
            <n-form-item label="邮箱：">
                <n-input :disabled="true" v-model:value="userData.user.email"></n-input>
            </n-form-item>
            <n-form-item label="QQ：">
                <n-input-number
                    :show-button="false"
                    class="w-full"
                    v-model:value="userData.user.qq"
                ></n-input-number>
            </n-form-item>
            <n-form-item label="生日：">
                <n-date-picker
                    v-model:value="userData.user.birthday"
                    type="date"
                    clearable
                    class="w-full"
                />
            </n-form-item>
            <n-form-item label="性别：">
                <n-select
                    v-model:value="userData.user.sex"
                    :options="userData.sexOptions"
                    class="w-full"
                />
            </n-form-item>
            <n-form-item label="博客：">
                <n-input v-model:value="userData.user.blog_url"></n-input>
            </n-form-item>
        </n-form>
    </n-modal>
</template>

<style scoped></style>
