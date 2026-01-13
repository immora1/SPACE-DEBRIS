import React from 'react';

export default function DataPanel() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      color: '#fff'
    }}>
      {/* 居中容器 */}
      <div style={{
        width: '90vw',
        maxWidth: '1200px',
        height: '80vh',
        display: 'grid',
        gridTemplateColumns: '1fr 60px 1fr', // 左卡片 - 中轴 - 右卡片
        gridTemplateRows: '1fr 1fr',         // 上排 - 下排
        gap: '20px',
        position: 'relative'
      }}>
        
        {/* === 装饰：中轴连接器 (对应原型图中间的圆形连接) === */}
        <div style={{ gridColumn: '2 / 3', gridRow: '1 / 3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
             <div style={{ width: '2px', height: '100%', background: 'rgba(255,255,255,0.1)' }}></div>
             <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1a1a1a', border: '2px solid #5456F0', position: 'absolute', top: '20%' }}></div>
             <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#1a1a1a', border: '2px solid #FF6B00', position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}></div>
             <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1a1a1a', border: '2px solid #5456F0', position: 'absolute', bottom: '20%' }}></div>
        </div>

        {/* === 板块 1: 趋势图 (左上) === */}
        <div style={cardStyle}>
          <div style={headerStyle}>
            <div style={dotStyle('#FF6B00')}></div>
            <div>
              <h3 style={titleStyle}>碎片指数级增长趋势</h3>
              <p style={subTitleStyle}>EXPONENTIAL GROWTH OF DEBRIS</p>
            </div>
          </div>
          {/* 纯 CSS/SVG 折线图 */}
          <div style={{ flex: 1, position: 'relative', marginTop: '20px', borderLeft: '1px solid #333', borderBottom: '1px solid #333' }}>
             <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* 趋势线 */}
                <polyline 
                   points="0,90 20,85 40,80 60,60 80,30 100,10" 
                   fill="none" 
                   stroke="#FF6B00" 
                   strokeWidth="2" 
                   vectorEffect="non-scaling-stroke"
                />
                {/* 填充区域 */}
                <polygon 
                   points="0,90 20,85 40,80 60,60 80,30 100,10 100,100 0,100" 
                   fill="url(#gradientOrange)" 
                   opacity="0.3"
                />
                <defs>
                  <linearGradient id="gradientOrange" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#FF6B00" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
             </svg>
             <span style={{ position: 'absolute', bottom: '-20px', left: '0', fontSize: '10px', color: '#666' }}>1957</span>
             <span style={{ position: 'absolute', bottom: '-20px', right: '0', fontSize: '10px', color: '#666' }}>2025</span>
          </div>
          <p style={{ marginTop: '10px', fontSize: '0.8rem', color: '#888', lineHeight: '1.4' }}>
            自1957年第一颗卫星发射以来，轨道物体数量呈爆发式增长。目前追踪到的碎片仅是冰山一角，且并没有放缓的迹象。
          </p>
        </div>

        {/* === 板块 2: 国家责任 (右上) === */}
        <div style={cardStyle}>
           <div style={headerStyle}>
            <div style={dotStyle('#5456F0')}></div>
            <div>
              <h3 style={titleStyle}>主要国家碎片产生量</h3>
              <p style={subTitleStyle}>DEBRIS BY MAJOR SPACEFARING NATIONS</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <BarRow label="RUSSIA (CIS)" percent="35%" count="7,032+" color="#fff" />
              <BarRow label="USA" percent="32%" count="5,500+" color="#ccc" />
              <BarRow label="CHINA" percent="28%" count="3,800+" color="#999" />
              <BarRow label="FRANCE" percent="5%" count="500+" color="#666" />
          </div>
          <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#888' }}>
             历史航天活动遗留的火箭残骸和反卫星测试是主要来源。太空环境治理需要大国的共同责任。
          </p>
        </div>

        {/* === 板块 3: 碎片来源与尺寸 (左下) === */}
        <div style={cardStyle}>
          <div style={headerStyle}>
            <div style={dotStyle('#00FF00')}></div>
            <div>
              <h3 style={titleStyle}>致命的“隐形子弹”</h3>
              <p style={subTitleStyle}>SOURCE AND SIZE OF FRAGMENTS</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '60%', marginTop: '10px' }}>
              {/* 大碎片 */}
              <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '80px', height: '80px', border: '1px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                     <div style={{ width: '60%', height: '60%', background: '#fff', clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}></div>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3.6万+</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>&gt; 10cm</div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>(可追踪)</div>
              </div>
              {/* 中碎片 */}
              <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '60px', height: '60px', border: '1px solid #FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                     <div style={{ width: '50%', height: '50%', background: '#FF6B00', borderRadius: '50%' }}></div>
                  </div>
                   <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF6B00' }}>100万+</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>1cm - 10cm</div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>(致命且难追踪)</div>
              </div>
              {/* 小碎片 */}
              <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '40px', height: '40px', border: '1px solid #5456F0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                      <div style={{ width: '4px', height: '4px', background: '#5456F0', borderRadius: '50%' }}></div>
                      <div style={{ width: '4px', height: '4px', background: '#5456F0', borderRadius: '50%', marginLeft:'4px' }}></div>
                  </div>
                   <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#5456F0' }}>1.3亿+</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>&lt; 1cm</div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>(无法屏蔽)</div>
              </div>
          </div>
        </div>

        {/* === 板块 4: 核心数据危机 (右下) === */}
        <div style={cardStyle}>
          <div style={headerStyle}>
            <div style={dotStyle('#fff')}></div>
            <div>
              <h3 style={titleStyle}>极速撞击动能</h3>
              <p style={subTitleStyle}>HYPERVELOCITY IMPACT DATA</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
              <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>平均相对撞击速度</div>
                  <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fff', lineHeight: '1' }}>
                      7.8 <span style={{ fontSize: '1rem', fontWeight: '400', color: '#FF6B00' }}>km/s</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>是子弹速度的 10 倍</div>
              </div>
              <div style={{ width: '1px', height: '60px', background: '#333' }}></div>
              <div style={{ flex: 1, paddingLeft: '20px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>小于1cm碎片总量</div>
                  <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fff', lineHeight: '1' }}>
                      1.3 <span style={{ fontSize: '1rem', fontWeight: '400', color: '#5456F0' }}>亿颗</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>笼罩地球的钢铁迷雾</div>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// === 子组件与样式 ===

const BarRow = ({ label, percent, count, color }) => (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}>
        <div style={{ width: '80px', color: '#888' }}>{label}</div>
        <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', margin: '0 10px', overflow: 'hidden' }}>
            <div style={{ width: percent, height: '100%', background: color, borderRadius: '4px' }}></div>
        </div>
        <div style={{ width: '50px', textAlign: 'right', color: '#fff' }}>{count}</div>
    </div>
);

const cardStyle = {
    background: 'rgba(20, 20, 20, 0.6)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
};

const headerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '10px'
};

const titleStyle = {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: 'bold',
    letterSpacing: '1px'
};

const subTitleStyle = {
    margin: 0,
    fontSize: '0.6rem',
    color: '#666',
    letterSpacing: '2px',
    marginTop: '4px',
    textTransform: 'uppercase'
};

const dotStyle = (color) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: color,
    marginTop: '4px',
    boxShadow: `0 0 10px ${color}`
});