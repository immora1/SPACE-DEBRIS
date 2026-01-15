import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Float, Loader } from '@react-three/drei';

// === 引入核心组件 ===
import HeroScene from './components/HeroScene';
import HeroUI from './components/HeroUI';
import OrbitScene from './components/OrbitScene';
import OrbitUI from './components/OrbitUI';
import EventWheel from './components/EventWheel';
import DebrisDashboard from './components/DebrisDashboard'; 
import SpaceHistoryChart from './components/SpaceHistoryChart';
import VideoGallery from './components/VideoGallery';

// 🔴 引入新做的清理方案组件
import CleanupMethods from './components/CleanupMethods';

export default function App() {
  const [currentOrbit, setCurrentOrbit] = useState('LEO');

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#FF6B00" />
        
        <Suspense fallback={null}>
            {/* 🔴 调整总页数为 9.2，确保能滚到底部 */}
            <ScrollControls pages={9.2} damping={0.3}>
            
              {/* === 3D 场景层 === */}
              <Scroll>
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                   <HeroScene />
                </Float>
                <group position={[0, -8.75, 0]}> 
                    <OrbitScene currentOrbit={currentOrbit} setOrbitState={setCurrentOrbit} />
                </group>
              </Scroll>

              {/* === UI 内容层 (HTML) === */}
              <Scroll html style={{ width: '100%', height: '100%' }}>
                
                {/* P1: 首页 (0vh) */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
                  <HeroUI />
                </div>

                {/* P2-3: 轨道切换 (175vh) */}
                <div style={{ position: 'absolute', top: '175vh', left: 0, width: '100vw', height: '100vh', overflow: 'visible' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
                      <EventWheel currentOrbit={currentOrbit} />
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999 }}>
                      <OrbitUI currentOrbit={currentOrbit} />
                  </div>
                </div>

                {/* P4: 数据看板 (380vh) */}
                <div style={{ position: 'absolute', top: '380vh', left: 0, width: '100vw', height: '100vh' }}>
                    <DebrisDashboard />
                </div>

                {/* P5: 历史图表 (500vh) */}
                <div style={{ position: 'absolute', top: '500vh', left: 0, width: '100vw', height: '100vh' }}>
                    <SpaceHistoryChart />
                </div>

                {/* P6: 视频画廊 (620vh) */}
                <div style={{ position: 'absolute', top: '620vh', left: 0, width: '100vw', height: '100vh' }}>
                    <VideoGallery />
                </div>

                {/* P7: 🔴 最后一页：清理方案 (740vh) */}
                <div style={{ 
                    position: 'absolute', 
                    top: '740vh', // 紧接在视频画廊后面
                    left: 0, 
                    width: '100vw', 
                    height: '100vh' 
                }}>
                    <CleanupMethods />
                </div>

              </Scroll>
            </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}