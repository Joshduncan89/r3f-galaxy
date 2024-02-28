import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Box, Environment, OrbitControls, useTexture, useCubeTexture } from "@react-three/drei";
import Cube from "./Cube";

const Background = () => {
  // const skyboxTexture = useCubeTexture(
  //   ["heather_ft.jpg", "heather_bk.jpg", "heather_up.jpg", "heather_dn.jpg", "heather_lf.jpg", "heather_rt.jpg"],
  //   { path: "/background/" }
  // );

  //   const [texUp,texDown,texLeft,texRight,texFr,texBk] = useTexture('/background/heather_up.jpg','/background/heather_dn.jpg','/background/heather_lf.jpg','/background/heather_rt.jpg','/background/heather_ft.jpg','/background/heather_bk.jpg')

  const { scene } = useThree(); // Access the Three.js scene instance
  const skyboxTexture = useCubeTexture(
    ["heather_rt.jpg", "heather_lf.jpg", "heather_up.jpg", "heather_dn.jpg", "heather_ft.jpg", "heather_bk.jpg"],
    { path: "/background/" }
  );

  // Update the background of the scene with the skybox texture
  scene.background = skyboxTexture;

  return null;
};

const Scene = () => {
  const boxRef = useRef();
  useFrame((state, delta) => {
    boxRef.current.rotation.y += 0.02;
  });

  return (
    <>
      <Box ref={boxRef} args={[1, 1, 1]} rotation={[0.5, 0, 0]}>
        <meshNormalMaterial />
      </Box>
      <ambientLight />
    </>
  );
};

const App = () => {
  return (
    <Canvas camera={{ fov: 70, position: [0, 0, 10] }} style={{ width: "100%", height: "100%" }}>
      <hemisphereLight intensity={0.5} color='white' groundColor='black' />
      <OrbitControls />
      <Background />
      <Scene />
    </Canvas>
  );
};

export default App;
