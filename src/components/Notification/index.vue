<!--
 * @Author: boyyang
 * @Date: 2022-06-05 18:07:23
 * @LastEditTime: 2022-06-05 18:09:03
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\components\Notification\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<template></template>
<script lang="ts">
    import { useNotification } from 'naive-ui'

    export default {
        name: 'NotificationContent',
        setup() {
            //挂载在 window 方便与在js中使用
            window.$notification = useNotification()
        },
    }
</script>
