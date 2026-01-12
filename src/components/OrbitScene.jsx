import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function OrbitScene({ setOrbitState, currentOrbit }) {
  const groupRef = useRef();

  // 指向 public/textures/ 下的图片
  const earthTexture = useLoader(THREE.TextureLoader, '/textures/cartoon_earth.jpg');

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group position={[-2.5, 0, 0]} scale={0.35}>
      
      {/* 顶部标题栏 */}
      <group position={[-1, 6, 0]}>
          <mesh position={[-3.2, 0.35, -0.05]}> 
              <circleGeometry args={[0.5, 64]} /> 
              <meshBasicMaterial color="#5456F0" toneMapped={false} />
          </mesh>
          <Text
              color="white"
              anchorX="center"
              anchorY="middle"
              fontSize={0.8}          
              letterSpacing={0.1}
              fontWeight={800}
              toneMapped={false} 
          >
              ORBIT ZONES
          </Text>
      </group>

      {/* 旋转轨道系统 */}
      <group ref={groupRef}>
          
          {/* 地球本体 */}
          <mesh rotation={[-Math.PI / 0.5, 2.5, 3]}>
            <sphereGeometry args={[1.2, 64, 64]} />
            <meshBasicMaterial map={earthTexture} toneMapped={false} />
          </mesh>
          
          {/* 大气光晕 (半径约为 1.32) */}
          <mesh scale={[1.1, 1.1, 1.1]}>
            <sphereGeometry args={[1.2, 64, 64]} />
            <meshBasicMaterial color="#4488ff" transparent opacity={0.2} side={THREE.BackSide} />
          </mesh>

          {/* 轨道列表 */}
          <OrbitRing name="LEO" radius={1.8} currentOrbit={currentOrbit} setOrbitState={setOrbitState} />
          <OrbitRing name="MEO" radius={3.0} currentOrbit={currentOrbit} setOrbitState={setOrbitState} />
          <OrbitRing name="GEO" radius={4.5} currentOrbit={currentOrbit} setOrbitState={setOrbitState} />
          
          {/* GTO */}
          <OrbitRing name="GTO" radius={3.2} currentOrbit={currentOrbit} setOrbitState={setOrbitState} scale={[1.5, 0.8, 1]} rotation={[0, 0, Math.PI / 4]} />
          
          {/* 🔴 修复 SSO 轨道:
              之前 scale X 是 0.6 -> 半径 1.2 (撞击地球表面)
              现在 scale X 改为 0.8 -> 半径 1.6 (大于地球+大气层)
              这样就能正确显示前后遮挡关系了
          */}
          <OrbitRing 
            name="SSO" 
            radius={2.0} 
            currentOrbit={currentOrbit} 
            setOrbitState={setOrbitState} 
            scale={[0.8, 1.4, 1]} // <--- 修改了这里 (0.6 -> 0.8)
            rotation={[0, 0, -Math.PI / 6]} 
          />
      </group>
    </group>
  );
}

// 轨道线组件 (保持你的加粗设置)
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
      
      // 保持你设定的加宽数值
      const targetWidth = isSelected ? 8 : 5; 
      
      const targetDashSize = isSelected ? 10 : 0.1;
      const targetGapSize = isSelected ? 0 : 0.1; 
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
        
        lineWidth={3} // 保持你的初始宽度
        
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