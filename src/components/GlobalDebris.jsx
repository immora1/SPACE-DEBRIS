import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// === 配置参数 ===
const COUNT = 1500; // 碎片总数
const Y_RANGE = 80; // 垂直分布范围 (覆盖大约 10 页的高度)
const Z_RANGE = 15; // 深度范围 (制造视差的关键)

export default function GlobalDebris() {
  const meshRef = useRef();
  const { viewport } = useThree();

  // === 1. 生成一次性的随机数据 (位置、旋转、缩放) ===
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < COUNT; i++) {
      // X轴：铺满屏幕宽度 (稍微宽一点防止边缘露馅)
      const x = (Math.random() - 0.5) * viewport.width * 2;
      
      // Y轴：从顶部(0)一直分布到底部(-Y_RANGE)
      // 这样当你向下滚动时，一直会有新的碎片出现
      const y = (Math.random() - 0.5) * Y_RANGE * 2 - Y_RANGE / 2;
      
      // Z轴：制造视差的核心！
      // 有的在眼前(正值)，有的在深处(负值)
      const z = (Math.random() - 0.5) * Z_RANGE;

      // 随机旋转
      const rot = [Math.random() * Math.PI, Math.random() * Math.PI, 0];
      
      // 随机大小 (极简小白点，不需要太大)
      const scale = 0.02 + Math.random() * 0.03;

      temp.push({ x, y, z, rot, scale });
    }
    return temp;
  }, [viewport]);

  // === 2. 初始化实例网格 (InstancedMesh) ===
  // 使用 InstancedMesh 是为了性能，一次性渲染 1500 个物体不卡顿
  useMemo(() => {
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

  // === 3. 让碎片缓慢自转 (增加一点生动感) ===
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02; // 整体缓慢旋转
    }
  });

  return (
    // position-y 向下偏移一点，确保首页也能看到，并且能覆盖到下面
    <group position={[0, -20, 0]}>
      <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
        {/* 几何体：极简的正十二面体 (看起来像不规则小石块) */}
        <dodecahedronGeometry args={[1, 0]} />
        {/* 材质：纯白，受光照影响 */}
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
      </instancedMesh>
    </group>
  );
}