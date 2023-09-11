export interface Info {
    name: string
    type: string
    size: number
    wh: string
}

const imageInfo = async (file: File): Promise<Info> => {

    return {
        name: file.name,
        type: file.type,
        size: file.size,
        wh: await wh(file) as string,
    }
}

const wh = (file: File) => {
    return new Promise((resolve, reject) => {
        const render = new FileReader()
        render.onload = (e) => {
            const image = new Image()
            image.onload = () => {
                const width = image.width
                const height = image.height

                resolve(`${width}-${height}`)
            }
            image.src = e.target?.result as string
        }

        render.readAsDataURL(file)
    })

}

export {
    imageInfo,
}