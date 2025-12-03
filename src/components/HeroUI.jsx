import { useState, useEffect } from 'react';

// --- 模拟的历史太空垃圾事件数据库 ---
const HISTORY_DATABASE = {
  '01-11': { year: '2007', title: '风云-1C 反卫星试验', desc: '产生超过 3,000 个可追踪碎片，是史上最大的碎片事件之一。' },
  '02-10': { year: '2009', title: '铱星与宇宙号相撞', desc: '人类历史上首次卫星在轨高速碰撞，产生大量碎片云。' },
  '11-15': { year: '2021', title: '反卫星导弹试验', desc: '某次试验产生约 1,500 个可追踪碎片，威胁国际空间站安全。' },
  '06-01': { year: '1961', title: 'Transit 4A 爆炸', desc: '历史上第一次已知的轨道解体事件。' },
};

// --- 🔵 定义主题色：电光蓝 ---
const THEME_COLOR = '#00A3FF'; 

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
        
        {/* === TOP BAR (磨砂半透明深色框) === */}
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute', 
            top: 0,
            left: 0,
            width: '100%',
            height: '80px',
            padding: '0 60px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            backdropFilter: 'blur(10px)',          
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
            boxSizing: 'border-box',
            zIndex: 20,
            pointerEvents: 'auto' 
        }}>
            {/* 左侧 LOGO */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '12px', height: '12px', background: THEME_COLOR, borderRadius: '50%', boxShadow: `0 0 10px ${THEME_COLOR}` }}></div>
                <span style={{ 
                    fontFamily: 'Lexend', 
                    fontWeight: 700, 
                    fontSize: '1.2rem', 
                    letterSpacing: '2px',
                    color: '#F4F4F0'
                }}>
                    ORBIT.VIS
                </span>
            </div>

            {/* 右侧 LOCATION */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontFamily: 'Courier New' }}>
                <span style={{ color: '#888', fontSize: '0.8rem', letterSpacing: '1px' }}>CURRENT LOCATION</span>
                <div style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    color: THEME_COLOR, 
                    padding: '4px 0',
                    fontWeight: 'bold',
                    textShadow: `0 0 8px ${THEME_COLOR}40` // 淡淡的蓝色辉光
                }}>
                    <span>LAT: {location.lat}</span>
                    <span style={{ color: '#444' }}>|</span>
                    <span>LONG: {location.long}</span>
                </div>
            </div>
        </header>

        {/* === 左侧内容 === */}
        <div style={{ 
            flex: 1, 
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '10vw',
            pointerEvents: 'auto' 
        }}>
            <div style={{ maxWidth: '500px', marginTop: '60px' }}> 
                <h1 style={{ 
                    fontFamily: 'Lexend', 
                    fontWeight: 700,
                    fontSize: 'clamp(4rem, 6vw, 7rem)', 
                    lineHeight: '0.9',
                    color: '#F4F4F0',
                    margin: '0 0 40px 0'
                }}>
                    SPACE<br />
                    <span style={{ color: THEME_COLOR }}>DEBRIS</span>
                </h1>

                {/* 装饰框：蓝色左边框 + 蓝色微渐变背景 */}
                <div style={{ 
                    borderLeft: `4px solid ${THEME_COLOR}`, 
                    paddingLeft: '30px',
                    background: `linear-gradient(90deg, ${THEME_COLOR}10 0%, rgba(0,0,0,0) 100%)`
                }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ 
                            display: 'block', 
                            color: '#8899A6', // 稍微冷一点的灰色 
                            fontSize: '0.8rem', 
                            marginBottom: '5px',
                            letterSpacing: '1px'
                        }}>
                            SELECT DATE FOR ARCHIVE SEARCH
                        </label>
                        <input 
                            type="date" 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid #444',
                                color: '#F4F4F0',
                                fontFamily: 'Lexend',
                                fontSize: '1.5rem',
                                outline: 'none',
                                width: '100%',
                                padding: '5px 0'
                            }}
                        />
                    </div>

                    <div style={{ minHeight: '100px' }}>
                        {isSearching ? (
                            <div style={{ color: THEME_COLOR, fontFamily: 'Courier New', fontSize: '0.9rem' }} className="blink">
                                [ SEARCHING SATELLITE DATABASE... ]
                            </div>
                        ) : eventInfo ? (
                            <div>
                                <div style={{ 
                                    display: 'inline-block', 
                                    background: '#FF3300', // 警告依然用红色，保持功能性
                                    color: 'black', 
                                    padding: '2px 8px', 
                                    fontSize: '0.7rem', 
                                    fontWeight: 'bold',
                                    marginBottom: '8px',
                                    borderRadius: '2px'
                                }}>
                                    WARNING: EVENT DETECTED
                                </div>
                                <h3 style={{ margin: '0 0 5px 0', color: '#F4F4F0', fontSize: '1.2rem' }}>
                                    {eventInfo.year}: {eventInfo.title}
                                </h3>
                                <p style={{ margin: 0, color: '#AAA', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                    {eventInfo.desc}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <div style={{ 
                                    display: 'inline-block', 
                                    border: `1px solid ${THEME_COLOR}`, 
                                    color: THEME_COLOR, 
                                    padding: '2px 8px', 
                                    fontSize: '0.7rem', 
                                    fontWeight: 'bold',
                                    marginBottom: '8px',
                                    borderRadius: '2px',
                                    boxShadow: `0 0 5px ${THEME_COLOR}40`
                                }}>
                                    STATUS: NOMINAL
                                </div>
                                <h3 style={{ margin: '0 0 5px 0', color: '#888', fontSize: '1.1rem' }}>
                                    No major anomalies recorded.
                                </h3>
                                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                                    在该日期，全球卫星轨道运行平稳，未检测到重大碎片产生事件。
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* 底部图标：蓝色系 */}
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
               color: '#F4F4F0', 
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
                <path d="M 4 32 A 28 10 0 0 1 60 32" stroke={THEME_COLOR} strokeWidth="4" strokeLinecap="round" />
                <circle cx="32" cy="32" r="20" fill="#F4F4F0" />
                <path d="M 4 32 A 28 10 0 0 0 60 32" stroke={THEME_COLOR} strokeWidth="4" strokeLinecap="round" />
              </g>
              <path d="M32 22 V42" stroke="#080808" strokeWidth="3" strokeLinecap="round"/>
              <path d="M24 34 L32 42 L40 34" stroke="#080808" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>

      </section>
    </>
  );
}