<script lang="ts" setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {Menu} from './types'
import {menuList} from './menuList'

const router = useRouter()

const props = withDefaults(defineProps<Menu.menuProps>(), {
  menuList: () => menuList,
})

const active = ref<number>(0)

const menuClick = (item: Menu.menuList, index: number) => {
  if (item.name === '退出') {
    window.$dialog.warning({
      title: '提示',
      content: '是否退出登录？',
      negativeText: '算了',
      positiveText: '确定',
      onPositiveClick: () => {
        window.sessionStorage.clear()
        router.replace({
          name: 'Login',
        })
      },
    })
    return
  }
  active.value = index
  router.push({
    name: item.name,
  })
}
</script>

<template>
  <div class="menu-wrapper">
    <div class="menu">
      <n-space size="large" vertical>
        <div class="icon-wrapper" v-for="(item, i) in props.menuList">
          <n-tooltip
              trigger="hover"
              placement="right"
          >
            <template #trigger>
              <n-icon
                  :component="item.com as any"
                  :data-wow-delay="i * 0.3 + 's'"
                  :size="20"
                  :style="{'--i': i}"
                  :class="['menu-icon', i === active ? 'active' : '']"
                  :id="item.name"
                  @click="menuClick(item, i)"
              ></n-icon>
            </template>
            {{ item.text }}
          </n-tooltip>
        </div>
      </n-space>
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu-wrapper {
  height: 100%;
  width: 55px;
  position: fixed;
  left: -50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.4s ease-in-out;

  &:hover {
    left: 0;
  }

  .menu {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(145deg, #cfd6dc, #f6ffff);
    padding: 10px;
    border-radius: 0 15px 15px 0;
    box-shadow: 5px 3px 3px rgba(0, 0, 0, 0.4), 7px 3px 3px rgba(0, 0, 0, 0.1);
    position: relative;

    .icon-wrapper {
      box-sizing: border-box;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 7px 7px 10px #c4cacf,
        -7px -7px 10px #ffffff;

      .menu-icon {
        cursor: pointer;
        transition: all 0.4s ease-in-out;

        &:hover {
          color: rgba(17, 17, 17, 0.6);
          transform: scale(1.1);
        }
      }

      .active {
        color: #d50e0e;
      }
    }
  }
}

</style>
