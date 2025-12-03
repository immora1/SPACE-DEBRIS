import { useRef, useLayoutEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// 1. 生成静态的随机数据
const debrisCount = 2000; // 碎片数量
const debrisData = new Array(debrisCount).fill(0).map(() => {
  const layer = Math.random();
  let radius, theta, phi;

  // 轨道分层逻辑
  if (layer < 0.65) {
    radius = 1.6 + Math.random() * 0.3; // LEO
    phi = (Math.random() - 0.5) * Math.PI;
  } else if (layer < 0.85) {
    radius = 2.5 + Math.random() * 0.7; // MEO
    phi = (Math.random() - 0.5) * Math.PI;
  } else {
    radius = 4.5 + Math.random() * 0.1; // GEO
    phi = (Math.random() - 0.5) * 0.15;
  }
  
  theta = Math.random() * Math.PI * 2;

  const x = radius * Math.cos(theta) * Math.cos(phi);
  const y = radius * Math.sin(phi);
  const z = radius * Math.sin(theta) * Math.cos(phi);

  const rot = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];
  
  // 随机微小尺寸
  const scale = 0.003 + Math.random() * 0.007;

  return { pos: [x, y, z], rot, scale };
});


export default function HeroScene() {
  const earthRef = useRef();
  const debrisGroupRef = useRef();
  
  // 加载地球贴图
  const earthTexture = useLoader(THREE.TextureLoader, '/earth_borders.png');

  useFrame((state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.05;
    if (debrisGroupRef.current) debrisGroupRef.current.rotation.y += delta * 0.02;
  });

  return (
    <group position={[1.5, 0, 0]}>
      
      {/* 1. 地球本体 (带贴图 + 纯白基础色) */}
      <mesh ref={earthRef} scale={1.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={earthTexture} color="#FFFFFF" /> 
      </mesh>
      
      {/* 2. 外发光描边层 (不透明度 0.7) */}
      <mesh scale={1.55}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial 
            color="#F4F4F0" 
            side={THREE.BackSide} 
            transparent={true} 
            opacity={0.7} 
        />
      </mesh>

      {/* 3. 碎片群 (极简微小白点) */}
      <group ref={debrisGroupRef}>
        {debrisData.map((data, i) => (
          <mesh key={i} position={data.pos} rotation={data.rot} scale={data.scale}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        ))}
      </group>

    </group>
  );
}