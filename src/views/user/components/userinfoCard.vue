<script lang="ts" setup>
import {ref, markRaw, Component, computed, onMounted} from 'vue'
import {Rocket, Create} from '@vicons/ionicons5'
import {RollbackOutlined} from '@vicons/antd'
import {env} from '@/utils/env'
import {updateUserInfo} from '@/api/user'
import {useUserStore} from '@/store/modules/user'
import {useUserMethods, useUserData} from '../hooks'

const {getExhibitionList} = useUserMethods()
const {userData} = useUserData()

interface TabListItem {
  icon: Component
  label: string
  size: number
  num: number
  id: number
  color: string
}

interface Props {
  approved: number
  in_review: number
  review_rjection: number
}

interface Emit {
  (e: 'tabChange', id: number): void
}

const userStore = useUserStore()

const emit = defineEmits<Emit>()
const props = withDefaults(defineProps<Props>(), {
  approved: 0,
  in_review: 0,
  review_rjection: 0,
})

const showOrEdit = ref<boolean>(false)
const tab = ref<number>(1)
const motto = ref<string>('')

const tabList = computed<TabListItem[]>(() => [
  //   1待审核 2审核通过 3未通过审核
  {
    icon: markRaw(Create) as any,
    label: '审核中',
    size: 20,
    color: 'deeppink',
    num: props.in_review,
    id: 1,
  },
  {
    icon: markRaw(Rocket),
    label: '审核通过',
    size: 20,
    color: '#00e09e',
    num: props.approved,
    id: 2,
  },
  {
    icon: markRaw(RollbackOutlined),
    label: '未通过审核',
    size: 20,
    color: '#cc1515',
    num: props.review_rjection,
    id: 3,
  },
])

const rightList = computed(() => {

  return [
    {
      label: '关注数',
      num: userStore.detail.follows,
    },
    {
      label: '收藏数',
      num: userStore.detail.likes,
    },
    {
      label: '获赞数',
      num: userStore.detail.thumbs_up,
    },
  ]
})

const backgroundImg = computed(() => {
  return `url('${env.VITE_APP_IMG_URL}/${userStore.info.background_image}')`
})

const tabListClick = (tabItem: TabListItem, i: number) => {
  tab.value = i
  emit('tabChange', i)
}

const saveMotto = () => {
  showOrEdit.value = false
  if (userStore.info.motto === motto.value) {
    return
  }

  let params = {
    uid: userStore.info.uid,
    motto: motto.value,

  }

  updateUserInfo(params).then(() => {
    userStore.$patch((state) => {
      state.info.motto = motto.value
    })
  })
}

onMounted(() => {
  motto.value = userStore.info.motto || '点击修改签名'
  tab.value = userData.type
  getExhibitionList(userData.type)

})
</script>

<template>
  <div class="userinfo-card-wrapper">
    <div class="top">
      <div class="userinfo">
        <div class="user-avater">
          <img
              alt="avater"
              :src="`${env.VITE_APP_IMG_URL}/${userStore.info.avatar_url}`"
          >
        </div>
        <div class="user-motto-name">
          <div class="user-name">{{ userStore.info.username }}</div>
          <div class="user-motto">
            <n-input
                v-if="showOrEdit"
                v-model:value="motto"
                :autofocus="true"
                type="text"
                @blur="saveMotto"
                width="550px"
            ></n-input>
            <div
                v-else
                @click="showOrEdit = true"
                class="text"
            >
              {{ userStore.info.motto || '点击修改签名' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <n-space align="center" justify="center">
          <div
              v-for="(item, i) in tabList"
              :key="item.label"
              :class="['icon-wrapper', item.id == tab ? 'tab-active': '']"
              @click="tabListClick(item, item.id)"
          >
            <n-icon
                :component="item.icon as any"
                class="icon"
                :size="item.size"
                :color="item.color"
            ></n-icon>
            <span class="text" :style="{color: item.color}">{{ item.label }}</span>
            <span class="num">{{ item.num }}</span>
          </div>
        </n-space>
      </div>
      <div class="bottom-right">
        <n-space>
          <div class="right-list" v-for="item in rightList" :key="item.label">
            <span class="label">{{ item.label }}</span>
            <span class="num">{{ item.num }}</span>
          </div>
        </n-space>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.userinfo-card-wrapper {
  @bottomH: 45px;
  @borderRadius: 5px;
  width: 100%;
  height: 550px;
  background-color: rgba(67, 62, 70, 0.5);
  border-radius: @borderRadius;

  .top {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - @bottomH);
    background-image: v-bind(backgroundImg);
    background-size: cover;
    background-position: center top;
    transition: all .2s cubic-bezier(.4, 0, .2, 1);
    display: flex;
    align-items: flex-end;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    border: 2px solid #dce2e6;

    &:hover {
      background-position: center bottom;
    }

    .userinfo {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background-color: rgba(0, 0, 0, .4);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      backdrop-filter: saturate(180%) blur(20px);
      padding: 5px 10px;

      .user-avater {
        @wh: 80px;
        box-sizing: border-box;
        width: @wh;
        height: @wh;
        border-radius: 100%;
        overflow: hidden;
        border: 3px solid whitesmoke;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px 10px 0 0;
        }
      }

      .user-motto-name {
        width: 100%;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        padding-left: 15px;
        height: 100%;

        .user-name {
          font-size: 19px;
          font-weight: 800;
          color: whitesmoke;
          text-shadow: 2px 2px rgba(0, 0, 0, .5);
          margin-bottom: 10px;
        }

        .user-motto {
          width: 100%;
          color: whitesmoke;
          font-size: 15px;

          .text {
            text-shadow: 3px 3px rgba(0, 0, 0, .5);
          }
        }
      }
    }
  }

  .bottom {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: @bottomH;
    background: linear-gradient(145deg, #cfd6dc, #f6ffff);
    border-radius: 0 0 @borderRadius @borderRadius;
    padding: 0 20px;

    .bottom-left {
      box-sizing: border-box;
      height: 100%;
      display: flex;
      align-items: center;

      .tab-active {
        position: relative;
      }

      .tab-active::before {
        content: '';
        width: 100%;
        height: 3px;
        position: absolute;
        bottom: -13px;
        left: 0;
        background-color: #66dda3;
        box-shadow: inset 3px 3px 3px #66dda3;
        animation: tab 0.4s ease-in-out;
      }

      @keyframes tab {
        0% {
          transform: translateY(-40px);
        }

        100% {
          transform: translateY(0%)
        }
      }

      .icon-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .text {
          font-size: 14px;
          font-weight: bolder;
          color: deeppink;
          padding: 0 5px 0 10px;
        }

        .num {
          font-size: 13px;
          color: #7e7c7c;
        }
      }

    }

    .bottom-right {
      box-sizing: border-box;

      .right-list {
        display: flex;
        justify-content: center;
        flex-direction: column;

        .label,
        .num {
          text-align: center;
        }

        .label {
          color: deeppink;
          font-weight: bolder;
          font-size: 13px;
        }

        .num {
          color: #7e7c7c;
          font-size: 13px;
        }
      }
    }
  }
}
</style>