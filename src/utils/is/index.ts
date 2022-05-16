/**
 * @Author: boyyang
 * @Date: 2022-04-17 11:49:06
 * @LastEditTime: 2022-05-10 11:33:39
 * @LastEditors: boyyang
 * @Description: 
 * @FilePath: \drawingBed\src\utils\is\index.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
    return  toString.call(val) === `[object ${type}]`
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
    return is(val, 'Function')
}