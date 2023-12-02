<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useUserDetail} from './hooks'
import {Checkmark, Sparkles, Download, Power, Add, Male, Female} from '@vicons/ionicons5'
import CubeLoading from '@/components/CubeLoading/index.vue'
import {useUserStore} from '@/store/modules/user'

const {icons, tabs, data, pageSizes, bgUrl, getList, pageChange, pageSizeChange, toImageDetail, addFollow} = useUserDetail()

const route = useRoute()
const userStore = useUserStore()
const uid = route.query.uid as unknown as number
getList(uid)

</script>

<template>
  <div class="user-detail">
    <div class="top-banner">
      <div class="center">
        <n-avatar
            :size="120"
            :src="data.user_info.avatar_url"
            round
            bordered
        ></n-avatar>
        <span class="user-name">{{ data.user_info.username }}</span>
        <div class="user-gender">
          <n-icon
              :size="22"
              :component="data.user_info.gender === 1 ? Male as any : Female as any"
          >
          </n-icon>
        </div>
      </div>
      <div class="bottom">
        <div class="banner-left">
          <n-space align="end">
            <div class="icon-wrapper" v-for="item in icons">
              <n-icon
                  :size="22"
                  :component="item.icon as any"
                  color="#fff"
              >
              </n-icon>
              <span class="num">{{ item.num }}</span>
            </div>
          </n-space>
        </div>
        <div class="banner-right">
          <n-button
              :type="data.follow_ids.includes(userStore.info.uid) ? 'success' : 'error' "
              size="small"
              @click="addFollow"
          >
            <n-icon
                :size="20"
                :component="data.follow_ids.includes(userStore.info.uid) ? Checkmark as any : Add as any"
            >
            </n-icon>
            <span>{{ data.follow_ids.includes(userStore.info.uid) ? '已关注' : '关注' }}</span>
          </n-button>
        </div>
      </div>
      <div class="back" @click="$router.back()">
        <n-icon :size="22" color="#fff" style="cursor: pointer">
          <Power></Power>
        </n-icon>
      </div>
    </div>
    <div class="tab-wrapper">
      <div
          :class="['tab', item.id == data.type ? 'active' : '']"
          v-for="item in tabs"
          @click="data.type = item.id; data.page = 1; data.limit = 12; getList(uid)"
      >
        <n-icon
            :size="18"
            :component="item.icon as any"
        >
        </n-icon>
        <span class="name">{{ item.name }}</span>
      </div>
    </div>
    <div class="empty" v-if="data.list.length === 0">
      <n-empty description="暂无数据">

      </n-empty>
    </div>
    <div class="bottom-content" v-else>
      <div
          class="img-wrapper"
          v-for="item in data.list"
      >
        <n-image
            class="img"
            object-fit="cover"
            :key="item.uid"
            :src="item.cover"
            :height="225"
            :show-toolbar="false"
            :preview-disabled="true"
            @click="toImageDetail(item.uid)"
        >
          <template #placeholder>
            <div class="loading">
              <CubeLoading></CubeLoading>
            </div>
          </template>
        </n-image>
        <div class="icon-wrapper">
          <span class="icon-left">
            <n-ellipsis :line-clamp="1">
              <span class="text">{{ item.title }}</span>
            </n-ellipsis>
          </span>
          <n-space>
            <n-badge
                :value="item.thumbs_up"
                show-zero
                :offset="[5, -10]"
            >
              <n-icon size="18" color="#fff">
                <Sparkles></Sparkles>
              </n-icon>
            </n-badge>
            <n-badge
                :value="item.download"
                show-zero
                :offset="[5, -10]"
            >
              <n-icon size="18" color="#fff">
                <Download></Download>
              </n-icon>
            </n-badge>
          </n-space>
        </div>
      </div>
    </div>
    <div class="pagination">
      <n-pagination
          :item-count="data.count"
          v-model:page="data.page"
          v-model:page-size="data.limit"
          v-model:page-sizes="pageSizes"
          @update:page-size="pageSizeChange; getList(uid)"
          @update:page="pageChange; getList(uid)"
          :page-slot="5"
          show-size-picker
      >
        <template #prefix="{ itemCount }">
          共 {{ itemCount }} 项
        </template>
      </n-pagination>
    </div>
  </div>
</template>

<style scoped lang="less">
.user-detail {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;

  .top-banner {
    box-sizing: border-box;
    width: 100%;
    height: 60%;
    position: relative;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-image: v-bind('bgUrl');
    background-repeat: no-repeat;
    background-size: cover;
    transition: all 0.4s ease-in-out;
    background-attachment: fixed;

    .back {
      position: absolute;
      top: 15px;
      left: 15px;
    }

    &:hover {
      //background-position: center 10%;
    }

    &::before {
      content: '';
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 0;
    }

    .center {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: whitesmoke;
      font-size: 16px;
      font-weight: bolder;
      z-index: 1;
      position: relative;

      .user-name {
        color: #ffffff;
      }

      .user-gender {
        position: absolute;
        bottom: 20px;
        right: -10px;
      }
    }

    .bottom {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: absolute;
      bottom: 0;
      padding: 5px 10px;

      .banner-left {
        display: flex;

        .icon-wrapper {
          display: flex;
          align-items: flex-end;
          color: whitesmoke;

          .num {
            margin-left: 4px;
            font-size: 13px;
          }
        }
      }
    }
  }

  .tab-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 45px;
    background-color: #393e46;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .tab {
      display: flex;
      align-items: center;
      color: whitesmoke;
      padding: 0 5px 5px;
      margin: 0 10px;
      transition: all 0.4s ease-in-out;
      cursor: pointer;
      border-bottom: 2px solid rgba(0, 0, 0, 0);

      .name {
        padding: 0 5px;
      }
    }

    .active {
      border-bottom: 2px solid whitesmoke;
    }
  }

  .empty {
    box-sizing: border-box;
    width: 100%;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: saturate(120%) blur(10px);
    margin-top: 20px;
  }

  .bottom-content {
    padding: 10px;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(50px, auto);

    .img-wrapper {
      box-sizing: border-box;
      width: 100%;
      height: 225px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-y: hidden;
      cursor: pointer;

      .img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: 2px solid whitesmoke;
        border-radius: 5px;
        object-fit: cover;

        .loading {
          width: 100%;
          min-height: 225px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      :deep(.n-image img) {
        width: 100%;
        height: 100%;
      }


      .icon-wrapper {
        box-sizing: border-box;
        width: calc(100% - 4px);
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: saturate(180%) blur(20px);
        position: absolute;
        bottom: -44px;
        border-radius: 0 0 5px 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 3px 20px 3px 10px;
        transition: all 0.4s linear;

        .icon-left {
          display: flex;
          align-items: center;

          .text {
            color: whitesmoke;
            font-size: 12px;
          }
        }
      }

      &:hover {
        .icon-wrapper {
          bottom: 2px;
        }
      }
    }
  }

  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
}
</style>