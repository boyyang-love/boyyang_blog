<script lang="ts" setup>
import {onMounted} from 'vue'
import Wow from 'wow.js'
// components
import {CloudUploadOutlined, SendOutlined} from '@vicons/antd'
import PrintText from '@/components/PrintText/index.vue'
import Input from '@/components/MimicryInput/index.vue'
// hooks
import {usePublishData, usePublishMethods} from './hooks/usePublish'
import Btn from '@/components/MimicryBtn/index.vue'
import {Text} from '@vicons/ionicons5'

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
          <Input
              v-model="BlogForm.title"
              input-width="350px"
              icon-color="rgb(0, 0, 0)"
              :icon="Text"
              :more-props="{
                autosize: {minRows: 3,maxRows: 5},
                clearable: true,
                maxlength: 50,
                showCount: true,
                placeholder: '请输入博客标题',
                type: 'textarea',
          }"
          ></Input>
        </div>
        <div class="sub-title">
          <Input
              v-model="BlogForm.des"
              input-width="350px"
              icon-color="rgb(0, 0, 0)"
              :icon="Text"
              :more-props="{
                autosize: {minRows: 3,maxRows: 5},
                clearable: true,
                maxlength: 50,
                showCount: true,
                placeholder: '请输入博客描述',
                type: 'textarea',
          }"
          ></Input>
        </div>
      </div>

      <div class="md-editor">
        <v-md-editor v-model="BlogForm.content" height="750px"></v-md-editor>
      </div>

      <div class="upload-btn">
        <Btn
            @btn-click="beforeBlogSubmit"
            :btn-icon="SendOutlined"
            :error-btn="false"
            width="300px"
            text="上传"
        ></Btn>
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
      <n-form-item>
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
            placeholder="请添加标签"
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
    background: linear-gradient(145deg, #cfd6dc, #f6ffff);
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
        //text-shadow: 3px 3px 3px #393e46;
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

    .md-editor {
      padding: 15px;
      border-radius: 15px;
      box-shadow: 7px 7px 10px #c4cacf,
        -7px -7px 10px #ffffff;
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
