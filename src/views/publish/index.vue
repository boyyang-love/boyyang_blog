<!--
 * @Author: boyyang
 * @Date: 2023-01-30 15:03:27
 * @LastEditTime: 2023-02-13 16:54:31
 * @LastEditors: boyyang
 * @Description: 图片发布
 * @FilePath: \blog_web\src\views\publish\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<script lang="ts" setup>
    import { onMounted } from 'vue'
    import { UploadFileInfo } from 'naive-ui'
    import Wow from 'wow.js'
    import { AccountBookFilled, SendOutlined, SyncOutlined } from '@vicons/antd'
    import { upload } from '@/api/upload'
    import { PrintText } from '@/components/PrintText'

    // hooks
    import { usePublish } from './hooks/usePublish'

    const {
        publishData,
        submit,
        getList,
        renderLabel,
        renderSingleSelectTag,
        paginationOpt,
        handleScroll,
        more,
    } = usePublish()

    onMounted(() => {
        const wow = new Wow({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 50, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true, // act on asynchronously loaded content (default is true)
            callback: function () {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: '#publish-container', // optional scroll container selector, otherwise use window
        })

        wow.init()
    })
</script>

<template>
    <div class="publish-wrapper container m-auto" id="publish-container">
        <div class="top-banner">
            <PrintText title="上传博客"></PrintText>
        </div>
        <div class="bottom-upload wow fadeInUpBig" data-wow-delay="1s">
            <div class="title-wrapper">
                <div class="title">
                    <span>标题：</span>
                    <n-input
                        placeholder="请输入博客标题"
                        type="textarea"
                        size="small"
                        style="max-width: 300px; min-width: 300px"
                        :autosize="{
                            minRows: 2,
                            maxRows: 5,
                        }"
                        maxlength="50"
                        show-count
                        clearable
                        class="input"
                        v-model:value="publishData.submit.title"
                    />
                </div>
                <div class="sub-title">
                    <span>描述：</span>
                    <n-input
                        placeholder="请输入博客描述"
                        type="textarea"
                        size="small"
                        style="max-width: 300px; min-width: 300px; color: whitesmoke"
                        :autosize="{
                            minRows: 3,
                            maxRows: 5,
                        }"
                        maxlength="150"
                        show-count
                        clearable
                        class="input"
                        v-model:value="publishData.submit.subtitle"
                    />
                </div>
            </div>
            <v-md-editor v-model="publishData.submit.text" height="750px"></v-md-editor>

            <div class="upload-btn">
                <n-button color="#8a2be2" text-color="#fff" size="large" @click="submit">
                    <template #icon>
                        <n-icon color="white" size="20">
                            <SendOutlined />
                        </n-icon>
                    </template>
                    上传
                </n-button>
            </div>
        </div>
    </div>

    <!-- modal  -->
    <n-modal
        v-model:show="publishData.modal.show"
        preset="dialog"
        title="请选择一张图片"
        positive-text="确认"
        negative-text="取消"
        @positive-click="submit(true)"
        @negative-click="submit(false)"
    >
        <div class="modal-wrapper">
            <n-select
                size="100"
                v-model:value="publishData.modal.value"
                :options="publishData.modal.options"
                :render-label="renderLabel"
                :render-tag="renderSingleSelectTag"
                :reset-menu-on-options-change="false"
            >
                <template #action>
                    <div class="bottom-text">
                        <n-icon
                            :component="SyncOutlined"
                            v-if="publishData.modal.isMore"
                            @click="more"
                            :class="{ 'circle-ani': publishData.modal.isMoreLoading }"
                            size="20"
                        ></n-icon>
                        <span v-if="publishData.modal.isMoreLoading">图片获取中·····</span>
                        <span v-else>
                            {{ publishData.modal.isMore ? '点击加载更多图片' : '没有更多图片了' }}
                        </span>
                    </div>
                </template>
            </n-select>
        </div>
    </n-modal>
</template>

<style scoped lang="less">
    .publish-wrapper {
        box-sizing: border-box;
        width: 100%;
        padding: 0 150px 100px;
        .top-banner {
            box-sizing: border-box;
            width: 100%;
            height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .bottom-upload {
            background-color: rgba(57, 62, 70, 0.9);
            box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);

            padding: 25px;
            border-radius: 5px;

            .title-wrapper {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .title,
                .sub-title {
                    color: whitesmoke;
                    text-shadow: 3px 3px 3px #393e46;
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                    font-weight: 400;
                    margin-bottom: 15px;

                    span {
                        white-space: nowrap;
                    }

                    .input {
                        background-color: rgba(57, 62, 70, 0.5);
                        box-shadow: 3px 3px 3px #393e46;
                        border: 1px solid whitesmoke;
                    }
                }
            }

            .upload-btn {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 25px;

                color: whitesmoke;
            }
        }
    }

    .modal-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        // height: 500px;
    }

    .bottom-text {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .circle-ani {
        animation: ani 2s ease-in-out infinite;

        @keyframes ani {
            0% {
                transform: rotateZ(0deg);
            }
            100% {
                transform: rotateZ(360deg);
            }
        }
    }
</style>
