
import { Canvas } from '@react-three/fiber'
import Model from './components/Model'
import { MeshReflectorMaterial } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense } from 'react'
import Button from './components/Button'


function App() {




  return (
    <div className='h-screen w-full '>
      <Canvas camera={{position:[0,0,8],fov:40}}>

          <color attach={"background"} args={["#171720"]}/>
          <fog attach={"fog"} args={["#171720",10,30]} />

            <Suspense >
                <Model/>
            </Suspense>

            <EffectComposer>
              <Bloom intensity={0.2} />
            </EffectComposer>
        
      </Canvas>  
      <Button/>
    </div>
  )
}

export default App
