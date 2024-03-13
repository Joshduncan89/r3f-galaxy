import { Icosahedron, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Earth = () => {
  const texture = useTexture("/assets/earthmap1k.jpg");
  const ref = useRef();

  useFrame(({ clock }) => {
    // Rotate the Earth slowly over time
    const elapsed = clock.getElapsedTime();
    // You can adjust the rotation speed by multiplying elapsed by a factor
    const rotationSpeed = 0.01;
    const rotationAngle = elapsed * rotationSpeed;

    // Update the rotation of the Earth component
    // Assuming you have a ref called earthRef
    ref.current.rotation.y = rotationAngle;
    ref.current.rotation.x = rotationAngle;
  });

  return (
    <>
      <Icosahedron args={[1, 16]} position={[0, 0, 0]} ref={ref}>
        {/* <Icosahedron args={[3, 16]} position={[0, -3, 0]} ref={ref}> */}
        <meshStandardMaterial map={texture} />
      </Icosahedron>
    </>
  );
};

export default Earth;
