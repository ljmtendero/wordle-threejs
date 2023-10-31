import * as THREE from 'three'

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

export default class Block {
    constructor(character, x, y) {
        this.animate = false
        this.character = character
        this.x = x
        this.y = y
        this.blockGroup = new THREE.Group()
        this.blockGroup.position.set( x, y, 0 )
        this.addBlock()

        const animate = () => {
            if ( this.animate ) {
                this.blockGroup.rotation.z = (Math.sin(Date.now() * 0.01) * Math.PI) / 32
            }
            requestAnimationFrame( animate ) 
        }
        animate()
    }

    setFont(parsedFont) {
        this.parsedFont = parsedFont
    }

    checkCharacter(word, character) {
        if ( this.character === character ) {
            this.block.material.color.set( '#008000' )
            this.animate = true
        }
        else if ( word.includes( this.character )) {
            this.block.material.color.set( '#F7DF1E' )
        }
    }

    addBlock() {
        const geometry = new RoundedBoxGeometry( 8, 8, 8, 4, 1 )
        const material = new THREE.MeshPhongMaterial({
            color: '#FAFAFA',
            transparent: true,
            opacity: 0.25
        })
        this.block = new THREE.Mesh( geometry, material )
        this.blockGroup.add( this.block )
    }

    removeCharacter() {
        this.blockGroup.remove( this.characterMesh )
        this.block.material.opacity = 0.25
    }

    addCharacter(character) {
        this.character = character
        const characterGeometry = new TextGeometry( character, {
            font: this.parsedFont,
            size: 5,
            height: 2
        })
        const characterMaterial = new THREE.MeshNormalMaterial({})
        this.characterMesh = new THREE.Mesh( characterGeometry, characterMaterial )
        this.characterMesh.position.set( -2, -2, -1 )
        this.blockGroup.add( this.characterMesh )
        this.block.material.opacity = 0.5
    }
}