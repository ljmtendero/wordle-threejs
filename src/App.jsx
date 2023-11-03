import { useEffect } from 'react'

import SceneInit from './lib/SceneInit.js'
import Wordle from './lib/Wordle.js'

import Swal from 'sweetalert2'


function App() {
    useEffect( () => {
        const test = new SceneInit( 'myWordleCanvas' )
        test.initScene()
        test.animate()

        const wordle = new Wordle()
        test.scene.add( wordle.wordleGroup )

        window.addEventListener( 'keydown', (event) => {
            let state = wordle.addCharacter( event )

            if ( state == 'win') {
                setTimeout( () => {
                    Swal.fire({
                        title: 'Correcto!',
                        text: 'Has ganado!',
                        icon: 'success',
                        confirmButtonText: 'Restart',
                        allowOutsideClick: false
                    }).then( function(result) {
                        if ( result.isConfirmed ) {
                            location.reload()
                        }
                    })
                }, 0)
            }
            else if ( state == 'loss' ) {
                setTimeout( () => {
                    Swal.fire({
                        title: 'La palabra correcta era ' + wordle.word,
                        text: 'Has perdido!',
                        icon: 'error',
                        confirmButtonText: 'Restart',
                        allowOutsideClick: false
                    }).then( (result) => {
                        if ( result.isConfirmed ) {
                            location.reload()
                        }
                    })
                }, 0)
            }
            else if ( state == 'fail' ) {
                setTimeout( () => {
                    Swal.fire({
                        text: 'La palabra no se encuentra en la lista',
                        allowOutsideClick: true
                    }).then( (result) => {
                        if ( result.isConfirmed ) {}
                    })
                }, 0)
            }
            else {}
        })
    }, [])

    return (
        <div>
            <canvas id='myWordleCanvas'></canvas>
        </div>
    )
}

export default App
