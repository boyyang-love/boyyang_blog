/**
 * @Author: boyyang
 * @Date: 2022-05-07 11:41:39
 * @LastEditTime: 2022-06-04 17:09:15
 * @LastEditors: boyyang
 * @Description: 图片地址处理
 * @FilePath: \drawingBed\src\components\Background\utils\resolveImage.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

const resolveImage = (url?: string): string => {
    if (url != '') {
        return `url(${new URL(url as string, import.meta.url).href})`
    } else {
        return `url(${new URL('../../assets/女孩子少女宇宙航天服8k动漫壁纸彼岸图网.jpg', import.meta.url).href})`
    }
}

export {
    resolveImage
}