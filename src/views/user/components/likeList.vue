<script lang="ts" setup>
import {computed, ref} from 'vue'
import {ShieldCheckmark, CloseCircle, CheckmarkCircle} from '@vicons/ionicons5'

interface Props {
  label?: string
  status: number // 1待审核 2审核通过 3未通过审核
  url: string
}

interface Emits {
  (e: 'submit', type: number): void
}

const props = withDefaults(defineProps<Props>(), {
  status: 1,
})

const emits = defineEmits<Emits>()

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
  <div class="like-list-wrapper">
    <div class="img-wrapper">
      <img alt="" :src="url">
    </div>

    <div :style="{'--color': status.color}" class="status-wrapper">
      <div class="status-point"></div>
      <div class="status-text">{{ status.label }}</div>
      <div class="setting" v-if="props.status != 2">
        <n-icon
            :component="ShieldCheckmark as any"
            size="25"
            class="icon"
            @click="isShowSetting = true"
        ></n-icon>
      </div>
    </div>

    <transition name="setting">
      <div class="setting-wrapper" v-if="isShowSetting">
        <div class="content">
          <div class="input">
            <n-input
                type="textarea"
                :bordered="false"
                placeholder="请输入驳回原因"
                :autosize="{maxRows: 5, minRows: 5}"
                v-model:value="modelValue as string"
            ></n-input>
          </div>
          <div class="bottom-btns">
            <n-space align="end">
              <n-button color="#1fab89" size="small" @click="emits('submit', 2); isShowSetting = false">
                <template #icon>
                  <n-icon>
                    <CheckmarkCircle/>
                  </n-icon>
                </template>
                通过
              </n-button>
              <n-button color="#f73859" size="small" @click="emits('submit', 3); isShowSetting = false">
                <template #icon>
                  <n-icon>
                    <CloseCircle/>
                  </n-icon>
                </template>
                驳回
              </n-button>
            </n-space>
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

    img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      box-shadow: 5px 5px 6px #c4cacf,
        -6px -6px 6px #ffffff;
      object-fit: cover;
      border-radius: 10px;
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