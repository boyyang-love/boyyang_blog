import {env} from '@/utils/env'

const avatar = Array.from({length: 11}).map((_, i) => {
    return {
        id: i,
        url: `${env.VITE_APP_IMG_URL}/avatar/${i < 9 ? '0' + (i + 1) : (i + 1)}m.svg`,
    }
})

const userAvater = () => {

    return {
        avatar,
    }
}

export {
    userAvater,
}