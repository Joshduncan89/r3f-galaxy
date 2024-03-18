import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture, useHelper, Icosahedron } from "@react-three/drei";
import { DoubleSide, AdditiveBlending } from "three";
import { useControls } from "leva";
import { getFresnelMat } from "./functions/getFresnel";
// import EarthDayMap from "/assets/8k_earth_daymap.jpg";
// import EarthNormalMap from "/assets/8k_earth_normal_map.jpg";
import EarthNormalMap from "/assets/earthmap1k.jpg";
import EarthSpecularMap from "/assets/8k_earth_specular_map.jpg";
import EarthCloudsMap from "/assets/earthCloudss.jpg";
import EarthLightsMap from "/assets/earthlights.jpg";
import AlphaMap from "/assets/cloudalpha.jpg";
import EarthBump from "/assets/earthbump.jpg";
import EarthSpec from "/assets/earthspec.jpg";
import { TextureLoader, DirectionalLightHelper } from "three";

const Earth_ = ({ position }) => {
  //   const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
  //     TextureLoader,
  //     [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  //   );
  const moonRef = useRef();

  // Load textures using drei's useTexture
  const texture = useTexture("/assets/moon-texture.jpg");
  const displacementMap = useTexture("/assets/moon-displacement.jpg");

  const fresnelMat = getFresnelMat();

  const [normalMap, cloudsMap, lightMap, alphaMap, bumpMap, specMap] = useTexture([
    EarthNormalMap,
    EarthCloudsMap,
    EarthLightsMap,
    AlphaMap,
    EarthBump,
    EarthSpec,
  ]);

  const earthRef = useRef();
  const cloudsRef = useRef();
  const lightRef = useRef();
  const groupRef = useRef();
  const earthLightsRef = useRef();
  const fresnelRef = useRef();

  // useHelper(lightRef, DirectionalLightHelper, 0.05, "white");

  // const { x, y, z, int } = useControls({
  //   x: { value: 12, min: -50, max: 50, step: 0.1 },
  //   y: { value: 5, min: -50, max: 50, step: 0.1 },
  //   z: { value: -8, min: -50, max: 50, step: 0.1 },
  //   int: { value: 1.4, min: -15, max: 15, step: 0.1 },
  // });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    groupRef.current.rotation.y = elapsedTime / 24;
    // earthRef.current.rotation.y = elapsedTime / 24;
    // cloudsRef.current.rotation.y = elapsedTime / 24;
    // earthLightsRef.current.rotation.y = elapsedTime / 24;
    const rotationSpeedMultiplier = 1.25; // 25% faster rotation
    const rotationAngle = (-elapsedTime / 24) * rotationSpeedMultiplier; // Note the negative sign

    // Calculate the radius of the orbit (distance from the center)
    const orbitRadius = 15; // Adjust as needed

    // Calculate the new position of the moon along its orbit
    const newX = Math.cos(rotationAngle) * orbitRadius;
    const newZ = Math.sin(rotationAngle) * orbitRadius;

    // Update the position of the moon
    moonRef.current.position.set(newX, 0, newZ);
  });

  return (
    <>
      <directionalLight color={0xffffff} position={[12, 5, -8]} intensity={1.4} ref={lightRef} />
      <group position={position} rotateZ={(-23.4 * Math.PI) / 180} ref={groupRef}>
        {/* <ambientLight intensity={1} /> */}

        <Icosahedron args={[1, 16]} scale={[0.4, 0.4, 0.4]} ref={moonRef} position={[12, 0, 0]}>
          <meshStandardMaterial
            color={0xf0f0f0}
            map={texture}
            displacementMap={displacementMap}
            displacementScale={0.06}
            roughness={1} // Adjust roughness as needed
            metalness={0} // Adjust metalness as needed
          />
        </Icosahedron>
        <group scale={2.5}>
          <mesh ref={earthRef}>
            <icosahedronGeometry args={[1, 24]} />
            <meshPhongMaterial map={normalMap} specMap={specMap} bumpMap={bumpMap} bumpScale={0.4} />
          </mesh>
          <mesh ref={earthLightsRef}>
            <icosahedronGeometry args={[1, 24]} />
            <meshBasicMaterial map={lightMap} blending={AdditiveBlending} />
          </mesh>
          <mesh ref={cloudsRef}>
            <icosahedronGeometry args={[1, 24]} />
            <meshStandardMaterial map={cloudsMap} opacity={0.8} transparent={true} blending={AdditiveBlending} alphaMap={alphaMap} />
          </mesh>
          <mesh ref={fresnelRef} material={fresnelMat}>
            <icosahedronGeometry args={[1, 24]} />
          </mesh>
        </group>
      </group>
    </>
  );
};

export default Earth_;
