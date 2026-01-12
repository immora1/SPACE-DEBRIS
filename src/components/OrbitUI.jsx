import React from 'react';

// --- 数据源：包含轨道信息 + 历史事件 ---
const ORBIT_DATA = {
  LEO: {
    name: "LEO",
    fullName: "Low Earth Orbit",
    range: "160 - 2,000 km",
    desc: "低地球轨道是距离地面最近的区域，也是航天活动最频繁的“黄金地段”。国际空间站、Starlink 星座均位于此，这里也是太空垃圾最密集的重灾区。",
    event: {
      title: "Iridium 33 与 Kosmos 2251 相撞",
      date: "2009年2月10日",
      image: "/textures/collision.jpg",
      desc: (
        <>
          这是历史上首次两颗完整卫星在轨道上发生高速碰撞。美国正在运行的通信卫星 Iridium 33 与俄罗斯报废的军事卫星 Kosmos 2251 相撞。这次事故产生了超过
          <span style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem', margin: '0 4px' }}>2,000</span>
          个大型可追踪碎片，极大地恶化了LEO的太空环境。
        </>
      )
    }
  },
  MEO: {
    name: "MEO",
    fullName: "Medium Earth Orbit",
    range: "2,000 - 35,786 km",
    desc: "中地球轨道位于低轨和静止轨道之间，是全球导航系统的“家”。美国的GPS、中国的北斗、欧洲的伽利略都在此运行，负责为地球提供定位服务。",
    event: {
      title: "伽利略导航卫星发射异常",
      date: "2014年8月22日",
      image: null, 
      desc: (
        <>
          联盟号火箭上面级发生故障，导致两颗伽利略导航卫星被送入错误的椭圆轨道。虽然通过变轨挽救了部分功能，但这起事故凸显了
          <span style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem', margin: '0 4px' }}>MEO</span>
          轨道部署的高风险与复杂性。
        </>
      )
    }
  },
  GEO: {
    name: "GEO",
    fullName: "Geostationary Orbit",
    range: "35,786 km",
    desc: "地球静止轨道非常特殊，卫星在这里绕地飞行的速度与地球自转完全同步，在地面看来就像静止在空中一样，非常适合通信和气象观测。",
    event: {
      title: "Intelsat 29e 推进系统故障",
      date: "2019年4月",
      image: null,
      desc: (
        <>
           波音制造的高通量通信卫星 Intelsat 29e 在
           <span style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem', margin: '0 4px' }}>GEO</span>
           轨道发生推进系统泄漏，随后解体。产生的碎片云对周围宝贵的静止轨道槽位构成了严重威胁。
        </>
      )
    }
  },
  GTO: {
    name: "GTO",
    fullName: "Geostationary Transfer Orbit",
    range: "Transition Orbit",
    desc: "这是一个临时性的椭圆轨道，就像一座“桥梁”。火箭先把卫星送到这里，卫星再通过自身变轨爬升到最终的地球静止轨道 (GEO)。",
    event: {
      title: "阿里安5号火箭末级钝化",
      date: "常态化操作",
      image: null,
      desc: (
        <>
          GTO 充满了废弃的火箭末级。为了防止爆炸产生碎片，现代火箭在任务结束后会进行
          <span style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem', margin: '0 4px' }}>“钝化”</span>
          处理（排空剩余燃料）。未钝化的火箭残骸是该轨道最大的潜在炸弹。
        </>
      )
    }
  },
  SSO: {
    name: "SSO",
    fullName: "Sun-Synchronous Orbit",
    range: "600 - 800 km",
    desc: "太阳同步轨道是低轨的一种特殊形式。卫星经过任何地点时，当地的太阳光照角度都基本相同，这种恒定的光照条件是拍摄地球照片的绝佳位置。",
    event: {
      title: "风云一号C 反卫星导弹测试",
      date: "2007年1月11日",
      image: null,
      desc: (
        <>
          一次反卫星导弹试验击毁了报废的气象卫星风云一号C。这次事件在
          <span style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem', margin: '0 4px' }}>865公里</span>
          的高度产生了超过3,500个可追踪碎片，是历史上规模最大的太空碎片云之一。
        </>
      )
    }
  }
};

export default function OrbitUI({ currentOrbit }) {
  const data = ORBIT_DATA[currentOrbit] || ORBIT_DATA['LEO'];

  return (
    <section style={{
      // 🔴 严格执行你的参数
      width: '60vw',
      height: '110vh',
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end', 
      alignItems: 'center',
      paddingBottom: '30px',
      overflow: 'hidden' 
    }}>
      
      {/* ==========================================================
          1. 底部轨道介绍卡片 (严格执行你的参数)
         ========================================================== */}
      <div style={{
        // 你的参数:
        width: '10vw', 
        maxWidth: '1200px',
        minWidth: '800px', // minWidth 会让它保持足够宽度，覆盖掉 10vw
        height: '120px', 
        
        backgroundImage: 'url(/textures/card_bg.png)', 
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        
        // 你的参数:
        padding: '16px 48px 10px 48px',    
        
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        
        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
        border: 'none',
        borderRadius: '0'
      }}>
        
        {/* 左侧区域 */}
        <div style={{ 
            flex: '0 0 auto', 
            minWidth: '280px', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '12px' 
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h1 style={{ color: '#fff', fontSize: '2.8rem', margin: '0', fontWeight: '900', lineHeight: '1', fontFamily: 'sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                    {data.name}
                </h1>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem', fontWeight: '300', lineHeight: '1', paddingBottom: '5px' }}>
                    —
                </span>
                <h2 style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', margin: '0', fontWeight: '600', fontFamily: 'sans-serif', letterSpacing: '0.5px' }}>
                    {data.fullName}
                </h2>
            </div>

            <div style={{ 
                background: 'rgba(255,255,255,0.2)', 
                backdropFilter: 'blur(4px)',
                padding: '6px 14px',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '0px solid rgba(255,255,255,0.3)' 
            }}>
                <div style={{ width: '6px', height: '6px', background: '#fff', borderRadius: '50%' }}></div>
                <span style={{ fontFamily: 'sans-serif', color: '#fff', fontWeight: 'bold', fontSize: '0.85rem' }}>
                    {data.range}
                </span>
            </div>
        </div>

        {/* 分割线 */}
        <div style={{ width: '2px', height: '60px', background: 'rgba(255,255,255,0.3)' }}></div>

        {/* 右侧描述 */}
        <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
            <p style={{ 
                color: '#fff', 
                lineHeight: '1.6', 
                fontSize: '0.95rem', 
                textAlign: 'justify', 
                margin: 0, 
                fontFamily: 'sans-serif', 
                opacity: 0.95, 
                fontWeight: '400', 
                display: '-webkit-box', 
                WebkitLineClamp: 4, 
                WebkitBoxOrient: 'vertical', 
                overflow: 'hidden' 
            }}>
                {data.desc}
            </p>
        </div>
      </div>

      {/* ==========================================================
          2. 右侧事件知识卡片
         ========================================================== */}
      <div style={{
        position: 'absolute', 
        // 🔴 因为父容器是 60vw，所以这里的 right: 0 意味着卡片会贴在屏幕宽度的 60% 处
        right: '0', 
        top: '50%', 
        transform: 'translateY(-50%)',
        width: '340px', 
        pointerEvents: 'auto',
        zIndex: 10,
        filter: 'drop-shadow(-10px 10px 30px rgba(0,0,0,0.5))' 
      }}>
          
          {/* 卡片头部 */}
          <div style={{
              backgroundColor: '#1A1A1A', 
              borderRadius: '20px 20px 0 0',
              padding: '20px 24px',
              position: 'relative',
              border: '1px solid rgba(255,255,255,0.08)',
              borderBottom: 'none'
          }}>
              <div style={{
                  width: '32px', height: '32px',
                  backgroundColor: '#5456F0',
                  borderRadius: '50%',
                  position: 'absolute', top: '20px', left: '20px',
                  boxShadow: '0 0 15px rgba(84, 86, 240, 0.4)'
              }}></div>
              
              <div style={{ marginLeft: '45px' }}>
                  <h3 style={{
                      color: '#fff', fontSize: '1.1rem', fontWeight: '800',
                      margin: '0 0 5px 0', lineHeight: '1.3', fontFamily: 'sans-serif'
                  }}>
                      {data.event.title}
                  </h3>
                  <span style={{
                      display: 'block', textAlign: 'right',
                      color: '#888', fontSize: '0.8rem', fontWeight: '500', fontFamily: 'sans-serif'
                  }}>
                      {data.event.date}
                  </span>
              </div>

              {/* 波浪线 SVG */}
              <div style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '10px', zIndex: 2 }}>
                 <svg width="100%" height="100%" viewBox="0 0 340 10" preserveAspectRatio="none">
                    <path d="M0,0 Q170,10 340,0" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                </svg>
              </div>
          </div>

          {/* 卡片主体 */}
          <div style={{
              backgroundColor: '#252525', 
              borderRadius: '0 0 20px 20px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: 'none'
          }}>
              <div style={{
                  width: '100%', height: '160px',
                  backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden',
                  marginBottom: '15px'
              }}>
                  {data.event.image ? (
                    <img src={data.event.image} alt="Event" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '0.8rem' }}>
                        NO IMAGE DATA
                    </div>
                  )}
              </div>

              <p style={{
                  color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'justify', margin: 0, fontFamily: 'sans-serif'
              }}>
                  {data.event.desc}
              </p>
          </div>

      </div>

    </section>
  );
}