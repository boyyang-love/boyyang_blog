/**
 * @Author: boyyang
 * @Date: 2022-05-16 11:07:52
 * @LastEditTime: 2022-06-04 11:54:23
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \drawingBed\tailwind.config.js
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    corePlugins: {
        preflight: true,
    },
    plugins: [],
}
