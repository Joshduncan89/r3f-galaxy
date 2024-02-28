import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Box, Environment, OrbitControls, useTexture, useCubeTexture, PerspectiveCamera } from "@react-three/drei";
import Cube from "./Cube";

const Scene = () => {
  const { camera, gl } = useThree();

  // Create a ref for the camera
  const controls = useRef();

  useEffect(() => {
    const handleControlsChange = () => {
      console.log("Camera Position:", camera.position);
      console.log("Camera Rotation:", camera.rotation);
    };

    controls.current.addEventListener("change", handleControlsChange);

    return () => {
      controls.current.removeEventListener("change", handleControlsChange);
    };
  }, [camera]);

  useFrame(() => {
    controls.current.update(); // Make sure to update controls in the animation loop
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[-25, -15, 20]} fov={70} near={1} far={1000} />
      <OrbitControls ref={controls} args={[camera, gl.domElement]} />
      <Environment files='https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/dikhololo_night_4k.hdr' background />
      <hemisphereLight intensity={0.5} color='white' groundColor='black' />
    </>
  );
};

const Moon = () => {
  const moonRef = useRef();

  const moonPosition = useControls({
    x: { value: 30, min: -50, max: 50 },
    y: { value: 0, min: -50, max: 50 },
    z: { value: 10, min: -50, max: 50 },
  });

  // Update moon rotation using useFrame
  useFrame(() => {
    // Rotate the moon over time
    moonRef.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={moonRef} position={moonPosition}>
      {" "}
      {/* Adjust position based on your scene */}
      {/* Create the moon geometry and material */}
      <sphereGeometry args={[5, 32, 32]} /> {/* Adjust radius, segments, and rings */}
      <meshBasicMaterial color={0xffffff} /> {/* Adjust moon color */}
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <Scene />
      <OrbitControls />
      <Moon />
    </Canvas>
  );
};

export default App;
