/**
 * @Author: boyyang
 * @Date: 2022-04-09 11:41:31
 * @LastEditTime: 2022-04-09 14:12:27
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\utils\renderIcon.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { Component, h, VNode } from 'vue'
import { NIcon } from 'naive-ui'

const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) })
}

export {
    renderIcon
}