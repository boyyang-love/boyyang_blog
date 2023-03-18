<!--
 * @Author: boyyang
 * @Date: 2022-06-05 18:07:23
 * @LastEditTime: 2022-08-08 17:00:49
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \blog\web\src\components\Notification\index.vue
 * [如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
-->

<template></template>
<script lang="ts" setup>
import {useNotification} from 'naive-ui'

//挂载在 window 方便与在js中使用
window.$notification = useNotification()
</script>
