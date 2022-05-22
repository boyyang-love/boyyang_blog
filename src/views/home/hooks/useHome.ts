/**
 * @Author: boyyang
 * @Date: 2022-05-21 14:18:23
 * @LastEditTime: 2022-05-21 14:19:55
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\views\home\hooks\useHome.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'

const homeData = reactive({
    isShow: false,
})

const useHome = () => {
    const openMenu = () => {
        homeData.isShow = !homeData.isShow
    }
    return {
        homeData,
        openMenu,
    }
}

export {
    useHome
}
