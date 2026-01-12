import React from 'react';

const ORBIT_DATA = {
  LEO: {
    name: "LEO",
    fullName: "Low Earth Orbit",
    range: "160 - 2,000 km",
    desc: "低地球轨道是距离地面最近的区域，也是航天活动最频繁的“黄金地段”。国际空间站、Starlink 星座均位于此，这里也是太空垃圾最密集的重灾区。"
  },
  MEO: {
    name: "MEO",
    fullName: "Medium Earth Orbit",
    range: "2,000 - 35,786 km",
    desc: "中地球轨道位于低轨和静止轨道之间，是全球导航系统的“家”。美国的GPS、中国的北斗、欧洲的伽利略都在此运行，负责为地球提供定位服务。"
  },
  GEO: {
    name: "GEO",
    fullName: "Geostationary Orbit",
    range: "35,786 km",
    desc: "地球静止轨道非常特殊，卫星在这里绕地飞行的速度与地球自转完全同步，在地面看来就像静止在空中一样，非常适合通信和气象观测。"
  },
  GTO: {
    name: "GTO",
    fullName: "Geostationary Transfer Orbit",
    range: "Transition Orbit",
    desc: "这是一个临时性的椭圆轨道，就像一座“桥梁”。火箭先把卫星送到这里，卫星再通过自身变轨爬升到最终的地球静止轨道 (GEO)。"
  },
  SSO: {
    name: "SSO",
    fullName: "Sun-Synchronous Orbit",
    range: "600 - 800 km",
    desc: "太阳同步轨道是低轨的一种特殊形式。卫星经过任何地点时，当地的太阳光照角度都基本相同，这种恒定的光照条件是拍摄地球照片的绝佳位置。"
  }
};

export default function OrbitUI({ currentOrbit }) {
  const data = ORBIT_DATA[currentOrbit] || ORBIT_DATA['LEO'];

  return (
    <section style={{
      // 🔴 严格保留你的参数
      width: '60vw',
      height: '90vh',
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end', 
      alignItems: 'center',
      paddingBottom: '30px' 
    }}>
      
      {/* ==========================================================
          底部轨道介绍卡片 (纯净版，无右侧干扰)
         ========================================================== */}
      <div style={{
        // 🔴 你的参数:
        width: '10vw', 
        maxWidth: '1200px',
        minWidth: '800px',
        height: '120px', 
        
        backgroundImage: 'url(/textures/card_bg.png)', 
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        
        // 🔴 你的参数:
        padding: '16px 48px 10px 48px',    
        
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // 🔴 你的参数:
        gap: '20px',
        
        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
        // 🔴 你的参数:
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
    </section>
  );
}