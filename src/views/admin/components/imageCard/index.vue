<script setup lang="ts">
import {Create, Information, Close, Fitness} from '@vicons/ionicons5'
import moment from 'moment'
import {ref} from 'vue'

interface Props {
  isShow: boolean
  isShowDel: boolean
  isShowApproved: boolean
  isShowRejected: boolean
  url: string
  name: string
  imageInfo: ImageInfo
}

interface ImageInfo {
  name: string
  username: string
  date: number
  size: number
  resolution: string
}

interface Emits {
  (e: 'delClick', status: boolean): void

  (e: 'detailClick', status: boolean): void

  (e: 'approved', status: number): void

  (e: 'rejected', status: number, reason: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const reason = ref<string>('')

</script>

<template>
  <div class="image-card-wrapper" id="admin-image-card-wrapper">
    <n-image
        class="img"
        object-fit="cover"
        lazy
        :src="props.url"
    >
      <template #placeholder>
        <div class="loading">
          <n-icon
              class="icon"
              color="#f00056"
              size="55"
          >
            <Fitness></Fitness>
          </n-icon>
        </div>
      </template>
    </n-image>
    <div class="action-wrapper">
      <div class="name">
        <n-ellipsis
            style="max-width: 250px"
        >
          {{ props.name }}
        </n-ellipsis>
      </div>
      <div class="right-btn">
        <n-space
            justify="center"
            :item-style="{display: 'flex'}"
        >
          <n-popconfirm
              trigger="hover"
              positive-text="通过"
              negative-text="再想想"
              @positive-click="emits('approved', 2)"
              v-if="props.isShowApproved"
          >
            <template #trigger>
              <n-icon
                  :size="20"
                  color="#ffffff"
                  class="icon"
              >
                <Create></Create>
              </n-icon>
            </template>
            是否通过审核？
          </n-popconfirm>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon
                  :size="20"
                  color="#ffffff"
                  class="icon"
                  @click="emits('delClick', true)"
                  v-if="props.isShowRejected"
              >
                <Close></Close>
              </n-icon>
            </template>
            驳回
          </n-tooltip>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon
                  :size="20"
                  color="#ffffff"
                  class="icon"
                  @click="emits('detailClick', true)"
              >
                <Information></Information>
              </n-icon>
            </template>
            查看图片详情信息
          </n-tooltip>
        </n-space>
      </div>
    </div>
    <div class="image-size">
      {{ props.imageInfo.resolution.replace('-', '*') }}
    </div>
    <transition name="reject">
      <div class="reject-wrapper" v-show="props.isShowDel">
        <div class="close">
          <n-icon
              :size="24"
              @click="emits('delClick', false)"
          >
            <Close></Close>
          </n-icon>
        </div>
        <div class="input-wrapper">
          <n-input
              class="input"
              type="textarea"
              placeholder="请输入原因"
              :bordered="false"
              :autosize="{
                minRows: 5,
              }"
              v-model:value="reason"
          ></n-input>
        </div>

        <div class="btns-container">
          <n-space>
            <div class="btn exit" @click="emits('delClick', false)">算了</div>
            <div class="btn reject" @click="emits('rejected', 3, reason)">驳回</div>
          </n-space>
        </div>
      </div>
    </transition>
  </div>

  <n-modal
      :show="props.isShow"
      preset="dialog"
      title="详细信息"
      @close="emits('detailClick', false)"
      @mask-click="emits('detailClick', false)"
  >
    <div class="modal-content">
      <div class="img">
        <n-image
            class="img"
            object-fit="cover"
            :src="props.url"
        ></n-image>
      </div>
      <n-divider style="margin: 0">
        <span style="color: #ffffff">
        图片详细信息
        </span>
      </n-divider>
      <div class="image-detail-wrapper">
        <div class="msg">
          <div class="label">name</div>
          <div class="text">{{ props.name }}</div>
        </div>
        <div class="msg">
          <div class="label">username</div>
          <div class="text">{{ props.imageInfo.username }}</div>
        </div>
        <div class="msg">
          <div class="label">date</div>
          <div class="text">{{ moment(props.imageInfo.date * 1000).format('yyyy-MM-DD HH:mm:ss') }}</div>
        </div>
        <div class="msg">
          <div class="label">resolution</div>
          <div class="text">{{ props.imageInfo.resolution || '--' }}</div>
        </div>
        <div class="msg">
          <div class="label">size(M)</div>
          <div class="text">{{ props.imageInfo.size ? (props.imageInfo.size / 1024 / 1024).toFixed(2) : '--' }}</div>
        </div>

      </div>
    </div>
  </n-modal>

</template>

<style scoped lang="less">
.image-card-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 5px;

  .img {
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    .loading {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
    }
  }

  .action-wrapper {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0 0 5px 5px;

    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: saturate(120%) blur(100px);
    padding: 0 10px;

    .name {
      font-size: 12px;
      color: whitesmoke;
      font-weight: bold;
      position: relative;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    }

    .right-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 10px;
    }

    .icon {
      cursor: pointer;
    }
  }

  .image-size {
    position: absolute;
    font-size: 12px;
    top: 5px;
    left: 5px;
    color: whitesmoke;
  }

  .reject-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: saturate(180%) blur(5px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .btns-container {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      position: absolute;
      bottom: 10px;
      right: 20px;

      .btn {
        color: whitesmoke;
        padding: 2px 15px;
        border: 1px solid whitesmoke;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
      }

      .reject {
      }
    }

    .close {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 5px;
      right: 5px;
      color: whitesmoke;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      transform-origin: center;

      &:hover {
        transform: rotateZ(180deg);
      }
    }

    .input-wrapper {
      width: 80%;

      .input {
        background-color: #eeeeee;
      }
    }
  }
}

.modal-content {
  box-sizing: border-box;
  background-color: #393e46;

  .image-detail-wrapper {
    padding: 0 5px 5px;

    .msg {
      border: 1px solid whitesmoke;
      border-radius: 5px;
      margin-bottom: 10px;
      padding: 5px;
      display: flex;
      position: relative;

      .label {
        font-size: 13px;
        font-weight: bold;
        color: whitesmoke;
        position: absolute;
        top: -10px;
        right: 5px;
        padding: 0 5px;
        background-color: #393e46;
      }

      .text {
        font-size: 13px;
        color: #eeeeee;
        padding: 5px;
      }
    }
  }
}

.reject-enter-active,
.reject-leave-active {
  transition: all 0.4s ease-in-out;
}

.reject-enter-from,
.reject-leave-to {
  opacity: 0;
  transform: scale(0.01);
}
</style>

<style>
#admin-image-card-wrapper .n-image img {
  width: 100%;
  height: 100%;
}
</style>