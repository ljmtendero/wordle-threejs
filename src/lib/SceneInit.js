import * as THREE from 'three'

export default class SceneInit {
    constructor(canvasID, camera, scene, renderer, fov=36) {
        this.canvasID = canvasID
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
        this.fov = fov
    }

    initScene() {
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            1,
            1000
        )
        this.camera.position.z = 96

        this.scene = new THREE.Scene()

        const canvas = document.getElementById( this.canvasID )
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true
        })

        this.renderer.setSize( window.innerWidth, window.innerHeight )
        document.body.appendChild( this.renderer.domElement )

        let ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.5 )
        ambientLight.castShadow = true
        this.scene.add( ambientLight )

        let spotLight = new THREE.SpotLight( 0xFFFFFF, 1 )
        spotLight.castShadow = true
        spotLight.position.set( 0, 64, 32 )
        this.scene.add( spotLight )

        window.addEventListener( 'resize', () => this.onWindowResize(), false)
    }

    animate() {
        window.requestAnimationFrame( this.animate.bind( this ))
        this.render()
    }

    render() {
        this.renderer.render( this.scene, this.camera )
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize( window.innerWidth, window.innerHeight )
    }
}