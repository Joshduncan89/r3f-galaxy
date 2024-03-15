import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { DoubleSide } from "three";
import { useControls } from "leva";
import EarthDayMap from "/assets/8k_earth_daymap.jpg";
import EarthNormalMap from "/assets/8k_earth_normal_map.jpg";
import EarthSpecularMap from "/assets/8k_earth_specular_map.jpg";
import EarthCloudsMap from "/assets/8k_earth_clouds.jpg";
import { TextureLoader } from "three";

const Earth_ = () => {
  //   const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
  //     TextureLoader,
  //     [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  //   );

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]);

  const earthRef = useRef();
  const cloudsRef = useRef();

  const { tiltx, tilty, tiltz } = useControls({
    x: { value: 1.5, min: -10, max: 10, step: 0.1 },
    y: { value: 0.3, min: -10, max: 10, step: 0.1 },
    z: { value: -0.6, min: -10, max: 10, step: 0.1 },
  });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 6;
    cloudsRef.current.rotation.y = elapsedTime / 6;
  });

  return (
    <>
      <ambientLight intensity={1} />
      {/* <pointLight color='#f6f3ea' position={[2, 0, 0]} intensity={1.2} /> */}
      <mesh ref={cloudsRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial map={cloudsMap} opacity={0.4} depthWrite={true} transparent={true} side={DoubleSide} />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4} roughness={0.7} />
        {/* <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        /> */}
      </mesh>
    </>
  );
};

export default Earth_;
