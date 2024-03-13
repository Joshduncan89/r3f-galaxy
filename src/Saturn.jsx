import { useTexture, TorusKnot } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const Saturn = () => {
  const moonRef = useRef();

  // Load textures using drei's useTexture
  const texture = useTexture("/assets/saturnmap.jpg");
  const ringTex = useTexture("/assets/saturnringcolor.jpg");
  const displacementMap = useTexture("/assets/moon-displacement.jpg");

  // useFrame(() => {
  //   // Rotate the moon over time
  //   moonRef.current.rotation.y += 0.001;
  // });

  return (
    <group position={[0, 0, -10]}>
      <mesh ref={moonRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color={0xf0f0f0}
          map={texture}
          displacementMap={displacementMap}
          displacementScale={0.06}
          roughness={1} // Adjust roughness as needed
          metalness={0} // Adjust metalness as needed
        />
      </mesh>
      <mesh rotation={[Math.PI / -2.3, 0, 0]}>
        <torusGeometry args={[3.5, 0.5, 2.5, 100]} />
        <meshStandardMaterial transparent map={ringTex} opacity={0.7} />
      </mesh>
    </group>
  );
};

export default Saturn;
