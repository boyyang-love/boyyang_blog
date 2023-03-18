/**
 * @Author: boyyang
 * @Date: 2022-04-17 11:49:06
 * @LastEditTime: 2023-02-23 15:24:19
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog_web\src\utils\is\index.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

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