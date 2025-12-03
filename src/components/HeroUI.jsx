import { useState, useEffect } from 'react';

// --- 🎨 核心配色系统 (HEX 格式) ---
const COLORS = {
  theme: '#5456F0',      // 主题色 (紫蓝色)
  textMain: '#F4F4F0',   // 主文字白
  textDim: '#8899A6',    // 辅助文字灰
  bgDark: '#080808',     // 纯黑背景
  danger: '#FF3300',     // 警告红
  success: '#00FF88'     // 成功绿
};

// --- 工具函数：Hex 转 RGBA ---
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// --- 模拟的历史事件数据库 ---
const HISTORY_DATABASE = {
  '01-11': { year: '2007', title: '风云-1C 反卫星试验', desc: '产生超过 3,000 个可追踪碎片，是史上最大的碎片事件之一。' },
  '02-10': { year: '2009', title: '铱星与宇宙号相撞', desc: '人类历史上首次卫星在轨高速碰撞，产生大量碎片云。' },
  '11-15': { year: '2021', title: '反卫星导弹试验', desc: '某次试验产生约 1,500 个可追踪碎片，威胁国际空间站安全。' },
  '06-01': { year: '1961', title: 'Transit 4A 爆炸', desc: '历史上第一次已知的轨道解体事件。' },
};

export default function HeroUI() {
  const [location, setLocation] = useState({ lat: '--°N', long: '--°E' });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); 
  const [eventInfo, setEventInfo] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // 1. 获取地理位置
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const latStr = `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'}`;
        const longStr = `${Math.abs(long).toFixed(2)}°${long >= 0 ? 'E' : 'W'}`;
        setLocation({ lat: latStr, long: longStr });
      }, () => {
        setLocation({ lat: 'UNKNOWN', long: 'OF-GRID' });
      });
    }
  }, []);

  // 2. 搜索逻辑
  useEffect(() => {
    setIsSearching(true);
    setEventInfo(null);
    const timer = setTimeout(() => {
      const dateKey = selectedDate.slice(5); 
      const foundEvent = HISTORY_DATABASE[dateKey];
      if (foundEvent) {
        setEventInfo(foundEvent);
      } else {
        setEventInfo(null);
      }
      setIsSearching(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [selectedDate]);

  return (
    <>
      <style>{`
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        .blink { animation: blink 1s infinite; }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .arrow-bounce {
          animation: bounce 2s infinite ease-in-out;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
            opacity: 0.6;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
            opacity: 1;
        }
      `}</style>

      <section style={{ 
          height: '100vh', 
          width: '100%', 
          position: 'relative', 
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'none' 
      }}>
        
        {/* === TOP BAR (顶部导航栏) === */}
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute', 
            top: 0,
            left: 0,
            width: '100%',
            height: '80px',
            padding: '0 5vw',
            backgroundColor: hexToRgba(COLORS.bgDark, 0.6),
            backdropFilter: 'blur(10px)',          
            borderBottom: `1px solid ${hexToRgba(COLORS.textMain, 0.1)}`, 
            boxSizing: 'border-box',
            zIndex: 20,
            pointerEvents: 'auto' 
        }}>
            {/* 左侧 LOGO */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '12px', height: '12px', background: COLORS.theme, borderRadius: '50%', boxShadow: `0 0 10px ${COLORS.theme}` }}></div>
                <span style={{ 
                    fontFamily: 'Lexend', 
                    fontWeight: 700, 
                    fontSize: '1.2rem', 
                    letterSpacing: '2px',
                    color: COLORS.textMain
                }}>
                    ORBIT.VIS
                </span>
            </div>

            {/* 右侧 LOCATION */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontFamily: 'Courier New' }}>
                {/* 🔴 修复：这里去掉了 display: none，现在它会一直显示了 */}
                <span style={{ 
                    color: COLORS.textDim, 
                    fontSize: '0.8rem', 
                    letterSpacing: '1px', 
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                }}>
                    CURRENT LOCATION
                </span>
                
                <div style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    color: COLORS.theme, 
                    padding: '4px 8px',
                    fontWeight: 'bold',
                    textShadow: `0 0 8px ${hexToRgba(COLORS.theme, 0.4)}`,
                    background: hexToRgba(COLORS.theme, 0.1),
                    borderRadius: '4px'
                }}>
                    <span>LAT: {location.lat}</span>
                    <span style={{ color: '#444' }}>|</span>
                    <span>LONG: {location.long}</span>
                </div>
            </div>
        </header>

        {/* === 左侧核心内容区 (带装饰圆) === */}
        <div style={{ 
            flex: 1, 
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '10vw',
            pointerEvents: 'auto' 
        }}>
            <div style={{ position: 'relative', maxWidth: '550px', marginTop: '40px' }}> 
                
                {/* 装饰圆 1 (左下) */}
                <div style={{
                    position: 'absolute',
                    top: '80px',    
                    left: '-120px', 
                    width: '220px', 
                    height: '220px',
                    borderRadius: '50%',
                    background: hexToRgba(COLORS.textMain, 0.05),
                    backdropFilter: 'blur(8px)',
                    zIndex: -1
                }}></div>

                {/* 装饰圆 2 (右上) */}
                <div style={{
                    position: 'absolute',
                    top: '-30px',   
                    left: '240px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: hexToRgba(COLORS.theme, 0.1),
                    backdropFilter: 'blur(10px)',
                    zIndex: -1
                }}></div>


                {/* 大标题 */}
                <h1 style={{ 
                    fontFamily: 'Lexend', 
                    fontWeight: 700,
                    fontSize: 'clamp(4rem, 6vw, 7rem)', 
                    lineHeight: '0.9',
                    color: COLORS.textMain,
                    margin: '0 0 30px 0' 
                }}>
                    SPACE<br />
                    <span style={{ color: COLORS.theme }}>DEBRIS</span>
                </h1>

                {/* 内容框 */}
                <div style={{ 
                    borderLeft: `4px solid ${COLORS.theme}`, 
                    paddingLeft: '25px',
                    background: `linear-gradient(90deg, ${hexToRgba(COLORS.theme, 0.08)} 0%, rgba(0,0,0,0) 100%)`
                }}>
                    {/* 日期选择 */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ 
                            display: 'block', 
                            color: COLORS.textDim, 
                            fontSize: '0.8rem', 
                            marginBottom: '5px',
                            letterSpacing: '1px',
                            fontWeight: 'bold'
                        }}>
                            DATE ARCHIVE / 日期归档
                        </label>
                        <input 
                            type="date" 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                borderBottom: `2px solid ${hexToRgba(COLORS.textMain, 0.2)}`,
                                color: COLORS.textMain,
                                fontFamily: 'Lexend',
                                fontSize: '1.8rem', 
                                fontWeight: 'bold',
                                outline: 'none',
                                width: '100%',
                                padding: '5px 0'
                            }}
                        />
                    </div>

                    {/* 事件反馈框 */}
                    <div style={{ minHeight: '100px' }}>
                        {isSearching ? (
                            <div style={{ color: COLORS.theme, fontFamily: 'Courier New', fontSize: '0.9rem' }} className="blink">
                                [ SEARCHING DATABASE... ]
                            </div>
                        ) : eventInfo ? (
                            <div style={{ padding: '15px', background: hexToRgba(COLORS.danger, 0.1), border: `1px solid ${COLORS.danger}` }}>
                                <div style={{ 
                                    display: 'inline-block', 
                                    background: COLORS.danger, 
                                    color: 'black', 
                                    padding: '2px 8px', 
                                    fontSize: '0.7rem', 
                                    fontWeight: 'bold',
                                    marginBottom: '8px',
                                }}>
                                    WARNING: EVENT DETECTED
                                </div>
                                <h3 style={{ margin: '0 0 10px 0', color: COLORS.textMain, fontSize: '1.1rem' }}>
                                    {eventInfo.year} | {eventInfo.title}
                                </h3>
                                <p style={{ margin: 0, color: COLORS.textDim, fontSize: '0.9rem', lineHeight: '1.4' }}>
                                    {eventInfo.desc}
                                </p>
                            </div>
                        ) : (
                            <div style={{ padding: '15px', background: hexToRgba(COLORS.theme, 0.05), border: `1px solid ${hexToRgba(COLORS.theme, 0.3)}` }}>
                                <div style={{ 
                                    display: 'inline-block', 
                                    border: `1px solid ${COLORS.theme}`, 
                                    color: COLORS.theme, 
                                    padding: '2px 8px', 
                                    fontSize: '0.7rem', 
                                    fontWeight: 'bold',
                                    marginBottom: '8px',
                                }}>
                                    STATUS: NOMINAL
                                </div>
                                <h3 style={{ margin: '0 0 10px 0', color: '#888', fontSize: '1.1rem' }}>
                                    No major anomalies recorded.
                                </h3>
                                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                                    当日全球轨道运行平稳，未检测到重大碎片事件。
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* 底部图标 */}
        <div style={{ 
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            zIndex: 10,
            pointerEvents: 'auto',
            cursor: 'pointer'
        }}>
           <span style={{ 
               color: COLORS.textMain, 
               fontFamily: 'Lexend', 
               fontSize: '0.75rem', 
               letterSpacing: '3px',
               textTransform: 'uppercase',
               opacity: 0.8
           }}>
               Scroll to Explore
           </span>
           <svg className="arrow-bounce" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="rotate(-30 32 32)">
                <path d="M 4 32 A 28 10 0 0 1 60 32" stroke={COLORS.theme} strokeWidth="4" strokeLinecap="round" />
                <circle cx="32" cy="32" r="20" fill={COLORS.textMain} />
                <path d="M 4 32 A 28 10 0 0 0 60 32" stroke={COLORS.theme} strokeWidth="4" strokeLinecap="round" />
              </g>
              <path d="M32 22 V42" stroke={COLORS.bgDark} strokeWidth="3" strokeLinecap="round"/>
              <path d="M24 34 L32 42 L40 34" stroke={COLORS.bgDark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>

      </section>
    </>
  );
}