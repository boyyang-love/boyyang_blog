import {Component, h} from 'vue'
import {NIcon} from 'naive-ui'

const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, {default: () => h(icon)})
}

export {
    renderIcon,
}