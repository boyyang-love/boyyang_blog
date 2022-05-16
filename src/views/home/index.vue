<!--
 * @Author: boyyang
 * @Date: 2022-04-04 16:29:18
 * @LastEditTime: 2022-05-10 15:41:44
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\views\home\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->
<script lang="ts" setup>
    import Background from '@/components/Background/index.vue'
    import Upload from './components/upload.vue'
    import Cards from './components/cards.vue'
    import { useImages } from './hooks/useImages'

    // hooks
    const { imagesData, submit } = useImages()
</script>

<template>
    <background width="100vw" height="100vh">
        <span class="upload-btn">
            <a href="#" class="nes-badge" @click="imagesData.showModal = true">
                <span class="is-error">Upload</span>
            </a>
        </span>
        <div class="cards-content">
            <div class="card-wrapper" v-for="item in imagesData.list">
                <cards
                    :key="item.ID"
                    :title="item.name"
                    :url="item.url"
                    :des="item.des"
                    :user-name="item.author.username"
                    :avater="item.author.avaterUrl"
                    :time="item.CreatedAt"
                    :isloading="imagesData.isloading"
                ></cards>
            </div>
        </div>
    </background>

    <n-modal v-model:show="imagesData.showModal">
        <div class="upload-container">
            <Upload @submit="submit"></Upload>
        </div>
    </n-modal>
</template>

<style scoped lang="less">
    .cards-content {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: 0 100px 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .card-wrapper {
        max-width: 1300px;
        margin: 20px 0;
    }
    .upload-btn {
        position: sticky;
        z-index: 9;
        top: 10px;
    }
    .upload-container {
        width: 600px;
    }
</style>
