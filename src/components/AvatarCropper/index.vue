<script setup lang="ts">
import VuePictureCropper, {cropper} from 'vue-picture-cropper'
import Btn from '@/components/MimicryBtn/index.vue'
import {UploadFileInfo} from 'naive-ui'
import {ref, watch} from 'vue'
import {env} from '@/utils/env'
import {ExitSharp, Refresh} from '@vicons/ionicons5'

interface ImagesInfo {
  file: File
  blob: Blob
}

interface Props {
  defaultImg: string
}

interface Emits {
  (e: 'submit', imagesInfo: ImagesInfo): void
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()

const imgDataURL = ref<string>('')
const previewURL = ref<string>('')
const isShowCropper = ref<boolean>(false)

watch(
    () => props.defaultImg,
    (n_val: string) => {
      previewURL.value = `${env.VITE_APP_IMG_URL}/${n_val}`
    },
    {
      immediate: true,
    },
)

const fileChange = (data: {
  event: Event
  fileList: UploadFileInfo[]
  file: UploadFileInfo
}) => {
  const read = new FileReader()
  read.readAsDataURL(data.file.file as Blob)
  read.onload = e => {
    imgDataURL.value = e.target?.result as string
    isShowCropper.value = true
  }
}

const submit = () => {
  if (!cropper) return

  const p1 = cropper.getBlob()
  const p2 = cropper.getFile()

  Promise.all([p1, p2]).then(res => {
    const read = new FileReader()
    read.readAsDataURL(res[0] as Blob)
    read.onload = e => {
      previewURL.value = e.target?.result as string
      emits('submit', {blob: res[0] as Blob, file: res[1] as File})
      isShowCropper.value = false
    }
  })

}

const reset = () => {
  if (!cropper) return
  cropper.reset()
}

const cancel = () => {
  isShowCropper.value = false
}
</script>

<template>
  <div class="avatar-cropper-wrapper">
    <div>
      <n-upload
          action="#"
          :max="1"
          :show-file-list="false"
          :default-upload="false"
          :file-list="[]"
          @change="fileChange"
          align="center"
      >
        <div class="avatar-wrapper">
          <n-avatar
              :src="previewURL"
              :size="125"
              :bordered="true"
              :round="true"
              object-fit="cover"
          ></n-avatar>
        </div>
      </n-upload>
    </div>
  </div>

  <n-modal
      :show="isShowCropper"
  >
    <div class="dialog-content-wrapper">
      <VuePictureCropper
          :img="imgDataURL"
          :boxStyle="{
                    width: '600px',
                    height: '345px',
                    backgroundColor: '#f8f8f8',
                    margin: 'auto',
          }"
          :options="{
                    viewMode: 2,
                    dragMode: 'crop',
                    aspectRatio: 1,
          }"
          :preset-mode="{
            mode: 'round',
            width: 250,
            height: 250,
          }"

      >
      </VuePictureCropper>
      <div class="modal-bottom">
        <div class="btn-wrapper">
          <Btn
              :error-btn="false"
              :btn-icon="Refresh"
              text="重置"
              @btn-click="reset"
          ></Btn>
        </div>
        <div class="btn-wrapper">
          <Btn
              :btn-icon="ExitSharp"
              :error-btn="false"
              text="取消"
              @btn-click="cancel"
          ></Btn>
        </div>
        <div class="btn-wrapper">
          <Btn
              :error-btn="false"
              text="确定"
              @btn-click="submit"
          ></Btn>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<style scoped lang="less">
.avatar-cropper-wrapper {
  box-sizing: border-box;
  border-radius: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  --webkit-box-sizing: border-box;
  align-items: center;

  .avatar-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.dialog-content-wrapper {
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  background: linear-gradient(145deg, #cfd6dc, #f6ffff);

  .modal-bottom {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 0 0;
    display: flex;
    justify-content: space-around;

    .btn-wrapper {
      width: 100%;
      padding: 0 10px;
    }
  }
}
</style>