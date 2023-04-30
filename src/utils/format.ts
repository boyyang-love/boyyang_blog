const formatImg = (img: string): string => {
    let arr = img.split('.')
    arr.pop()
    return arr.join('')
}

export {
    formatImg,
}