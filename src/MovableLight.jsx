import { useThree } from "react-three-fiber";
import { useControls } from "leva";

const MovableLight = () => {
  const { camera } = useThree();

  // Define initial state and controls for the light
  const { lightX, lightY, lightZ } = useControls({
    lightX: { value: 0, min: -50, max: 50 },
    lightY: { value: 10, min: 0, max: 50 },
    lightZ: { value: 10, min: -50, max: 50 },
  });

  // Create a PointLight
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(lightX, lightY, lightZ);

  // Add the light to the scene
  camera.add(light);

  return null; // This component doesn't render anything, as it's handling the light directly
};

export default MovableLight;
