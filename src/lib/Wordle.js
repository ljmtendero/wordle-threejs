import * as THREE from 'three'

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

import Block from './Block.js'
import { validKeys } from './Utils.js'
import { words } from './Utils.js'

import font from '../../fonts/JetBrainsMonoExtraBold.ttf'

import Swal from 'sweetalert2'

export default class Wordle {
    constructor() {
        this.level = 0
        this.charIndex = 0
        this.currentWord = ''
        this.word = words[Math.floor(Math.random() * (words.length - 1 - 0 + 1)) + 0]
        console.log('Solución: ' + this.word)

        this.wordleGroup = new THREE.Group()
        this.wordleGroup.position.set( -20, -20, 0 )
        this.createBoard()
        this.setUpFont()
    }

    createBoard() {
        this.blocks = [
            new Block('', 0, 40), new Block('', 10, 40), new Block('', 20, 40), new Block('', 30, 40), new Block('', 40, 40),
            new Block('', 0, 30), new Block('', 10, 30), new Block('', 20, 30), new Block('', 30, 30), new Block('', 40, 30),
            new Block('', 0, 20), new Block('', 10, 20), new Block('', 20, 20), new Block('', 30, 20), new Block('', 40, 20),
            new Block('', 0, 10), new Block('', 10, 10), new Block('', 20, 10), new Block('', 30, 10), new Block('', 40, 10),
            new Block('', 0, 0), new Block('', 10, 0), new Block('', 20, 0), new Block('', 30, 0), new Block('', 40, 0)
        ]

        this.blocks.forEach( (block) => this.wordleGroup.add( block.blockGroup ))
    }

    addCharacter(event) {
        if ( event.key === 'Enter' ) {
            if ( this.currentWord.length === 5 ) {
                if ( words.includes( this.currentWord )) {
                    for ( let i = 0; i < 5; ++i ) {
                        const character = this.word[i]
                        const block = this.blocks[i + this.level * 5]
                        block.checkCharacter( this.word, character )
                    }
                    if ( this.currentWord == this.word ) {
                        return 'win'
                        Swal.fire({
                            title: 'Correcto!',
                            text: 'Has ganado!',
                            icon: 'success',
                            confirmButtonText: 'Restart',
                            allowOutsideClick: false
                        }).then( function(result) {
                            if ( result.isConfirmed ) {
                                // location.reload()
                                console.log('entra')
                            }
                            else {
                                console.log('no entra')
                            }
                        })
                    }
                    this.level += 1
                    this.currentWord = ''
                    this.charIndex = 0

                    if ( this.level == 5 ) {
                        return 'loss'
                        Swal.fire({
                            title: 'La palabra correcta era' + this.word,
                            text: 'Has perdido!',
                            icon: 'error',
                            confirmButtonText: 'Restart',
                            allowOutsideClick: false
                        }).then( (result) => {
                            if ( result.isConfirmed ) {
                                // location.reload()
                            }
                        })
                    }
                }
                else {
                    return 'fail'
                    Swal.fire({
                        text: 'La palabra no se encuentra en la lista',
                        allowOutsideClick: true
                    }).then( (result) => {
                        if ( result.isConfirmed ) {}
                    })
                }
            }
        }
        else if ( event.key === 'Backspace' ) {
            if ( this.charIndex == 0) {
                return 'nothing'
            }
            this.charIndex -= 1;
            this.currentWord = this.currentWord.slice( 0, -1 )
            const block = this.blocks[ this.charIndex + this.level * 5 ]
            block.removeCharacter()            
        }
        else if ( validKeys.includes( event.key )) {
            if ( this.currentWord.length === 5 ) {
                return 'nothing'
            }
            const block = this.blocks[ this.charIndex + this.level * 5 ]
            block.addCharacter( event.key )
            this.charIndex += 1
            this.currentWord += event.key
        }

        return 'nothing'
    }

    setUpFont() {
        this.ttfLoader = new TTFLoader()
        this.fontLoader = new FontLoader()
        
        this.ttfLoader.load(
            font,
            (unparsedFont) => {
                this.parsedFont = this.fontLoader.parse( unparsedFont )
                this.blocks.forEach( (block) => block.setFont( this.parsedFont ))
            }
        )
    }
}