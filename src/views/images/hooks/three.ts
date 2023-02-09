/**
 * @Author: boyyang
 * @Date: 2023-02-07 14:23:31
 * @LastEditTime: 2023-02-07 16:19:47
 * @LastEditors: boyyang
 * @Description:
 * @FilePath: \blog_web\src\views\images\hooks\three.ts
 * @[如果痛恨所处的黑暗，请你成为你想要的光。 --塞尔维亚的天空]
 */

import * as THREE from 'three'

const init = (el: Element | null) => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(el?.clientWidth, el?.clientHeight)
    el?.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    

    camera.position.z = 5
    cube.rotation.x += 0.5

    renderer.render(scene, camera)

    function animate() {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        renderer.render(scene, camera)
    }

    animate()
}

export { init }
