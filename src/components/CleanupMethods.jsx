import React, { useState } from 'react';

// === 🎨 配色系统 ===
const THEME = {
  primary: '#4C42D7', 
  white: '#FFFFFF',
  grey: '#888888',
  dark: '#050505',
  // 卡片背景：极深灰色 + 微透明，提升质感
  cardBg: 'rgba(20, 20, 20, 0.95)', 
};

// === 🛠️ 数据源 (保持不变) ===
const METHODS_DATA = [
  { id: 1, title: "Laser Ablation", zhTitle: "激光烧蚀移除", desc: "利用地面或轨道上的高能激光束照射碎片表面。激光加热产生的等离子体喷射会产生反冲力，微调碎片轨道，使其降低高度并坠入大气层烧毁。", img: "/cleanup/1.png" },
  { id: 2, title: "Robotic Arms", zhTitle: "机械臂抓取", desc: "模仿国际空间站的对接技术。清理卫星接近目标后，伸出高精度机械臂锁定并“抓住”失控卫星（如 ClearSpace-1 任务），随后将其拖入大气层。", img: "/cleanup/2.png" },
  { id: 3, title: "Space Nets", zhTitle: "柔性捕捉网", desc: "针对旋转或形状不规则的碎片（如 RemoveDEBRIS 项目）。清理卫星发射一张巨大的高强度网，像捕鱼一样包裹住碎片，无需精确对准接口。", img: "/cleanup/3.png" },
  { id: 4, title: "Harpoon Capture", zhTitle: "飞弹鱼叉", desc: "简单粗暴的物理捕获。向碎片发射带有倒钩的钛合金鱼叉，穿透目标的金属外壳。鱼叉连接着缆绳，捕获后将碎片拖离轨道。", img: "/cleanup/4.png" },
  { id: 5, title: "Electrodynamic Tethers", zhTitle: "电动缆索 (EDT)", desc: "利用地球磁场的黑科技。卫星释放出一条长达数公里的导电缆索，切割地磁场线产生电流和洛伦兹力（阻力），无需燃料即可让卫星快速减速离轨。", img: "/cleanup/5.png" },
  { id: 6, title: "Drag Sails", zhTitle: "阻力帆", desc: "类似航海的风帆。卫星在寿命结束时展开一张巨大的薄膜帆，利用稀薄大气层产生的空气阻力（气动阻力），将原本需要几百年的自然衰减时间缩短至几个月。", img: "/cleanup/6.png" }
];

// === 🃏 翻转卡片组件 (Legacy 风格) ===
const FlipCard = ({ item }) => {
  const [hover, setHover] = useState(false);

  return (
    <div 
      className="flip-card-container" 
      style={{ perspective: '1000px', width: '100%', height: '360px', position: 'relative' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flip-card-inner" style={{ 
          position: 'relative', width: '100%', height: '100%', 
          transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)', 
          transformStyle: 'preserve-3d', 
          cursor: 'pointer',
          transform: hover ? 'rotateY(180deg)' : 'rotateY(0deg)'
      }}>
        
        {/* === 正面 (Front) === */}
        <div style={{ 
            position: 'absolute', width: '100%', height: '100%', 
            backfaceVisibility: 'hidden', 
            background: THEME.cardBg, 
            display: 'flex', flexDirection: 'column', 
            // 极简边框：平时微弱，悬停变色
            border: `1px solid rgba(255,255,255,0.1)`, 
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          {/* 图片区 */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <img 
                src={item.img} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.backgroundColor = '#111'; }}
            />
            {/* 底部渐变遮罩，保证文字清晰 */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80%', background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}></div>
            
            {/* 正面文字：置于图片底部 */}
            <div style={{ position: 'absolute', bottom: '25px', left: '25px', right: '25px' }}>
                <h3 style={{ margin: 0, color: THEME.white, fontSize: '1.6rem', fontFamily: '"Lexend", sans-serif', fontWeight: '800', letterSpacing: '1px' }}>
                    {item.zhTitle}
                </h3>
                <p style={{ margin: '5px 0 0 0', color: THEME.primary, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700' }}>
                    {item.title}
                </p>
            </div>
          </div>
        </div>

        {/* === 背面 (Back) === */}
        <div style={{ 
            position: 'absolute', width: '100%', height: '100%', 
            backfaceVisibility: 'hidden', 
            background: '#0a0a0a', // 纯黑背景
            color: 'white', 
            transform: 'rotateY(180deg)', 
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
            padding: '40px', 
            boxSizing: 'border-box', 
            border: `1px solid ${THEME.primary}`, // 背面高亮边框
            boxShadow: `0 0 30px ${THEME.primary}40` // 幽幽的蓝光
        }}>
          <h3 style={{ color: THEME.primary, fontSize: '1rem', marginBottom: '20px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
              Technical Detail
          </h3>
          <div style={{ width: '40px', height: '2px', background: '#fff', marginBottom: '25px' }}></div>
          <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.8', 
              color: '#ccc', 
              textAlign: 'justify', 
              fontFamily: 'sans-serif',
              margin: 0
          }}>
              {item.desc}
          </p>
        </div>

      </div>
    </div>
  );
};

export default function CleanupMethods() {
  return (
    <div style={{
      width: '100%', height: '100%', 
      // 🔴 关键 1：背景透明
      background: 'transparent',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 8vw', boxSizing: 'border-box',
      fontFamily: '"Lexend", sans-serif'
    }}>
      
      {/* 🔴 关键 2：标题区域重构 (Orbit Legacy 风格) */}
      <div style={{ width: '100%', textAlign: 'center', marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* 顶部引线 */}
          <div style={{ width: '1px', height: '40px', background: `linear-gradient(to bottom, transparent, ${THEME.primary})`, marginBottom: '20px' }}></div>
          
          <h2 style={{ 
              margin: 0, 
              color: THEME.white, 
              fontSize: 'clamp(2rem, 4vw, 3.5rem)', // 响应式大字号
              fontWeight: '900', // 极粗
              letterSpacing: '0.2em', // 宽间距
              lineHeight: '1.1',
              textTransform: 'uppercase'
          }}>
            CLEANUP <br />
            <span style={{ color: THEME.primary }}>SOLUTIONS</span>
          </h2>
      </div>

      {/* 卡片网格 */}
      <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gridGap: '30px', 
          width: '100%',
          maxWidth: '1400px', // 限制最大宽度，防止在大屏上太散
          margin: '0 auto'    // 居中
      }}>
        {METHODS_DATA.map(item => <FlipCard key={item.id} item={item} />)}
      </div>

    </div>
  );
}