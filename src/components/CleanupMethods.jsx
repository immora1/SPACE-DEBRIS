import React from 'react';

// === 🎨 配色系统 ===
const THEME = {
  primary: '#4C42D7', 
  white: '#FFFFFF',
  grey: '#888888',
  dark: '#050505',
  cardBg: '#161616', 
};

// === 🛠️ 6大清理方案数据 (已修正为 .png) ===
const METHODS_DATA = [
  {
    id: 1,
    title: "Laser Ablation",
    zhTitle: "激光烧蚀移除",
    desc: "利用地面或轨道上的高能激光束照射碎片表面。激光加热产生的等离子体喷射会产生反冲力，微调碎片轨道，使其降低高度并坠入大气层烧毁。",
    img: "/cleanup/1.png" // 🟢 改为 .png
  },
  {
    id: 2,
    title: "Robotic Arms",
    zhTitle: "机械臂抓取",
    desc: "模仿国际空间站的对接技术。清理卫星接近目标后，伸出高精度机械臂锁定并“抓住”失控卫星（如 ClearSpace-1 任务），随后将其拖入大气层。",
    img: "/cleanup/2.png" // 🟢 改为 .png
  },
  {
    id: 3,
    title: "Space Nets",
    zhTitle: "柔性捕捉网",
    desc: "针对旋转或形状不规则的碎片（如 RemoveDEBRIS 项目）。清理卫星发射一张巨大的高强度网，像捕鱼一样包裹住碎片，无需精确对准接口。",
    img: "/cleanup/3.png" // 🟢 改为 .png
  },
  {
    id: 4,
    title: "Harpoon Capture",
    zhTitle: "飞弹鱼叉",
    desc: "简单粗暴的物理捕获。向碎片发射带有倒钩的钛合金鱼叉，穿透目标的金属外壳。鱼叉连接着缆绳，捕获后将碎片拖离轨道。",
    img: "/cleanup/4.png" // 🟢 改为 .png
  },
  {
    id: 5,
    title: "Electrodynamic Tethers",
    zhTitle: "电动缆索 (EDT)",
    desc: "利用地球磁场的黑科技。卫星释放出一条长达数公里的导电缆索，切割地磁场线产生电流和洛伦兹力（阻力），无需燃料即可让卫星快速减速离轨。",
    img: "/cleanup/5.png" // 🟢 改为 .png
  },
  {
    id: 6,
    title: "Drag Sails",
    zhTitle: "阻力帆",
    desc: "类似航海的风帆。卫星在寿命结束时展开一张巨大的薄膜帆，利用稀薄大气层产生的空气阻力（气动阻力），将原本需要几百年的自然衰减时间缩短至几个月。",
    img: "/cleanup/6.png" // 🟢 改为 .png
  }
];

// === 🔄 翻转卡片组件 ===
const FlipCard = ({ item }) => {
  return (
    <div className="flip-card-container" style={{ 
      perspective: '1000px', 
      width: '100%', 
      height: '320px',
      position: 'relative'
    }}>
      <div 
        className="flip-card-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)', 
          transformStyle: 'preserve-3d',
          cursor: 'pointer'
        }}
      >
        {/* === 正面 (Front) === */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden', 
          background: THEME.cardBg,
          display: 'flex', flexDirection: 'column',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '8px', 
          overflow: 'hidden'
        }}>
          {/* 图片区域 */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <img 
              src={item.img} 
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
              // 如果还是加载失败，控制台会报错，但这里我们先不隐藏它，方便调试
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%', background: 'linear-gradient(to top, #161616 10%, transparent)' }}></div>
          </div>
          {/* 文字区域 */}
          <div style={{ padding: '20px 24px', textAlign: 'left', borderTop: `2px solid ${THEME.primary}`, background: '#161616' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.4rem', fontFamily: 'sans-serif', fontWeight: 'bold' }}>{item.zhTitle}</h3>
            <p style={{ margin: '4px 0 0 0', color: THEME.grey, fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{item.title}</p>
          </div>
        </div>

        {/* === 背面 (Back) === */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden',
          background: '#111', 
          color: 'white',
          transform: 'rotateY(180deg)', 
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          padding: '30px', boxSizing: 'border-box',
          border: `1px solid ${THEME.primary}`,
          borderRadius: '8px'
        }}>
          <h3 style={{ color: THEME.primary, fontSize: '1.2rem', marginBottom: '15px', letterSpacing: '2px' }}>
            TECHNICAL DETAIL
          </h3>
          <div style={{ width: '40px', height: '2px', background: '#fff', marginBottom: '20px' }}></div>
          <p style={{ 
            fontSize: '0.95rem', lineHeight: '1.8', color: '#ddd', textAlign: 'justify',
            fontFamily: 'sans-serif' 
          }}>
            {item.desc}
          </p>
        </div>
      </div>

      <style>{`
        .flip-card-container:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default function CleanupMethods() {
  return (
    <div style={{
      width: '100%', height: '100%', 
      background: THEME.dark,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 8vw', 
      boxSizing: 'border-box'
    }}>
      
      {/* 顶部标题 */}
      <div style={{ marginBottom: '50px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ width: '12px', height: '12px', background: THEME.primary, borderRadius: '50%' }}></div>
        <h2 style={{ margin: 0, color: '#fff', fontSize: '2rem', fontWeight: '900', letterSpacing: '4px' }}>
          清理方案 <span style={{ color: THEME.grey, fontSize: '1rem', fontWeight: '400', marginLeft: '10px' }}>REMEDIATION METHODS</span>
        </h2>
      </div>

      {/* 2行3列 网格布局 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gridGap: '30px', 
        width: '100%'
      }}>
        {METHODS_DATA.map(item => (
          <FlipCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
}