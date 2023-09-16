<script setup lang="ts">
import {useMenuList} from './menuList'

const {menu, menuClick} = useMenuList()

</script>

<template>
  <div class="menu-upload-wrapper">
    <div class="icon-wrapper">
      <n-space vertical>
        <div class="icons" v-for="(item, i) in menu">
          <n-tooltip
              trigger="hover"
              placement="left"
          >
            <template #trigger>
              <n-icon
                  :size="24"
                  :component="item.com as any"
                  class="icon"
                  @click="menuClick(item, i)"
              >
              </n-icon>
            </template>
            {{ item.text }}
          </n-tooltip>
        </div>

      </n-space>
    </div>
  </div>
</template>

<style scoped lang="less">
.menu-upload-wrapper {
  box-sizing: border-box;
  position: absolute;
  right: 10px;
  bottom: 10px;

  .icon-wrapper {
    .icons {
      border: 1px solid whitesmoke;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      padding: 5px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, .4);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      backdrop-filter: saturate(180%) blur(20px);

      .icon {
        color: whitesmoke;
      }
    }

  }

}
</style>