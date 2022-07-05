<template>
    <n-config-provider :theme="darkTheme">
        <!-- <n-theme-editor> -->
        <AppProvider>
            <router-view></router-view>
        </AppProvider>
        <!-- </n-theme-editor> -->
    </n-config-provider>
</template>

<script lang="ts" setup>
    import { NConfigProvider, darkTheme, NThemeEditor, lightTheme } from 'naive-ui'
    import { AppProvider } from '@/components/Application'
</script>

<style>
    /* @font-face {
        font-family: 'zpix';
        src: url('./font/zpix.ttf');
    }
    @font-face {
        font-family: 'Press Start 2P';
        src: url('./font/PressStart2P-1.ttf');
    } */
    #app {
        /* Avenir, Helvetica, Arial, sans-serif, */
        /* font-family: zpix, Press Start 2P, Avenir, Helvetica, Arial, sans-serif; */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
    /*修改滚动条样式*/
    ::-webkit-scrollbar {
        width: 0px;
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
