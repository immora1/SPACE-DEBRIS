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
      background: THEME.dark,
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '0 10vw',
      boxSizing: 'border-box',
      position: 'relative',
      fontFamily: '"Lexend", sans-serif'
    }}>
      
      {/* 顶部装饰线：连接上一页的视觉引导 */}
      <div style={{ width: '1px', height: '80px', background: `linear-gradient(to bottom, transparent, ${THEME.primary})`, marginBottom: '60px' }}></div>

      {/* 1. 极简有力的大标题 */}
      <h1 style={{
        color: THEME.white,
        fontSize: 'clamp(2.5rem, 5vw, 4rem)', // 响应式大字号
        fontWeight: '900',
        letterSpacing: '0.2em', // 极宽字间距
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
        textAlign: 'center', // 居中对齐
        color: '#ccc',
        fontSize: '1.1rem',
        lineHeight: '2', // 宽松行高，易于阅读
        fontWeight: '300',
        letterSpacing: '1px'
      }}>
        <p style={{ marginBottom: '30px' }}>
          从 1957 年的第一声脉冲到如今 1.3 亿片潜伏在暗处的威胁，太空垃圾已不再只是遥远的科学参数，而是人类文明在迈向星辰大海时必须清偿的历史负债。这个网站通过数据透视与模拟交互，带你审视了那些以 7.5km/s 运行的“文明痕迹”是如何一步步将我们的未来窗口推向崩溃边缘的。
        </p>
        <p>
          保护轨道环境，并非为了拒绝探索，而是为了确保当下一代望向星空时，看到的依旧是璀璨的星辰，而非人类亲手编织的牢笼。行动始于认知：关注每一次卫星的坠落，支持每一项清理技术的革新。<br/>
          <strong style={{ color: THEME.white, fontWeight: '600' }}>在碎片吞噬未来之前，让我们共同重置空间的秩序。</strong>
        </p>
      </div>

      {/* 3. 底部 Footer (模仿参考图 image_6bcfca.png) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '120px',
        background: '#0a0a0a',
        borderTop: `1px solid ${THEME.primary}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5vw',
        boxSizing: 'border-box'
      }}>
        
        {/* 左侧线条装饰 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '120px', height: '4px', background: THEME.white }}></div>
            <div style={{ width: '80px', height: '4px', background: THEME.grey }}></div>
        </div>

        {/* 中间版权/状态 */}
        <div style={{ textAlign: 'center', opacity: 0.5 }}>
            <div style={{ fontSize: '0.8rem', letterSpacing: '2px', color: THEME.white }}>SYSTEM STATUS: MONITORING</div>
            <div style={{ fontSize: '0.7rem', marginTop: '5px', color: THEME.grey }}>© 2026 ORBITAL WATCH INITIATIVE</div>
        </div>

        {/* 右侧大色块 */}
        <div style={{ 
            width: '100px', 
            height: '40px', 
            background: THEME.primary, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: '#fff',
            letterSpacing: '1px'
        }}>
            END
        </div>

      </div>

    </div>
  );
}