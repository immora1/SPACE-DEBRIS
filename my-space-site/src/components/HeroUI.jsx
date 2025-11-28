export default function HeroUI() {
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
          height: '100vh', 
          width: '100%', 
          position: 'relative', 
          pointerEvents: 'none' 
      }}>
        
        {/* 左侧大标题 (保持不变) */}
        <div style={{ 
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            paddingLeft: '10vw', 
            zIndex: 10 
        }}>
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
        </div>

        {/* 底部居中：全新的 3D 星球箭头图标 */}
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
               color: '#FF6B00', 
               fontFamily: 'Lexend', 
               fontSize: '0.8rem', 
               letterSpacing: '3px',
               textTransform: 'uppercase',
               opacity: 0.8
           }}>
               Scroll to Explore
           </span>

           {/* 全新绘制的 SVG 图标 */}
           <svg 
              className="arrow-bounce" 
              width="64" height="64" // 加大整体尺寸
              viewBox="0 0 64 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
           >
              {/* 1. 星球本体 */}
              {/* 关键：fill="#080808" 填充背景色，用来遮挡背面的环 */}
              {/* 加大了半径 r="20"，加粗了描边 strokeWidth="3" */}
              <circle cx="32" cy="32" r="20" fill="#080808" stroke="#FF6B00" strokeWidth="3" />
              
              {/* 2. 土星环的前半部分 */}
              {/* 使用路径(path)绘制一条弧线，模拟环绕到星球前方的效果 */}
              <path d="M 8 42 Q 32 60 56 22" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" fill="none" />
              
              {/* 3. 超大白色箭头 (放在最上层) */}
              {/* 加粗了线条 strokeWidth="4"，拉长了箭头尺寸 */}
              <path d="M32 20 V44" stroke="#F4F4F0" strokeWidth="4" strokeLinecap="round"/>
              <path d="M20 32 L32 44 L44 32" stroke="#F4F4F0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
           
        </div>

      </section>
    </>
  );
}