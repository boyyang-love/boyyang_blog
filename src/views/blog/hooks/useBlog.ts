/**
 * @Author: boyyang
 * @Date: 2022-07-04 18:46:27
 * @LastEditTime: 2022-07-04 18:47:48
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\views\blog\hooks\useBlog.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { reactive } from 'vue'

const blogData = reactive({
    blogContent: '',
})

const useBlog = () => {
    return {
        blogData,
    }
}

export { useBlog }
