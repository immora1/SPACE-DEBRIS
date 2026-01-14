import React, { useState, useMemo, useRef } from 'react';

// === ⚙️ 布局调节配置 (保留您的修改) ===
const LAYOUT_CONFIG = {
  // 板块三：整体内容距离标题顶部的距离
  CONTENT_OFFSET_TOP: '50px', 
  
  // 板块三：图片和下方文字的间距
  IMG_TEXT_GAP: '40px', 
  
  // 图片最大高度
  IMG_MAX_HEIGHT: '100px'
};

// === 🎨 极简配色系统 ===
const THEME = {
  primary: '#4C42D7', // 核心蓝
  white: '#FFFFFF',
  grey: '#888888',
  dark: '#050505',
  grid: 'rgba(76, 66, 215, 0.15)'
};

// === 1. 趋势数据 ===
const TREND_DATA = [
  { year: 1960, count: 100 }, { year: 1961, count: 241 }, { year: 1962, count: 395 },
  { year: 1963, count: 562 }, { year: 1964, count: 739 }, { year: 1965, count: 927 },
  { year: 1966, count: 1125 }, { year: 1967, count: 1332 }, { year: 1968, count: 1547 },
  { year: 1969, count: 1770 }, { year: 1970, count: 2000 }, { year: 1971, count: 2245 },
  { year: 1972, count: 2513 }, { year: 1973, count: 2801 }, { year: 1974, count: 3103 },
  { year: 1975, count: 3415 }, { year: 1976, count: 3735 }, { year: 1977, count: 4057 },
  { year: 1978, count: 4378 }, { year: 1979, count: 4693 }, { year: 1980, count: 5000 },
  { year: 1981, count: 5305 }, { year: 1982, count: 5619 }, { year: 1983, count: 5937 },
  { year: 1984, count: 6257 }, { year: 1985, count: 6575 }, { year: 1986, count: 6886 },
  { year: 1987, count: 7188 }, { year: 1988, count: 7476 }, { year: 1989, count: 7748 },
  { year: 1990, count: 8000 }, { year: 1991, count: 8222 }, { year: 1992, count: 8417 },
  { year: 1993, count: 8592 }, { year: 1994, count: 8756 }, { year: 1995, count: 8918 },
  { year: 1996, count: 9087 }, { year: 1997, count: 9270 }, { year: 1998, count: 9478 },
  { year: 1999, count: 9718 }, { year: 2000, count: 10000 }, { year: 2001, count: 10316 },
  { year: 2002, count: 10674 }, { year: 2003, count: 11099 }, { year: 2004, count: 11618 },
  { year: 2005, count: 12257 }, { year: 2006, count: 13042 }, { year: 2007, count: 14000 },
  { year: 2008, count: 16471 }, { year: 2009, count: 19000 }, { year: 2010, count: 19960 },
  { year: 2011, count: 20610 }, { year: 2012, count: 21093 }, { year: 2013, count: 21556 },
  { year: 2014, count: 22143 }, { year: 2015, count: 23000 }, { year: 2016, count: 24457 },
  { year: 2017, count: 26564 }, { year: 2018, count: 29043 }, { year: 2019, count: 31614 },
  { year: 2020, count: 34000 }, { year: 2021, count: 36200 }, { year: 2022, count: 38400 },
  { year: 2023, count: 40600 }, { year: 2024, count: 42800 }, { year: 2025, count: 45000 }
];

// 2. 国家数据
const COUNTRY_DATA = [
  { name: 'USA', total: 25786, color: THEME.primary },    
  { name: 'RUSSIA (CIS)', total: 25144, color: THEME.white }, 
  { name: 'CHINA', total: 8774, color: 'rgba(76, 66, 215, 0.6)' },   
  { name: 'OTHERS', total: 6528, color: '#333' }   
];

// 3. 来源板块
const SOURCES = [
  { title: "失效卫星", img: "/images/source_1.png", desc: "失去姿态控制的“金属僵尸”，在轨道无序翻滚，随时可能自我解体。" },
  { title: "碰撞与爆炸", img: "/images/source_2.png", desc: "最致命的增量源。自爆或撞击能在毫秒间产生数千个高速弹片。" },
  { title: "操作性遗留", img: "/images/source_3.png", desc: "人类工业痕迹。从火箭包带到丢失的工具，皆具备击穿动能。" }
];

// === 通用标题组件 ===
const SectionTitle = ({ zh, en }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '20px' }}>
    <div style={{ 
        marginTop: '12px', 
        width: '12px', height: '12px', 
        background: THEME.primary, 
        borderRadius: '50%', 
        boxShadow: `0 0 10px ${THEME.primary}` 
    }}></div>
    
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ 
          fontSize: '2.0rem', 
          fontWeight: '900', 
          color: '#fff', 
          lineHeight: '1.1',
          letterSpacing: '2px'
      }}>
        {zh}
      </span>
      <span style={{ 
          fontSize: '0.9rem', 
          fontWeight: '600', 
          color: '#fff', 
          opacity: 0.8,  
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginTop: '6px'
      }}>
        {en}
      </span>
    </div>
  </div>
);

export default function DebrisDashboard() {
  const [hoveredYear, setHoveredYear] = useState(null);
  const chartRef = useRef(null);

  const getMaxCount = () => 45000;
  const getX = (index) => (index / (TREND_DATA.length - 1)) * 100;
  const getY = (count) => 100 - (count / getMaxCount()) * 75; 

  const { trendPath, linePath } = useMemo(() => {
    let d = `M ${getX(0)} ${getY(TREND_DATA[0].count)}`;
    for (let i = 1; i < TREND_DATA.length; i++) {
        const curr = TREND_DATA[i];
        const prev = TREND_DATA[i-1];
        const x = getX(i);
        const y = getY(curr.count);
        const prevX = getX(i-1);
        const prevY = getY(prev.count);
        const c1x = prevX + (x - prevX) * 0.5;
        const c1y = prevY;
        const c2x = prevX + (x - prevX) * 0.5;
        const c2y = y;
        d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x} ${y}`;
    }
    const line = d; 
    const area = d + ` L 100 100 L 0 100 Z`; 
    return { trendPath: area, linePath: line };
  }, []);

  const handleMouseMove = (e) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const width = rect.width;
    const index = Math.round((mouseX / width) * (TREND_DATA.length - 1));
    const safeIndex = Math.max(0, Math.min(index, TREND_DATA.length - 1));
    setHoveredYear(TREND_DATA[safeIndex]);
  };

  const handleMouseLeave = () => {
    setHoveredYear(null);
  };

  const containerStyle = {
    width: '100vw', height: '100vh', 
    background: THEME.dark, color: THEME.white, 
    position: 'relative', overflow: 'hidden',
    fontFamily: 'Helvetica, Arial, sans-serif'
  };

  const sectionStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '40px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    height: '100%',
    justifyContent: 'space-between' 
  };

  const descStyle = {
    fontSize: '14px', color: THEME.grey, lineHeight: '1.7', 
    textAlign: 'justify', marginTop: '20px', fontWeight: '400'
  };

  return (
    <div style={containerStyle}>

      {/* 🔴 背景: 暴力加粗的白色抖动十字 */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <defs>
          <filter id="tremble">
            {/* baseFrequency 保持低频，保证线条连贯 */}
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.005" numOctaves="2" result="noise" seed="0">
                <animate attributeName="baseFrequency" dur="0.2s" values="0.01 0.005;0.015 0.009;0.01 0.005" repeatCount="indefinite" />
            </feTurbulence>
            {/* scale 降到 4，防止撕裂过大 */}
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
          </filter>
        </defs>
        
        {/* 1. 光晕层：极粗，带一点点蓝色，增加体积感 */}
        <line x1="50%" y1="-10%" x2="50%" y2="110%" stroke={THEME.primary} strokeWidth="20" filter="url(#tremble)" opacity="0.3" />
        <line x1="-10%" y1="50%" x2="110%" y2="50%" stroke={THEME.primary} strokeWidth="20" filter="url(#tremble)" opacity="0.3" />

        {/* 2. 核心层：白色，加粗到 12 */}
        <line x1="50%" y1="-10%" x2="50%" y2="110%" stroke="white" strokeWidth="12" filter="url(#tremble)" opacity="0.9" />
        <line x1="-10%" y1="50%" x2="110%" y2="50%" stroke="white" strokeWidth="12" filter="url(#tremble)" opacity="0.9" />
        
        {/* 中心锚点 */}
        <circle cx="50%" cy="50%" r="8" fill={THEME.primary} stroke="white" strokeWidth="3" style={{ zIndex: 10 }} />
      </svg>

      {/* 2x2 网格 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        gridTemplateRows: '50% 50%',
        width: '100%', height: '100%',
      }}>

        {/* 1. 左上: 趋势 */}
        <div style={{ ...sectionStyle, borderRight: `1px solid ${THEME.grid}`, borderBottom: `1px solid ${THEME.grid}` }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <SectionTitle zh="太空垃圾趋势" en="Debris Trend" />
            
            <div 
                ref={chartRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ flex: 1, minHeight: '100px', maxHeight: '140px', position: 'relative', marginTop: '10px', cursor: 'crosshair' }}
            >
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
                <defs>
                  <linearGradient id="gradBlue" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={THEME.primary} stopOpacity="0.3"/>
                    <stop offset="100%" stopColor={THEME.primary} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d={trendPath} fill="url(#gradBlue)" />
                <path d={linePath} fill="none" stroke={THEME.primary} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              </svg>

              {hoveredYear && (() => {
                 const index = TREND_DATA.indexOf(hoveredYear);
                 const xPercent = getX(index);
                 const yPercent = getY(hoveredYear.count);
                 return (
                    <>
                        <div style={{ position: 'absolute', left: `${xPercent}%`, top: 0, bottom: 0, width: '1px', background: THEME.primary, opacity: 0.3, pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', left: `${xPercent}%`, top: `${yPercent}%`, width: '8px', height: '8px', borderRadius: '50%', background: THEME.white, border: `2px solid ${THEME.primary}`, transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 10 }} />
                        <div style={{ position: 'absolute', left: `${xPercent}%`, top: `${yPercent}%`, transform: 'translate(-50%, -150%)', background: THEME.primary, padding: '4px 8px', borderRadius: '2px', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', marginBottom: '2px' }}>{hoveredYear.year}</div>
                            <div style={{ fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>{hoveredYear.count.toLocaleString()}</div>
                        </div>
                    </>
                 );
              })()}
            </div>
          </div>
          <div style={descStyle}>
            太空垃圾正从稳步积累向指数级爆发失控演变。半个多世纪的航天活动曾将编目物体控制在万个以内，但21世纪初的两次重大碰撞事件让碎片量瞬间激增 40%。截至 2025 年，微小碎片更突破 1.8 亿个，连锁碰撞风险正迫在眉睫。
          </div>
        </div>


        {/* 2. 右上: 国家分布 */}
        <div style={{ ...sectionStyle, borderBottom: `1px solid ${THEME.grid}` }}>
          <div style={{ flex: 1 }}>
            <SectionTitle zh="全球份额分布" en="Global Share" />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '20px' }}>
              {COUNTRY_DATA.map((item, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ddd', letterSpacing: '0.5px' }}>{item.name}</span>
                    <span style={{ fontSize: '12px', color: item.color === '#333' ? '#888' : item.color, fontFamily: 'monospace', fontWeight: 'bold' }}>
                        {item.total.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#1a1a1a', borderRadius: '0px' }}>
                    <div style={{ width: `${(item.total / 30000) * 100}%`, height: '100%', background: item.color, borderRadius: '0px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={descStyle}>
            美国、俄罗斯与中国合计贡献了全球约 96% 的已编目垃圾，责任归属高度集中。其构成既包括航天大国数十年累积的报废卫星与火箭残骸，也受到近年来反卫星测试及美国巨型商业星座爆发式增长的驱动。
          </div>
        </div>


        {/* 3. 左下: 来源 */}
        <div style={{ ...sectionStyle, borderRight: `1px solid ${THEME.grid}` }}>
          <div style={{ flex: 1 }}>
            <SectionTitle zh="碎片来源分析" en="Debris Sources" />

            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                gap: '20px', 
                marginTop: LAYOUT_CONFIG.CONTENT_OFFSET_TOP 
            }}>
              {SOURCES.map((src, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <img 
                    src={src.img} 
                    alt={src.title}
                    style={{
                      width: '100%', 
                      height: 'auto', 
                      maxHeight: LAYOUT_CONFIG.IMG_MAX_HEIGHT,
                      objectFit: 'contain', 
                      marginBottom: LAYOUT_CONFIG.IMG_TEXT_GAP, 
                      opacity: 0.9 
                    }}
                  />
                  <div style={{ color: THEME.primary, fontSize: '18px', fontWeight: 'bold', marginBottom: '6px' }}>{src.title}</div>
                  <div style={{ color: THEME.grey, fontSize: '13px', lineHeight: '1.5', textAlign: 'left' }}>{src.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* 4. 右下: 危害 */}
        <div style={sectionStyle}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <SectionTitle zh="关键危害数据" en="Critical Impact" />

            <div style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '60px' 
            }}>
              <div>
                <div style={{ fontSize: '52px', fontWeight: '700', color: THEME.white, lineHeight: 1, letterSpacing: '-1px' }}>
                  7.5 <span style={{ fontSize: '16px', fontWeight: '400', color: THEME.grey }}>km/s</span>
                </div>
                <div style={{ fontSize: '12px', color: THEME.primary, marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Impact Velocity</div>
              </div>
              
              <div style={{ width: '1px', height: '50px', background: '#222' }}></div>

              <div>
                <div style={{ fontSize: '52px', fontWeight: '700', color: THEME.white, lineHeight: 1, letterSpacing: '-1px' }}>
                  1.3 <span style={{ fontSize: '16px', fontWeight: '400', color: THEME.grey }}>Bn</span>
                </div>
                <div style={{ fontSize: '12px', color: THEME.primary, marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Total Particles</div>
              </div>
            </div>
          </div>
          
          <div style={descStyle}>
            太空垃圾的真正危害源于其极高的空间密度与恐怖的动能释放：轨道上现存超过 1.3亿 个微小碎片，将近地空间变成了一个随时可能爆发的“地雷区”；这些碎片以每秒 7.5公里 的极速运行，意味着哪怕是一粒漆皮或螺丝钉，也具备瞬间击穿并摧毁千万级卫星任务的致死杀伤力。
          </div>
        </div>

      </div>
    </div>
  );
}