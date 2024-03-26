import {
  Text3D,
  OrbitControls,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function Experience() {
  const donuts = useRef(null);
  const [getTorusGeometry, setTorusGeometry] = useState(null);
  const matcapTexture = new THREE.TextureLoader().load(
    "/matcaps/537387_75BBB9_152E5B_0E85E8.jpg"
  );

  useFrame((state, delta) => {
    for (const donut of donuts.current.children) {
      donut.rotation.y += delta * 0.15;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />

      <OrbitControls makeDefault />
      <Center>
        <Text3D
          font={"/fonts/helvetiker_regular.typeface.json"}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.2}
          bevelOffset={0}
          bevelSegments={5}
        >
          Panjere Studio
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>
      <group ref={donuts}>
        {[...Array(100)].map(() => (
          <mesh
            key={Math.random()}
            geometry={getTorusGeometry}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.15 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            <meshMatcapMaterial matcap={matcapTexture} />
          </mesh>
        ))}
      </group>
    </>
  );
}
