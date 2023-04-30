/*******
 * @description: speed 像素
 * @param {number} speed
 * @return {*}
 */
const scrollToBottom = (speed: number = 5): void => {
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

export {scrollToBottom}
