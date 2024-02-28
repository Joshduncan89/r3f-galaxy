import React, { useState, useMemo, useEffect } from "react";
import { useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const Cube = () => {
  const { gl } = useThree();

  const texture = useLoader(RGBELoader, "/backgroundSky.hdr");
  const pmremGenerator = new THREE.PMREMGenerator(gl);
  pmremGenerator.compileEquirectangularShader();

  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  envMap.encoding = THREE.LinearEncoding;
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  return (
    <group>
      {envMap && (
        <mesh>
          <sphereGeometry args={[1, 1, 1, 1]} />
          <meshStandardMaterial attach='material' side={THREE.BackSide} envMap={envMap} map={texture} needsUpdate={true} />
        </mesh>
      )}
      <mesh>
        <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
        <meshStandardMaterial attach='material' envMap={envMap} />
      </mesh>
    </group>
  );
};

export default Cube;
