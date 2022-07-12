/**
 * @Author: boyyang
 * @Date: 2022-07-12 10:03:24
 * @LastEditTime: 2022-07-12 13:06:05
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog\web\src\plugin\vanta.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import { App } from 'vue'
import * as THREE from '@/three/three.min.js'
import RINGS from 'vanta/dist/vanta.rings.min.js'
import WAVES from 'vanta/dist/vanta.waves.min.js'
import NET from 'vanta/dist/vanta.net.min.js'
import FOG from 'vanta/dist/vanta.fog.min.js'
import CELLS from 'vanta/dist/vanta.cells.min.js'
import BIRDS from 'vanta/dist/vanta.birds.min.js'
import TRUNK from 'vanta/dist/vanta.trunk.min.js'
import GLOBE from 'vanta/dist/vanta.globe.min.js'

const setupVanta = (app: App) => {
    window.THREE = THREE
    window.VANTA.RINGS = RINGS
    window.VANTA.WAVES = WAVES
    window.VANTA.NET = NET
    window.VANTA.FOG = FOG
    window.VANTA.CELLS = CELLS
    window.VANTA.BIRDS = BIRDS
    window.VANTA.TRUNK = TRUNK
    window.VANTA.GLOBE = GLOBE
}

export { setupVanta }
