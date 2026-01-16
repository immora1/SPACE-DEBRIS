import React from 'react';

// === 🎨 配色系统 (保持统一) ===
const THEME = {
  primary: '#4C42D7',  // 你的核心蓝
  white: '#FFFFFF',
  grey: '#888888',
  dark: '#050505',
};

export default function OrbitLegacy() {
  return (
    <div style={{
      width: '100%', 
      height: '100%', 
      background: 'transparent',
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '0 10vw',
      boxSizing: 'border-box',
      position: 'relative',
      fontFamily: '"Lexend", sans-serif'
    }}>
      
      {/* 顶部装饰线 */}
      <div style={{ width: '1px', height: '80px', background: `linear-gradient(to bottom, transparent, ${THEME.primary})`, marginBottom: '60px' }}></div>

      {/* 1. 大标题 */}
      <h1 style={{
        color: THEME.white,
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: '900',
        letterSpacing: '0.2em',
        textAlign: 'center',
        margin: '0 0 60px 0',
        lineHeight: '1.2',
        textTransform: 'uppercase'
      }}>
        THE ORBIT IS OUR <br />
        <span style={{ color: THEME.primary }}>SHARED LEGACY.</span>
      </h1>

      {/* 2. 核心总结文案 */}
      <div style={{
        maxWidth: '900px',
        textAlign: 'center',
        color: '#ccc',
        fontSize: '1.1rem',
        lineHeight: '2',
        fontWeight: '300',
        letterSpacing: '1px',
        marginBottom: '160px'
      }}>
        <p style={{ marginBottom: '30px' }}>
          从 1957 年的第一声脉冲到如今 1.3 亿片潜伏在暗处的威胁，太空垃圾已不再只是遥远的科学参数，而是人类文明在迈向星辰大海时必须清偿的历史负债。这个网站通过数据透视与模拟交互，带你审视了那些以 7.5km/s 运行的“文明痕迹”是如何一步步将我们的未来窗口推向崩溃边缘的。
        </p>
        <p>
          保护轨道环境，并非为了拒绝探索，而是为了确保当下一代望向星空时，看到的依旧是璀璨的星辰，而非人类亲手编织的牢笼。<br/>
          <strong style={{ color: THEME.white, fontWeight: '600' }}>在碎片吞噬未来之前，让我们共同重置空间的秩序。</strong>
        </p>
      </div>

      {/* 3. 底部 Footer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '140px',
        background: 'rgba(10, 10, 10, 0.85)', 
        backdropFilter: 'blur(20px)', 
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${THEME.primary}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5vw',
        boxSizing: 'border-box',
        zIndex: 10
      }}>
        
        {/* A. 左侧：Logo 和名称组合 (🔥 核心修改区域) */}
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px' // 图标和文字的间距
        }}>
            {/* 1. SVG Logo (一个抽象的轨道环) */}
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 外圈轨道 - 半透明蓝色 */}
                <circle cx="21" cy="21" r="18" stroke={THEME.primary} strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4 4"/>
                {/* 核心 - 白色实心 */}
                <circle cx="21" cy="21" r="6" fill={THEME.white}/>
                {/* 环绕的卫星点 - 实心蓝色 */}
                <circle cx="36" cy="21" r="3" fill={THEME.primary}/>
            </svg>

            {/* 2. 文字组合 */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ 
                    color: THEME.white, 
                    fontWeight: '800', 
                    fontSize: '1.1rem',
                    letterSpacing: '1px',
                    lineHeight: '1'
                }}>
                    ORBITAL WATCH
                </span>
                <span style={{ 
                    color: THEME.primary, // 副标题用蓝色
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    letterSpacing: '2px',
                    marginTop: '2px'
                }}>
                    INITIATIVE
                </span>
            </div>
        </div>


        {/* B. 中间：数据来源与版权 (保持上一步的设计) */}
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '6px',
            textAlign: 'center'
        }}>
            <div style={{ fontSize: '0.65rem', color: THEME.primary, letterSpacing: '3px', fontWeight: '800', opacity: 0.9 }}>
                // DATA SOURCE REFERENCE //
            </div>
            <div style={{ fontSize: '0.75rem', color: '#e0e0e0', letterSpacing: '1px', fontFamily: 'monospace' }}>
                NASA ODPO &nbsp;•&nbsp; ESA SDO &nbsp;•&nbsp; USSTRATCOM
            </div>
            <div style={{ fontSize: '0.6rem', color: '#666', letterSpacing: '0.5px' }}>
                © 2026 ORBITAL WATCH INITIATIVE.
            </div>
        </div>

        {/* C. 右侧按钮 (保持上一步的设计，带交互) */}
        <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ 
                width: '140px', height: '48px', background: THEME.primary, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', fontWeight: '900', color: '#fff', letterSpacing: '3px',
                cursor: 'pointer', boxShadow: `0 0 25px ${THEME.primary}40`,
                transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = THEME.primary; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = THEME.primary; e.currentTarget.style.color = '#fff'; }}
        >
            RE:START
        </div>

      </div>

    </div>
  );
}