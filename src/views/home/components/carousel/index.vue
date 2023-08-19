<script lang="ts" setup>
interface carouselProps {
  list: listItem[]
}

interface listItem {
  cover: string
}

const props = withDefaults(defineProps<carouselProps>(), {})
</script>

<template>
  <n-carousel
      direction="vertical"
      dot-placement="right"
      show-arrow
      style="width: 100%; height: 250px"
      autoplay
      effect="card"
      :show-dots="false"
  >
    <img
        v-for="(item, i) in props.list"
        :key="i"
        class="carousel-img"
        :src="item.cover"
        alt=""
    />
  </n-carousel>
</template>

<style scoped lang="less">
.carousel-img {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
  transition: all 1s ease-in-out;
  padding: 10px 10px;
  border-radius: 15px;

  &:hover {
    object-position: right bottom;
  }
}

@media screen and (max-width: 1200px) {
  .carousel-img {
    padding: 10px;
    border-radius: 5px;
  }
}

</style>
