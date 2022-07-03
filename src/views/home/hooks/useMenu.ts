/**
 * @Author: boyyang
 * @Date: 2022-07-03 15:51:11
 * @LastEditTime: 2022-07-03 15:53:47
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\views\home\hooks\useMenu.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'

const menuData = reactive({
    isShow: false,
})

const useMenu = () => {
    const openDrawer = () => {
        menuData.isShow = true
    }
    return {
        menuData,
        openDrawer,
    }
}

export { useMenu }
