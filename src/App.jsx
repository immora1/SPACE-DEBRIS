import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Float } from '@react-three/drei';
// 引入我们刚才做的两个积木
import HeroScene from './components/HeroScene';
import HeroUI from './components/HeroUI';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#080808' }}>
      
      {/* 3D 摄像机设置 */}
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        
        {/* 灯光：微弱环境光 + 强烈的橙色侧光 */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#FF6B00" />

        {/* 滚动控制器 (5页高度) */}
        <ScrollControls pages={5} damping={0.3}>
          
          {/* Layer A: 3D场景 (加了Float让它轻轻漂浮) */}
          <Scroll>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <HeroScene />
            </Float>
          </Scroll>

          {/* Layer B: 2D界面 */}
          <Scroll html style={{ width: '100%', height: '100%' }}>
            <HeroUI />
          </Scroll>
          
        </ScrollControls>
      </Canvas>
    </div>
  );
}