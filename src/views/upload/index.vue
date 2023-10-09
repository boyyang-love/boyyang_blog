<script lang="ts" setup>
import {onMounted, ref, computed} from 'vue'
import Wow from 'wow.js'
import {CloudUploadOutlined} from '@vicons/antd'
import {CloseCircle, Text, Power} from '@vicons/ionicons5'
import {PrintText} from '@/components/PrintText'
import {UploadInst} from 'naive-ui'
import Input from '@/components/MimicryInput/index.vue'
import Btn from '@/components/MimicryBtn/index.vue'
import TagsInput from '@/components/MimicryTag/index.vue'
import {useUpload} from './hooks/useUpload'
import BackGround from '@/components/Background/index.vue'
import {env} from '@/utils/env'
import {useUserStore} from '@/store/modules/user'

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

const userStore = useUserStore()
const background = computed(() => {
  const url = userStore.info.background_image
  return `${env.VITE_APP_IMG_URL}/${url}`
})
</script>

<template>
  <BackGround
      :url="background"
      class="wow slideInDown"
      height="100vh"
      width="100vw"
  >
    <div id="upload-container" class="upload-wrapper container m-auto">
      <div class="top-banner">
        <PrintText title="壁纸上传"></PrintText>
      </div>
      <n-spin :show="uploadData.isShowSpin">
        <template #description>上传中请稍后</template>
        <div class="upload-content wow fadeInUpBig" data-wow-delay="1s">
          <div class="title-wrapper">
            <div class="title">
              <Input
                  v-model="uploadData.submit.title"
                  input-width="350px"
                  icon-color="rgb(0, 0, 0)"
                  :icon="Text"
                  :more-props="{
                    placeholder: '请输入壁纸名称',
                    autosize: {minRows: 3, maxRows: 5},
                    maxlength: 100,
                    showCount: true,
                    clearable: true,
                    type: 'textarea',
                    themeOverrides: {
                      textColor: 'rgba(0,0,0,1)',
                      placeholderColor: 'rgba(0,0,0,1)',
                    }
                }"
              ></Input>
            </div>
            <div class="sub-title">
              <Input
                  v-model="uploadData.submit.des"
                  input-width="350px"
                  icon-color="rgb(0, 0, 0)"
                  :icon="Text"
                  :more-props="{
                    placeholder: '请输入壁纸描述',
                    autosize: {minRows: 3, maxRows: 5},
                    maxlength: 150,
                    showCount: true,
                    clearable: true,
                    type: 'textarea',
                    themeOverrides: {
                      textColor: 'rgba(0,0,0,1)',
                      placeholderColor: 'rgba(0,0,0,1)',
                    }
                }"
              >
              </Input>
            </div>

          </div>
          <div class="upload">
            <transition name="preview">
              <div v-if="uploadData.previewUrl != ''" class="img-preview">
                <img :src="uploadData.previewUrl" alt=""/>
                <div class="close">
                  <n-icon
                      :component="CloseCircle as any"
                      size="22"
                      @click="
                    uploadData.previewUrl = '';
                    uploadData.fileList = [];
                    uploadData.submit.title = '';
                    uploadData.submit.des = '';
                    "
                  ></n-icon>
                </div>
              </div>
            </transition>

            <n-upload
                v-if="uploadData.previewUrl === ''"
                ref="uploadRef"
                v-model:file-list="uploadData.fileList"
                :default-upload="false"
                :disabled="false"
                :max="1"
                action="#"
                class="upload-box"
                directory-dnd
                @change="handleUploadChange"
            >
              <div
                  class="upload-dragger"
                  v-if="uploadData.previewUrl === ''"
              >
                <n-upload-dragger>
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
              </div>
            </n-upload>
          </div>
          <div class="upload-tags">
            <n-select
                class="select"
                placeholder="请选择分类"
                multiple
                v-model:value="uploadData.tags"
                :options="uploadData.tagsOptions"
                :consistent-menu-width="false"
            />
          </div>
          <div class="upload-btn">
            <Btn
                @btn-click="submit(uploadRef)"
                :btn-icon="CloudUploadOutlined"
                :error-btn="false"
                width="300px"
                text="上传"
            ></Btn>
          </div>
        </div>
      </n-spin>
      <div class="submit-wrapper wow bounceInRight">
        <n-space vertical align="center" size="large">
          <n-tooltip
              trigger="hover"
              placement="left"
          >
            <template #trigger>
              <n-icon
                  :size="34"
                  class="icon"
                  @click="$router.back()"
              >
                <Power></Power>
              </n-icon>
            </template>
            返回
          </n-tooltip>
        </n-space>
      </div>
    </div>
  </BackGround>

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
    background: linear-gradient(145deg, #cfd6dc, #f6ffff);
    margin: 0 100px 50px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;

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

      .upload-box {
        box-sizing: border-box;
        width: 500px;
        height: 220px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        box-shadow: 7px 7px 10px #c4cacf,
          -7px -7px 10px #ffffff;
      }

      .upload-btn {
        display: flex;
        flex-direction: column;
      }

      .img-preview {
        box-sizing: border-box;
        width: 500px;
        height: 250px;
        margin: 20px 0;
        border-radius: 5px;
        overflow: hidden;
        z-index: 999;
        position: relative;
        padding: 15px;
        box-shadow: 7px 7px 10px #c4cacf,
          -7px -7px 10px #ffffff;


        .close {
          position: absolute;
          top: 1px;
          right: 1px;
          cursor: pointer;

          &:hover {
            color: darkred;
          }
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
      }
    }

    .upload-tags {
      display: flex;
      margin: 15px 0;
      justify-content: center;

      .select {
        width: 350px;
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

  .submit-wrapper {
    box-sizing: border-box;
    position: absolute;
    right: 10px;
    bottom: 10px;

    .icon {
      border: 1px solid whitesmoke;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      padding: 5px;
      cursor: pointer;
      font-size: 24px;
      color: whitesmoke;
    }
  }
}

.preview-enter-active,
.preview-leave-active {
  transition: all .4s ease-in-out;
  animation-delay: .3s;
}

.preview-enter-from,
.preview-leave-to {
  opacity: 0;
  transform: translateX(250px);
}

.upload-enter-active,
.upload-leave-active {
  transition: all .3s ease-in-out;
}

.upload-enter-from,
.upload-leave-to {
  opacity: 0;
  transform: translateX(-250px);
}
</style>
