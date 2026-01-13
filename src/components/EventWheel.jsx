import React, { useState, useEffect, useRef } from 'react';

// 🔴 终极数据源：5大轨道 x 8个事件，全部配置完毕
const EVENT_DATA = {
  // === LEO (低地球轨道) ===
  LEO: [
    { 
      id: 1, title: "Iridium 33 与 Kosmos 2251 相撞", date: "2009年2月10日", image: "/images/leo/1.png", 
      desc: "人类航天史上最严重的“交通肇事案”。美国通信卫星 Iridium 33 与俄罗斯报废军事卫星在 789km 高空以 42,000km/h 的相对速度猛烈对撞，瞬间产生超 2,300 块大型碎片，至今仍笼罩在近地轨道。" 
    },
    { 
      id: 2, title: "风云一号C 反卫星测试", date: "2007年1月11日", image: "/images/leo/2.png", 
      desc: "一次震惊世界的反卫星武器（ASAT）实验。动能拦截弹击毁了报废的气象卫星，产生超 3,500 个碎片。由于高度较高（865km），这些碎片极难自然衰减，预计将滞留数百年。" 
    },
    { 
      id: 3, title: "Kosmos 1408 碎片云危机", date: "2021年11月15日", image: "/images/leo/3.png", 
      desc: "俄罗斯对其报废侦察卫星进行了反卫星导弹测试，产生的碎片带直接切入国际空间站轨道。7 名宇航员被迫穿上舱内航天服，紧急躲入飞船避难长达数小时，随时准备撤离。" 
    },
    { 
      id: 4, title: "ISS 机械臂“中弹”", date: "2021年5月", image: "/images/leo/4.png", 
      desc: "太空中的“隐形子弹”。国际空间站的 Canadarm2 机械臂被不明微小物体击穿，留下清晰孔洞。这再次敲响警钟：即使是毫米级的油漆碎片，在第一宇宙速度下也拥有击穿装甲的恐怖动能。" 
    },
    { 
      id: 5, title: "Starlink 的“拥堵”挑战", date: "常态化挑战", image: "/images/leo/5.png", 
      desc: "随着 SpaceX 部署数千颗星链卫星，近地轨道变得前所未有的拥挤。卫星每周需执行数千次自动变轨以避开碎片。天文学家担忧，这种极其密集的星座可能引发“凯斯勒效应”连锁撞击。" 
    },
    { 
      id: 6, title: "NOAA-16 电池爆炸", date: "2015年11月25日", image: "/images/leo/6.png", 
      desc: "并非所有碎片都来自碰撞。美国退役气象卫星因电池过充或残余燃料压力，突然在轨道上发生解体爆炸。这类“自身解体”是太空碎片增长的第二大来源，凸显了卫星“钝化”处理的重要性。" 
    },
    { 
      id: 7, title: "哈勃望远镜的“伤痕”", date: "持续监测中", image: "/images/leo/7.png", 
      desc: "哈勃望远镜在太空中“裸奔”了30多年。其巨大的太阳能电池板上布满了微流星体和太空垃圾撞击的凹坑。每一次维修任务带回的部件上，科学家都能找到成百上千个微小撞击痕迹。" 
    },
    { 
      id: 8, title: "天宫空间站紧急避碰", date: "2021年7月 & 10月", image: "/images/leo/8.png", 
      desc: "SpaceX 的星链卫星两次逼近中国空间站，出于安全考虑，天宫空间站实施了两次紧急避碰机动。这一事件引发了关于太空交通规则及大型商业星座责任归属的激烈国际讨论。" 
    }
  ],

  // === MEO (中地球轨道) ===
  MEO: [
    { 
      id: 1, title: "GPS 星座：导航基石", date: "持续运行中", image: "/images/meo/1.png", 
      desc: "MEO 是全球卫星导航系统（GNSS）的家园。美国 GPS 星座运行在约 20,200km 高度，为全球提供授时与定位服务。这些卫星也是 MEO 轨道上数量最大的航天器群体之一。" 
    },
    { 
      id: 2, title: "北斗三号：中国精度", date: "2020年组网完成", image: "/images/meo/2.png", 
      desc: "中国北斗卫星导航系统的主体部分部署在 MEO 轨道。通过独特的“星间链路”技术，北斗卫星之间可以相互通信，大大减少了对地面站的依赖，提升了系统的生存能力和精度。" 
    },
    { 
      id: 3, title: "伽利略系统：欧洲民用", date: "持续建设中", image: "/images/meo/3.png", 
      desc: "欧洲的伽利略系统是全球唯一专为民用设计的导航系统。它运行在倾角较大的 MEO 轨道上，旨在提供比 GPS 更高精度的定位服务，特别是在高纬度地区。" 
    },
    { 
      id: 4, title: "Telstar 1：通信先驱", date: "1962年7月10日", image: "/images/meo/4.png", 
      desc: "虽然寿命不长，但 Telstar 1 是人类第一颗有源通信卫星。它运行在一个大椭圆轨道（部分处于 MEO），首次实现了跨大西洋的电视信号直播，开启了卫星通信时代。" 
    },
    { 
      id: 5, title: "范艾伦辐射带", date: "自然环境", image: "/images/meo/5.png", 
      desc: "MEO 轨道穿越地球著名的范艾伦辐射带。这里充满了被地球磁场捕获的高能带电粒子。在这里运行的卫星必须配备加厚的铝制屏蔽层和抗辐射电子元件，否则芯片会瞬间被粒子击穿。" 
    },
    { 
      id: 6, title: "O3b 星座：连接另外30亿人", date: "2013年首发", image: "/images/meo/6.png", 
      desc: "O3b (Other 3 Billion) 是部署在赤道上空 8,000km 的通信星座，旨在为全球缺乏光纤覆盖的地区提供高速互联网。它展示了 MEO 轨道在低延迟通信方面的巨大潜力。" 
    },
    { 
      id: 7, title: "GLONASS：俄式坚韧", date: "1982年首发", image: "/images/meo/7.png", 
      desc: "俄罗斯的格洛纳斯系统经历了苏联解体后的衰落与重生。它是除了 GPS 外第二个实现全球覆盖的导航系统，其卫星采用了频分多址（FDMA）技术，具有极强的抗干扰能力。" 
    },
    { 
      id: 8, title: "LAGEOS：永恒的时间胶囊", date: "1976年发射", image: "/images/meo/8.png", 
      desc: "LAGEOS 是一颗完全被动的卫星，外表像一个巨大的高尔夫球，布满反射棱镜。它主要用于激光测距以研究板块构造。科学家预测它将在轨道上稳定运行 800 万年，成为人类文明的遥远见证。" 
    }
  ],

  // === GEO (地球静止轨道) ===
  GEO: [
    { 
      id: 1, title: "墓地轨道：卫星的归宿", date: "轨道概念", image: "/images/geo/1.png", 
      desc: "GEO 轨道资源极其宝贵。根据国际规定，GEO 卫星在燃料耗尽前，必须启动最后一次点火，将自己推送到比 GEO 高 300km 的“墓地轨道”，把黄金位置让给新卫星，避免产生碰撞风险。" 
    },
    { 
      id: 2, title: "Intelsat 1：早鸟起飞", date: "1965年4月6日", image: "/images/geo/2.png", 
      desc: "代号“早鸟”，这是世界上第一颗商用通信卫星。它定点在大西洋上空，虽然带宽极小（只能传输 240 路电话或 1 路电视），但它证明了克拉克“地球同步轨道通信”理论的可行性。" 
    },
    { 
      id: 3, title: "Galaxy 15：僵尸卫星", date: "2010年4月", image: "/images/geo/3.png", 
      desc: "这颗卫星因太阳风暴导致控制系统死机，但通信载荷却依然在工作。它像一个失控的“僵尸”，漂离了轨道，沿途干扰了多颗邻近卫星的信号，直到 8 个月后电池耗尽才恢复控制。" 
    },
    { 
      id: 4, title: "TDRS：太空数据中继", date: "持续运行", image: "/images/geo/4.png", 
      desc: "TDRS 系统是美国宇航局的“太空路由器”。这些位于 GEO 的巨大卫星负责在低轨航天器（如哈勃、国际空间站）和地面站之间中继数据，消除了通信盲区。" 
    },
    { 
      id: 5, title: "AMC-9：解体异常", date: "2017年6月17日", image: "/images/geo/5.png", 
      desc: "这颗通信卫星在轨道上突然发生异常，导致姿态失控并最终解体。望远镜观测到其周围出现了多个碎片。这类 GEO 轨道上的解体事件极为罕见且危险，因为碎片会长期威胁该区域。" 
    },
    { 
      id: 6, title: "风云四号：凝视地球", date: "2016年首发", image: "/images/geo/6.png", 
      desc: "中国新一代静止轨道气象卫星。它能以极高的时间分辨率（每分钟）对特定区域进行扫描，像一只不知疲倦的眼睛，实时监测台风、雷暴等剧烈天气系统的演变。" 
    },
    { 
      id: 7, title: "Spaceway-1：电池危机", date: "2020年2月", image: "/images/geo/7.png", 
      desc: "由于检测到电池存在重大热失控风险，DirecTV 公司不得不紧急决定将这颗卫星推入墓地轨道。为了赶时间，他们甚至向 FCC 申请豁免了排空所有燃料的规定，这是一次与爆炸风险赛跑的救援。" 
    },
    { 
      id: 8, title: "同步轨道全景", date: "独特视角", image: "/images/geo/8.png", 
      desc: "从 GEO 轨道看地球，地球占据了视野的 1/3。因为卫星与地球自转同步，地球看起来是静止不动的，只有云层在变幻。这里是进行全球持续通信和全盘气象观测的最佳位置。" 
    }
  ],

  // === GTO (地球同步转移轨道) ===
  GTO: [
    { 
      id: 1, title: "火箭末级：被遗忘的巨兽", date: "常见碎片", image: "/images/gto/1.png", 
      desc: "GTO 是火箭残骸的高发区。将卫星送入预定轨道后，火箭的末级往往会被遗弃在这里。这些长达数米、重达数吨的金属罐体如果未进行钝化处理，极易发生爆炸，成为太空垃圾的主要来源。" 
    },
    { 
      id: 2, title: "猎鹰9号二级", date: "SpaceX", image: "/images/gto/2.png", 
      desc: "虽然 SpaceX 的一级火箭可以回收，但其二级火箭通常会被遗弃在 GTO 或其它轨道上。这些巨大的残骸会在轨道上停留数月到数年，最终因大气阻力在近地点重返大气层烧毁。" 
    },
    { 
      id: 3, title: "阿里安5号残骸", date: "欧洲航天局", image: "/images/gto/3.png", 
      desc: "作为 GEO 卫星发射的主力，阿里安火箭在 GTO 留下了大量末级残骸。虽然现代火箭都具备离轨能力，但历史发射留下的“遗产”依然在轨道上游荡，穿越 LEO 和 MEO 区域。" 
    },
    { 
      id: 4, title: "长征火箭末级", date: "中国航天", image: "/images/gto/4.png", 
      desc: "中国长征系列火箭在执行高轨任务时，其末级也会进入 GTO。近年来，中国开始积极实施末级钝化和受控离轨技术，以减少这类大型太空垃圾的产生。" 
    },
    { 
      id: 5, title: "大椭圆轨道风险", date: "轨道特性", image: "/images/gto/5.png", 
      desc: "GTO 是一个极度扁平的椭圆轨道，近地点仅几百公里（LEO），远地点达 36,000公里（GEO）。这意味着 GTO 上的物体会像穿针引线一样，每天两次穿越拥挤的低轨和中轨区域，碰撞风险极大。" 
    },
    { 
      id: 6, title: "远地点发动机 (AKM)", date: "关键变轨", image: "/images/gto/6.png", 
      desc: "卫星进入 GTO 只是第一步。到达远地点时，卫星必须启动自身的“远地点发动机”进行点火，将轨道从椭圆变成正圆，从而进入 GEO。如果点火失败，卫星将困在 GTO 无法使用。" 
    },
    { 
      id: 7, title: "轨道衰减", date: "自然净化", image: "/images/gto/7.png", 
      desc: "GTO 的唯一“好处”是其近地点很低，会受到稀薄大气的阻力。随着时间推移，废弃物体的轨道会越来越低，最终在几年或几十年后自然坠入大气层烧毁，这是一种天然的太空清洁机制。" 
    },
    { 
      id: 8, title: "燃料钝化", date: "防爆措施", image: "/images/gto/8.png", 
      desc: "为了防止废弃的火箭末级爆炸，现代火箭在任务结束后会执行“钝化”程序：排空剩余的燃料和高压气体，耗尽电池电量。这让它变成一块死寂的金属，而不是一颗随时可能爆炸的炸弹。" 
    }
  ],

  // === SSO (太阳同步轨道) ===
  SSO: [
    { 
      id: 1, title: "Envisat：环境监测巨无霸", date: "2002-2012", image: "/images/sso/1.png", 
      desc: "欧空局的 Envisat 曾是最大的对地观测卫星，重达 8 吨。2012 年它突然失联，现在成为 LEO/SSO 区域最危险的太空垃圾之一。如果它与其他碎片相撞，将产生数以万计的新碎片。" 
    },
    { 
      id: 2, title: "Landsat：记录地球变迁", date: "1972年至今", image: "/images/sso/2.png", 
      desc: "美国 Landsat 系列卫星运行在 SSO，已经连续 50 年记录地球地貌。由于需要保持光照条件一致以进行对比，SSO 是这类光学遥感卫星的唯一选择，这也导致该轨道极其拥挤。" 
    },
    { 
      id: 3, title: "哨兵系列：欧洲之眼", date: "哥白尼计划", image: "/images/sso/3.png", 
      desc: "欧洲的“哨兵”系列卫星是目前最先进的地球观测星座之一。它们成对运行在 SSO，提供全天候的雷达和光学成像。为避免碰撞，它们配备了自动化的避碰机动系统。" 
    },
    { 
      id: 4, title: "极地轨道交汇", date: "轨道特性", image: "/images/sso/4.png", 
      desc: "SSO 是一种特殊的极地轨道。所有 SSO 卫星每次绕地飞行都会经过南北极上空。这导致地球两极上空成为卫星航路最密集的“十字路口”，碰撞风险在极区显著增加。" 
    },
    { 
      id: 5, title: "WorldView：高清视界", date: "商业遥感", image: "/images/sso/5.png", 
      desc: "Maxar 公司的 WorldView 卫星运行在 SSO，提供分辨率高达 30cm 的商业卫星地图。我们在 Google Maps 上看到的清晰卫星图，很多都来自运行在这条轨道上的商业卫星。" 
    },
    { 
      id: 6, title: "风云三号：极轨气象", date: "中国气象", image: "/images/sso/6.png", 
      desc: "与静止轨道的风云四号不同，风云三号运行在 SSO，可以飞越全球所有地区（包括极地），提供全球范围的大气探测数据，是全球数值天气预报的重要数据源。" 
    },
    { 
      id: 7, title: "CubeSats：立方星热潮", date: "新航天时代", image: "/images/sso/7.png", 
      desc: "由于 SSO 发射机会多（许多大卫星都去这），大量微小的“立方星”选择在这里“拼车”发射。虽然降低了门槛，但大量无变轨能力的立方星也让 SSO 轨道的交通管理变得噩梦般困难。" 
    },
    { 
      id: 8, title: "轨道拥堵", date: "资源枯竭", image: "/images/sso/8.png", 
      desc: "SSO 的高度范围很窄（通常在 600-800km）。由于大家都想在这个能获得稳定光照的“黄金地段”占座，这里的空间碎片密度仅次于赤道低轨。清理 SSO 上的大质量碎片是当务之急。" 
    }
  ]
};

export default function EventWheel({ currentOrbit }) {
  const events = EVENT_DATA[currentOrbit] || EVENT_DATA['LEO'];
  
  const [rotation, setRotation] = useState(0);
  const requestRef = useRef();

  const animate = () => {
    setRotation(prev => (prev + 0.015) % 360); 
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const RADIUS = 850;   
  const CENTER_Y = 90; // 保持下沉设计

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, 
      width: '60vw', 
      height: '60%', 
      pointerEvents: 'none',
      overflow: 'visible',
      zIndex: 0
    }}>
      {events.map((event, index) => {
        const angleDeg = rotation + (index * (360 / events.length));
        const angleRad = (angleDeg * Math.PI) / 180;
        
        const x = Math.cos(angleRad) * RADIUS;
        const y = Math.sin(angleRad) * RADIUS;

        return (
          <div key={event.id} style={{
            position: 'absolute',
            left: `calc(50% + ${x}px)`,
            top: `calc(${CENTER_Y}% + ${y}px)`,
            transform: 'translate(-50%, -50%)', 
            width: '480px', 
            pointerEvents: 'auto', 
            transition: 'top 0.1s linear, left 0.1s linear'
          }}>
            <div style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.9))', transition: 'transform 0.3s' }}>
                
                {/* 标题部分 */}
                <div style={{ backgroundColor: '#1A1A1A', borderRadius: '20px 20px 0 0', padding: '20px 28px', position: 'relative', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#5456F0', borderRadius: '50%', position: 'absolute', top: '24px', left: '24px', boxShadow: '0 0 15px #5456F0' }}></div>
                    <div style={{ marginLeft: '32px' }}>
                        <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '800', margin: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.title}</h3>
                        <span style={{ color: '#888', fontSize: '0.9rem', fontWeight: '500', display: 'block', marginTop: '6px' }}>{event.date}</span>
                    </div>
                </div>

                {/* 内容部分 */}
                <div style={{ backgroundColor: '#222', borderRadius: '0 0 20px 20px', padding: '28px', border: '1px solid rgba(255,255,255,0.08)', borderTop: 'none' }}>
                    
                    {/* 图片容器 */}
                    <div style={{ 
                        width: '100%', 
                        height: '200px', 
                        backgroundColor: '#333',
                        borderRadius: '12px', 
                        overflow: 'hidden', 
                        marginBottom: '24px', 
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <img 
                           src={event.image} 
                           alt={event.title}
                           style={{ 
                               width: '100%', 
                               height: '100%', 
                               objectFit: 'cover',
                               filter: 'grayscale(100%) contrast(1.2)' 
                           }}
                           onError={(e) => {
                               e.target.style.display = 'none'; 
                           }}
                        />
                        <div style={{ position: 'absolute', zIndex: -1, color: '#666', fontSize: '0.8rem' }}>
                            LOADING / ERROR
                        </div>
                        
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9)', pointerEvents: 'none' }}></div>
                    </div>
                    
                    <p style={{ color: '#d0d0d0', fontSize: '0.9rem', lineHeight: '1.8', margin: 0, textAlign: 'justify', letterSpacing: '0.6px' }}>
                        {event.desc}
                    </p>
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}