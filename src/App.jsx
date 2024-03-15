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
  CameraControls,
  Stars,
} from "@react-three/drei";
import { DirectionalLightHelper } from "three";
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

const Scene = () => {
  const { camera, scene } = useThree();

  // const backTexture = useTexture("/assets/milkyway.jpg");
  // scene.background = backTexture;

  const cameraControlsRef = useRef();
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 0, -10)); // Initial camera position

  // const moonPositions = [
  //   new THREE.Vector3(0, 0, -10),
  //   new THREE.Vector3(80, 0, 120),
  //   new THREE.Vector3(150, 0, 260),
  //   new THREE.Vector3(230, 0, 410),
  // ];

  // useEffect(() => {
  //   cameraControlsRef.current?.lookInDirectionOf(targetPosition.x,targetPosition.y,targetPosition.z,false)
  // },[targetPosition])

  const { cameraPosition } = useControls({
    cameraPosition: {
      value: "Default", // Default camera position
      options: ["Default", "Position 1", "Position 2", "Position 3"], // List of camera positions
      onChange: position => {
        let target;
        switch (position) {
          case "Default":
            target = new THREE.Vector3(0, 0, -10);
            break;
          case "Position 1":
            target = new THREE.Vector3(180, 0, 120);
            break;
          case "Position 2":
            target = new THREE.Vector3(150, 0, 260);
            break;
          case "Position 3":
            target = new THREE.Vector3(230, 0, 410);
            break;
          default:
            break;
        }
        setTargetPosition(target);
      },
    },
  });

  useFrame((_state, delta) => {
    cameraControlsRef.current?.setLookAt(
      targetPosition.x,
      targetPosition.y,
      targetPosition.z - 5,
      targetPosition.x,
      targetPosition.y,
      targetPosition.z,
      true
    );
    // _state.camera.position.lerp(targetPosition, 0.5);
    // _state.camera.updateProjectionMatrix();
    // console.log(cameraControlsRef.current);
    // if (cameraControlsRef.current) {
    //   cameraControlsRef.current?.setLookAt(targetPosition, targetPosition);
    // }
    // console.log(targetPosition.x, targetPosition.y, targetPosition.z);
    // console.log(targetPosition);
  });

  return (
    <>
      <CameraControls ref={cameraControlsRef} />
      {/* {moonPositions.map((position, index) => (
        <Moon key={index} name={`Moon${index}`} position={position} />
      ))} */}
      <Earth_ position={[0, 0, -10]} />
      <Saturn position={[180, 0, 120]} />

      <hemisphereLight intensity={0.9} color='white' groundColor='black' />
    </>
  );
};

const App = () => {
  return (
    <Canvas>
      <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Scene />
    </Canvas>
  );
};

export default App;

// const Scene_ = () => {
//   const light = useRef();

//   useHelper(light, DirectionalLightHelper, 0.5, "blue");

//   const { x, y, z, int } = useControls({
//     int: { value: 1.5, min: 0, max: 10, step: 0.1 }, // Adjust min, max, and initial value
//     x: { value: 1.5, min: -10, max: 10, step: 0.1 },
//     y: { value: 0.3, min: -10, max: 10, step: 0.1 },
//     z: { value: -0.6, min: -10, max: 10, step: 0.1 },
//   });

//   return (
//     <>
//       {/* <hemisphereLight intensity={0.9} color='white' groundColor='black' /> */}
//       <directionalLight intensity={int} position={[x, y, z]} />
//       <Earth_ />
//       <Saturn />
//     </>
//   );
// };
