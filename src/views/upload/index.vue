<script lang="ts" setup>
import {onMounted, ref, computed} from 'vue'
import Wow from 'wow.js'
import {CloudUploadOutlined} from '@vicons/antd'
import {PrintText} from '@/components/PrintText'
import {UploadInst} from 'naive-ui'
import {useUpload} from './hooks/useUpload'

const {uploadData, handleUploadChange, submit} = useUpload()
const uploadRef = ref<UploadInst | null>(null)

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
    scrollContainer: '#upload-container', // optional scroll container selector, otherwise use window
  })

  wow.init()
})
</script>

<template>
  <div id="upload-container" class="upload-wrapper container m-auto">
    <div class="top-banner">
      <PrintText title="壁纸上传"></PrintText>
    </div>
    <n-spin :show="uploadData.isShowSpin">
      <template #description>上传中请稍后</template>
      <div class="upload-content wow fadeInUpBig" data-wow-delay="1s">
        <div class="title-wrapper">
          <div class="title">
            <span>图片名称：</span>
            <n-input
                v-model:value="uploadData.submit.title"
                :autosize="{
                                minRows: 2,
                                maxRows: 5,
                            }"
                class="input"
                clearable
                maxlength="50"
                placeholder="请输入壁纸名称"
                show-count
                size="small"
                style="max-width: 300px; min-width: 300px"
                type="textarea"
            />
          </div>
          <div class="sub-title">
            <span>图片描述：</span>
            <n-input
                v-model:value="uploadData.submit.des"
                :autosize="{
                                minRows: 3,
                                maxRows: 5,
                            }"
                class="input"
                clearable
                maxlength="150"
                placeholder="请输入壁纸描述"
                show-count
                size="small"
                style="max-width: 300px; min-width: 300px; color: whitesmoke"
                type="textarea"
            />
          </div>
        </div>
        <div class="upload">
          <div v-if="uploadData.previewUrl != ''" class="img-preview">
            <img :src="uploadData.previewUrl" alt=""/>
          </div>
          <n-upload
              ref="uploadRef"
              v-model:file-list="uploadData.fileList"
              :default-upload="false"
              :disabled="false"
              :max="1"
              action="#"
              class="upload-btn"
              directory-dnd
              @change="handleUploadChange"
          >
            <n-upload-dragger v-if="uploadData.previewUrl == ''">
              <div style="margin-bottom: 12px">
                <n-icon :depth="3" size="48">
                  <CloudUploadOutlined/>
                </n-icon>
              </div>
              <n-text style="font-size: 16px">点击或者拖动文件到该区域来上传</n-text>
              <n-p depth="3" style="margin: 8px 0 0 0">
                请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
              </n-p>
            </n-upload-dragger>
          </n-upload>
        </div>

        <div class="upload-btn">
          <n-button
              color="#8a2be2"
              size="large"
              text-color="#fff"
              @click="submit(uploadRef)"
          >
            <template #icon>
              <n-icon color="white" size="20">
                <CloudUploadOutlined/>
              </n-icon>
            </template>
            上传
          </n-button>
        </div>
      </div>
    </n-spin>
  </div>
</template>

<style lang="less" scoped>
.upload-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .top-banner {
    box-sizing: border-box;
    width: 100%;
    height: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .upload-content {
    padding: 50px 200px;
    background-color: rgba(57, 62, 70, 0.9);
    margin: 0 100px 50px;
    border-radius: 5px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);

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

    .upload {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .upload-btn {
        display: flex;
        flex-direction: column;
        // height: 100%;
        // width: 550px;
        // border: 2px solid whitesmoke;
        // background-color: rgba(57, 62, 70, 0.5);
      }

      .img-preview {
        box-sizing: border-box;
        height: 350px;
        margin-top: 20px;
        border-radius: 5px;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
        overflow: hidden;
        z-index: 999;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
</style>
