<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useUserStore} from '@/store/modules/user'
import {Menu} from './types'
import {menuList} from './menuList'
import {env} from '@/utils/env'
import {useUserInfo} from '@/views/userInfo/hooks/useUserInfo'
import {useMenuStore} from '@/store/modules/menu'

const router = useRouter()
const userStore = useUserStore()
const {showInfo} = useUserInfo()
const menuStore = useMenuStore()

const props = withDefaults(defineProps<Menu.menuProps>(), {
  menuList: () => menuList,
})

const active = ref<number>(0)
const userAvatar = computed(() => {
  return `${env.VITE_APP_IMG_URL}/${userStore.info.avatar_url}`
})
const menuClick = (item: Menu.menuList, index: number) => {
  if (item.name === '退出') {
    window.$dialog.warning({
      title: '提示',
      content: '是否退出登录？',
      negativeText: '算了',
      positiveText: '确定',
      onPositiveClick: () => {
        window.sessionStorage.clear()
        router.replace(
            {
              name: 'Login',
            },
        )
      },
    })
    return
  }
  menuStore.setActive(item.name)
  router.push({
    name: item.name,
  })
}

onMounted(() => {
  const route = useRoute()
  menuList.forEach((it, index) => {
    if (it.name === route.name) {
      active.value = index
    }
  })
})
</script>

<template>
  <div class="menu-wrapper">
    <div class="menu">
      <n-space>
        <div class="icon-wrapper" v-for="(item, i) in props.menuList">
          <n-tooltip
              trigger="hover"
              placement="bottom"
          >
            <template #trigger>
              <n-icon
                  :component="item.com as any"
                  :data-wow-delay="i * 0.3 + 's'"
                  :size="22"
                  :style="{'--i': i}"
                  :class="['menu-icon', item.name === menuStore.active ? 'active' : '']"
                  :id="item.name"
                  @click="menuClick(item, i)"
              ></n-icon>
            </template>
            {{ item.text }}
          </n-tooltip>
        </div>
      </n-space>
      <div class="avatar">
        <n-avatar
            :size="45"
            :bordered="true"
            :src="userAvatar"
            round
            @click="showInfo(true)"
        ></n-avatar>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .menu {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 25px;
    position: relative;
    //background-color: rgba(17, 17, 17, 0.1);
    //backdrop-filter: saturate(100%) blur(10px);
    //box-shadow: 0 5px 3px rgba(0, 0, 0, 0.5);


    .avatar {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;

      &:before {
        content: '';
        width: 1%;
        height: 2px;
        position: absolute;
        bottom: -10px;
        background-color: #1fab89;

        animation: thr 1.5s ease-in-out infinite;
      }

      @keyframes thr {
        0% {
          width: 1%;
        }

        50% {
          width: 90%;
        }

        100% {
          width: 1%;
        }
      }
    }

    .icon-wrapper {
      box-sizing: border-box;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      .menu-icon {
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        color: whitesmoke;

        &:hover {
          transform: scale(1.1);
        }
      }

      .active {
        color: #da4453;
      }
    }
  }
}

</style>
