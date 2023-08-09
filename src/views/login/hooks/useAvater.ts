import {Component} from 'vue'


interface AvstarItem {
    id: string
    url: string
    component: Component
}

const avatar: AvstarItem[] = []

const svgs = import.meta.glob('/src/assets/avater/*.svg')

for (const svgsKey in svgs) {
    if (Object.prototype.hasOwnProperty.call(svgs, svgsKey)) {
        avatar.push({
            id: svgs[svgsKey].name.split('/')[-1],
            url: svgsKey,
            component: svgs[svgsKey],
        })
    }
}

const userAvater = () => {

    return {
        avatar,
    }
}

export {
    userAvater,
}