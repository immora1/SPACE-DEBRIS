import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// === 🎨 统一配色 (修正为蓝色主题) ===
const THEME = {
  white: '#FFFFFF',
  grey: '#888888',     
  accent: '#4C42D7',   // 🔵 核心修改：已改回你的品牌蓝
  line: 'rgba(255, 255, 255, 0.2)' 
};

// === 1. 定义地球组件 ===
const MiniEarth = () => {
  const groupRef = useRef();
  const [hovered, setHover] = useState(false);
  const earthTexture = useLoader(THREE.TextureLoader, '/earth_borders.png');

  const targetScale = hovered ? 1.35 : 1; 

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
      
      const currentX = groupRef.current.scale.x;
      // 丝滑阻尼系数
      const step = 4 * delta;
      
      groupRef.current.scale.x = THREE.MathUtils.lerp(currentX, targetScale, step);
      groupRef.current.scale.y = THREE.MathUtils.lerp(currentX, targetScale, step);
      groupRef.current.scale.z = THREE.MathUtils.lerp(currentX, targetScale, step);
    }
  });

  const handleClick = () => {
    window.location.href = 'http://localhost:5174/';
  };

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
    >
      {/* 地球本体 */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          color="#ffffff"
          roughness={0.7}
          metalness={0.1}
          emissive={hovered ? "#1a1a3a" : "#000000"} // 悬停时微微泛蓝黑光
        />
      </mesh>

      {/* 大气层 */}
      <mesh>
        <sphereGeometry args={[1.58, 64, 64]} />
        <meshLambertMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.35} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// === 2. 🎨 侧边面板 (已适配蓝色) ===
const SidePanel = ({ align, title, items }) => {
    const isLeft = align === 'left';
    
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            [isLeft ? 'left' : 'right']: '10%', 
            transform: 'translateY(-50%)',
            pointerEvents: 'none', 
            zIndex: 20,
            display: 'flex',
            flexDirection: isLeft ? 'row' : 'row-reverse',
            alignItems: 'stretch', 
            gap: '20px'
        }}>
            
            {/* 装饰线条：改为蓝色渐变 */}
            <div style={{
                width: '2px',
                background: `linear-gradient(to bottom, transparent, ${THEME.accent}, transparent)`,
                opacity: 0.8
            }}></div>

            {/* 文字容器 */}
            <div style={{
                textAlign: isLeft ? 'left' : 'right',
                fontFamily: '"Lexend", sans-serif'
            }}>
                <h4 style={{
                    color: THEME.grey,
                    fontSize: '0.75rem',
                    letterSpacing: '3px',
                    margin: '0 0 15px 0',
                    fontWeight: '400',
                    textTransform: 'uppercase',
                    opacity: 0.8
                }}>
                   /// {title}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {items.map((item, index) => (
                        <div key={index} style={{ fontSize: '1rem' }}>
                            <span style={{ 
                                color: THEME.white, 
                                fontWeight: '300', 
                                letterSpacing: '1px',
                                marginRight: '10px'
                            }}>
                                {item.label}:
                            </span>
                            <span style={{ 
                                // 高亮处使用蓝色
                                color: item.highlight ? THEME.accent : THEME.white, 
                                fontWeight: '700', 
                                letterSpacing: '1px'
                            }}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// === 3. 主组件 ===
const GamePortal = () => {
  return (
    <div style={{
      width: '100%',
      height: '80vh', 
      position: 'relative',
      zIndex: 10,
      background: 'radial-gradient(circle at center, rgba(10,10,30,0.3) 0%, rgba(0,0,0,0) 70%)' // 背景光稍微偏冷蓝一点点
    }}>

      <div style={{ width: '100%', height: '100%', position: 'absolute', top:0, left:0 }}>
        <Canvas camera={{ position: [0, 0, 4.8] }}>
          <ambientLight intensity={0.4} />
          {/* 灯光也稍微带一点冷色调 */}
          <pointLight position={[10, 5, 10]} intensity={1.5} color="#eefeff" />
          <pointLight position={[-10, 0, -10]} intensity={1} color="#ffffff" />
          <MiniEarth />
          <Stars radius={100} depth={50} count={2000} factor={5} saturation={0} fade speed={0.3} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      {/* 左侧面板 */}
      <SidePanel 
          align="left" 
          title="SYSTEM STATUS" 
          items={[
              { label: "VISUALIZATION", value: "ACTIVE", highlight: true },
              { label: "DATA POINTS", value: "23,400+" },
              { label: "ORBITAL PLANES", value: "LEO/MEO" }
          ]}
      />

      {/* 右侧面板 */}
      <SidePanel 
          align="right" 
          title="MISSION OBJECTIVE" 
          items={[
              { label: "PROTOCOL", value: "ENGAGE", highlight: true },
              { label: "TARGET", value: "DEBRIS REDUCTION" },
              { label: "MODE", value: "SIMULATION" }
          ]}
      />

      {/* 底部按钮 */}
      <div style={{
        position: 'absolute',
        bottom: '12%',
        width: '100%',
        textAlign: 'center',
        pointerEvents: 'none',
        zIndex: 20
      }}>
        <h3 style={{
          color: THEME.white,
          fontFamily: '"Lexend", sans-serif',
          fontSize: '1.5rem',
          letterSpacing: '8px', 
          fontWeight: '800',    
          textTransform: 'uppercase',
          marginBottom: '15px',
          textShadow: '0 0 30px rgba(76, 66, 215, 0.4)' // 🔵 蓝色光晕
        }}>
          Interactive Simulation
        </h3>
        <div style={{
            display: 'inline-block',
            border: `1px solid ${THEME.grey}`,
            padding: '8px 20px',
            borderRadius: '20px', 
            background: 'rgba(0,0,0,0.5)',
            boxShadow: `0 0 15px ${THEME.accent}20` // 🔵 微弱的蓝色发光边框
        }}>
            <p style={{
            color: THEME.accent, // 🔵 蓝色文字
            fontFamily: '"Lexend", sans-serif',
            fontSize: '0.8rem',
            letterSpacing: '2px',
            fontWeight: '600',
            margin: 0
            }}>
            CLICK THE GLOBE TO ENTER
            </p>
        </div>
      </div>
    </div>
  );
};

export default GamePortal;