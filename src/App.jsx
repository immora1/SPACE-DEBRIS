import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Float } from '@react-three/drei';

// 引入所有组件
import HeroScene from './components/HeroScene';
import HeroUI from './components/HeroUI';
import OrbitScene from './components/OrbitScene';
import OrbitUI from './components/OrbitUI';

export default function App() {
  // 状态管理：当前选中的轨道
  const [currentOrbit, setCurrentOrbit] = useState('LEO');

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#080808' }}>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#FF6B00" />

        {/* 🔴 核心修复：pages={2} 
            这就告诉浏览器：“我有两屏的内容”，滚动条才会出现！
        */}
        <ScrollControls pages={8} damping={0.3}>
          
          {/*Layer A: 3D 场景层 */}
          <Scroll>
            {/* 第一页：漂浮的大地球 */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <HeroScene />
            </Float>
            
            {/* 第二页：你的新俯视轨道模型 */}
            {/* 🔴 位置修复：y={-6} 确保它刚好在第二屏中间 */}
            <group position={[0, -6, 0]}> 
               <OrbitScene currentOrbit={currentOrbit} setOrbitState={setCurrentOrbit} />
            </group>
          </Scroll>

          {/* Layer B: HTML UI 层 */}
          <Scroll html style={{ width: '100%', height: '100%' }}>
            
            {/* 第一页 UI */}
            <div style={{ height: '100vh', width: '100vw' }}>
              <HeroUI />
            </div>

            {/* 第二页 UI */}
            {/* 🔴 布局修复：强制顶到第二页 (top: 100vh) */}
            <div style={{ position: 'absolute', top: '100vh', width: '100vw', height: '100vh' }}>
              <OrbitUI currentOrbit={currentOrbit} />
            </div>

          </Scroll>
          
        </ScrollControls>
      </Canvas>
    </div>
  );
}