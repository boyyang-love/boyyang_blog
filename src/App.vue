<script lang="ts" setup>
import {
  NConfigProvider,
  darkTheme,
  GlobalThemeOverrides,
} from 'naive-ui'
import {AppProvider} from '@/components/Application'

const themeOverrides: GlobalThemeOverrides = {
  common: {},
  // 弹出框
  Dialog: {
    color: '#3d3b4f',
    borderRadius: '12px',
  },
  Tooltip: {
    color: '#3d3b4f',
  },
  Dropdown: {
    color: '#3d3b4f',
  },
  Drawer: {
    color: '#3d3b4f',
    titleFontSize: '16px',
  },
  Card: {
    colorModal: '#3d3b4f',
  },
  Input: {
    textColor: '#303d4e',
    placeholderColor: '#303d4e',
  },
}
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <!-- <n-theme-editor> -->
    <AppProvider>
      <router-view></router-view>
    </AppProvider>
    <!-- </n-theme-editor> -->
  </n-config-provider>
</template>

<style>
@font-face {
  font-family: 'zpix';
  src: url('./assets/fonts/zpix.ttf');
}

@font-face {
  font-family: 'Press Start 2P';
  src: url('./assets/fonts/PressStart2P-1.ttf');
}

#app {
  /* Avenir, Helvetica, Arial, sans-serif, */
//font-family: zpix; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; color: #2c3e50;
  background-color: #244f9f;
  scroll-behavior: smooth;

}

/*修改滚动条样式*/
::-webkit-scrollbar {
  width: 0;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(56, 74, 82, 0.7);
}
</style>
