import { useTexture, Sphere } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import fragment from "./shaders/fragment";
import vertex from "./shaders/vertex";
import sunFragment from "./shaders/sunFrag";
import { getFresnelMat } from "./functions/getFresnel";

const Sun = ({ position }) => {
  const sunRef = useRef();
  const matRef = useRef();
  const fresnel = getFresnelMat({ rimColor: "#FFA500", facingColor: "#FF6600", fresnelBias: 0.4, fresnelPower: 4.0, fresnelScale: 2.0 });

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
        <shaderMaterial ref={matRef} fragmentShader={sunFragment} vertexShader={vertex} uniforms={uniforms.current} />
      </Sphere>
      {/* <mesh material={fresnel}>
        <sphereGeometry args={[24, 32, 32]} />
      </mesh> */}
    </group>
  );
};

export default Sun;
