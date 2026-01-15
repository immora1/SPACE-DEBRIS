import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Float, Loader } from '@react-three/drei';

// === 1. 引入核心组件 ===
import HeroScene from './components/HeroScene';
import HeroUI from './components/HeroUI';
import OrbitScene from './components/OrbitScene';
import OrbitUI from './components/OrbitUI';
import EventWheel from './components/EventWheel';

// === 2. 引入新版数据看板 (Page 4) ===
import DebrisDashboard from './components/DebrisDashboard'; 

// === 3. 引入历史演变图 (Page 5) ===
import SpaceHistoryChart from './components/SpaceHistoryChart';

// === 4. 🔴 引入新做的科普视频画廊 (Page 6) ===
import VideoGallery from './components/VideoGallery';

export default function App() {
  // 轨道状态管理
  const [currentOrbit, setCurrentOrbit] = useState('LEO');

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      
      {/* 3D 画布 */}
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#FF6B00" />
        
        <Suspense fallback={null}>
            {/* === 滚动控制配置 ===
              pages: 改为 8，确保有足够的空间放下第 6 页的内容
              damping: 保持 0.3 的丝滑感
            */}
            <ScrollControls pages={8} damping={0.3}>
            
              {/* === Layer A: 3D 场景层 (跟随滚动移动) === */}
              <Scroll>
                {/* 1. 首页: 漂浮卫星 */}
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                   <HeroScene />
                </Float>
                
                {/* 2. 轨道切换页: 地球模型 (下移到对应位置) */}
                <group position={[0, -8.75, 0]}> 
                    <OrbitScene currentOrbit={currentOrbit} setOrbitState={setCurrentOrbit} />
                </group>
              </Scroll>

              {/* === Layer B: HTML UI 层 (固定在页面特定高度) === */}
              <Scroll html style={{ width: '100%', height: '100%' }}>
                
                {/* --- Page 1: 首页 UI (0vh) --- */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
                  <HeroUI />
                </div>

                {/* --- Page 2-3: 摩天轮与轨道切换 (~175vh) --- */}
                <div style={{ 
                    position: 'absolute',
                    top: '175vh', 
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    overflow: 'visible' 
                }}>
                  {/* 背景转盘 */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
                      <EventWheel currentOrbit={currentOrbit} />
                  </div>
                  {/* 底部按钮 */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999 }}>
                      <OrbitUI currentOrbit={currentOrbit} />
                  </div>
                </div>

                {/* --- Page 4: 数据看板 (380vh) --- */}
                <div style={{ 
                    position: 'absolute', 
                    top: '380vh', 
                    left: 0, 
                    width: '100vw', 
                    height: '100vh' 
                }}>
                    <DebrisDashboard />
                </div>

                {/* --- Page 5: 历史事故交互图表 (500vh) --- */}
                <div style={{ 
                    position: 'absolute', 
                    top: '500vh', 
                    left: 0, 
                    width: '100vw', 
                    height: '100vh' 
                }}>
                    <SpaceHistoryChart />
                </div>

                {/* --- Page 6: 🔴 视频画廊 (620vh) --- */}
                <div style={{ 
                    position: 'absolute', 
                    top: '620vh', // 放在第 5 页之后
                    left: 0, 
                    width: '100vw', 
                    height: '100vh' 
                }}>
                    <VideoGallery />
                </div>

              </Scroll>
            </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}