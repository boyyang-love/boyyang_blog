<script lang="ts" setup>
import {useRouter} from 'vue-router'

const router = useRouter()

const tileClick = () => {
  router.push({
    name: 'Images',
  })
}
</script>

<template>
  <div class="tile-wrapper">
    <div class="tile-content" @click="tileClick"></div>
  </div>
</template>

<style scoped lang="less">
.tile-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .tile-content {
    box-sizing: border-box;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    position: relative;
    z-index: 2;
    background-image: url('@/assets/00008-preview.jpg');
    background-position: center;
    background-size: cover;
    box-shadow: 5px 5px 5px #c4cacf,
      -5px -5px 5px #ffffff;
    border-radius: 2px;
    transition: all 0.5s linear;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
