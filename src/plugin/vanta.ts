import {App} from 'vue'
import * as THREE from 'three'
import RINGS from 'vanta/dist/vanta.rings.min.js'
import WAVES from 'vanta/dist/vanta.waves.min.js'
import NET from 'vanta/dist/vanta.net.min.js'
import FOG from 'vanta/dist/vanta.fog.min.js'
import CELLS from 'vanta/dist/vanta.cells.min.js'
import BIRDS from 'vanta/dist/vanta.birds.min.js'
import TRUNK from 'vanta/dist/vanta.trunk.min.js'
import GLOBE from 'vanta/dist/vanta.globe.min.js'
import HALO from 'vanta/dist/vanta.halo.min.js'

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
    window.VANTA.HALO = HALO
}

export {setupVanta}
