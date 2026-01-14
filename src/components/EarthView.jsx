import React, { useState } from 'react';

// === 🎨 配色系统 (保持统一) ===
const THEME = {
  primary: '#4C42D7', // 核心蓝
  white: '#FFFFFF',
  dark: '#050505',
};

// === 🌍 组件: 巨型线框地球 ===
const GiantWireframeEarth = () => {
  return (
    <div style={{
      width: '60vh', // 巨大尺寸
      height: '60vh',
      position: 'relative',
      transformStyle: 'preserve-3d',
      animation: 'earthSpin 20s linear infinite' // 缓慢自转
    }}>
      <style>{`
        @keyframes earthSpin { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
      
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          {/* 径向渐变，模拟球体光感 */}
          <radialGradient id="sphereGlow" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stopColor={THEME.primary} stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. 球体底色光晕 */}
        <circle cx="50" cy="50" r="50" fill="url(#sphereGlow)" />

        {/* 2. 经线 (Longitudes) */}
        {/* 通过不同的 rx (X轴半径) 来模拟旋转角度 */}
        <ellipse cx="50" cy="50" rx="50" ry="50" fill="none" stroke={THEME.primary} strokeWidth="0.5" opacity="0.8" />
        <ellipse cx="50" cy="50" rx="42" ry="50" fill="none" stroke={THEME.primary} strokeWidth="0.3" opacity="0.6" />
        <ellipse cx="50" cy="50" rx="30" ry="50" fill="none" stroke={THEME.primary} strokeWidth="0.3" opacity="0.4" />
        <ellipse cx="50" cy="50" rx="15" ry="50" fill="none" stroke={THEME.primary} strokeWidth="0.3" opacity="0.3" />
        <line x1="50" y1="0" x2="50" y2="100" stroke={THEME.primary} strokeWidth="0.5" opacity="0.8" />

        {/* 3. 纬线 (Latitudes) - 也就是横向的圈 */}
        <line x1="0" y1="50" x2="100" y2="50" stroke={THEME.white} strokeWidth="0.5" opacity="0.5" />
        <ellipse cx="50" cy="50" rx="50" ry="42" fill="none" stroke={THEME.white} strokeWidth="0.3" opacity="0.3" />
        <ellipse cx="50" cy="50" rx="50" ry="28" fill="none" stroke={THEME.white} strokeWidth="0.3" opacity="0.2" />
        <ellipse cx="50" cy="50" rx="50" ry="10" fill="none" stroke={THEME.white} strokeWidth="0.3" opacity="0.1" />

        {/* 4. 轨道环 (装饰) */}
        <ellipse cx="50" cy="50" rx="70" ry="20" fill="none" stroke={THEME.white} strokeWidth="0.5" strokeDasharray="5 5" opacity="0.3" transform="rotate(-15 50 50)" />
      </svg>
      
      {/* 核心发光点 */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '100%', height: '100%',
        background: `radial-gradient(circle, ${THEME.primary} 0%, transparent 60%)`,
        opacity: 0.2,
        transform: 'translate(-50%, -50%)',
        animation: 'pulse 4s ease-in-out infinite'
      }}></div>
    </div>
  );
};

export default function EarthView() {
  const [isHoverBack, setIsHoverBack] = useState(false);

  // === 样式定义 ===
  const containerStyle = {
    width: '100vw', height: '100vh',
    background: THEME.dark, color: THEME.white,
    position: 'relative', overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: '"Lexend", Helvetica, Arial, sans-serif'
  };

  // 返回按钮样式
  const backButtonStyle = {
    position: 'absolute',
    top: '40px', left: '40px',
    zIndex: 100,
    background: 'transparent',
    border: `1px solid ${isHoverBack ? THEME.white : 'rgba(255,255,255,0.2)'}`,
    padding: '12px 24px',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '10px',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      
      {/* 引入字体 */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;700&display=swap');`}</style>

      {/* === 背景装饰：横向粗虚线 === */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <defs>
          {/* 定义虚线图案 pattern */}
          <pattern id="bgDashLine" x="0" y="0" width="1" height="0.05" patternUnits="objectBoundingBox">
            <line 
              x1="0" y1="50%" x2="100%" y2="50%" 
              stroke={THEME.white} 
              strokeWidth="2" // 粗线条
              strokeDasharray="20 40" // 虚线间隔
              opacity="0.05" // 非常淡，作为背景纹理
            />
          </pattern>
        </defs>
        {/* 填充整个背景 */}
        <rect width="100%" height="100%" fill="url(#bgDashLine)" />
        
        {/* 中心十字瞄准线 (极简) */}
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke={THEME.primary} strokeWidth="1" opacity="0.3" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke={THEME.primary} strokeWidth="1" opacity="0.3" />
      </svg>

      {/* === 主体内容 === */}
      <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* 1. 地球组件 */}
        <GiantWireframeEarth />

        {/* 2. 页面标题 */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '3rem', fontWeight: '700', letterSpacing: '4px', margin: 0,
            textShadow: `0 0 20px ${THEME.primary}`
          }}>
            ORBITAL VIEW
          </h1>
          <p style={{ 
            fontSize: '1rem', color: THEME.grey, marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase' 
          }}>
            Real-time Surveillance System
          </p>
        </div>

      </div>

      {/* === 左上角返回按钮 === */}
      {/* 实际项目中，您可以用 <Link to="/"> 或 navigate() 替换这里的 onClick */}
      <button 
        style={backButtonStyle}
        onMouseEnter={() => setIsHoverBack(true)}
        onMouseLeave={() => setIsHoverBack(false)}
        onClick={() => window.history.back()} // 简单的返回上一页逻辑
      >
        <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>←</span>
        <span style={{ fontSize: '0.9rem', letterSpacing: '1px', fontWeight: '300', color: '#fff' }}>BACK TO DASHBOARD</span>
      </button>

      {/* === 右下角装饰数据 === */}
      <div style={{ position: 'absolute', bottom: '40px', right: '40px', textAlign: 'right', opacity: 0.7 }}>
        <div style={{ fontSize: '2rem', fontWeight: '700', color: THEME.primary }}>127.0.0.1</div>
        <div style={{ fontSize: '0.8rem', color: THEME.grey, letterSpacing: '1px' }}>SYSTEM CONNECTED</div>
      </div>

    </div>
  );
}