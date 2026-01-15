import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Float, Loader } from '@react-three/drei';

// === 1. 引入所有页面组件 ===
import HeroScene from './components/HeroScene';
import HeroUI from './components/HeroUI';
import OrbitScene from './components/OrbitScene';
import OrbitUI from './components/OrbitUI';
import EventWheel from './components/EventWheel';
import DebrisDashboard from './components/DebrisDashboard'; 
import SpaceHistoryChart from './components/SpaceHistoryChart';
import ResourceHub from './components/ResourceHub'; 
import VideoGallery from './components/VideoGallery';
import CleanupMethods from './components/CleanupMethods';
import OrbitLegacy from './components/OrbitLegacy';

// 🆕 新增引入 GamePortal
import GamePortal from './components/GamePortal';

import GlobalDebris from './components/GlobalDebris';

export default function App() {
  const [currentOrbit, setCurrentOrbit] = useState('LEO');

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#FF6B00" />
        
        <Suspense fallback={null}>
            {/* 🔴 修改：总页数增加到 13，以容纳新插入的板块 */}
            <ScrollControls pages={13} damping={0.3}>
            
              <Scroll>
                <GlobalDebris />
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <HeroScene />
                </Float>
                <group position={[0, -8.75, 0]}> 
                    <OrbitScene currentOrbit={currentOrbit} setOrbitState={setCurrentOrbit} />
                </group>
              </Scroll>

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

                {/* P6: 外部资源 ResourceHub (620vh) */}
                <div style={{ position: 'absolute', top: '620vh', left: 0, width: '100vw', height: '100vh' }}>
                    <ResourceHub />
                </div>

                {/* 🆕 P7: 【新增】交互游戏入口 (740vh) */}
                {/* 插入在这里，不仅逻辑通顺，而且利用 120vh 的间距形成视觉缓冲区 */}
                <div style={{ position: 'absolute', top: '740vh', left: 0, width: '100vw', height: '100vh' }}>
                    <GamePortal />
                </div>

                {/* P8: 视频画廊 (原 740vh -> 顺延至 860vh) */}
                <div style={{ position: 'absolute', top: '860vh', left: 0, width: '100vw', height: '100vh' }}>
                    <VideoGallery />
                </div>

                {/* P9: 清理方案 (原 860vh -> 顺延至 980vh) */}
                <div style={{ position: 'absolute', top: '980vh', left: 0, width: '100vw', height: '100vh' }}>
                    <CleanupMethods />
                </div>

                {/* P10: 总结页 (原 980vh -> 顺延至 1100vh) */}
                <div style={{ 
                    position: 'absolute', 
                    top: '1100vh', 
                    left: 0, 
                    width: '100vw', 
                    height: '100vh' 
                }}>
                    <OrbitLegacy />
                </div>

              </Scroll>
            </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}