export namespace Background {
    export interface Props {
        type?: type // image video color
        url?: string
        color?: string
        width?: string
        height?: string
        opacity?: number
    }

    export type type = 'image' | 'video' | 'color'
}