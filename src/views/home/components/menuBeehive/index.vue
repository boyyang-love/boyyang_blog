<script setup lang="ts">
import {useMenuList} from './hooks/menuList'

const {menuList, menuClick} = useMenuList()
</script>

<template>
  <div class="beehive-wrapper">
    <div class="beehive-content">
      <div
          :class="['menu-item', (i+1) >=5 ? 'bottom': 'top']"
          :style="{'--bgcolor': item.color}"
          @click="menuClick(item)"
          v-for="(item, i) in menuList"
      >
        <div class="item-content">
          <div class="item-icon">
            <n-icon
                :size="30"
                :component="item.com as any"
            ></n-icon>
          </div>
          <div class="item-text">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@itemWh: 100px;
@gap: 5px;
@n: 4;
.beehive-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .beehive-content {
    display: grid;
    grid-template-columns: repeat(@n, 1fr);
    grid-gap: @gap;

    .menu-item {
      width: @itemWh;
      height: @itemWh;
      -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      background-color: var(--bgcolor);
      backdrop-filter: saturate(100%) blur(20px);
      cursor: pointer;
      transition: all 0.4s ease-in-out;

      .item-content {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        item-icon {

        }

        .item-text {
          font-size: 15px;
        }
      }
    }

    .bottom {
      transform: translateX((@itemWh / 2) + (@gap /2)) translateY(-(@itemWh / 4));
    }
  }
}
</style>