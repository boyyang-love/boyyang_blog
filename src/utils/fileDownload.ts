/**
 * @Author: boyyang
 * @Date: 2022-05-10 13:42:59
 * @LastEditTime: 2023-02-23 15:30:00
 * @LastEditors: boyyang
 * @Description: 文件下载
 * @FilePath: \blog_web\src\utils\fileDownload.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

/**
 * @description 根据图片链接本地下载图片
 * @param {string} url //下载图片地址
 * @param {string} name // 下载图片名称
 * */
const imageDownload = (url: string, name: string): Promise<boolean> => {
    return new Promise(resolve => {
        const link = document.createElement('a')
        link.setAttribute('download', name)
        const image = new Image()
        // 添加时间戳，防止浏览器缓存图片
        image.src = url + '?timestamp=' + new Date().getTime()
        // 设置 crossOrigin 属性，解决图片跨域报错
        image.setAttribute('crossOrigin', 'Anonymous')
        image.onload = () => {
            link.href = getImageBase64(image)
            link.click()
            resolve(true)
        }
    })
}


const getImageBase64 = (image: HTMLImageElement) => {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const ctx = canvas.getContext('2d') as any
    ctx.drawImage(image, 0, 0, image.width, image.height)
    // 获取图片后缀名
    const extension = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()
    // 某些图片 url 可能没有后缀名，默认是 png
    return canvas.toDataURL('image/' + extension, 1)
}

export {imageDownload}
