import React, { useState, useMemo, useRef } from 'react';

// === ⚙️ 布局调节配置 ===
const LAYOUT_CONFIG = {
  // 🔴 修改：增加顶部偏移，给下方腾出更多呼吸空间
  CONTENT_OFFSET_TOP: '80px', 
  
  // 图片最大高度 (保持 110px 以免挤占文字空间)
  IMG_MAX_HEIGHT: '110px'     
};

// === 🎨 极简配色系统 ===
const THEME = {
  primary: '#4C42D7', 
  white: '#FFFFFF',
  grey: '#CCCCCC',
  dim: '#666666',
  dark: '#050505',
  border: 'rgba(255,255,255,0.1)'
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
  { name: 'CHINA', total: 8774, color: '#6C63FF' },   
  { name: 'OTHERS', total: 6528, color: '#333' }   
];

// 3. 来源板块
const SOURCES = [
  { title: "失效卫星", img: "/images/source_1.png", desc: "失去姿态控制的“金属僵尸”，在轨道无序翻滚。" },
  { title: "碰撞与爆炸", img: "/images/source_2.png", desc: "最致命的增量源。自爆或撞击能在毫秒间产生数千个弹片。" },
  { title: "操作性遗留", img: "/images/source_3.png", desc: "人类工业痕迹。从火箭包带到丢失的工具。" }
];

// === 标题组件 ===
const SectionTitle = ({ zh, en }) => (
  <div style={{ marginBottom: '15px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '6px', height: '6px', background: THEME.primary }}></div>
        <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '900',
            color: '#fff', 
            margin: 0, 
            letterSpacing: '2px', 
            fontFamily: '"Lexend", sans-serif' 
        }}>
            {zh}
        </h2>
    </div>
    <div style={{ 
        fontSize: '0.8rem', 
        fontWeight: '700', 
        color: THEME.primary, 
        letterSpacing: '3px', 
        textTransform: 'uppercase', 
        marginTop: '6px',
        marginLeft: '18px',
        fontFamily: '"Lexend", sans-serif'
    }}>
        {en}
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
    // 🔴 关键修复：改为透明，让背后的 3D 碎片透出来
    background: 'transparent', 
    color: THEME.white, 
    position: 'relative', overflow: 'hidden',
    fontFamily: '"Lexend", sans-serif'
  };

  const sectionStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 50px', 
    boxSizing: 'border-box',
    overflow: 'hidden',
    height: '100%',
    justifyContent: 'space-between'
  };

  const descStyle = {
    fontSize: '13px', 
    color: THEME.grey, 
    lineHeight: '1.8', 
    textAlign: 'justify', 
    marginTop: '15px', 
    fontWeight: '300',
    letterSpacing: '0.5px'
  };

  return (
    <div style={containerStyle}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;700;900&display=swap');`}</style>

      {/* 背景十字线 */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <line x1="50%" y1="-10%" x2="50%" y2="110%" stroke="white" strokeWidth="2" opacity="0.1" />
        <line x1="-10%" y1="50%" x2="110%" y2="50%" stroke="white" strokeWidth="2" opacity="0.1" />
        <circle cx="50%" cy="50%" r="6" fill={THEME.dark} stroke={THEME.primary} strokeWidth="3" style={{ zIndex: 10 }} />
      </svg>

      {/* 2x2 网格 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        gridTemplateRows: '50% 50%',
        width: '100%', height: '100%',
        position: 'relative', zIndex: 1
      }}>

        {/* 1. 左上: 趋势图 */}
        <div style={{ ...sectionStyle, borderRight: `1px solid ${THEME.border}`, borderBottom: `1px solid ${THEME.border}` }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <SectionTitle zh="太空垃圾趋势" en="Debris Trend" />
            
            <div 
                ref={chartRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ flex: 1, minHeight: '100px', maxHeight: '180px', position: 'relative', marginTop: '10px', cursor: 'crosshair' }}
            >
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
                <defs>
                  <linearGradient id="gradBlue" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={THEME.primary} stopOpacity="0.4"/>
                    <stop offset="100%" stopColor={THEME.primary} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d={trendPath} fill="url(#gradBlue)" />
                <path d={linePath} fill="none" stroke={THEME.primary} strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>

              {hoveredYear && (() => {
                 const index = TREND_DATA.indexOf(hoveredYear);
                 const xPercent = getX(index);
                 const yPercent = getY(hoveredYear.count);
                 return (
                    <>
                        <div style={{ position: 'absolute', left: `${xPercent}%`, top: 0, bottom: 0, width: '1px', background: THEME.primary, opacity: 0.5, pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', left: `${xPercent}%`, top: `${yPercent}%`, width: '10px', height: '10px', borderRadius: '50%', background: THEME.white, border: `2px solid ${THEME.primary}`, transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 10 }} />
                        <div style={{ position: 'absolute', left: `${xPercent}%`, top: `${yPercent}%`, transform: 'translate(-50%, -150%)', background: THEME.primary, padding: '6px 12px', borderRadius: '2px', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 20, boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '2px' }}>{hoveredYear.year}</div>
                            <div style={{ fontSize: '16px', color: '#fff', fontWeight: 'bold' }}>{hoveredYear.count.toLocaleString()}</div>
                        </div>
                    </>
                 );
              })()}
            </div>
          </div>
          <div style={descStyle}>
            太空垃圾正从稳步积累向指数级爆发失控演变。半个多世纪的航天活动曾将编目物体控制在万个以内，但21世纪初的两次重大碰撞事件让碎片量瞬间激增 40%。
          </div>
        </div>


        {/* 2. 右上: 全球份额 (优化垂直间距) */}
        <div style={{ ...sectionStyle, borderBottom: `1px solid ${THEME.border}` }}>
          <div style={{ flex: 1 }}>
            <SectionTitle zh="全球份额分布" en="Global Share" />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              {COUNTRY_DATA.map((item, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#fff', letterSpacing: '1px' }}>{item.name}</span>
                    <span style={{ fontSize: '16px', color: item.color === '#333' ? THEME.dim : item.color, fontFamily: '"Lexend", sans-serif', fontWeight: '700' }}>
                        {item.total.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: '#111' }}>
                    <div style={{ width: `${(item.total / 30000) * 100}%`, height: '100%', background: item.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={descStyle}>
            美国、俄罗斯与中国合计贡献了全球约 96% 的已编目垃圾，责任归属高度集中。其构成既包括航天大国数十年累积的报废卫星与火箭残骸，也受到近年来反卫星测试及美国巨型商业星座爆发式增长的驱动。
          </div>
        </div>


        {/* 3. 左下: 来源分析 (🔴 重点：调整图片与文字距离 + 放大字号) */}
        <div style={{ ...sectionStyle, borderRight: `1px solid ${THEME.border}` }}>
          <div style={{ flex: 1 }}>
            <SectionTitle zh="碎片来源分析" en="Debris Sources" />

            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                gap: '20px', 
                marginTop: LAYOUT_CONFIG.CONTENT_OFFSET_TOP 
            }}>
              {SOURCES.map((src, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* 图片区域 */}
                  <div style={{ 
                      width: '100%', 
                      height: LAYOUT_CONFIG.IMG_MAX_HEIGHT, // 110px
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      // 🔴 关键修改：增加图片底部的间距 (15px -> 30px)
                      marginBottom: '30px'
                  }}>
                    <img 
                        src={src.img} 
                        alt={src.title}
                        style={{
                          maxWidth: '100%', 
                          maxHeight: '100%', 
                          objectFit: 'contain', 
                          filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.8))',
                          transition: 'transform 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1) translateY(-10px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1) translateY(0)'}
                    />
                  </div>
                  
                  <div style={{ width: '100%', textAlign: 'left' }}>
                    {/* 🔴 关键修改：放大标题字号 (15px -> 20px) */}
                    <div style={{ color: THEME.primary, fontSize: '20px', fontWeight: '800', marginBottom: '6px', letterSpacing: '1px' }}>
                        {src.title}
                    </div>
                    {/* 🔴 关键修改：保持 12px 但增加对比度和行高 */}
                    <div style={{ color: THEME.grey, fontSize: '12px', lineHeight: '1.6' }}>
                        {src.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* 4. 右下: 危害数据 */}
        <div style={sectionStyle}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <SectionTitle zh="关键危害数据" en="Critical Impact" />

            <div style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '60px',
                marginTop: '10px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '5rem', fontWeight: '900', color: THEME.white, lineHeight: 0.9, letterSpacing: '-2px' }}>
                  7.5
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '300', color: THEME.grey, marginTop: '5px' }}>km/s</div>
                <div style={{ width: '40px', height: '4px', background: THEME.primary, margin: '15px auto 10px auto' }}></div>
                <div style={{ fontSize: '0.8rem', color: THEME.primary, fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Impact Velocity</div>
              </div>
              
              {/* 分割线 */}
              <div style={{ width: '1px', height: '80px', background: '#333' }}></div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '5rem', fontWeight: '900', color: THEME.white, lineHeight: 0.9, letterSpacing: '-2px' }}>
                  1.3
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '300', color: THEME.grey, marginTop: '5px' }}>Bn</div>
                <div style={{ width: '40px', height: '4px', background: THEME.primary, margin: '15px auto 10px auto' }}></div>
                <div style={{ fontSize: '0.8rem', color: THEME.primary, fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Total Particles</div>
              </div>
            </div>
          </div>
          
          <div style={descStyle}>
            轨道上现存超过 1.3亿 个微小碎片，将近地空间变成了一个随时可能爆发的“地雷区”；这些碎片以每秒 7.5公里 的极速运行，哪怕是一粒漆皮，也具备致死杀伤力。
          </div>
        </div>

      </div>
    </div>
  );
}