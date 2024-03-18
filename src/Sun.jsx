import { useTexture, Sphere } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import fragment from "./shaders/fragment";
import vertex from "./shaders/vertex";

const Sun = ({ position }) => {
  const sunRef = useRef();
  const matRef = useRef();

  // Load textures using drei's useTexture
  const texture = useTexture("/assets/sunmap.jpg");

  const uniforms = useRef({
    time: { value: 0 },
    resolution: { value: new THREE.Vector4() },
  });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    // Update the time uniform in the shader material
    // console.log("Elapsed Time:", elapsedTime);
    matRef.current.uniforms.time.value = elapsedTime; // Update based on elapsed time
  });

  return (
    <group position={[0, 0, -50]}>
      <Sphere ref={sunRef} args={[24, 32, 32]}>
        {/* <meshStandardMaterial emissive={0xffff00} emissiveIntensity={2} map={texture} />*/}
        <shaderMaterial ref={matRef} fragmentShader={fragment} vertexShader={vertex} uniforms={uniforms.current} />
      </Sphere>
    </group>
  );
};

export default Sun;
