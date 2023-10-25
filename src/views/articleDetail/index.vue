<script setup lang="ts">
import BackGround from '@/components/Background/index.vue'
import PrintText from '@/components/PrintText/index.vue'
import UserCard from './components/userCard/index.vue'
import TagCard from './components/tagCard/index.vue'
import Comment from './components/comment/index.vue'
import {useArticleDetail} from './hooks'
import {useRoute} from 'vue-router'
import {onMounted} from 'vue'
import {Power, Sparkles} from '@vicons/ionicons5'
import {router} from '@/router'

const route = useRoute()
const uid = route.query.uid as unknown as number
const user_id = route.query.user_id as unknown as number
const {getArticleDetail, detailData, addFollow, imageStar} = useArticleDetail()

onMounted(() => {
  getArticleDetail(uid, user_id)
})

const toDetail = (uid: number) => {
  router.push({
    path: '/userDetail',
    query: {
      uid: uid,
    },
  })
}
</script>

<template>
  <BackGround
      width="100vw"
      height="100vh"
      :url="detailData.detail.cover"
      :opacity="0.4"
  >
    <div class="article-container container m-auto">
      <div class="top-content">
        <PrintText
            title="文章详情"
        ></PrintText>
      </div>
      <div class="content">
        <div class="left-content">
          <div>
            <div class="content-html" v-html="detailData.detail.content"></div>
          </div>
          <div class="content-bottom">
            <Comment></Comment>
          </div>
        </div>
        <div class="right">
          <div class="user-info-card">
            <UserCard
                v-bind="{
                  uid: detailData.detail.user_info.uid,
                  avatar: detailData.detail?.user_info.avatar_url || '',
                  username: detailData.detail.user_info.username,
                  follow: detailData.cardInfo.follow,
                  fans: detailData.cardInfo.fans,
                  thumb: detailData.cardInfo.thumb,
                  article: detailData.cardInfo.article,
                  comment: detailData.cardInfo.comment,
                  isFollowed: detailData.isFollow
                }"
                @followClick="addFollow"
                @avatarClick="toDetail"
            ></UserCard>
          </div>
          <div class="tags">
            <TagCard :tags="detailData.tagInfo.map(t => t.name)"></TagCard>
          </div>
        </div>
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
                  :color="detailData.isStar ? '#c52d2d' : '#fff'"
                  class="icon"
                  @click="imageStar(detailData.detail.uid)"
              >
                <Sparkles></Sparkles>
              </n-icon>
            </template>
            {{ detailData.isStar ? '取消点赞' : '点赞' }}
          </n-tooltip>
          <n-tooltip
              trigger="hover"
              placement="left"
          >
            <template #trigger>
              <n-icon
                  :size="34"
                  class="icon"
                  @click="$router.push({name: 'Article'})"
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

<style scoped lang="less">
.article-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 50px 0;

  .top-content {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 150px 0;
  }

  .content {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;

    .left-content {
      width: 1000px;
      box-sizing: border-box;
      background-color: rgba(245, 245, 245, 0.4);
      backdrop-filter: saturate(120%) blur(50px);
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid whitesmoke;
      padding: 10px;

      .content-bottom {
        box-sizing: border-box;
        width: 100%;
      }
    }

    .right {
      box-sizing: border-box;
      width: 320px;

      .tags {
        box-sizing: border-box;
        width: 100%;
        margin-top: 10px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      }

      .user-info-card {
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      }
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
</style>