import { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- 1. 自定义发光描边材质 (Fresnel Shader) ---
const fresnelMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color('#F4F4F0') }, // 描边颜色：纯白
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 2.0 },
  },
  vertexShader: `
    varying vec3 vViewPosition;
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform float fresnelBias;
    uniform float fresnelScale;
    uniform float fresnelPower;
    varying vec3 vViewPosition;
    varying vec3 vNormal;
    void main() {
      vec3 viewDir = normalize(vViewPosition);
      float fresnelTerm = fresnelBias + fresnelScale * pow(1.0 + dot(viewDir, vNormal), fresnelPower);
      gl_FragColor = vec4(mix(vec3(0.0), color, fresnelTerm), 1.0); 
    }
  `,
  transparent: true,
});

export default function HeroScene() {
  const earthRef = useRef();
  const debrisRef = useRef();
  const count = 2000; // 碎片数量
  
  // 创建一个临时的 3D 物体来帮我们算位置
  const dummy = new THREE.Object3D();

  // --- 2. 初始化碎片位置 (使用更稳定的 useLayoutEffect) ---
  useLayoutEffect(() => {
    if (!debrisRef.current) return;

    for (let i = 0; i < count; i++) {
      // 随机分布算法
      const radius = 1.8 + Math.random() * 1.5; 
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.5;
      
      // 设置位置
      dummy.position.set(
        radius * Math.cos(theta) * Math.cos(phi),
        radius * Math.sin(phi),
        radius * Math.sin(theta) * Math.cos(phi)
      );

      // 设置旋转
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // 设置大小
      const s = 0.02 + Math.random() * 0.05;
      dummy.scale.set(s, s, s);

      // 更新矩阵并应用到第 i 个碎片
      dummy.updateMatrix();
      debrisRef.current.setMatrixAt(i, dummy.matrix);
    }
    // 告诉渲染器位置已经更新了
    debrisRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  // --- 3. 动画循环 ---
  useFrame((state, delta) => {
    // 地球自转
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05;
    }
    // 碎片云整体旋转
    if (debrisRef.current) {
      debrisRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group position={[1.5, 0, 0]}>
      
      {/* 黑色地球主体 */}
      <mesh ref={earthRef} scale={1.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" /> 
      </mesh>
      
      {/* 发光描边层 */}
      <mesh scale={1.52}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={fresnelMaterial} attach="material" />
      </mesh>

      {/* 橙色碎片群 (这是修复后的写法，不再包含 <instance>) */}
      <instancedMesh ref={debrisRef} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.05, 0]} />
        <meshStandardMaterial 
          color="#FF6B00" 
          emissive="#FF3300" 
          emissiveIntensity={0.8} 
          roughness={0.5} 
          metalness={0.8} 
        />
      </instancedMesh>

    </group>
  );
}