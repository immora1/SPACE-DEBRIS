import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Float, Loader } from '@react-three/drei';

// === 1. 引入您原有的核心组件 ===
import HeroScene from './components/HeroScene';
import HeroUI from './components/HeroUI';
import OrbitScene from './components/OrbitScene';
import OrbitUI from './components/OrbitUI';
import EventWheel from './components/EventWheel';

// === 2. 引入我们刚做好的图片组件 ===
// 假设文件名叫 ImageContainer.jsx，但在代码里我们把它当作 DataPanel 使用
import DataPanel from './components/ImageContainer'; 

export default function App() {
  // 您的状态管理
  const [currentOrbit, setCurrentOrbit] = useState('LEO');

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#FF6B00" />
        
        <Suspense fallback={null}>
            {/* 🔴 页数设置：
               Hero(0-1) + Wheel(1.75-2.75) + Image(3.5-4.5)
               所以 pages 设为 5 就足够容纳所有内容了。设 9 会导致后面有大片空白。
            */}
            <ScrollControls pages={5} damping={0.3}>
            
              {/* === Layer A: 3D 场景层 (保持不变) === */}
              <Scroll>
                {/* 首页漂浮卫星 */}
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                   <HeroScene />
                </Float>
                
                {/* 轨道地球场景 (下移到转盘位置) */}
                <group position={[0, -8.75, 0]}> 
                    <OrbitScene currentOrbit={currentOrbit} setOrbitState={setCurrentOrbit} />
                </group>
              </Scroll>

              {/* === Layer B: HTML UI 层 === */}
              <Scroll html style={{ width: '100%', height: '100%' }}>
                
                {/* 1. 首页 UI */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
                  <HeroUI />
                </div>

                {/* 2. 摩天轮与轨道切换 (约在 1.75页 - 2.75页) */}
                <div style={{ 
                    position: 'absolute',
                    top: '175vh', 
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    overflow: 'visible' 
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
                      <EventWheel currentOrbit={currentOrbit} />
                  </div>

                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999 }}>
                      <OrbitUI currentOrbit={currentOrbit} />
                  </div>
                </div>

                {/* 🔴 3. 您的图片面板 (插入到 350vh) */}
                <div style={{
                    position: 'absolute',
                    top: '370vh', // 也就是第 3.5 页开始
                    left: 0,
                    width: '100vw',
                    height: '100vh'
                }}>
                    <DataPanel />
                </div>

              </Scroll>
            </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}