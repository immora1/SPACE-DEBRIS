import { useState, useEffect } from 'react';

// --- 🎨 核心配色系统 ---
const COLORS = {
  theme: '#5456F0',      // 主题色 (紫蓝色)
  textMain: '#F4F4F0',   // 主文字白
  textDim: '#8899A6',    // 辅助文字灰 (偏蓝灰)
  bgDark: '#080808',     // 纯黑背景
  headerBg: '#1A1A1A',   // 顶栏深灰背景
};

// --- 工具函数：Hex 转 RGBA ---
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// --- 工具函数：DMS 格式 ---
const toDMS = (deg, isLat) => {
  const absolute = Math.abs(deg);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);
  const direction = isLat ? (deg >= 0 ? 'N' : 'S') : (deg >= 0 ? 'E' : 'W');
  return `${degrees}°${minutes}'${seconds}"${direction}`;
};

export default function HeroUI() {
  const [location, setLocation] = useState({ lat: "SCANNING...", long: "" });

  // 1. 获取真实位置
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ 
            lat: toDMS(position.coords.latitude, true), 
            long: toDMS(position.coords.longitude, false) 
          });
        }, 
        (error) => setLocation({ lat: "OFFLINE", long: "ERR:404" })
      );
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .arrow-bounce {
          animation: bounce 2s infinite ease-in-out;
        }
      `}</style>

      <section style={{ 
          height: '100vh', width: '100%', position: 'relative', 
          display: 'flex', flexDirection: 'column', pointerEvents: 'none' 
      }}>
        
        {/* === TOP BAR (顶部导航栏) === */}
        <header style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            position: 'absolute', top: 0, left: 0, width: '100%', height: '80px',
            padding: '0 4vw', backgroundColor: hexToRgba(COLORS.headerBg, 0.7), 
            backdropFilter: 'blur(12px)', borderBottom: `1px solid ${hexToRgba(COLORS.textMain, 0.1)}`, 
            boxSizing: 'border-box', zIndex: 20, pointerEvents: 'auto' 
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: COLORS.textMain, position: 'relative', display: 'flex', alignItems: 'center', overflow: 'visible' }}>
                    <div style={{ width: '160%', height: '4px', backgroundColor: COLORS.theme, position: 'absolute', left: '-30%', borderRadius: '2px'}}></div>
                </div>
                <span style={{ fontFamily: 'Lexend', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '1px', color: COLORS.textMain }}>RE:SET</span>
                <span style={{ fontFamily: 'Lexend', fontWeight: 400, fontSize: '0.8rem', color: COLORS.textDim, display: 'none', '@media (min-width: 1024px)': { display: 'inline' }}}>You know what is wrong, do you?</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Courier New' }}>
                <span style={{ color: COLORS.textMain, fontSize: '1.2rem', fontWeight: 'bold' }}> / </span>
                <span style={{ color: COLORS.textMain, fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px' }}>LOCATION</span>
                <span style={{ color: COLORS.textMain, fontSize: '1.2rem', fontWeight: 'bold' }}> [ </span>
                <span style={{ color: COLORS.textMain, fontWeight: 'bold', letterSpacing: '1px' }}>{location.lat} {location.long}</span>
                <span style={{ color: COLORS.textMain, fontSize: '1.2rem', fontWeight: 'bold' }}> ] </span>
            </div>
        </header>

        {/* === 左侧核心内容区 === */}
        <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'flex-start', 
            paddingLeft: '8vw', 
            paddingTop: '160px', 
            paddingBottom: '100px', 
            pointerEvents: 'auto',
            overflowY: 'auto' 
        }}>
            <div style={{ position: 'relative', maxWidth: '700px' }}> 
                
                {/* 装饰圆 1 (紫色 - E 侧) */}
                <div style={{
                    position: 'absolute', top: '-40px', left: '340px',
                    width: '160px', height: '160px', borderRadius: '50%',
                    background: hexToRgba(COLORS.theme, 0.2), backdropFilter: 'blur(15px)',
                    border: `1px solid ${hexToRgba(COLORS.theme, 0.3)}`, zIndex: -1
                }}></div>

                {/* 装饰圆 2 (深色 - 内容框后) */}
                <div style={{
                    position: 'absolute', top: '120px', left: '-100px',
                    width: '240px', height: '240px', borderRadius: '50%',
                    background: hexToRgba(COLORS.textMain, 0.05), backdropFilter: 'blur(20px)',
                    border: `1px solid ${hexToRgba(COLORS.textMain, 0.1)}`, zIndex: -1
                }}></div>

                {/* 大标题 */}
                <h1 style={{ 
                    fontFamily: 'Lexend', fontWeight: 900, fontSize: 'clamp(5rem, 8vw, 8.5rem)', 
                    lineHeight: '0.85', color: COLORS.textMain, 
                    margin: '0 0 30px 0', 
                    position: 'relative', zIndex: 0
                }}>
                    SPACE<br />
                    <span style={{ color: COLORS.theme }}>DEBRIS</span>
                </h1>

                {/* 核心内容区容器 */}
                <div style={{ 
                    borderLeft: `6px solid ${COLORS.theme}`, 
                    paddingLeft: '25px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px' 
                }}>
                    
                    {/* 1. 日期铭牌 */}
                    <div style={{
                        display: 'flex', alignItems: 'center',
                        background: COLORS.theme,
                        width: 'fit-content',
                        padding: '5px 15px',
                        borderRadius: '2px',
                        boxShadow: `0 5px 15px ${hexToRgba(COLORS.theme, 0.4)}`
                    }}>
                        <div style={{ width: '2px', height: '20px', background: 'rgba(255,255,255,0.5)', marginRight: '10px' }}></div>
                        <span style={{ 
                            color: '#FFF', fontFamily: 'Lexend', fontWeight: '900', fontSize: '1.8rem', letterSpacing: '2px',
                            marginRight: '10px'
                        }}>
                            12
                        </span>
                        <div style={{ width: '2px', height: '20px', background: 'rgba(255,255,255,0.5)', marginRight: '10px' }}></div>
                        <span style={{ 
                            color: '#FFF', fontFamily: 'Lexend', fontWeight: '900', fontSize: '1.8rem', letterSpacing: '2px'
                        }}>
                            02
                        </span>
                    </div>

                    {/* 2. 事件标题与地点 */}
                    <div>
                        <h2 style={{ 
                            margin: '0 0 8px 0', color: COLORS.textMain, fontSize: '1.6rem', fontWeight: 'bold',
                            textShadow: `0 2px 10px ${hexToRgba(COLORS.bgDark, 0.8)}`
                        }}>
                            2021年“净空一号”解体事件
                        </h2>
                        <div style={{ 
                            display: 'inline-block',
                            background: hexToRgba(COLORS.theme, 0.15),
                            padding: '4px 8px',
                            borderRadius: '4px'
                        }}>
                            <p style={{ margin: 0, color: COLORS.textDim, fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
                                地点：高度 850km 的太阳同步轨道 (SSO)
                            </p>
                        </div>
                    </div>

                    {/* 3. 玻璃描述框 */}
                    <div style={{ 
                        background: hexToRgba(COLORS.theme, 0.25), 
                        padding: '24px',
                        borderRadius: '8px', 
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${hexToRgba(COLORS.theme, 0.3)}`,
                        boxShadow: `0 8px 20px ${hexToRgba(COLORS.bgDark, 0.6)}`,
                        maxWidth: '95%'
                    }}>
                        <p style={{ margin: 0, color: COLORS.textMain, fontSize: '1rem', lineHeight: '1.6', fontWeight: '400', letterSpacing: '0.5px' }}>
                            2021年，“净空一号”清理任务因意外爆炸失败，反而制造了4500多块新碎片，
                            导致850km黄金轨道永久封锁与全球通信瘫痪，这一惨痛教训迫使人类放弃暴
                            力清理，转向可持续治理。
                        </p>
                    </div>

                </div>
            </div>
        </div>

        {/* === 底部图标 (向下移动至 10px) === */}
        <div style={{ 
            position: 'absolute', 
            // 🔴 修改：从 40px 改为 10px，大幅向下移，避开上面的蓝色方框
            bottom: '10px', 
            left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
            zIndex: 10, pointerEvents: 'auto', cursor: 'pointer'
        }}>
           
           {/* 图标 */}
           <svg className="arrow-bounce" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="rotate(-30 32 32)">
                <path d="M 4 32 A 28 10 0 0 1 60 32" stroke={COLORS.theme} strokeWidth="4" strokeLinecap="round" />
                <circle cx="32" cy="32" r="20" fill={COLORS.textMain} />
                <path d="M 4 32 A 28 10 0 0 0 60 32" stroke={COLORS.theme} strokeWidth="4" strokeLinecap="round" />
              </g>
              <path d="M32 22 V42" stroke={COLORS.bgDark} strokeWidth="3" strokeLinecap="round"/>
              <path d="M24 34 L32 42 L40 34" stroke={COLORS.bgDark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>

           {/* 文字 */}
           <span style={{ 
               color: COLORS.textMain, 
               fontFamily: 'Lexend', 
               fontSize: '0.8rem', 
               fontWeight: '400',
               letterSpacing: '1px',
               opacity: 0.8
           }}>
               Scroll To View More
           </span>

        </div>

      </section>
    </>
  );
}