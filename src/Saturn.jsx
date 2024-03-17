import { useTexture, TorusKnot, Ring, Sphere } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

const Saturn = ({ position }) => {
  const moonRef = useRef();
  const ringRef = useRef();

  // Load textures using drei's useTexture
  const texture = useTexture("/assets/saturnmap.jpg");
  const ringTex = useTexture("/assets/saturnringcolor.jpg");
  const displacementMap = useTexture("/assets/moon-displacement.jpg");

  useEffect(() => {
    // Calculate UVs for the ring geometry
    const geometry = ringRef.current.geometry;
    const pos = geometry.attributes.position;
    const uv = geometry.attributes.uv;
    const v3 = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
    }

    // Ensure proper rendering
    geometry.attributes.uv.needsUpdate = true;
  }, []);

  return (
    <group position={position}>
      <Sphere ref={moonRef} args={[2.4, 32, 32]}>
        <meshStandardMaterial
          color={0xf0f0f0}
          map={texture}
          displacementMap={displacementMap}
          displacementScale={0.06}
          roughness={1} // Adjust roughness as needed
          metalness={0} // Adjust metalness as needed
        />
      </Sphere>
      <Ring ref={ringRef} args={[3, 5, 64]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial transparent map={ringTex} opacity={0.7} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
};

export default Saturn;
