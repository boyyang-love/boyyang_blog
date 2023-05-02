<script lang="ts" setup>
import {onMounted} from 'vue'
import Wow from 'wow.js'
// components
import {AccountBookFilled, SendOutlined, SyncOutlined} from '@vicons/antd'
import PrintText from '@/components/PrintText/index.vue'
// hooks
import {usePublishData, usePublishMethods} from './hooks/usePublish'

const {BlogForm, BlogFormMore, isLoading, isShowDialog} = usePublishData()
const {beforeBlogSubmit, blogSubmit, uploadChange} = usePublishMethods()


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
    <div id="publish-container" class="publish-wrapper container m-auto">
        <div class="top-banner">
            <PrintText title="上传博客"></PrintText>
        </div>
        <div class="bottom-upload wow fadeInUpBig" data-wow-delay="1s">
            <div class="title-wrapper">
                <div class="title">
                    <span>标题：</span>
                    <n-input
                            v-model:value="BlogForm.title"
                            :autosize="{minRows: 2,maxRows: 5,}"
                            class="input"
                            clearable
                            maxlength="50"
                            placeholder="请输入博客标题"
                            show-count
                            size="small"
                            style="max-width: 300px; min-width: 300px"
                            type="textarea"
                    />
                </div>
                <div class="sub-title">
                    <span>描述：</span>
                    <n-input
                            v-model:value="BlogForm.des"
                            :autosize="{minRows: 3,maxRows: 5,}"
                            class="input"
                            clearable
                            maxlength="150"
                            placeholder="请输入博客描述"
                            show-count
                            size="small"
                            style="max-width: 300px; min-width: 300px; color: whitesmoke"
                            type="textarea"
                    />
                </div>
            </div>
            <v-md-editor v-model="BlogForm.content" height="750px"></v-md-editor>

            <div class="upload-btn">
                <n-button
                        :loading="isLoading"
                        color="#8a2be2"
                        size="large"
                        text-color="#fff"
                        @click="beforeBlogSubmit"
                >
                    <template #icon>
                        <n-icon color="white" size="20">
                            <SendOutlined/>
                        </n-icon>
                    </template>
                    上传
                </n-button>
            </div>
        </div>
    </div>
    <n-modal
            v-model:show="isShowDialog"
            :loading="isLoading"
            negative-text="算了"
            positive-text="确认"
            preset="dialog"
            title="更多信息"
            @positive-click="blogSubmit"
    >
        <n-form>
            <n-form-item label="图片">
                <n-upload
                        :default-file-list="BlogFormMore.fileList"
                        :default-upload="false"
                        :disabled="false"
                        :max="1"
                        action="#"
                        list-type="image-card"
                        @change="uploadChange"
                />
            </n-form-item>
            <n-form-item label="标签">
                <n-select
                        v-model:value="BlogFormMore.tags"
                        :options="BlogFormMore.tagsOptions"
                        filterable
                        multiple
                        tag
                />
            </n-form-item>
        </n-form>
    </n-modal>
</template>

<style lang="less" scoped>
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
    width: 500px;

    .images-wrapper {
        box-sizing: border-box;
        max-height: 400px;
        overflow-y: auto;

        img {
            margin-bottom: 10px;
        }
    }
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
