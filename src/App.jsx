import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Float, Loader } from '@react-three/drei';

// 引入组件
import HeroScene from './components/HeroScene';
import HeroUI from './components/HeroUI';
import OrbitScene from './components/OrbitScene';
import OrbitUI from './components/OrbitUI';
import EventWheel from './components/EventWheel';
import DataPanel from './components/ImageContainer'; // 第4页的图片
import SpaceHistoryChart from './components/SpaceHistoryChart'; // 🔴 第5页的新图表

export default function App() {
  const [currentOrbit, setCurrentOrbit] = useState('LEO');

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#FF6B00" />
        
        <Suspense fallback={null}>
            {/* 🔴 页数计算：
               Page 1 (0-100vh): 首页
               Page 2-3 (~175vh): 摩天轮
               Page 4 (350vh): 图片展示
               Page 5 (450vh): 历史事故图表 <-- 新增
               总共给 6 页比较稳妥
            */}
            <ScrollControls pages={8} damping={0.3}>
            
              <Scroll>
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                   <HeroScene />
                </Float>
                <group position={[0, -8.75, 0]}> 
                    <OrbitScene currentOrbit={currentOrbit} setOrbitState={setCurrentOrbit} />
                </group>
              </Scroll>

              <Scroll html style={{ width: '100%', height: '100%' }}>
                
                {/* P1: 首页 */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
                  <HeroUI />
                </div>

                {/* P2-3: 摩天轮 */}
                <div style={{ position: 'absolute', top: '175vh', left: 0, width: '100vw', height: '100vh', overflow: 'visible' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
                      <EventWheel currentOrbit={currentOrbit} />
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999 }}>
                      <OrbitUI currentOrbit={currentOrbit} />
                  </div>
                </div>

                {/* P4: 图片面板 */}
                <div style={{ position: 'absolute', top: '370vh', left: 0, width: '100vw', height: '100vh' }}>
                    <DataPanel />
                </div>

                {/* 🔴 P5: 航天事故交互图表 */}
                <div style={{ position: 'absolute', top: '500vh', left: 0, width: '100vw', height: '100vh' }}>
                    <SpaceHistoryChart />
                </div>

              </Scroll>
            </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}