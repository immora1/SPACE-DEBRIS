import React, { useState, useEffect, useRef } from 'react';

// 🔴 数据源：已修改为 .png 后缀，匹配你的文件名
const EVENT_DATA = {
  LEO: [
    { 
      id: 1, 
      title: "Iridium 33 与 Kosmos 2251 相撞", 
      date: "2009年2月10日", 
      image: "/images/leo/1.png", // 改为 png
      desc: "这是人类航天史上最严重的“交通肇事案”。美国正在运行的通信卫星 Iridium 33 与俄罗斯报废多年的军事卫星在西伯利亚上空 789km 处，以每小时 42,000 公里的相对速度发生猛烈碰撞。这次撞击瞬间产生了超过 2,300 块可追踪的大型碎片，形成的碎片云至今仍笼罩在近地轨道，是凯斯勒现象的典型预演。" 
    },
    { 
      id: 2, 
      title: "风云一号C 反卫星导弹测试", 
      date: "2007年1月11日", 
      image: "/images/leo/2.png", // 改为 png
      desc: "一次震惊世界的反卫星武器（ASAT）实验。一枚动能拦截弹精准击毁了位于 865km 高度的报废气象卫星风云一号C。由于爆炸高度极高，大气阻力微乎其微，这次事件产生了超过 3,500 个碎片，且极难自然衰减。这团“长寿”的碎片云预计将在轨道上停留数十年甚至上百年，持续威胁过往航天器。" 
    },
    { 
      id: 3, 
      title: "Kosmos 1408 碎片云危机", 
      date: "2021年11月15日", 
      image: "/images/leo/3.png", // 改为 png
      desc: "俄罗斯对其报废侦察卫星 Kosmos 1408 进行了反卫星导弹测试。爆炸产生的 1,500 多块碎片形成了一条致命的“碎片带”。当这条碎片带扫过国际空间站（ISS）轨道时，空间站处于极度危险中，7 名宇航员被迫穿上舱内航天服，紧急躲入飞船返回舱内避难长达数小时，随时准备撤离地球。" 
    },
    { 
      id: 4, 
      title: "ISS 机械臂“中弹”", 
      date: "2021年5月", 
      image: "/images/leo/4.png", // 改为 png
      desc: "太空中的“隐形子弹”防不胜防。在一次例行检查中，加拿大航天局发现国际空间站的 Canadarm2 机械臂被不明物体击穿，留下了一个明显的孔洞。罪魁祸首可能只是一块油漆碎片或微小金属屑。虽然机械臂依然能工作，但这起事故再次敲响警钟：即使是毫米级的微小碎片，在第一宇宙速度下也拥有击穿金属装甲的恐怖动能。" 
    },
    { 
      id: 5, 
      title: "Starlink 的“自动驾驶”困境", 
      date: "常态化挑战", 
      image: "/images/leo/5.png", // 改为 png
      desc: "随着 SpaceX 部署数千颗 Starlink 卫星，近地轨道变得前所未有的拥挤。为了避免碰撞，Starlink 卫星配备了自动避碰系统。据统计，该星座每周需要执行数千次自动变轨操作。天文学家和安全专家担忧，如果有卫星系统失灵，这种极其密集的星座可能会引发连锁碰撞反应，彻底锁死低轨空间。" 
    },
    { 
      id: 6, 
      title: "NOAA-16 电池爆炸之谜", 
      date: "2015年11月25日", 
      image: "/images/leo/6.png", // 改为 png
      desc: "并非所有碎片都来自碰撞。美国退役气象卫星 NOAA-16 在没有任何预警的情况下突然在轨道上解体。调查推测，是因为卫星退役时未能完全排空剩余燃料或电池过充，导致内部发生爆炸。这类“自身解体”事件是目前太空碎片增长的第二大来源，强调了卫星“钝化”处理（即排空能量）的重要性。" 
    },
    { 
      id: 7, 
      title: "哈勃望远镜的“伤痕”", 
      date: "持续监测中", 
      image: "/images/leo/7.png", // 改为 png
      desc: "哈勃太空望远镜已经在太空中裸奔了 30 多年。由于没有大气层保护，它的巨大太阳能电池板上布满了微流星体和太空垃圾撞击留下的凹坑和孔洞。每一次维修任务带回的部件上，科学家都能找到成百上千个微小撞击痕迹。这位人类的“太空之眼”，实际上正时刻处于枪林弹雨的威胁之中。" 
    },
    { 
      id: 8, 
      title: "天宫空间站紧急避碰", 
      date: "2021年7月 & 10月", 
      image: "/images/leo/8.png", // 改为 png
      desc: "中国常驻联合国外交团照会联合国秘书长，通报了两次危险接近事件。SpaceX 的 Starlink-1095 和 Starlink-2305 卫星先后逼近中国空间站。出于安全考虑，天宫空间站组合体实施了两次“紧急避碰”机动。这一事件引发了关于太空交通规则以及大型商业星座责任归属的激烈国际讨论。" 
    }
  ],

  // 这里的图片暂时复用 LEO 的 png 图片
  MEO: [
    { id: 1, title: "导航星座的拥堵", date: "MEO 轨道特性", image: "/images/leo/5.png", desc: "MEO（中地球轨道）是 GPS、北斗、伽利略等导航卫星的家园。虽然这里不像 LEO 那么拥挤，但失效的导航卫星和火箭上面级如果处理不当，将长期占据宝贵的轨道资源。导航卫星的精准运行依赖于纯净的轨道环境。" }
  ],
  GEO: [
    { id: 1, title: "静止轨道的墓地", date: "GEO 轨道特性", image: "/images/leo/1.png", desc: "GEO（地球静止轨道）是通信和气象卫星的黄金地段。这里的卫星退役后，不能像低轨卫星那样坠入大气层烧毁，而是被推送到比 GEO 高 300 公里的“墓地轨道”。那里漂浮着数千颗死去的人造卫星，像是一片寂静的钢铁坟场。" }
  ],
  GTO: [
    { id: 1, title: "火箭残骸的高发区", date: "GTO 轨道特性", image: "/images/leo/2.png", desc: "GTO（地球同步转移轨道）是连接低轨和高轨的桥梁。这里充满了火箭的末级残骸。这些巨大的金属罐体如果未进行“钝化”处理（排空剩余燃料），极易在太空中因电池短路或燃料压力过大而发生猛烈爆炸，瞬间产生成千上万的碎片。" }
  ],
  SSO: [
    { id: 1, title: "极轨上的拥挤路口", date: "SSO 轨道特性", image: "/images/leo/3.png", desc: "SSO（太阳同步轨道）深受地球观测卫星喜爱，因为它们可以每天在同一时间飞过同一地点。但这也意味着大家都在“抢路”。这里汇集了大量的气象、侦察和科研卫星，也是除了 LEO 之外碎片密度最高的区域之一。" }
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
  const CENTER_Y = 50; 

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, 
      width: '60vw', 
      height: '100%', 
      pointerEvents: 'none',
      overflow: 'visible',
      zIndex: 15 
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