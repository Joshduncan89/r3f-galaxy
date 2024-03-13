import { Icosahedron, useTexture } from "@react-three/drei";
import { useRef } from "react";

const Moon = ({ position }) => {
  const moonRef = useRef();

  // Load textures using drei's useTexture
  const texture = useTexture("/assets/moon-texture.jpg");
  const displacementMap = useTexture("/assets/moon-displacement.jpg");

  // useFrame(() => {
  //   // Rotate the moon over time
  //   moonRef.current.rotation.y += 0.001;
  // });

  return (
    <Icosahedron args={[1, 16]} scale={[0.27, 0.27, 0.27]} ref={moonRef} position={position}>
      <meshStandardMaterial
        color={0xf0f0f0}
        map={texture}
        displacementMap={displacementMap}
        displacementScale={0.06}
        roughness={1} // Adjust roughness as needed
        metalness={0} // Adjust metalness as needed
      />
    </Icosahedron>
  );
};

export default Moon;
