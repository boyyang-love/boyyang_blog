export namespace Background {
    export interface Props {
        type?: 'image' | 'video' | 'color' // image video color
        url?: string
        color?: string
        width?: string
        height?: string
        opacity?: number
    }

    export enum Type {
        image = 'image',
        video = 'video',
        color = 'color',
    }
}