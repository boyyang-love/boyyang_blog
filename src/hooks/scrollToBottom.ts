/**
 * @Author: boyyang
 * @Date: 2022-07-04 12:34:38
 * @LastEditTime: 2022-07-04 13:05:48
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\hooks\scrollToBottom.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

/*******
 * @description: speed 像素
 * @param {number} speed
 * @return {*}
 */
const scrollToBottom = (speed: number): void => {
    if (typeof speed !== 'number') {
        speed = 5
    }
    let RAF = 0
    let height = window.screen.height
    let begin = 0
    cancelAnimationFrame(RAF)
    RAF = requestAnimationFrame(function fn() {
        if (begin < height) {
            window.scrollTo(0, (begin += speed))
            RAF = requestAnimationFrame(fn)
        } else {
            cancelAnimationFrame(RAF)
        }
    })
}

export { scrollToBottom }
