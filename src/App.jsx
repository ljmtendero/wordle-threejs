import { useEffect } from 'react'

import SceneInit from './lib/SceneInit.js'
import Wordle from './lib/Wordle.js'

function App() {
    useEffect( () => {
        const test = new SceneInit( 'myWordleCanvas' )
        test.initScene()
        test.animate()

        const wordle = new Wordle()
        test.scene.add( wordle.wordleGroup )

        window.addEventListener( 'keydown', (event) => {
            if ( event.repeat ) {
                return
            }
            wordle.addCharacter( event )
        })
    }, [])

    return (
        <div>
            <canvas id='myWordleCanvas'></canvas>
        </div>
    )
}

export default App
