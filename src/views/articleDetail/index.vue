<script setup lang="ts">
import BackGround from '@/components/Background/index.vue'
import PrintText from '@/components/PrintText/index.vue'
import UserCard from './components/userCard/index.vue'
import TagCard from './components/tagCard/index.vue'
import Comment from './components/comment/index.vue'
import {useArticleDetail} from './hooks'
import {useRoute} from 'vue-router'
import {onMounted} from 'vue'
import {Power} from '@vicons/ionicons5'

const route = useRoute()
const uid = route.query.uid as unknown as number
const user_id = route.query.user_id as unknown as number
const {getArticleDetail, detailData} = useArticleDetail(uid, user_id)

onMounted(() => {
  getArticleDetail()
})
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
                  avatar: detailData.detail?.user_info.avatar_url || '',
                  username: detailData.detail.user_info.username,
                  follow: detailData.cardInfo.follow,
                  fans: detailData.cardInfo.fans,
                  thumb: detailData.cardInfo.thumb,
                  article: detailData.cardInfo.article,
                  comment: detailData.cardInfo.comment
                }"
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
                  class="icon"
                  @click="$router.back()"
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
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

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