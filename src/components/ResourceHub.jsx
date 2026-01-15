import React, { useState } from 'react';

// === 🎨 配色系统 ===
const THEME = {
  primary: '#4C42D7', 
  white: '#FFFFFF',
  grey: '#888888',
  cardBg: 'rgba(20, 20, 20, 0.8)', // 半透明背景
};

// === 🔗 外部链接数据 (您可以随时修改) ===
const LINKS = [
  { 
    id: 1, 
    title: "NASA Orbital Debris Program", 
    desc: "NASA 官方轨道碎片计划办公室。提供最新的碎片季度报告、标准与测量数据。",
    url: "https://orbitaldebris.jsc.nasa.gov/",
    tag: "OFFICIAL DATA"
  },
  { 
    id: 2, 
    title: "ESA Space Debris Office", 
    desc: "欧洲航天局太空碎片办公室。发布年度《太空环境报告》，不仅有数据，还有精美的可视化。",
    url: "https://www.esa.int/Safety_Security/Space_Debris",
    tag: "REPORT & ANALYSIS"
  },
  { 
    id: 3, 
    title: "Stuff in Space (3D Map)", 
    desc: "一个令人惊叹的实时 3D 轨道可视化网站。每一颗卫星、每一块碎片都在这里被精确标记。",
    url: "http://stuffin.space/",
    tag: "VISUALIZATION"
  },
  { 
    id: 4, 
    title: "LeoLabs Platform", 
    desc: "商业雷达追踪服务商。提供低地球轨道碎片的碰撞预警和高精度追踪数据。",
    url: "https://platform.leolabs.space/visualization",
    tag: "COMMERCIAL RADAR"
  }
];

// === 单个链接卡片 ===
const LinkCard = ({ item, index }) => {
  const [hover, setHover] = useState(false);

  return (
    <a 
      href={item.url} 
      target="_blank" 
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '500px',
        height: '220px',
        background: THEME.cardBg,
        border: `1px solid ${hover ? THEME.primary : 'rgba(255,255,255,0.1)'}`,
        padding: '30px',
        boxSizing: 'border-box',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        transform: hover ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hover ? `0 20px 40px rgba(76, 66, 215, 0.2)` : 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 顶部标签 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <span style={{ 
            fontSize: '0.7rem', 
            fontWeight: 'bold', 
            letterSpacing: '2px', 
            color: THEME.primary,
            border: `1px solid ${THEME.primary}`,
            padding: '4px 8px',
            borderRadius: '2px'
        }}>
            {item.tag}
        </span>
        {/* 箭头图标 */}
        <div style={{ 
            transform: hover ? 'rotate(-45deg)' : 'rotate(0deg)', 
            transition: 'transform 0.3s ease',
            opacity: hover ? 1 : 0.5
        }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={THEME.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
        </div>
      </div>

      {/* 标题与描述 */}
      <div>
        <h3 style={{ 
            color: THEME.white, 
            fontSize: '1.5rem', 
            fontWeight: '800', 
            margin: '0 0 10px 0', 
            fontFamily: '"Lexend", sans-serif',
            letterSpacing: '1px'
        }}>
            {item.title}
        </h3>
        <p style={{ 
            color: '#ccc', 
            fontSize: '0.9rem', 
            lineHeight: '1.6', 
            margin: 0,
            fontFamily: 'sans-serif'
        }}>
            {item.desc}
        </p>
      </div>

      {/* 悬停时的背景光效 */}
      <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: `radial-gradient(circle at top right, ${THEME.primary}20 0%, transparent 60%)`,
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
      }}></div>
    </a>
  );
};

export default function ResourceHub() {
  return (
    <div style={{
      width: '100%', 
      height: '100%', 
      // 🔴 保持透明，透出背景碎片
      background: 'transparent',
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '0 10vw',
      boxSizing: 'border-box',
      fontFamily: '"Lexend", sans-serif'
    }}>
      
      {/* 标题区域 */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: '900', 
            color: THEME.white, 
            letterSpacing: '6px', 
            margin: 0,
            textTransform: 'uppercase'
        }}>
            External <span style={{ color: THEME.primary }}>Resources</span>
        </h2>
        <p style={{ 
            color: THEME.grey, 
            fontSize: '1rem', 
            marginTop: '15px', 
            letterSpacing: '2px' 
        }}>
            EXPLORE FURTHER DATA & ORGANIZATIONS
        </p>
      </div>

      {/* 网格布局 */}
      <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '30px', 
          width: '100%', 
          maxWidth: '1200px' 
      }}>
        {LINKS.map((item, index) => (
            <LinkCard key={item.id} item={item} index={index} />
        ))}
      </div>

    </div>
  );
}