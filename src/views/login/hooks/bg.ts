import * as THREE from 'three'

import {FontLoader} from 'three/addons/loaders/FontLoader.js'
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js'

const bgInit = (el: Element | null) => {
    // scene camera renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        75,
        (el?.clientWidth || window.innerWidth) / (el?.clientHeight || window.innerHeight),
        0.1,
        1000,
    )
    camera.position.set(0, 400, 700)

    const renderer = new THREE.WebGLRenderer({antialias: true})
    // scene.background = new THREE.Color('rgb(22, 24, 35)')

    // 文字
    const loader = new FontLoader()

    loader.load('/public/fonts/helvetiker_bold.typeface.json', function (font: any) {
        const geometry = new TextGeometry('Hello three.js!', {
            font: font,
            size: 85,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelSegments: 5,
        })

        const textMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color('rgb(0, 0, 255)'),
            specular: 0xffffff,
        })

        const mesh = new THREE.Mesh(geometry, textMaterial)

        console.log(mesh)

        scene.add(mesh)

        camera.lookAt(mesh.position)//指向mesh对应的位置
    })

    renderer.setSize(el?.clientWidth || window.innerWidth, el?.clientHeight || window.innerHeight)

    el?.appendChild(renderer.domElement)

    renderer.render(scene, camera)
}

export {bgInit}
