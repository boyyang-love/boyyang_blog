<!--
 * @Author: boyyang
 * @Date: 2022-04-09 17:20:03
 * @LastEditTime: 2022-04-18 16:35:28
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\components\imgCard.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import moment from 'moment'
    import { NImage, NSpin } from 'naive-ui'
    import { CloudDownloadOutlined, ReloadOutlined } from '@vicons/antd'
    import { ref } from 'vue'

    export interface ImageInfoProps {
        url: string
        name?: string
        avaterUrl?: string
        uname?: string
        des?: string
        time?: string
    }

    const props = withDefaults(defineProps<ImageInfoProps>(), {})

    const isShow = ref<boolean>(false)

    const downloadImg = (url: string, name: string) => {
        isShow.value = true
        const link = document.createElement('a')
        link.setAttribute('download', name)
        const image = new Image()
        // 添加时间戳，防止浏览器缓存图片
        image.src = url + '?timestamp=' + new Date().getTime()
        // 设置 crossOrigin 属性，解决图片跨域报错
        image.setAttribute('crossOrigin', 'Anonymous')
        image.onload = () => {
            link.href = getImageBase64(image)
            link.click()
            isShow.value = false
        }
    }

    const getImageBase64 = (image: any) => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d') as any
        ctx.drawImage(image, 0, 0, image.width, image.height)
        // 获取图片后缀名
        const extension = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()
        // 某些图片 url 可能没有后缀名，默认是 png
        return canvas.toDataURL('image/' + extension, 1)
    }
</script>

<template>
    <n-card style="background-color: whitesmoke; padding-bottom: 25px" id="img-card">
        <n-spin :show="isShow">
            <template #icon>
                <n-icon>
                    <ReloadOutlined></ReloadOutlined>
                </n-icon>
            </template>
            <div class="img-name">{{ props.name }}</div>
            <n-image :src="props.url" class="inner-img" />
            <!-- <img :src="props.url" class="inner-img" /> -->
            <n-space style="margin-top: 5px" :wrap="false">
                <n-badge value="999+">
                    <n-avatar
                        round
                        object-fit="cover"
                        :size="60"
                        :src="props.avaterUrl"
                        :fallback-src="props.url"
                    ></n-avatar>
                </n-badge>
                <n-space vertical>
                    <span class="name">{{ props.uname }}</span>
                    <div class="des">{{ props.des }}</div>
                </n-space>
            </n-space>
        </n-spin>
        <span class="download-img">
            <n-icon
                :component="CloudDownloadOutlined"
                :size="25"
                class="download-icon"
                @click="downloadImg(props.url, props.name)"
            ></n-icon>
        </span>
        <span class="time">{{ moment(props.time).format('YYYY-MM-DD : HH:mm') }}</span>
    </n-card>
</template>

<style scoped lang="less">
    .img-name {
        color: black;
        margin-bottom: 5px;
    }

    .name,
    .des,
    .time {
        color: black;
        margin-left: 20px;
    }

    .des {
        box-sizing: border-box;
        max-height: 65px;
        overflow: hidden;
        text-overflow: ellipsis;
        /* 将对象作为弹性伸缩盒子模型显示 */
        display: -webkit-box;
        /* 限制在一个块元素显示的文本的行数 */
        /* -webkit-line-clamp 其实是一个不规范属性，使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；*/
        -webkit-line-clamp: 3;
        /* 设置或检索伸缩盒对象的子元素的排列方式 */
        -webkit-box-orient: vertical;
    }

    .time {
        font-size: 13px;
        position: absolute;
        left: -10px;
        bottom: -2px;
    }

    .download-img {
        position: absolute;
        right: 5px;
        bottom: -5px;
        cursor: pointer;

        .download-icon {
            color: #3d3b4f;

            &:hover {
                color: #489fb4;
            }
        }
    }
</style>
<style lang="less">
    #img-card .inner-img {
        width: 100%;

        img {
            width: 100%;
        }
    }
</style>
