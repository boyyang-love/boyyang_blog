<script lang="ts" setup>
import {GithubOutlined, QqOutlined, WechatOutlined} from '@vicons/antd'
import {useUserStore} from '@/store/modules/user'
import {env} from '@/utils/env'
import {computed, markRaw} from 'vue'
import {useUserInfo} from '@/views/userInfo/hooks/useUserInfo'
import {router} from '@/router'

const userStore = useUserStore()
const {showInfo} = useUserInfo()

const url = computed(() => {
  return `${env.VITE_APP_IMG_URL}/${userStore.info.avatar_url}`
})

const toolTip = computed(() => {
  return [
    {
      component: markRaw(GithubOutlined),
      text: userStore.info.git_hub,
      default: '暂未设置gitHub地址',
    },
    {
      component: markRaw(QqOutlined),
      text: userStore.info.qq,
      default: '暂未设置QQ号',
    },
    {
      component: markRaw(WechatOutlined),
      text: userStore.info.wechat,
      default: '暂未设置微信号',
    },
  ]
})

const toDetail = () => {
  router.push({
    path: '/userDetail',
    query: {
      uid: userStore.info.uid,
    },
  })
}
</script>

<template>
  <div class="user-wrapper">
    <div class="header">
      <n-avatar
          :size="105"
          :src="url"
          bordered
          class="header-img wow slideInDown"
          round
          @click="toDetail"
      />
      <div class="user-name wow slideInDown" data-wow-delay="0.5s">
        {{ userStore.info.username }}
      </div>
      <div class="user-signature wow slideInDown" data-wow-delay="1s">
        {{ userStore.info.motto }}
      </div>
      <div class="info">
        <div class="icon-item wow pulse" data-wow-delay="3s">
          <span class="text">获赞</span>
          <span class="num">{{ userStore.detail.thumbs_up || 0 }}</span>
        </div>
        <div class="icon-item wow pulse" data-wow-delay="4s">
          <span class="text">发布</span>
          <span class="num">{{ userStore.detail.publish || 0 }}</span>
        </div>
        <div class="icon-item wow pulse" data-wow-delay="5s">
          <span class="text">收藏</span>
          <span class="num">{{ userStore.detail.likes || 0 }}</span>
        </div>
        <div class="icon-item wow pulse" data-wow-delay="6s">
          <span class="text">粉丝</span>
          <span class="num">{{ userStore.detail.follows || 0 }}</span>
        </div>
      </div>
      <div class="btn-wrapper">
        <n-space justify="space-around">
          <n-tooltip
              trigger="hover"
              placement="bottom"
              v-for="(item, i) in toolTip"
          >
            <template #trigger>
              <n-icon
                  :component="item.component as any"
                  size="30"
                  :key="i"
              ></n-icon>
            </template>
            {{ item.text || item.default }}
          </n-tooltip>
        </n-space>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(145deg, #cfd6dc, #f6ffff);
  border-radius: 10px;

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    .header-img {
      box-shadow: 3px 3px 3px #c4cacf,
        -3px -3px 3px #ffffff;
      border: 5px solid rgba(17, 17, 17, 0.4);
    }

    .user-name {
      font-size: 16px;
      font-weight: bolder;
      margin-top: 10px;
      color: #393e46;
    }

    .user-signature {
      padding: 0 10px;
      font-size: 14px;
      color: #393e46;
    }

    .info {
      box-sizing: border-box;
      width: 100%;
      margin-top: 15px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;

      .icon-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .text {
          font-size: 15px;
          color: rgba(17, 17, 17, 1);
          font-weight: bold;
          text-shadow: 2px 2px 2px rgb(233, 234, 234);
        }

        .num {
          font-size: 14px;
          color: #393e46;
        }
      }
    }

    .btn-wrapper {
      box-sizing: border-box;
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
