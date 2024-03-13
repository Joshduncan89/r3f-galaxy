import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
import { gsap } from "gsap";
import {
  Box,
  Environment,
  OrbitControls,
  useTexture,
  useCubeTexture,
  PerspectiveCamera,
  Sphere,
  useHelper,
  Circle,
  Billboard,
  useCamera,
  ScrollControls,
  useScroll,
  Scroll,
  Line,
  Html,
  Stars,
} from "@react-three/drei";
import Cube from "./Cube";
import Moon from "./Moon";
import Earth from "./Earth";
import Saturn from "./Saturn";
import Earth_ from "./Earth_";

// const planetData = [
//   { name: "Mercury", diameter: 4879, distance: 57.9 },
//   { name: "Venus", diameter: 12104, distance: 108.2 },
//   { name: "Earth", diameter: 12742, distance: 149.6 },
//   { name: "Mars", diameter: 6779, distance: 227.9 },
//   { name: "Jupiter", diameter: 139820, distance: 778.3 },
//   { name: "Saturn", diameter: 116460, distance: 1427 },
//   { name: "Uranus", diameter: 50724, distance: 2871 },
//   { name: "Neptune", diameter: 49244, distance: 4497 },
//   { name: "Moon", diameter: 3474, distance: 0.00294 },
// ];

const LINE_POINTS = 2000;

// const Scene = () => {
//   const { scene, camera } = useThree();
//   const cameraRef = useRef();
//   const scroll = useScroll();

//   const moonPositions = [
//     new THREE.Vector3(0, 0, -10),
//     new THREE.Vector3(80, 0, 100),
//     new THREE.Vector3(150, 0, 250),
//     new THREE.Vector3(230, 0, 400),
//   ];

//   const curve = useMemo(() => {
//     return new THREE.CatmullRomCurve3(moonPositions, false, "catmullrom", 0.5);
//   });

//   const linepoints = useMemo(() => {
//     return curve.getPoints(LINE_POINTS);
//   }, [curve]);

//   useFrame((_state, delta) => {
//     const curPlanetIndex = Math.min(Math.round(scroll?.offset * linepoints.length), linepoints.length - 1);
//     const curPlanetZ = linepoints[curPlanetIndex];

//     const pointAhead = linepoints[Math.min(curPlanetZ + 1), linepoints.length - 1]

//     // Calculate the distance between current camera position and target position
//     const distance = cameraRef.current.position.distanceTo(curPlanetZ);

//     // Adjust the threshold as needed for when to stop the camera
//     const stopThreshold = 0.1;

//     if (distance > stopThreshold) {
//       // Camera is far from the target, interpolate its position
//       cameraRef.current.position.lerp(curPlanetZ, delta * 24);
//     } else {
//       // Camera is close to the target, set its position directly
//       cameraRef.current.position.set(curPlanetZ.x, curPlanetZ.y, curPlanetZ.z);
//     }

//     // Make the camera look at the current Moon component
//     cameraRef.current.lookAt(curPlanetZ);
//   });

//   return (
//     <>
//       {moonPositions.map((position, index) => (
//         <Moon key={index} position={position} />
//       ))}

//       <OrbitControls enableZoom={false} />
//       <group ref={cameraRef}>
//         <PerspectiveCamera makeDefault position={[0, 0, -10]} fov={40} near={1} far={1000} />
//       </group>
//       <hemisphereLight intensity={0.9} color='white' groundColor='black' />
//     </>
//   );
// };

const Scene_ = () => {
  return (
    <>
      <OrbitControls />
      <PerspectiveCamera makeDefault position={[0, 0, -10]} fov={40} near={1} far={1000} />
      {/* <hemisphereLight intensity={0.9} color='white' groundColor='black' /> */}
      <Earth_ />
    </>
  );
};

const App = () => {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        // backgroundColor: "#37374d",
      }}
    >
      {/* <ScrollControls pages={4} damping={0.3}> */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Scene_ />
      {/* </ScrollControls> */}
    </Canvas>
  );
};

export default App;
