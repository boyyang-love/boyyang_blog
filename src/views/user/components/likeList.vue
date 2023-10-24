<script lang="ts" setup>
import {computed, ref} from 'vue'
import {ShieldCheckmark, CloseCircle, CheckmarkCircle, Fitness, PaperPlane, Reader} from '@vicons/ionicons5'
import {useUser} from '../hooks'
import {useUserStore} from '@/store/modules/user'
import CubeLoading from '@/components/CubeLoading/index.vue'

const {del} = useUser()

interface Props {
  id: string | number
  label?: string
  status: number // 1待审核 2审核通过 3未通过审核
  url: string
  path: string
}

interface Emits {
  (e: 'submit', type: number): void
}

const props = withDefaults(defineProps<Props>(), {
  status: 1,
})

const emits = defineEmits<Emits>()

const userStore = useUserStore()

const modelValue = defineModel<string>()

const isShowSetting = ref<boolean>(false)

const status = computed(() => {
  let _status = {
    label: '',
    color: 'deeppink',
  }
  switch (props.status) {
    case 1:
      _status = {
        label: props.label ? props.label : '审核中',
        color: 'deeppink',
      }
      break
    case 2:
      _status = {
        label: props.label ? props.label : '审核通过',
        color: '#00e09e',
      }
      break
    case 3:
      _status = {
        label: props.label ? props.label : '未通过审核',
        color: '#f00056',
      }
      break
    default:
      break
  }

  return _status
})
</script>

<template>
  <div class="like-list-wrapper" id="like-list-wrapper">
    <div class="img-wrapper">
      <n-image
          class="img"
          object-fit="cover"
          lazy
          :src="props.url"
          :show-toolbar="false"
      >
        <template #placeholder>
          <div class="loading">
            <CubeLoading></CubeLoading>
          </div>
        </template>
      </n-image>
    </div>

    <div :style="{'--color': status.color}" class="status-wrapper">
      <div class="status-point"></div>
      <div class="status-text">{{ status.label }}</div>
      <div class="setting">
        <n-space size="small">
          <div>
            <n-tooltip trigger="hover">
              <template #trigger>
                <div>
                  <n-icon
                      v-if="props.status === 3"
                      size="20"
                      class="icon"
                      @click="isShowSetting = true"
                  >
                    <Reader></Reader>
                  </n-icon>
                </div>
              </template>
              查看驳回原因
            </n-tooltip>
          </div>
          <div>
            <n-popconfirm
                trigger="hover"
                positive-text="提交"
                negative-text="算了"
                @positive-click="emits('submit', 1)"
            >
              <template #trigger>
                <div>
                  <n-icon
                      v-if="props.status === 3"
                      size="20"
                      class="icon"
                  >
                    <PaperPlane></PaperPlane>
                  </n-icon>
                </div>
              </template>
              重新提交审核
            </n-popconfirm>
          </div>

          <div>
            <n-popconfirm
                trigger="hover"
                positive-text="删除"
                negative-text="算了"
                @click="del(props.id, props.path)"
            >
              <template #trigger>
                <div>
                  <n-icon
                      :component="CloseCircle as any"
                      size="20"
                      class="icon"
                  ></n-icon>
                </div>
              </template>
              删除图片
            </n-popconfirm>
          </div>
        </n-space>
      </div>
    </div>

    <transition name="setting">
      <div class="setting-wrapper" v-if="isShowSetting">
        <div class="content">
          <div class="input">
            <n-input
                type="textarea"
                :bordered="false"
                placeholder=""
                :autosize="{maxRows: 5, minRows: 5}"
                :value="modelValue as string"
                readonly
            ></n-input>
          </div>
        </div>
        <div class="close">
          <n-icon
              size="20"
              @click="isShowSetting = false"
          >
            <CloseCircle/>
          </n-icon>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="less" scoped>
.like-list-wrapper {
  @statusH: 35px;
  @radius: 5px;
  box-sizing: border-box;
  height: 250px;
  background-color: #e0e6ec;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 5px 5px 6px #c4cacf,
    -5px -5px 5px #ffffff;
  position: relative;

  .img-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - @statusH);
    border-radius: 10px;
    overflow: hidden;
    padding: 10px;

    .img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;

      .loading {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .status-wrapper {
    @wh: 10px;
    box-sizing: border-box;
    width: 100%;
    height: @statusH;
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;

    .status-point {
      box-sizing: border-box;
      width: @wh;
      height: @wh;
      border-radius: 100%;
      background-color: var(--color);
      box-shadow: 2px 2px 3px #c4cacf,
        -2px -2px 3px #ffffff;
    }

    .status-text {
      font-size: 15px;
      color: var(--color);
      padding: 0 10px;
    }

    .setting {
      position: absolute;
      right: 10px;

      .icon {
        cursor: pointer;

        &:hover {
          color: #1fab89;
        }
      }
    }
  }

  .setting-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(17, 17, 17, 0.7);
    backdrop-filter: saturate(10%) filter(10px);
    transition: all 0.4s ease-in-out;

    .content {
      box-sizing: border-box;
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0 10px;

      display: flex;
      align-items: center;


      .input {
        box-sizing: border-box;
        width: 100%;
        padding: 0 20px;

      }

      .bottom-btns {
        position: absolute;
        bottom: 10px;
        right: 35px;
      }
    }

    .close {
      position: absolute;
      top: 4px;
      right: 4px;
      color: #f5f5f5;
      cursor: pointer;

      &:hover {
        color: #e84a5f;
      }
    }


  }
}

.setting-enter-active,
.setting-leave-active {
  transition: all 0.5s ease-in;
}

.setting-enter-from,
.setting-leave-to {
  transform: translateY(-400px);
}
</style>

<style>
#like-list-wrapper .n-image img {
  width: 100%;
  height: 100%;
}
</style>