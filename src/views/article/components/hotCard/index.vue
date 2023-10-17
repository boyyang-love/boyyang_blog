<script setup lang="ts">
interface Props {
  uid: number
  no: string | number
  title: string
  subtitle: string
  cover: string
}

interface Emits {
  (e: 'toDetail', uid: number):void
}

const props = withDefaults(defineProps<Props>(), {
  no: 0,
})
const emits = defineEmits<Emits>()


</script>

<template>
  <div class="hot-card" @click="emits('toDetail', props.uid)">
    <div class="num">
      <div class="type-one" v-if="props.no <= 3">
        <n-image
            :preview-disabled="true"
            object-fit="cover"
            class="img"
            :width="100"
            :src="props.cover"
        ></n-image>
        <div :class="['no', props.no > 3 ? 'no-copy': '']">
          {{ props.no }}
        </div>
      </div>
    </div>
    <div class="content" v-if="props.no <= 3">
      <div class="title">
        <n-ellipsis line-clamp="1" :tooltip="false">
          {{ props.title }}
        </n-ellipsis>
      </div>
      <div class="sub-title">
        <n-ellipsis line-clamp="2" :tooltip="false"
        >
          {{ props.subtitle }}
        </n-ellipsis>
      </div>
    </div>
    <div class="content-copy" v-else>
      <div class="no">{{ props.no }}</div>
      <n-ellipsis line-clamp="1" :tooltip="false">
        {{ props.title }}
      </n-ellipsis>
    </div>
  </div>
</template>

<style scoped lang="less">
.hot-card {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  margin-bottom: 5px;
  cursor: pointer;
  border: 1px solid whitesmoke;
  border-radius: 2px;

  .num {
    .type-one {
      box-sizing: border-box;
      width: 100px;
      position: relative;
      display: flex;
      align-items: center;
      margin-right: 10px;

      .img {
        height: 60px;
        object-fit: cover;
      }

      .no {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 0;
        left: 0;
        background-color: #fc5185;
        color: whitesmoke;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 2px 2px 0;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      color: white;
      font-size: 13px;
      font-weight: bold;
    }

    .sub-title {
      color: whitesmoke;
      font-size: 12px;
    }
  }

  .content-copy {
    color: whitesmoke;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;


    .no {
      width: 20px;
      height: 20px;
      top: 0;
      left: 0;
      color: whitesmoke;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0 2px 2px 0;
      background-color: #0f172a;

    }
  }
}
</style>