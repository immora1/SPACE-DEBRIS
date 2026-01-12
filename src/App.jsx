import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Float, Loader } from '@react-three/drei';

import HeroScene from './components/HeroScene';
import HeroUI from './components/HeroUI';
import OrbitScene from './components/OrbitScene';
import OrbitUI from './components/OrbitUI';
import EventWheel from './components/EventWheel';

export default function App() {
  const [currentOrbit, setCurrentOrbit] = useState('LEO');

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#FF6B00" />
        
        <Suspense fallback={null}>
            <ScrollControls pages={8} damping={0.3}>
            
              {/* === Layer A: 3D 场景层 === */}
              <Scroll>
                
                {/* 第 1 页: 大地球 */}
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                   <HeroScene />
                </Float>
                
                {/* 🔴 核心修改 1：位置下调到 -8.75 (对应 175vh) */}
                <group position={[0, -8.75, 0]}> 
                    <OrbitScene currentOrbit={currentOrbit} setOrbitState={setCurrentOrbit} />
                </group>

              </Scroll>

              {/* === Layer B: HTML UI 层 === */}
              <Scroll html style={{ width: '100%', height: '100%' }}>
                
                {/* 第 1 页 UI */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
                  <HeroUI />
                </div>

                {/* 🔴 核心修改 2：UI 容器设为 175vh (即 2.75 页的位置) */}
                <div style={{ 
                    position: 'absolute',
                    top: '200vh', 
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    overflow: 'visible' 
                }}>
                  
                  {/* 摩天轮 */}
                  <EventWheel currentOrbit={currentOrbit} />

                  {/* 底部轨道卡片 */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                      <OrbitUI currentOrbit={currentOrbit} />
                  </div>
                </div>

              </Scroll>
            </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}