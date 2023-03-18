/**
 * @Author: boyyang
 * @Date: 2022-04-09 18:13:27
 * @LastEditTime: 2022-04-09 18:18:00
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\src\utils\format.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

const formatImg = (img: string): string => {
    let arr = img.split('.')
    arr.pop()
    return arr.join('')
}

export {
    formatImg,
}