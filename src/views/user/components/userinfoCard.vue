<script lang="ts" setup>
import {ref, markRaw, Component, computed} from 'vue'
import {Rocket, Create} from '@vicons/ionicons5'
import {RollbackOutlined} from '@vicons/antd'

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

const emit = defineEmits<Emit>()
const props = withDefaults(defineProps<Props>(), {
  approved: 0,
  in_review: 0,
  review_rjection: 0,
})

console.log(props)

const showOrEdit = ref<boolean>(false)
const motto = ref<string>('第一行没有你，第')
const tab = ref<number>(1)

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

const rightList = ref([
  {
    label: '关注数',
    num: 2000,
  },
  {
    label: '粉丝数',
    num: 2000,
  },
  {
    label: '获赞数',
    num: 2000,
  },
])

const tabListClick = (tabItem: TabListItem, i: number) => {
  tab.value = i
  emit('tabChange', i)
}
</script>

<template>
  <div class="userinfo-card-wrapper">
    <div class="top">
      <div class="userinfo">
        <div class="user-avater">
          <img alt="avater" src="@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg">
        </div>
        <div class="user-motto-name">
          <div class="user-name">boyyang</div>
          <div class="user-motto">
            <n-input
                v-if="showOrEdit"
                v-model:value="motto"
                autofocus
                type="text"
                @blur="showOrEdit = false"
                width="250px"
            ></n-input>
            <div
                v-else
                @click="showOrEdit = true"
            >
              {{ motto }}
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
  height: 250px;
  background-color: rgba(67, 62, 70, 0.5);
  border-radius: @borderRadius;

  .top {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - @bottomH);
    background-image: url('@/assets/喝奶茶动漫短发美女美腿_喝奶茶_车厢_4k动漫壁纸_彼岸图网.jpg');
    background-size: cover;
    background-position: center top;
    transition: all .5s cubic-bezier(.4, 0, .2, 1);
    display: flex;
    align-items: flex-end;
    padding: 10px;

    &:hover {
      background-position: center bottom;
    }

    .userinfo {
      display: flex;
      align-items: center;
      justify-content: center;

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
        }
      }

      .user-motto-name {
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
          color: whitesmoke;
          font-size: 15px;
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
        animation: tab 1s ease-in-out;
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