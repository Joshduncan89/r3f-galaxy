import { useTexture, Sphere } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import fragment from "./shaders/fragment";
import vertex from "./shaders/vertex";
import sunFragment from "./shaders/sunFrag";
import { getFresnelMat } from "./functions/getFresnel";

const MilkyWay = ({ position }) => {
  const matRef = useRef();

  const texture = useTexture("/assets/milkywaybg.jpg");

  return (
    <Sphere ref={matRef} args={[480, 100, 100]} position={[0, 0, 0]}>
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </Sphere>
  );
};

export default MilkyWay;
