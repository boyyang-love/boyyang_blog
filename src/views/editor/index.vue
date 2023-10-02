<script setup lang="ts">
import {PaperPlane, Power} from '@vicons/ionicons5'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {useConfig} from './hooks/useConfig'
import {useEditor} from './hooks/useEditor'
import {onMounted} from 'vue'
import Wow from 'wow.js'

const {toolbarConfig, editorConfig, insertedImages} = useConfig()
const {
  editorRef,
  html,
  isShowDialog,
  articleData,
  handleCreated,
  handleUploadChange,
  submit,
  back,
  beforeUpload,
} = useEditor()

onMounted(() => {
  const wow = new Wow({
    boxClass: 'wow', // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset: 10, // distance to the element when triggering the animation (default is 0)
    mobile: true, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    callback: function () {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: '#editor-wrapper', // optional scroll container selector, otherwise use window
  })

  wow.init()

})

</script>

<template>
  <div class="editor-wrapper" id="editor-wrapper">
    <div class="editor wow bounceIn">
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          mode="default"
      />
      <Editor
          style="height: 650px; overflow: hidden;"
          v-model="html"
          :defaultConfig="editorConfig"
          mode="default"
          @onCreated="handleCreated"
      />
    </div>
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
                @click="beforeUpload"
            >
              <PaperPlane></PaperPlane>
            </n-icon>
          </template>
          发布文章
        </n-tooltip>

        <n-tooltip
            trigger="hover"
            placement="left"
        >
          <template #trigger>
            <n-icon
                :size="34"
                class="icon"
                @click="back(insertedImages)"
            >
              <Power></Power>
            </n-icon>
          </template>
          返回
        </n-tooltip>
      </n-space>
    </div>
    <n-modal
        v-model:show="isShowDialog"
        preset="dialog"
        title="文章发布"
        negative-text="取消"
        positive-text="发布"
        @positive-click="submit(insertedImages)"
    >
      <div class="dialog-wrapper">
        <n-space
            vertical
            size="large"
        >
          <n-input
              type="textarea"
              placeholder="请输入文章标题"
              :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
              maxlength="60"
              show-count
              v-model:value="articleData.title"
          ></n-input>

          <n-input
              type="textarea"
              placeholder="请输入文章描述"
              :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
              maxlength="100"
              show-count
              v-model:value="articleData.sub_title"
          ></n-input>

          <n-select
              v-model:value="articleData.tags"
              placeholder="请输入文章tags"
              filterable
              multiple
              tag
          />

          <n-upload
              action="#"
              list-type="image-card"
              :max="1"
              @change="handleUploadChange"
              :default-upload="false"
              :default-file-list="articleData.preview_url"
          />
        </n-space>
      </div>
    </n-modal>
  </div>
</template>

<style scoped lang="less">
.editor-wrapper {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  position: relative;
  background: linear-gradient(145deg, rgb(80, 174, 169), rgb(59, 64, 114));

  .editor {
    border: 1px solid cadetblue;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
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

  .dialog-wrapper {

  }
}
</style>