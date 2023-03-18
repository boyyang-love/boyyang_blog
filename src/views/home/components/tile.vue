<script lang="ts" setup>
import {useRouter} from 'vue-router'

import {BackGround} from '@/components/Background'
import bg from '@/assets/00008.png'

const router = useRouter()

const tileClick = () => {
    router.push({
        name: 'Images',
    })
}
</script>

<template>
    <div class="tile-wrapper">
        <div class="title">
            壁
            <br/>
            纸
        </div>

        <div class="tile-content" @click="tileClick"></div>
        <!-- <img :src="bg" alt="" /> -->
    </div>
</template>

<style scoped lang="less">
.tile-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  // background-color: #fff;
  padding: 10px;
  position: relative;

  .title {
    height: 100%;
    position: absolute;
    right: 10px;
    color: whitesmoke;
    font-size: 20px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.5);
  }

  .tile-content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;

    z-index: 2;
    background-image: url('@/assets/00008-preview.jpg');
    background-position: center;
    background-size: cover;
    box-shadow: 7px 5px 3px #393e46;
    border-radius: 2px;
    transition: all 0.5s linear;

    &:hover {
      transform: translateX(-35px);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
