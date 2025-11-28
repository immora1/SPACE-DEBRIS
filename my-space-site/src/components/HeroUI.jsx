export default function HeroUI() {
  return (
    <section style={{ 
        height: '100vh', 
        width: '100%', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        // 关键：让鼠标能穿透文字层，操作后面的3D
        pointerEvents: 'none' 
    }}>
      {/* 左侧文字区 */}
      <div style={{ paddingLeft: '10vw', zIndex: 10 }}>
        {/* 主标题 */}
        <h1 style={{ 
          fontFamily: "'Lexend', sans-serif", 
          fontWeight: 700,
          fontSize: '6rem', 
          lineHeight: '0.9',
          color: '#F4F4F0',
          margin: 0
        }}>
          SPACE<br />
          <span style={{ color: '#FF6B00' }}>DEBRIS</span>
        </h1>
        
        {/* 副标题 */}
        <p style={{
          fontFamily: "'Lexend', sans-serif",
          fontWeight: 300,
          fontSize: '1.2rem',
          color: '#A0A0A0',
          marginTop: '1.5rem',
          maxWidth: '400px'
        }}>
          头顶的隐形危机。<br/>
          一次关于轨道数据与未来的沉浸式探索。
        </p>

        {/* 底部提示 */}
        <div style={{ 
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        }}>
           {/* 简单的鼠标图形 */}
           <div style={{
               width: '20px', height: '30px', 
               border: '2px solid #FF6B00', 
               borderRadius: '10px'
           }}></div>
           <span style={{ color: '#FF6B00', fontFamily: 'Lexend', fontSize: '0.8rem', letterSpacing: '2px' }}>
               SCROLL TO EXPLORE
           </span>
        </div>
      </div>
    </section>
  );
}