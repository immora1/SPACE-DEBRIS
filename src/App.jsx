import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Float, Loader } from '@react-three/drei';

import HeroScene from './components/HeroScene';
import HeroUI from './components/HeroUI';
import OrbitScene from './components/OrbitScene';
import OrbitUI from './components/OrbitUI';
import EventWheel from './components/EventWheel';
import DataPanel from './components/DataPanel'; // 1. 引入新组件

export default function App() {
  const [currentOrbit, setCurrentOrbit] = useState('LEO');

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#FF6B00" />
        
        <Suspense fallback={null}>
            {/* 2. 页面总数改为 9，为数据面板腾出第 4 页的空间 */}
            <ScrollControls pages={9} damping={0.3}>
            
              {/* === Layer A: 3D 场景层 === */}
              <Scroll>
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                   <HeroScene />
                </Float>
                
                <group position={[0, -8.75, 0]}> 
                    <OrbitScene currentOrbit={currentOrbit} setOrbitState={setCurrentOrbit} />
                </group>
              </Scroll>

              {/* === Layer B: HTML UI 层 === */}
              <Scroll html style={{ width: '100%', height: '100%' }}>
                
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
                  <HeroUI />
                </div>

                {/* 摩天轮与轨道切换 (2.75 页) */}
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

                {/* 🔴 3. 新增数据面板 (放在第 4.5 页左右，即 350vh) */}
                <div style={{
                    position: 'absolute',
                    top: '350vh', // 让它出现在摩天轮之后
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