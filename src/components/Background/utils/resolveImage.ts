const resolveImage = (url?: string): string => {
    if (url != '') {
        return `url(${new URL(url as string, import.meta.url).href})`
    } else {
        return `url(${new URL('../../assets/女孩子少女宇宙航天服8k动漫壁纸彼岸图网.jpg', import.meta.url).href})`
    }
}

export {
    resolveImage,
}