<!--
 * @Author: boyyang
 * @Date: 2023-01-30 15:03:27
 * @LastEditTime: 2023-02-07 11:02:00
 * @LastEditors: boyyang
 * @Description: 图片发布
 * @FilePath: \blog_web\src\views\publish\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { UploadFileInfo } from 'naive-ui'
    import { AccountBookFilled } from '@vicons/antd'
    import { upload } from '@/api/upload'

    const handleChange = (options: {
        file: UploadFileInfo
        fileList: Array<UploadFileInfo>
        event?: Event
    }) => {
        let params = {
            file_name: options.file.name,
            file: options.file.file as File,
        }

        upload(params).then(res => {
            console.log(1111111)
        })
    }
</script>

<template>
    <div>
        <n-upload
            multiple
            directory-dnd
            action="#"
            :max="5"
            :default-upload="false"
            @change="handleChange"
        >
            <n-upload-dragger>
                <div style="margin-bottom: 12px">
                    <n-icon size="48" :depth="3">
                        <AccountBookFilled />
                    </n-icon>
                </div>
                <n-text style="font-size: 16px">点击或者拖动文件到该区域来上传</n-text>
                <n-p depth="3" style="margin: 8px 0 0 0">
                    请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
                </n-p>
            </n-upload-dragger>
        </n-upload>
    </div>
</template>

<style scoped></style>
