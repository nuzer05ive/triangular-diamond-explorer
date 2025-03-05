import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const generatePrimeArray = (limit) => {
  let primes = [];
  let sieve = new Array(limit).fill(true);
  for (let i = 2; i < limit; i++) {
    if (sieve[i]) {
      primes.push(i);
      for (let j = i * i; j < limit; j += i) {
        sieve[j] = false;
      }
    }
  }
  return primes;
};

const TriangularDiamond = () => {
  const ref = useRef();
  const [primeData, setPrimeData] = useState([]);

  useEffect(() => {
    const primes = generatePrimeArray(500);
    let positions = [];
    let n = 1;
    let x = 0, y = 0;
    let dx = 1, dy = -1;

    for (let i = 0; i < primes.length; i++) {
      positions.push([x * 0.1, y * 0.1, 0]);
      x += dx;
      y += dy;
      if (n % 2 === 0) {
        dx *= -1;
        dy *= -1;
      }
      n++;
    }
    setPrimeData(positions);
  }, []);

  return (
    <group ref={ref}>
      {primeData.map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color={index % 3 === 0 ? "red" : index % 6 === 0 ? "blue" : "green"} />
        </mesh>
      ))}
    </group>
  );
};

export default function TriangularDiamondExplorer() {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />
      <TriangularDiamond />
      <OrbitControls />
    </Canvas>
  );
}
