<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import Wow from 'wow.js'

// import { init } from './hooks/three'
import PrintText from '@/components/PrintText/index.vue'
import ImgCard from './components/imgCard.vue'

// hooks
import {useImagesData, useImagesMethods} from './hooks/useImages'

const {imagesData} = useImagesData()
const {getList, pageChange, pageSizeChange} = useImagesMethods()


const wrapper = ref<Element | null>(null)

onMounted(() => {
    const wow = new Wow({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 100, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function () {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: '#images-container', // optional scroll container selector, otherwise use window
    })

    wow.init()

    getList()
})
</script>

<template>
    <div id="images-container" ref="wrapper" class="images-wrapper container m-auto">
        <div class="top-banner">
            <PrintText title="壁纸"></PrintText>
        </div>

        <div class="images-content">
            <ImgCard
                    v-for="(item, i) in imagesData.list"
                    :key="item.id"
                    :class="[
                    'wow',
                    i % 2 == 0 ? 'fadeInDownBig' : i % 3 == 0 ? 'fadeInRightBig' : 'fadeInLeftBig',
                ]"
                    :name="item.title"
                    :url="item.cover"
                    class="wow fadeInDownBig"
            ></ImgCard>
        </div>
        <div class="pagination wow bounceInUp">
            <n-pagination
                    v-model:item-count="imagesData.count"
                    v-model:page="imagesData.page"
                    v-model:page-size="imagesData.limit"
                    v-model:page-sizes="imagesData.pageSizes"
                    show-size-picker
                    @update:page-size="pageSizeChange"
                    @update:page="pageChange"
            />
        </div>
    </div>
</template>

<style lang="less" scoped>
.images-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;

    &:hover {
        will-change: scroll-position;
    }

    .top-banner {
        width: 100%;
        height: 650px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .images-content {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        padding: 50px 150px;
    }

    .pagination {
        width: 100%;
        display: flex;
        justify-content: center;

        padding: 50px 0;
    }
}
</style>
