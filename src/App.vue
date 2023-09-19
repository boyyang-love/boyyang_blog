<script lang="ts" setup>
import {
  NConfigProvider,
  darkTheme,
    lightTheme,
  GlobalThemeOverrides,
} from 'naive-ui'
import {AppProvider} from '@/components/Application'

const themeOverrides: GlobalThemeOverrides = {
  common: {},
  // 弹出框
  Dialog: {
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
  Pagination: {
    jumperTextColor: '#fff',
    jumperTextColorDisabled: '#ff8a14',
    itemColor: '#fff',
    itemColorHover: '#fff',
    itemColorActive: '#303841',
    itemTextColorHover: '#ff8a14',
    itemBorderHover: '#23d69b',
    buttonColor: '#fff',
    buttonIconColor: '#23d69b',
    buttonIconSizeLarge: true,
    buttonColorHover: '#cc1515',
    buttonIconColorHover: '#fff'
  }
}
</script>

<template>
  <!-- <n-theme-editor> -->
  <AppProvider>
    <n-config-provider :theme="lightTheme" :theme-overrides="themeOverrides">
      <router-view></router-view>
    </n-config-provider>
  </AppProvider>
  <!-- </n-theme-editor> -->
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

/*修改滚动条样式*/
::-webkit-scrollbar {
  width: 0;
  height: 2px;
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
