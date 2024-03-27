import {  CameraControls, Environment, Float, MeshReflectorMaterial, RenderTexture, Text } from '@react-three/drei';
import { Camping } from './Camping'
import { useEffect, useRef } from 'react';
import {Color} from "three"
import { useSnapshot } from 'valtio';
import state from '../store';
import { useFrame } from '@react-three/fiber';
import { lerp } from "three/src/math/MathUtils";


const Model = () => {


   const snap = useSnapshot(state);

   //text style refrence
   const textMaterial=useRef()

   //animation for text
  useFrame((_, delta) => {
    textMaterial.current.opacity = lerp(
      textMaterial.current.opacity,
      snap.currentPage === "home" || snap.currentPage === "intro" ? 1 : 0,
      delta * 2
    );
  });



  // reference camera
   const controls=useRef()

  //bloom color
   const bloomColor=new Color("#fff")
   bloomColor.multiplyScalar(1.5);

  // reference invisible box in home
   const fitCameraHome=useRef()

  // reference invisible box in store
   const fitCameraStore=useRef()



 //function to animate camera in the into
   const intro=async ()=>
   {
     controls.current.dolly(-22)
     setTimeout(() => {
        state.currentPage="home"
     }, 1200);
     fitCamera()
   }

   //function to fix the camera on the box (responsive)
   const fitCamera = async()=>
   {
     if(snap.currentPage=="store")
     {
       controls.current.smoothTime = 0.5
       controls.current.fitToBox(fitCameraStore.current,true)
     }
     else
     {
        controls.current.smoothTime = 0.9
        controls.current.fitToBox(fitCameraHome.current,true)
     }
   }


   useEffect(()=>
   {
     intro()
   },[])

    useEffect(()=>
   {
     fitCamera()
     window.addEventListener("resize",fitCamera)
     return ()=> window.removeEventListener('resize',fitCamera)
   },[snap.currentPage])
   
  return (
    <>
    {/*Add camera controle with animation */}  
     <CameraControls ref={controls} maxPolarAngle={Math.PI/2} minPolarAngle={Math.PI/6} />
         
    {/*Add invisible element to refert camera to it (resposive) */}  
        <mesh ref={fitCameraHome} position={[0,0.5,0]} visible={false}>
            <boxGeometry args={[11,2,5]}/>
            <meshBasicMaterial color={"red"} transparent opacity={0.5}/>
        </mesh>

    {/*Add 3d text */}  
        <Text  font={"/Fonts/Poppins-Black.ttf"} lineHeight={0.8}  position={[-1.8,-0.5,1]} rotation={[0,0.5,0]} anchorY={"bottom"}>
                MY LITTLE {"\n"} CAMPING

            <meshBasicMaterial  color={bloomColor} toneMapped={false} ref={textMaterial} >
                {/*Add Texture inside the text */}  
                 <RenderTexture attach="map">
                    <color attach={"background"} args={["#fff"]}/>
                    <Environment preset='sunset'/>
                     <Float
                        rotationIntensity={4} // XYZ rotation intensity, defaults to 1
                        speed={2}
                        floatIntensity={5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                        >
                        <mesh />
                        <Camping scale={1.6} rotation={[0.5,-0.3,0]} position={[-1.5,0,0]}/>
                    </Float>
                 </RenderTexture>
            </meshBasicMaterial>
        </Text>

      {/*camp 3d model */}  
        <group rotation={[0,-0.5,0]} position={[2.7,0,0]}>
            <Camping html scale={0.6}  />
             {/*Add invisible element to refert camera to it (resposive) */}  
                <mesh ref={fitCameraStore} visible={false} >
                    <boxGeometry args={[4.5,1,2]} />
                    <meshBasicMaterial color={"red"} transparent opacity={0.5}/>
                </mesh>
  
        </group>

      {/*Add reflexion floor */}  
        <mesh rotation={[-1.57,0,0]} position={[0,-0.47,0]}  >
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.5}
            />
        </mesh>

      {/*Add environment for lightning */}  
        <Environment preset='sunset'/>
      
    </>
  );
}

export default Model;
