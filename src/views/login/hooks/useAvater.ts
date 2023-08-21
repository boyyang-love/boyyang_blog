import {env} from '@/utils/env'

const userAvater = () => {
    const avatar = Array.from({length: 11}).map((_, i) => {
        return {
            id: i,
            url: `${env.VITE_APP_IMG_URL}/avatar/${i < 9 ? '0' + (i + 1) : (i + 1)}m.svg`,
        }
    })

    return {
        avatar,
    }
}

export {
    userAvater,
}