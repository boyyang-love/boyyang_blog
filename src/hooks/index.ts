/**
 * @Author: boyyang
 * @Date: 2022-07-04 12:33:04
 * @LastEditTime: 2022-07-04 12:36:51
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\hooks\index.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import {scrollToBottom} from './scrollToBottom'

const useHooks = () => {
    return {
        scrollToBottom,
    }
}

const name = 'test'

export {useHooks}
