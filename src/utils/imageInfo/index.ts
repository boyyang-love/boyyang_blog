import ColorThief from 'colorthief'
import {PropType} from 'vue'

export interface Info {
    name: string
    type: string
    size: number
    px: string
    rgb: string
    palette: string[]
}

const imageInfo = async (file: File): Promise<Info> => {
    const more = await moreInfo(file)
    return {
        name: file.name,
        type: file.type,
        size: file.size,
        px: more.px,
        rgb: more.rgb,
        palette: more.palette,
    }
}

const moreInfo = (file: File): Promise<{ px: string, rgb: string, palette: string[] }> => {
    const colorThief = new ColorThief()
    return new Promise((resolve, reject) => {
        const render = new FileReader()
        render.onload = (e) => {
            const image = new Image()
            image.onload = () => {
                const width = image.width
                const height = image.height
                const colors = colorThief.getColor(image) as string[]
                const palette = colorThief.getPalette(image, 5) as number[][]

                resolve(
                    {
                        px: `${width}X${height}`,
                        rgb: `rgb(${colors.join(',')})`,
                        palette: palette.map((color) => {
                            return `rgb(${color.join(',')})`
                        }),
                    },
                )
            }
            image.src = e.target?.result as string
        }

        render.readAsDataURL(file)
    })

}

export {
    imageInfo,
}