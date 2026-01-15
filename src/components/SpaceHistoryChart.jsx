import React, { useState, useMemo, useRef } from 'react';

// === 🎨 核心配色 ===
const THEME = {
  primary: '#4C42D7', 
  white: '#FFFFFF',
  grey: '#888888',
  dark: '#050505',
};

// === 1. 核心数据源 ===
const EVENTS = [
  { id: 1, year: 1957, duration: 5, severity: 15, title: "Sputnik 1 发射", desc: "人类航天时代的开端。运载火箭末级成为首个大型太空垃圾。" },
  { id: 2, year: 1958, duration: 25, severity: 20, title: "Vanguard 1", desc: "目前在轨最古老的人造物体，预计停留600年。" },
  { id: 3, year: 1961, duration: 15, severity: 45, title: "Thor-Ablestar 爆炸", desc: "首次火箭末级爆炸，产生296块碎片。" },
  { id: 4, year: 1963, duration: 20, severity: 50, title: "West Ford 针计划", desc: "4.8亿根铜针散布实验，至今仍有针团残留。" },
  { id: 5, year: 1965, duration: 5, severity: 25, title: "Gemini 4 手套", desc: "首例EVA遗失物，第一件操作性任务碎片。" },
  { id: 6, year: 1968, duration: 10, severity: 55, title: "Cosmos 249 ASAT", desc: "苏联早期反卫星拦截测试，自爆产生碎片云。" },
  { id: 30, year: 1973, duration: 15, severity: 60, title: "NOAA-3 Delta 爆炸", desc: "Delta火箭第二级爆炸，推动钝化标准制定。" },
  { id: 32, year: 1978, duration: 8, severity: 85, title: "Cosmos 954 坠落", desc: "核动力卫星失控再入，放射性碎片散落加拿大。" },
  { id: 8, year: 1981, duration: 15, severity: 65, title: "Cosmos 1275 解体", desc: "疑似首起由微小碎片撞击导致的卫星解体。" },
  { id: 9, year: 1985, duration: 10, severity: 75, title: "Solwind ASAT 测试", desc: "F-15导弹击毁P78-1卫星，产生285块碎片。" },
  { id: 10, year: 1986, duration: 20, severity: 70, title: "SPOT 1 Ariane 爆炸", desc: "阿丽亚娜1号火箭爆炸，产生近500块碎片。" },
  { id: 12, year: 1996, duration: 12, severity: 85, title: "Cerise 卫星碰撞", desc: "法国卫星被10年前的火箭碎片撞断，首例证实碰撞。" },
  { id: 13, year: 1996, duration: 15, severity: 80, title: "Pegasus Step-2", desc: "飞马座火箭解体，释放超过700块碎片。" },
  { id: 16, year: 2003, duration: 8, severity: 60, title: "Columbia 事故", desc: "哥伦比亚号返航解体，引发安全审查。" },
  { id: 18, year: 2007, duration: 35, severity: 100, title: "风云一号C ASAT", desc: "反卫星测试产生3500+碎片，极大恶化LEO环境。" },
  { id: 20, year: 2009, duration: 30, severity: 95, title: "Iridium-Cosmos", desc: "两颗完整卫星高速对撞，产生2000多块大型碎片。" },
  { id: 21, year: 2012, duration: 12, severity: 80, title: "Briz-M 上面级爆炸", desc: "质子号上面级解体，威胁GEO轨道资源。" },
  { id: 24, year: 2019, duration: 8, severity: 75, title: "印度 Shakti ASAT", desc: "印度反卫星测试，产生400多块碎片。" },
  { id: 26, year: 2021, duration: 20, severity: 95, title: "Kosmos 1408 ASAT", desc: "俄反卫星测试，碎片云威胁国际空间站。" },
  { id: 27, year: 2021, duration: 15, severity: 85, title: "云海一号02星 碰撞", desc: "被俄罗斯火箭碎片击中解体。" },
  { id: 29, year: 2024, duration: 15, severity: 85, title: "Intelsat 33e 解体", desc: "波音通信卫星在GEO轨道突然解体，产生大量碎片。" }
];

// 曲线数据
const SEVERITY_POINTS = [
    { year: 1957, val: 5 },  { year: 1961, val: 45 }, { year: 1965, val: 15 }, 
    { year: 1973, val: 65 }, { year: 1978, val: 80 }, { year: 1981, val: 40 }, 
    { year: 1986, val: 75 }, { year: 1992, val: 30 }, { year: 1996, val: 90 }, 
    { year: 2000, val: 50 }, { year: 2007, val: 100 }, { year: 2009, val: 95 }, 
    { year: 2015, val: 60 }, { year: 2021, val: 98 }, { year: 2025, val: 85 }
];

export default function SpaceHistoryChart() {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredCurve, setHoveredCurve] = useState(null); 
  const svgRef = useRef(null);

  // 尺寸定义
  const width = 1600; 
  const height = 800;
  const centerY = 450; 
  
  const startYear = 1957;
  const endYear = 2025; 
  const yearRange = endYear - startYear;
  
  // 调整内部绘图边距
  const paddingLeft = 50; 
  const availableWidth = width - 100; 
  const pxPerYear = availableWidth / yearRange;

  const getX = (year) => paddingLeft + (year - startYear) * pxPerYear;
  const getY = (val) => centerY - val * 3.0; 

  const curvePath = useMemo(() => {
    const startX = 0;
    const firstPointY = getY(SEVERITY_POINTS[0].val);
    let d = `M ${startX} ${firstPointY} L ${getX(SEVERITY_POINTS[0].year)} ${firstPointY}`;

    for (let i = 1; i < SEVERITY_POINTS.length; i++) {
        const curr = SEVERITY_POINTS[i];
        const prev = SEVERITY_POINTS[i-1];
        const x = getX(curr.year);
        const y = getY(curr.val);
        const prevX = getX(prev.year);
        const prevY = getY(prev.val);
        const c1x = prevX + (x - prevX) * 0.5;
        const c1y = prevY;
        const c2x = prevX + (x - prevX) * 0.5;
        const c2y = y;
        d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x} ${y}`;
    }
    const lastPointY = getY(SEVERITY_POINTS[SEVERITY_POINTS.length-1].val);
    d += ` L ${width} ${lastPointY}`;
    return d;
  }, []);

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    
    let estimatedYear = startYear + (mouseX - paddingLeft) / pxPerYear;
    estimatedYear = Math.max(startYear, Math.min(endYear, estimatedYear)); 
    
    let p1 = SEVERITY_POINTS[0];
    let p2 = SEVERITY_POINTS[SEVERITY_POINTS.length - 1];
    
    for (let i = 0; i < SEVERITY_POINTS.length - 1; i++) {
        if (estimatedYear >= SEVERITY_POINTS[i].year && estimatedYear <= SEVERITY_POINTS[i+1].year) {
            p1 = SEVERITY_POINTS[i];
            p2 = SEVERITY_POINTS[i+1];
            break;
        }
    }
    
    const t = (estimatedYear - p1.year) / (p2.year - p1.year);
    const smoothT = (1 - Math.cos(t * Math.PI)) / 2; 
    const interpolatedVal = p1.val + (p2.val - p1.val) * smoothT;
    
    const targetX = getX(estimatedYear);
    const targetY = getY(interpolatedVal);

    if (Math.abs(mouseY - targetY) < 150 && mouseY < centerY + 100) { 
        setHoveredCurve({
            x: targetX,
            y: targetY,
            year: Math.round(estimatedYear * 10) / 10,
            val: Math.round(interpolatedVal)
        });
    } else {
        setHoveredCurve(null);
    }
  };

  const handleSvgLeave = () => { setHoveredCurve(null); };

  return (
    <div style={{ 
        width: '100%', 
        height: '100%', 
        // 🔴 关键修改 1：背景改为透明，让 3D 碎片透出来
        background: 'transparent',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative', 
        overflow: 'hidden',
        padding: '0 10vw',
        boxSizing: 'border-box'
    }}>

      {/* 图片覆盖层 (保留叠加效果) */}
      <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '115%', 
          zIndex: 20,
          pointerEvents: 'none',
          mixBlendMode: 'screen', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
      }}>
        <img 
            src="/images/chart_bg.png" 
            alt="background"
            style={{ 
                width: '85%', 
                height: 'auto', 
                objectFit: 'contain',
                opacity: 0.8 
            }}
        />
      </div>
      
      {/* 顶部连接线 */}
      <div style={{ 
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '1px', height: '100px', zIndex: 5,
          background: `linear-gradient(to bottom, ${THEME.primary}, transparent)` 
      }}></div>

      {/* 标题区域 */}
      <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px', position: 'relative', zIndex: 30 }}>
          <h2 style={{ 
              color: THEME.white, 
              fontSize: '3rem', 
              fontWeight: '900', 
              letterSpacing: '8px',
              margin: 0,
              fontFamily: '"Lexend", sans-serif',
              textTransform: 'uppercase'
          }}>
            Orbital <span style={{ color: THEME.primary }}>History</span>
          </h2>
          <p style={{ 
              color: THEME.grey, 
              fontSize: '0.9rem', 
              marginTop: '10px', 
              letterSpacing: '4px', 
              textTransform: 'uppercase',
              fontFamily: '"Lexend", sans-serif'
          }}>
              Timeline of Impact (1957-2025)
          </p>
      </div>

      {/* SVG 图表层 */}
      {/* 🔴 关键修改 2：限制图表最大高度 (maxHeight)，防止把标题顶出屏幕 */}
      <svg 
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`} 
        style={{ 
            width: '100%', 
            // 限制高度不超过视窗的 60%，保证上下都有空间
            maxHeight: '60vh', 
            height: 'auto', 
            overflow: 'visible', 
            position: 'relative', 
            zIndex: 10 
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleSvgLeave}
      >
        <defs>
             <linearGradient id="curveFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={THEME.primary} stopOpacity="0.2" /> 
                <stop offset="100%" stopColor={THEME.dark} stopOpacity="0" />    
            </linearGradient>
             <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>

        <path 
            d={`${curvePath} L ${width} ${centerY} L 0 ${centerY} Z`} 
            fill="url(#curveFill)" 
            stroke="none" 
        />

        <path 
            d={curvePath} 
            fill="none" 
            stroke={THEME.white} 
            strokeWidth="2" 
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}
        />

        <path d={curvePath} fill="none" stroke="transparent" strokeWidth="100" />

        {hoveredCurve && (
            <g style={{ pointerEvents: 'none' }}>
                <line 
                    x1={hoveredCurve.x} y1={hoveredCurve.y} 
                    x2={hoveredCurve.x} y2={centerY} 
                    stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4"
                />
                <circle cx={hoveredCurve.x} cy={hoveredCurve.y} r="6" fill={THEME.white} filter="url(#glow)" />
                <g transform={`translate(${hoveredCurve.x}, ${hoveredCurve.y - 60})`}>
                    <rect x="-60" y="-35" width="120" height="35" rx="2" fill="rgba(20,20,20,0.9)" stroke={THEME.primary} strokeWidth="1" />
                    <text x="0" y="-12" fill={THEME.white} fontSize="14" textAnchor="middle" fontWeight="bold">
                        RISK: {hoveredCurve.val}%
                    </text>
                    <text x="0" y="25" fill={THEME.grey} fontSize="12" textAnchor="middle" fontWeight="bold">
                        {Math.floor(hoveredCurve.year)}
                    </text>
                </g>
            </g>
        )}

        <line x1="0" y1={centerY} x2={width} y2={centerY} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        
        {Array.from({ length: yearRange + 1 }).map((_, i) => {
            const year = startYear + i;
            const x = getX(year);
            const isDecade = year % 10 === 0;
            return isDecade ? (
                <g key={year}>
                    <line x1={x} y1={centerY} x2={x} y2={centerY + 15} stroke={THEME.grey} strokeWidth="1" />
                    <text x={x} y={centerY + 35} fill={THEME.grey} fontSize="12" textAnchor="middle" fontFamily="monospace">{year}</text>
                </g>
            ) : null;
        })}

        {EVENTS.map((ev) => {
            const x = getX(ev.year);
            const radius = (ev.duration * 4) + (ev.severity * 0.2) + 20; 
            const isHovered = hoveredEvent && hoveredEvent.id === ev.id;
            const currentRadius = isHovered ? radius * 1.1 : radius;
            
            const d = `M ${x - currentRadius} ${centerY} A ${currentRadius} ${currentRadius} 0 0 0 ${x + currentRadius} ${centerY} Z`;

            return (
                <g 
                    key={ev.id}
                    onMouseEnter={() => setHoveredEvent(ev)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                >
                    <path 
                        d={d}
                        fill={THEME.primary}
                        style={{ 
                            mixBlendMode: 'screen', 
                            transition: 'all 0.3s ease-out',
                            opacity: isHovered ? 0.9 : 0.3, 
                        }} 
                    />

                    {isHovered && (
                        <g>
                            <line x1={x} y1={centerY} x2={x} y2={centerY + currentRadius + 60} stroke={THEME.white} strokeWidth="1" />
                            <foreignObject x={x > width - 300 ? x - 320 : x + 20} y={centerY + currentRadius + 20} width="300" height="200">
                                <div style={{ 
                                    background: 'rgba(10,10,10,0.95)', 
                                    border: `1px solid ${THEME.primary}`, 
                                    padding: '20px',
                                    color: '#fff',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                                    fontFamily: 'sans-serif'
                                }}>
                                    <div style={{ fontSize: '12px', color: THEME.primary, letterSpacing:'2px', marginBottom:'5px' }}>{ev.year} EVENT</div>
                                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom:'10px' }}>{ev.title}</div>
                                    <div style={{ fontSize: '13px', color: '#ccc', lineHeight: '1.6' }}>{ev.desc}</div>
                                </div>
                            </foreignObject>
                        </g>
                    )}
                </g>
            );
        })}
      </svg>

      {/* 底部连接线 */}
      <div style={{ 
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '1px', height: '100px', zIndex: 5,
          background: `linear-gradient(to top, ${THEME.primary}, transparent)` 
      }}></div>

    </div>
  );
}