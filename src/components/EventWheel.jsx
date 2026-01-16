import React, { useEffect, useRef } from 'react';

// === 🎨 核心配色 ===
const THEME = {
  primary: '#4C42D7', 
  white: '#FFFFFF',
  grey: '#888888',
  dark: '#000000'
};

// === 🔴 数据源 (完整保留) ===
const EVENT_DATA = {
  LEO: [
    { id: 1, title: "Iridium 33 与 Kosmos 2251 相撞", date: "2009.02.10", image: "/images/leo/1.png", desc: "人类航天史上最严重的“交通肇事案”，产生超 2300 块碎片。" },
    { id: 2, title: "风云一号C 反卫星测试", date: "2007.01.11", image: "/images/leo/2.png", desc: "动能拦截弹击毁报废卫星，产生超 3500 个长寿命碎片。" },
    { id: 3, title: "Kosmos 1408 碎片云危机", date: "2021.11.15", image: "/images/leo/3.png", desc: "反卫星导弹测试产生的碎片带直接切入国际空间站轨道。" },
    { id: 4, title: "ISS 机械臂“中弹”", date: "2021.05", image: "/images/leo/4.png", desc: "Canadarm2 机械臂被不明微小物体击穿，留下清晰孔洞。" },
    { id: 5, title: "Starlink 的“拥堵”挑战", date: "ONGOING", image: "/images/leo/5.png", desc: "超大规模星座导致近地轨道拥堵，避碰机动成为常态。" },
    { id: 6, title: "NOAA-16 电池爆炸", date: "2015.11.25", image: "/images/leo/6.png", desc: "退役气象卫星因电池过充发生解体，凸显“钝化”重要性。" },
    { id: 7, title: "哈勃望远镜的“伤痕”", date: "MONITORING", image: "/images/leo/7.png", desc: "电池板上布满微流星体撞击坑，见证了轨道环境的恶化。" },
    { id: 8, title: "天宫空间站紧急避碰", date: "2021.07", image: "/images/leo/8.png", desc: "出于安全考虑，天宫空间站两次对 Starlink 实施紧急避碰。" }
  ],
  MEO: [
    { id: 1, title: "GPS 星座", date: "ACTIVE", image: "/images/meo/1.png", desc: "运行在 20,200km 高度的全球导航基石。" },
    { id: 2, title: "北斗三号", date: "2020", image: "/images/meo/2.png", desc: "中国精度，独创星间链路技术减少地面依赖。" },
    { id: 3, title: "伽利略系统", date: "ACTIVE", image: "/images/meo/3.png", desc: "欧洲民用导航系统，提供更高精度的定位服务。" },
    { id: 4, title: "Telstar 1", date: "1962", image: "/images/meo/4.png", desc: "人类第一颗有源通信卫星，开启跨大西洋直播时代。" },
    { id: 5, title: "范艾伦辐射带", date: "NATURE", image: "/images/meo/5.png", desc: "穿越高能粒子带，卫星需配备极厚的抗辐射屏蔽。" },
    { id: 6, title: "O3b 星座", date: "2013", image: "/images/meo/6.png", desc: "部署在赤道上空的互联网星座，连接另外30亿人。" },
    { id: 7, title: "GLONASS", date: "1982", image: "/images/meo/7.png", desc: "俄罗斯导航系统，采用抗干扰能力极强的频分多址技术。" },
    { id: 8, title: "LAGEOS", date: "1976", image: "/images/meo/8.png", desc: "被动激光测距卫星，预计将在轨道上稳定运行 800 万年。" }
  ],
  GEO: [
    { id: 1, title: "墓地轨道", date: "CONCEPT", image: "/images/geo/1.png", desc: "GEO 卫星寿命结束后的最终归宿，比静止轨道高 300km。" },
    { id: 2, title: "Intelsat 1", date: "1965", image: "/images/geo/2.png", desc: "代号“早鸟”，世界第一颗商用通信卫星。" },
    { id: 3, title: "Galaxy 15", date: "2010", image: "/images/geo/3.png", desc: "失控的“僵尸卫星”，漂移期间干扰了多颗邻近卫星。" },
    { id: 4, title: "TDRS 系统", date: "ACTIVE", image: "/images/geo/4.png", desc: "NASA 的“太空路由器”，为低轨航天器提供数据中继。" },
    { id: 5, title: "AMC-9 解体", date: "2017", image: "/images/geo/5.png", desc: "通信卫星突然解体，产生的碎片长期威胁 GEO 区域。" },
    { id: 6, title: "风云四号", date: "2016", image: "/images/geo/6.png", desc: "凝视地球的眼睛，提供高频次的大气监测数据。" },
    { id: 7, title: "Spaceway-1", date: "2020", image: "/images/geo/7.png", desc: "因电池热失控风险，被紧急推入墓地轨道的救援行动。" },
    { id: 8, title: "同步轨道全景", date: "VIEW", image: "/images/geo/8.png", desc: "相对地球静止，是进行全球通信和气象观测的最佳位置。" }
  ],
  GTO: [
    { id: 1, title: "火箭末级残骸", date: "DEBRIS", image: "/images/gto/1.png", desc: "被遗弃的巨大金属罐体，若未钝化极易发生爆炸。" },
    { id: 2, title: "猎鹰9号二级", date: "SpaceX", image: "/images/gto/2.png", desc: "经常滞留在 GTO，最终因大气阻力重返烧毁。" },
    { id: 3, title: "阿里安5号残骸", date: "ESA", image: "/images/gto/3.png", desc: "历史发射留下的“遗产”，穿越 LEO 和 MEO 区域。" },
    { id: 4, title: "长征火箭末级", date: "CN", image: "/images/gto/4.png", desc: "正在积极实施末级钝化和受控离轨技术。" },
    { id: 5, title: "大椭圆轨道风险", date: "RISK", image: "/images/gto/5.png", desc: "像穿针引线一样每天两次穿越拥挤的低轨和中轨。" },
    { id: 6, title: "远地点发动机", date: "AKM", image: "/images/gto/6.png", desc: "卫星入轨的关键，若点火失败将困在转移轨道。" },
    { id: 7, title: "轨道衰减", date: "DECAY", image: "/images/gto/7.png", desc: "利用稀薄大气阻力自然清除废弃物体的机制。" },
    { id: 8, title: "燃料钝化", date: "SAFETY", image: "/images/gto/8.png", desc: "排空剩余燃料和电力，防止残骸成为太空炸弹。" }
  ],
  SSO: [
    { id: 1, title: "Envisat", date: "2002", image: "/images/sso/1.png", desc: "重达 8 吨的失控环境卫星，SSO 区域最大的潜在威胁。" },
    { id: 2, title: "Landsat", date: "1972", image: "/images/sso/2.png", desc: "连续 50 年记录地球地貌的光学遥感卫星。" },
    { id: 3, title: "哨兵系列", date: "ESA", image: "/images/sso/3.png", desc: "配备自动避碰系统的先进地球观测星座。" },
    { id: 4, title: "极地轨道交汇", date: "ORBIT", image: "/images/sso/4.png", desc: "所有 SSO 卫星都在极地交汇，碰撞风险显著增加。" },
    { id: 5, title: "WorldView", date: "COMMERCIAL", image: "/images/sso/5.png", desc: "提供 Google Maps 级别清晰度的商业遥感卫星。" },
    { id: 6, title: "风云三号", date: "CN", image: "/images/sso/6.png", desc: "极轨气象卫星，提供全球范围的大气探测数据。" },
    { id: 7, title: "CubeSats", date: "TREND", image: "/images/sso/7.png", desc: "大量低成本立方星在此“拼车”发射，管理难度极大。" },
    { id: 8, title: "轨道拥堵", date: "WARNING", image: "/images/sso/8.png", desc: "大家都想争夺稳定的光照条件，导致 SSO 异常拥挤。" }
  ]
};

export default function EventWheel({ currentOrbit }) {
  const events = EVENT_DATA[currentOrbit] || EVENT_DATA['LEO'];
  
  const containerRef = useRef();
  const itemRefs = useRef([]);
  const rotationRef = useRef(0);

  // ⚙️ 核心参数调整：将摩天轮“竖”起来放在左侧
  const RADIUS_X = 650;   // 半径 (水平)
  const RADIUS_Y = 650;   // 半径 (垂直)
  const CENTER_X = -300;  // 🔴 核心修改：圆心向左移，让圆环右侧切入屏幕中央
  
  // 旋转速度 (可以改负数反转方向)
  const ROTATION_SPEED = 0.08; 

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      rotationRef.current += ROTATION_SPEED;
      const currentRotation = rotationRef.current;

      // 动态获取屏幕高度的一半作为垂直中心，保证响应式
      const centerY = window.innerHeight / 2;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;

        const angleStep = 360 / events.length;
        const itemAngleDeg = (currentRotation + index * angleStep) % 360;
        const itemAngleRad = (itemAngleDeg * Math.PI) / 180;

        // 计算坐标
        const x = Math.cos(itemAngleRad) * RADIUS_X;
        const y = Math.sin(itemAngleRad) * RADIUS_Y;

        // 🔴 核心修改：高亮逻辑判断
        // 之前是判断 270度(Top)，现在改为判断 0度/360度 (Right)
        // 计算当前角度距离 0 度 (3点钟方向) 的差距
        // 注意处理 360 度的循环边界
        let dist = Math.abs(itemAngleDeg); 
        if (dist > 180) dist = 360 - dist; // 比如 350度 距离 0度 只有 10度
        
        const isActive = dist < 20; // 激活范围 +/- 20度

        // --- 应用样式 ---
        // 🔴 位移计算：
        // Left: 屏幕左侧基准(0) + 圆心偏移(CENTER_X) + 旋转x
        // Top:  屏幕垂直中心(centerY) + 旋转y
        el.style.transform = `translate3d(calc(${CENTER_X}px + ${x}px), calc(${centerY}px + ${y}px - 50%), 0) scale(${isActive ? 1.0 : 0.65})`;
        
        // 视觉状态
        el.style.opacity = isActive ? 1 : 0.15;
        el.style.filter = isActive ? 'none' : 'blur(5px) grayscale(100%)';
        el.style.zIndex = isActive ? 100 : 1;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [events]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {events.map((event, index) => (
        <div
          key={event.id}
          ref={el => itemRefs.current[index] = el}
          style={{
            position: 'absolute',
            top: 0, left: '50vw', // 初始基准点
            width: '400px', 
            willChange: 'transform',
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', // 改为左对齐，更有HUD感
            textAlign: 'left',
            transition: 'opacity 0.3s, filter 0.3s'
          }}
        >
          {/* --- HUD 风格卡片内容 --- */}
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              {/* 装饰竖线 */}
              <div style={{ 
                width: '4px', height: '60px', 
                background: THEME.primary,
                boxShadow: `0 0 15px ${THEME.primary}` 
              }}></div>

              <div>
                <div style={{ 
                  color: THEME.primary, 
                  fontSize: '12px', 
                  fontWeight: 'bold', 
                  letterSpacing: '2px',
                  fontFamily: '"Lexend", sans-serif'
                }}>
                   EVENT 0{event.id}
                </div>
                <h3 style={{ 
                  color: THEME.white, 
                  fontSize: '28px', 
                  fontWeight: '800', 
                  margin: '4px 0',
                  textTransform: 'uppercase',
                  textShadow: `0 0 20px ${THEME.primary}`,
                  fontFamily: '"Lexend", sans-serif'
                }}>
                  {event.title}
                </h3>
                <div style={{ color: THEME.grey, fontSize: '12px', fontFamily: 'monospace' }}>
                  /// TIMESTAMP: {event.date}
                </div>
              </div>
          </div>

          {/* 图片区 */}
          <div style={{
            width: '320px',
            height: '180px',
            border: `1px solid rgba(76, 66, 215, 0.3)`,
            padding: '4px',
            background: 'rgba(0,0,0,0.5)',
            margin: '20px 0 0 20px' // 稍微缩进
          }}>
             <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => e.target.style.display = 'none'}
                />
                {/* 扫描线覆盖 */}
                <div style={{
                   position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                   background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                   backgroundSize: '100% 2px, 3px 100%',
                   pointerEvents: 'none'
                }}></div>
             </div>
          </div>

          {/* 描述文本 */}
          <div style={{
            background: 'rgba(10, 10, 20, 0.85)',
            borderLeft: `2px solid ${THEME.white}`,
            padding: '15px',
            color: '#ccc',
            fontSize: '13px',
            lineHeight: '1.6',
            backdropFilter: 'blur(4px)',
            maxWidth: '340px',
            margin: '15px 0 0 20px'
          }}>
            {event.desc}
          </div>

        </div>
      ))}
      
      {/* 🔴 辅助视觉：显示那个巨大的圆形轨道 (位于左侧) */}
      <div style={{
          position: 'absolute',
          top: '50%',
          left: `${CENTER_X}px`, // 对应圆心
          transform: 'translate(0, -50%)', // 仅垂直居中，水平由 left 控制
          width: `${RADIUS_X * 2}px`,
          height: `${RADIUS_Y * 2}px`,
          border: '2px dashed rgba(76, 66, 215, 0.15)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
      }}></div>

    </div>
  );
}