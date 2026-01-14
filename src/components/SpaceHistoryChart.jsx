import React, { useState, useMemo, useRef } from 'react';

// === 1. 核心数据源 (保持不变) ===
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

const COLORS = ['#6155FF', '#231D75', '#4C42D7', '#3026B8'];

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

  // === ⚙️ 调节配置区 ===
  const IMG_OFFSET_Y = 0; 
  const IMG_SCALE = '100%'; 

  // 尺寸定义
  const width = 1600; 
  const height = 800;
  const centerY = 450; 
  
  const startYear = 1957;
  const endYear = 2025; 
  const yearRange = endYear - startYear;
  
  const paddingLeft = 120; 
  const availableWidth = width - 210; 
  const pxPerYear = availableWidth / yearRange;

  const getX = (year) => paddingLeft + (year - startYear) * pxPerYear;
  const getY = (val) => centerY - val * 3.8; 

  const curvePath = useMemo(() => {
    // 1. 起始点：从屏幕最左侧 (x=0) 开始
    const startX = 0;
    const firstPointY = getY(SEVERITY_POINTS[0].val);
    let d = `M ${startX} ${firstPointY} L ${getX(SEVERITY_POINTS[0].year)} ${firstPointY}`;

    // 绘制贝塞尔曲线
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

    // 2. 结束点：延伸到屏幕最右侧 (x=width)
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

    if (Math.abs(mouseY - targetY) < 150 && mouseY < centerY) { 
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

  const handleSvgLeave = () => {
    setHoveredCurve(null);
  };

  return (
    <div style={{ 
        width: '100%', height: '100%', 
        background: '#050505', 
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        position: 'relative', overflow: 'hidden'
    }}>
      
      {/* 图片层 */}
      <img 
        src="/images/chart_bg.png"
        alt="Chart Overlay"
        style={{
          position: 'absolute',
          width: IMG_SCALE, 
          height: 'auto',
          left: '50%',
          top: `calc(50% + ${IMG_OFFSET_Y}px)`, 
          transform: 'translate(-50%, -50%)',
          zIndex: 20, 
          mixBlendMode: 'screen', 
          pointerEvents: 'none'
        }}
      />

      {/* 🔴 标题区域修改 */}
      <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {/* 蓝色圆点 */}
              <div style={{ 
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '50%', 
                  background: '#2E64FF', // 纯正的亮蓝色
                  boxShadow: '0 0 15px #2E64FF' 
              }}></div>
              
              {/* 标题 */}
              <h2 style={{ 
                  color: '#fff', 
                  margin: 0, 
                  fontSize: '2rem', // 字体加大
                  letterSpacing: '3px', 
                  fontWeight: '900',
                  fontFamily: 'Arial, sans-serif'
              }}>ORBIT EVENTS</h2>
          </div>
          <p style={{ color: '#2E64FF', fontSize: '0.9rem', marginLeft: '33px', marginTop: '6px', opacity: 0.9, letterSpacing: '1px' }}>
              IMPACT TIMELINE (1957-2025)
          </p>
      </div>

      {/* SVG层 */}
      <svg 
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`} 
        style={{ width: '95%', height: 'auto', maxWidth: '1600px', overflow: 'visible', position: 'relative', zIndex: 10 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleSvgLeave}
      >
        <defs>
             {/* 灰色渐变 */}
             <linearGradient id="curveGrayFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#888" stopOpacity="0.4" /> 
                <stop offset="100%" stopColor="#000" stopOpacity="0" />    
            </linearGradient>

             <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>

        {/* 1. 灰色填充层 */}
        <path 
            d={`${curvePath} L ${width} ${centerY} L 0 ${centerY} Z`} 
            fill="url(#curveGrayFill)" 
            stroke="none" 
        />

        {/* 2. 视觉层：白色发光曲线 */}
        <path 
            d={curvePath} 
            fill="none" 
            stroke="#fff" 
            strokeWidth="3" 
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' }}
        />

        {/* 3. 交互层：透明粗线 */}
        <path 
            d={curvePath} 
            fill="none" 
            stroke="transparent" 
            strokeWidth="80" 
        />

        {/* 4. 曲线交互 Tooltip */}
        {hoveredCurve && (
            <g style={{ pointerEvents: 'none' }}>
                <line 
                    x1={hoveredCurve.x} y1={hoveredCurve.y} 
                    x2={hoveredCurve.x} y2={centerY} 
                    stroke="rgba(255,255,255,0.4)" strokeDasharray="3 3"
                />
                
                <circle 
                    cx={hoveredCurve.x} cy={hoveredCurve.y} r="6" 
                    fill="#fff" filter="url(#glow)"
                />
                
                <g transform={`translate(${hoveredCurve.x}, ${hoveredCurve.y < 100 ? hoveredCurve.y + 50 : hoveredCurve.y - 50})`}>
                    <rect 
                        x="-50" y="-30" width="100" height="30" rx="4"
                        fill="rgba(0,0,0,0.9)" stroke="#2E64FF" strokeWidth="1"
                    />
                    <text 
                        x="0" y="-10" 
                        fill="#fff" fontSize="13" textAnchor="middle" alignmentBaseline="middle"
                        fontWeight="bold"
                    >
                        {hoveredCurve.val} / 100
                    </text>
                    <text 
                        x="0" y="15" 
                        fill="#aaa" fontSize="11" textAnchor="middle" fontWeight="bold"
                    >
                        {Math.floor(hoveredCurve.year)}
                    </text>
                </g>
            </g>
        )}

        {/* 中轴线 */}
        <line x1="0" y1={centerY} x2={width} y2={centerY} stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="5 5" />
        
        {/* 刻度 */}
        {Array.from({ length: yearRange + 1 }).map((_, i) => {
            const year = startYear + i;
            const x = getX(year);
            const isDecade = year % 10 === 0;
            return isDecade ? (
                <g key={year}>
                    <line x1={x} y1={centerY} x2={x} y2={centerY + 15} stroke="#fff" strokeWidth="2" />
                    <text x={x} y={centerY - 10} fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{year}</text>
                </g>
            ) : null;
        })}

        {/* 下半部分：半圆 */}
        {EVENTS.map((ev, index) => {
            const x = getX(ev.year);
            const radius = (ev.duration * 5) + (ev.severity * 0.3) + 30; 
            const isHovered = hoveredEvent && hoveredEvent.id === ev.id;
            const currentRadius = isHovered ? radius * 1.1 : radius;
            const color = COLORS[index % COLORS.length];

            const d = `
                M ${x - currentRadius} ${centerY} 
                A ${currentRadius} ${currentRadius} 0 0 0 ${x + currentRadius} ${centerY} 
                Z
            `;

            return (
                <g 
                    key={ev.id}
                    onMouseEnter={() => setHoveredEvent(ev)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                >
                    <path 
                        d={d}
                        fill={color}
                        style={{ 
                            mixBlendMode: 'normal', 
                            transition: 'all 0.3s ease-out',
                            opacity: isHovered ? 1 : 0.85, 
                            filter: isHovered ? 'brightness(1.2) drop-shadow(0 0 20px rgba(97, 85, 255, 0.4))' : 'none'
                        }} 
                    />

                    {isHovered && (
                        <g>
                            <line x1={x} y1={centerY - 50} x2={x} y2={centerY + currentRadius + 80} stroke="#fff" strokeWidth="1" strokeDasharray="4 4" />
                            <circle cx={x} cy={centerY} r="4" fill="#fff" />
                            <circle cx={x} cy={centerY + currentRadius + 80} r="4" fill="#000" stroke="#fff" strokeWidth="2" />
                            <circle cx={x} cy={centerY + currentRadius + 80} r="10" fill="none" stroke="#2E64FF" strokeWidth="1" />
                            
                            <foreignObject 
                                x={x > width - 280 ? x - 290 : x + 20} 
                                y={centerY + currentRadius + 20} 
                                width="280" height="200" 
                            >
                                <div style={{ 
                                    background: 'rgba(10,10,20,0.95)', 
                                    border: `1px solid ${color}`, 
                                    borderLeft: `4px solid ${color}`,
                                    borderRadius: '4px',
                                    padding: '16px',
                                    color: '#fff',
                                    boxShadow: '0 15px 50px rgba(0,0,0,0.9)',
                                    fontFamily: 'sans-serif',
                                    position: 'relative',
                                    zIndex: 100
                                }}>
                                    <div style={{ fontSize: '28px', fontWeight: '900', color: '#fff', lineHeight:'1', marginBottom:'5px' }}>{ev.year}</div>
                                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: color, marginBottom:'10px', textTransform:'uppercase', letterSpacing:'1px' }}>{ev.title}</div>
                                    <div style={{ fontSize: '12px', color: '#ddd', lineHeight: '1.6', borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:'10px', marginBottom:'15px', textAlign:'justify' }}>
                                        {ev.desc}
                                    </div>
                                    <div style={{ display:'flex', gap:'10px', borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:'10px' }}>
                                        <div style={{ flex:1 }}>
                                            <div style={{ fontSize:'9px', color:'#888', textTransform:'uppercase' }}>Severity</div>
                                            <div style={{ fontSize:'14px', fontWeight:'bold', color: color }}>{ev.severity}<span style={{fontSize:'10px'}}> / 100</span></div>
                                            <div style={{ width:'100%', height:'3px', background:'#333', marginTop:'3px' }}>
                                                <div style={{ width:`${ev.severity}%`, height:'100%', background:color }}></div>
                                            </div>
                                        </div>
                                        <div style={{ flex:1 }}>
                                            <div style={{ fontSize:'9px', color:'#888', textTransform:'uppercase' }}>Duration</div>
                                            <div style={{ fontSize:'14px', fontWeight:'bold', color: '#fff' }}>{ev.duration}<span style={{fontSize:'10px'}}> Yrs</span></div>
                                            <div style={{ width:'100%', height:'3px', background:'#333', marginTop:'3px' }}>
                                                <div style={{ width:`${Math.min((ev.duration/40)*100, 100)}%`, height:'100%', background:'#fff' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </foreignObject>
                        </g>
                    )}
                </g>
            );
        })}
      </svg>
    </div>
  );
}