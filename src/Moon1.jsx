const Moon = () => {
  const { camera } = useThree();
  const moonRef = useRef();

  // Update moon position and rotation using useFrame
  useFrame(() => {
    // Update the moon's position based on your desired coordinates
    moonRef.current.position.set(x, y, z);

    // Make the moon always face the camera for a billboard effect
    moonRef.current.lookAt(camera.position);
  });

  return (
    <mesh ref={moonRef}>
      {/* Create the moon geometry and material */}
      <sphereGeometry args={[radius, segments, rings]} />
      <meshBasicMaterial color={moonColor} />
    </mesh>
  );
};

// const Moon = () => {
//   const moonRef = useRef();

//   // Load textures using drei's useTexture
//   const texture = useTexture("/assets/moon-texture.jpg");
//   const displacementMap = useTexture("/assets/moon-displacement.jpg");

//   // Leva control for moon size
//   const { size, xm, ym, zm } = useControls({
//     size: { value: 4.4, min: 0, max: 10 }, // Adjust min, max, and initial value
//     xm: { value: 24, min: -50, max: 50 },
//     ym: { value: 30, min: -50, max: 50 },
//     zm: { value: -3, min: -50, max: 50 },
//   });

//   // useFrame(() => {
//   //   // Rotate the moon over time
//   //   moonRef.current.rotation.y += 0.001;
//   // });

//   return (
//     <mesh ref={moonRef} position={[xm, ym, zm]} scale={[size, size, size]}>
//       <sphereGeometry args={[1, 60, 60]} />
//       <meshStandardMaterial
//         color={0xf0f0f0}
//         map={texture}
//         displacementMap={displacementMap}
//         displacementScale={0.06}
//         roughness={1} // Adjust roughness as needed
//         metalness={0} // Adjust metalness as needed
//       />
//     </mesh>
//   );
// };

// const Saturn = () => {
//   // Load texture

//   const texture = useTexture("/assets/saturn.webp");
//   // Create circle geometry

//   return (
//     <Billboard position={[24, 30, -5]}>
//       <Circle args={[5, 32]}>
//         <meshBasicMaterial map={texture} />
//       </Circle>
//     </Billboard>
//   );
// };

// const { camera, gl } = useThree();

// const controls = useRef();
// const directionalLightRef = useRef();

// useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white");

// const { x, y, z, int } = useControls({
//   x: { value: 0, min: -50, max: 50 },
//   y: { value: 0, min: -50, max: 50 },
//   z: { value: 10, min: -50, max: 50 },
//   int: { value: 1, min: 0, max: 40, step: 0.5 },
// });

// useEffect(() => {
//   const handleControlsChange = () => {
//     console.log("Camera Position:", camera.position);
//     console.log("Camera Rotation:", camera.rotation);
//   };

//   controls.current.addEventListener("change", handleControlsChange);

//   return () => {
//     controls.current.removeEventListener("change", handleControlsChange);
//   };
// }, [camera]);

// useFrame(() => {
//   controls.current.update();
// });

// const Scene = () => {

//   return (
//     <>
//       <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={70} near={1} far={1000} />
//       {/* <pointLight color={"red"} position={[x, y, z]} /> */}
//       {/* <directionalLight ref={directionalLightRef} color={0xffffff} position={[-23, -21, 13]} intensity={4} /> */}
//       <OrbitControls ref={controls} args={[camera, gl.domElement]} />
//       {/* <Environment files='https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/dikhololo_night_4k.hdr' background /> */}
//       <hemisphereLight intensity={0.9} color='white' groundColor='black' />
//     </>
//   );
// };
