/**
 * @description: 判断val 类型
 * @param {unknown} val // 目标对象
 * @param {string} type // 目标对象类型 Object | String | Number | Array
 */
export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`
}

/**
 * @description:  判断val是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
    return is(val, 'Function')
}