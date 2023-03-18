<script lang="ts" setup>
import {
    ManOutlined,
    WomanOutlined,
    LikeOutlined,
    HeartOutlined,
    SendOutlined,
    StarOutlined,
    GithubOutlined,
    QqOutlined,
    WechatOutlined,
} from '@vicons/antd'

interface imgCardProps {
    url?: string
    name?: string
}

const props = withDefaults(defineProps<imgCardProps>(), {
    url: '',
    name: '',
})
</script>

<template>
    <div class="imgcard-wrapper">
        <img :src="props.url" :alt="props.name" :key="props.url"/>

        <div class="imgcard-bottom">
            <div class="left-text">
                <n-ellipsis style="max-width: 240px">
                    {{ props.name }}
                </n-ellipsis>
            </div>
            <div class="right-icon">
                <n-space align="center" justify="center" :size="500"></n-space>
                <n-icon :component="HeartOutlined" size="25" class="icon"></n-icon>
                <n-icon :component="StarOutlined" size="25" class="icon"></n-icon>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.imgcard-wrapper {
  box-sizing: border-box;
  width: 100%;
  max-height: 250px;
  background-color: #fff;
  border: 4px solid whitesmoke;
  border-radius: 2px;
  box-shadow: 5px 2px 3px #393e46;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
    transition: all 1s linear;

    &:hover {
      object-position: right bottom;
    }
  }

  &:hover {
    z-index: 9;
    transform: scale(1.2);
    border: 1px solie black;
  }

  .imgcard-bottom {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 45px;
    background-color: rgba(57, 62, 70, 0.6);
    color: whitesmoke;
    padding: 5px 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .right-icon {
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        cursor: pointer;
      }
    }
  }
}
</style>
