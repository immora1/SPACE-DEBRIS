import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function OrbitScene({ setOrbitState, currentOrbit }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group position={[-2.5, 0, 0]} scale={0.35}>
      
      {/* 1. 顶部标题栏 */}
      <group position={[0, 6, 0]}>
          
          {/* 蓝色小圆点 */}
          <mesh position={[-2.2, 0, 0]}> 
              <circleGeometry args={[0.12, 32]} /> 
              <meshBasicMaterial color="#5456F0" toneMapped={false} />
          </mesh>
          
          {/* 3D 文字 */}
          <Text
              color="white"
              anchorX="center"
              anchorY="middle"
              // 🔴 关键设置：小字号 + 宽间距 = 高级感
              fontSize={0.8}          
              letterSpacing={0.1}     
              
              // 🔴 彻底删除了 font="..." 链接
              // 使用默认字体，确保 100% 不黑屏
              toneMapped={false} 
          >
              ORBITAL ZONES
          </Text>
      </group>

      {/* 2. 旋转轨道系统 */}
      <group ref={groupRef}>
          {/* 地球 */}
          <mesh>
            <sphereGeometry args={[1.2, 64, 64]} />
            <meshBasicMaterial color="#1E88E5" toneMapped={false} />
          </mesh>
          <mesh scale={[1.1, 1.1, 1.1]}>
            <sphereGeometry args={[1.2, 64, 64]} />
            <meshBasicMaterial color="#4488ff" transparent opacity={0.2} side={THREE.BackSide} />
          </mesh>

          {/* 轨道列表 */}
          <OrbitRing name="LEO" radius={1.8} currentOrbit={currentOrbit} setOrbitState={setOrbitState} />
          <OrbitRing name="MEO" radius={3.0} currentOrbit={currentOrbit} setOrbitState={setOrbitState} />
          <OrbitRing name="GEO" radius={4.5} currentOrbit={currentOrbit} setOrbitState={setOrbitState} />
          <OrbitRing name="GTO" radius={3.2} currentOrbit={currentOrbit} setOrbitState={setOrbitState} scale={[1.5, 0.8, 1]} rotation={[0, 0, Math.PI / 4]} />
          <OrbitRing name="SSO" radius={2.0} currentOrbit={currentOrbit} setOrbitState={setOrbitState} scale={[0.6, 1.4, 1]} rotation={[0, 0, -Math.PI / 6]} />
      </group>
    </group>
  );
}

// ==========================================================
// 核心组件：支持丝滑变形的轨道线 (保持不变)
// ==========================================================
function OrbitRing({ name, radius, currentOrbit, setOrbitState, scale = [1, 1, 1], rotation = [0, 0, 0] }) {
  const isSelected = currentOrbit === name;
  const lineRef = useRef();

  const points = useMemo(() => {
    const pts = [];
    const segments = 360; 
    const radiusX = radius * scale[0];
    const radiusY = radius * scale[1];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radiusX, Math.sin(theta) * radiusY, 0));
    }
    return pts;
  }, [radius, scale]);

  useFrame((state, delta) => {
    if (lineRef.current) {
      const mat = lineRef.current.material;
      const targetDashSize = isSelected ? 10 : 0.1;
      const targetGapSize = isSelected ? 0 : 0.1; 
      const targetWidth = isSelected ? 4 : 1.5;
      const targetColor = isSelected ? new THREE.Color("white") : new THREE.Color("#666666");

      mat.dashSize += (targetDashSize - mat.dashSize) * 0.1;
      mat.gapSize += (targetGapSize - mat.gapSize) * 0.1;
      mat.linewidth += (targetWidth - mat.linewidth) * 0.1;
      mat.color.lerp(targetColor, 0.1);
      mat.needsUpdate = true;
    }
  });

  return (
    <group rotation={rotation}>
      <Line
        ref={lineRef}
        points={points}
        color="#666666" 
        lineWidth={1.5}
        dashed={true} 
        dashScale={1}
        dashSize={0.1}
        gapSize={0.1}
        toneMapped={false}
      />
      <mesh 
        visible={false}
        onClick={(e) => { e.stopPropagation(); setOrbitState(name); }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <torusGeometry args={[radius, 0.5, 8, 32]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}