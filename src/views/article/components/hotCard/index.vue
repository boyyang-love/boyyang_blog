<script setup lang="ts">
interface Props {
  no: string | number
}

const props = withDefaults(defineProps<Props>(), {
  no: 0,
})
</script>

<template>
  <div class="hot-card">
    <div class="num">
      <div class="type-one" v-if="props.no <= 3">
        <n-image
            :preview-disabled="true"
            object-fit="cover"
            class="img"
            src="https://7072-prod-2g5hif5wbec83baa-1301921121.tcb.qcloud.la/124810450/images/爱丽丝 红色衣服 花海 最终幻想.jpg"
        ></n-image>
        <div :class="['no', props.no > 3 ? 'no-copy': '']">
          {{ props.no }}
        </div>
      </div>
    </div>
    <div class="content" v-if="props.no <= 3">
      <div class="title">
        <n-ellipsis line-clamp="1" :tooltip="false">
          我们在业务组件 PageA 和 PageB 中都使用了通用组件
        </n-ellipsis>
      </div>
      <div class="sub-title">
        <n-ellipsis line-clamp="2" :tooltip="false"
        >
          们在业务组件 PageA 和 PageB 中都使用了通用组件 Card 我们在业务组件 PageA 和 PageB 中都使用了通用组
        </n-ellipsis>
      </div>
    </div>
    <div class="content-copy" v-else>
      <div class="no">{{ props.no }}</div>
      <n-ellipsis line-clamp="1" :tooltip="false">
        我们在业务组件 PageA 和 PageB 中都使用了通用组件
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

  .num {

    .type-one {
      position: relative;

      .img {
        width: 130px;
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