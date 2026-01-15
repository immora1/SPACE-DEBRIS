import React from 'react';

// === 🎨 配色系统 ===
const THEME = {
  primary: '#4C42D7', 
  white: '#FFFFFF',
  grey: '#888888',
  dark: '#050505',
  darker: '#020202',
};

export default function OrbitLegacy() {
  return (
    <div style={{
      width: '100%', 
      height: '100%', 
      // 1. 页面主体背景保持透明，为了透出全局 3D 碎片
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

      {/* 1. 极简有力的大标题 */}
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
        // 增加一点底部边距，防止文字被底部栏遮挡
        marginBottom: '140px' 
      }}>
        <p style={{ marginBottom: '30px' }}>
          从 1957 年的第一声脉冲到如今 1.3 亿片潜伏在暗处的威胁，太空垃圾已不再只是遥远的科学参数，而是人类文明在迈向星辰大海时必须清偿的历史负债。这个网站通过数据透视与模拟交互，带你审视了那些以 7.5km/s 运行的“文明痕迹”是如何一步步将我们的未来窗口推向崩溃边缘的。
        </p>
        <p>
          保护轨道环境，并非为了拒绝探索，而是为了确保当下一代望向星空时，看到的依旧是璀璨的星辰，而非人类亲手编织的牢笼。行动始于认知：关注每一次卫星的坠落，支持每一项清理技术的革新。<br/>
          <strong style={{ color: THEME.white, fontWeight: '600' }}>在碎片吞噬未来之前，让我们共同重置空间的秩序。</strong>
        </p>
      </div>

      {/* 3. 底部 Footer (半透明磨砂质感 + 置底) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '120px',
        
        // 🔴 关键修改：半透明黑色背景 + 磨砂玻璃效果
        background: 'rgba(10, 10, 10, 0.85)', 
        backdropFilter: 'blur(20px)', 
        WebkitBackdropFilter: 'blur(20px)', // 兼容 Safari
        
        borderTop: `1px solid ${THEME.primary}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5vw',
        boxSizing: 'border-box',
        zIndex: 10 // 确保在最上层
      }}>
        
        {/* 左侧线条装饰 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '120px', height: '4px', background: THEME.white }}></div>
            <div style={{ width: '80px', height: '4px', background: THEME.grey }}></div>
        </div>

        {/* 中间版权/状态 */}
        <div style={{ textAlign: 'center', opacity: 0.6 }}>
            <div style={{ fontSize: '0.8rem', letterSpacing: '2px', color: THEME.white, fontWeight: 'bold' }}>SYSTEM STATUS: MONITORING</div>
            <div style={{ fontSize: '0.7rem', marginTop: '6px', color: THEME.grey }}>© 2026 ORBITAL WATCH INITIATIVE</div>
        </div>

        {/* 右侧大色块 (END 按钮) */}
        <div style={{ 
            width: '120px', 
            height: '44px', 
            background: THEME.primary, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: '900',
            color: '#fff',
            letterSpacing: '2px',
            boxShadow: '0 0 20px rgba(76, 66, 215, 0.4)' // 增加一点发光
        }}>
            END
        </div>

      </div>

    </div>
  );
}