import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// =================================================================
// 🔧 调节区域：在这里修改数量、范围
// =================================================================
const COUNT = 50000;    // 🔴 数量：改这里！(之前是1000，现在加到3000，更密)
const Y_RANGE = 500;   // 🔴 长度：覆盖的垂直高度 (越长越稀疏，所以加了数量)
const Z_RANGE = 40;    // 深度：前后的厚度

export default function GlobalDebris() {
  const meshRef = useRef();
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const temp = [];
    
    // 计算首页的高度 (大概是 viewport 高度)
    // 为了保险，我们让碎片从首页下方一点点才开始出现
    const startY = -viewport.height * 1.2; 

    for (let i = 0; i < COUNT; i++) {
      // --- 1. 位置调节 ---
      const x = (Math.random() - 0.5) * viewport.width * 2; // 宽度覆盖
      
      // 🔴 关键修改：避开第一页
      // 之前是：const y = 20 - Math.random() * Y_RANGE; (从头顶开始)
      // 现在是：从 startY (负值) 开始往下生成，刚好跳过第一页
      const y = startY - Math.random() * Y_RANGE; 
      
      const z = (Math.random() - 0.5) * Z_RANGE; 

      const rot = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];
      
      // --- 2. 大小调节 ---
      // 🔴 大小：改这里！
      // 0.08 是最小尺寸，0.12 是随机增加的最大量 (即最大 0.2)
      // 如果觉得还不够显眼，可以把 0.08 改成 0.15
      const scale = 0.001 + Math.random() * 0.05;

      temp.push({ x, y, z, rot, scale });
    }
    return temp;
  }, [viewport.width, viewport.height]);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    particles.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rot[0], p.rot[1], p.rot[2]);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [particles]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02; // 整体旋转速度
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <instancedMesh 
        ref={meshRef} 
        args={[null, null, COUNT]}
        frustumCulled={false} 
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial 
            color="#FFFFFF" 
            transparent 
            opacity={0.8} // 🔴 透明度：0.0 (全透) ~ 1.0 (不透)
        />
      </instancedMesh>
    </group>
  );
}