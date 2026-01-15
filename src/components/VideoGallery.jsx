import React, { useState } from 'react';

// === 🎨 配色系统 (极简版) ===
const THEME = {
  primary: '#4C42D7', // 核心蓝
  white: '#FFFFFF',
  dark: '#050505',
  cardBg: '#111111',
};

// === 📺 视频数据源 (使用本地封面 /covers/1.png - 12.png) ===
const ROW_1_DATA = [
  {
    id: 101,
    title: "1.7亿块、7000吨太空垃圾，正在包围地球",
    desc: "太空垃圾是怎样形成的？会产生哪些影响？",
    url: "https://www.bilibili.com/video/BV1btUzB7Eor",
    img: "/covers/1.png"
  },
  {
    id: 102,
    title: "【It's Okay To Be Smart】双语·进击的太空垃圾",
    desc: "Attack Of The Cosmic Space Junk!",
    url: "https://www.bilibili.com/video/BV16E411h7n4",
    img: "/covers/2.png"
  },
  {
    id: 103,
    title: "【IMAX记录短片】空间垃圾 1080P",
    desc: "高码率中英双语字幕 Space Junk (2012)",
    url: "https://www.bilibili.com/video/BV1MV411W7BF",
    img: "/covers/3.png"
  },
  {
    id: 104,
    title: "太空垃圾撞击的力量有多大？",
    desc: "高速撞击实验展示惊人破坏力",
    url: "https://www.bilibili.com/video/BV1CE41127ih",
    img: "/covers/4.png"
  },
  {
    id: 105,
    title: "太空垃圾的危害与产生",
    desc: "科普：为什么我们必须重视轨道环境",
    url: "https://www.bilibili.com/video/BV1Jh4y1t7rQ",
    img: "/covers/5.png"
  },
  {
    id: 106,
    title: "凯斯勒综合征：被锁死的未来",
    desc: "太空垃圾将导致人类未来无法进入太空！",
    url: "https://www.bilibili.com/video/BV1vb411u7Dd",
    img: "/covers/6.png"
  }
];

const ROW_2_DATA = [
  {
    id: 201,
    title: "世界最大的垃圾场？就在我们头顶",
    desc: "深度解析近地轨道的污染现状",
    url: "https://www.bilibili.com/video/BV1ra411r73M",
    img: "/covers/7.png"
  },
  {
    id: 202,
    title: "亿万富翁惹的祸：太空垃圾危机爆发",
    desc: "商业航天时代带来的新挑战",
    url: "https://www.bilibili.com/video/BV1MPv6B1EAy",
    img: "/covers/8.png"
  },
  {
    id: 203,
    title: "太空旅行的终结者！",
    desc: "太空垃圾有多可怕？它们可能终结探索时代",
    url: "https://www.bilibili.com/video/BV1ob41187sW",
    img: "/covers/9.png"
  },
  {
    id: 204,
    title: "《太空垃圾》三维动画短片",
    desc: "艺术化的视觉呈现轨道危机",
    url: "https://www.bilibili.com/video/BV1Me4y1R7gv",
    img: "/covers/10.png"
  },
  {
    id: 205,
    title: "你不知道的冷知识：太空垃圾",
    desc: "关于轨道碎片的趣味科普",
    url: "https://www.bilibili.com/video/BV1Ls4y1m7nJ",
    img: "/covers/11.png"
  },
  {
    id: 206,
    title: "清理太空：我们在行动",
    desc: "介绍现有的多种清理方案与技术",
    url: "https://www.bilibili.com/video/BV1p34y1f7Ai",
    img: "/covers/12.png"
  }
];

// === 🎬 单个视频卡片 ===
const VideoCard = ({ data }) => {
  const [hover, setHover] = useState(false);

  return (
    <a 
      href={data.url} 
      target="_blank" 
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-block',
        width: '320px', 
        height: '240px',
        marginRight: '30px', 
        textDecoration: 'none',
        background: '#1a1a1a', // 纯色深黑背景，无渐变
        borderRadius: '0px',   // 极简风格：直角 (如果你喜欢圆角可改为 8px)
        overflow: 'hidden',
        // 极简边框：平时微弱白，悬停变核心蓝
        border: `1px solid ${hover ? THEME.primary : 'rgba(255,255,255,0.1)'}`,
        transition: 'all 0.3s ease',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        flexShrink: 0 
      }}
    >
      {/* 图片部分 */}
      <div style={{ width: '100%', height: '160px', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={data.img} 
          alt={data.title}
          style={{ 
            width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9,
            transition: 'transform 0.5s ease',
            transform: hover ? 'scale(1.02)' : 'scale(1)' // 极简微动效
          }}
          onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.backgroundColor = '#222'; }}
        />
        {/* 播放按钮 (纯白简约版) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.3)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hover ? 1 : 0, transition: 'opacity 0.3s'
        }}>
          <div style={{ width: 0, height: 0, borderLeft: '16px solid white', borderTop: '10px solid transparent', borderBottom: '10px solid transparent' }}></div>
        </div>
      </div>

      {/* 文字部分 */}
      <div style={{ padding: '16px', height: '80px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3 style={{ 
          margin: 0, color: '#fff', fontSize: '13px', fontWeight: '500', letterSpacing: '0.5px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
        }}>
          {data.title}
        </h3>
        <p style={{ 
          margin: '6px 0 0 0', color: '#666', fontSize: '12px', 
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
        }}>
          {data.desc}
        </p>
      </div>
    </a>
  );
};

// === 🌀 跑马灯轨道 ===
const MarqueeRow = ({ data, direction = 'left' }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', position: 'relative' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>

      <div style={{
        display: 'flex',
        animation: `${direction === 'left' ? 'scrollLeft' : 'scrollRight'} 80s linear infinite`, // 放慢速度，更优雅
        animationPlayState: isPaused ? 'paused' : 'running',
        width: 'fit-content'
      }}>
        {data.map((item, i) => <VideoCard key={`a-${i}`} data={item} />)}
        {data.map((item, i) => <VideoCard key={`b-${i}`} data={item} />)}
      </div>
    </div>
  );
};

export default function VideoGallery() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: THEME.dark,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      overflow: 'hidden'
    }}>
      
      {/* 第一行：向左滚动 */}
      <div style={{ marginBottom: '60px' }}>
        <MarqueeRow data={ROW_1_DATA} direction="left" />
      </div>

      {/* 🔴 核心修改：极简主义 Slogan */}
      <div style={{ 
        width: '100%', 
        padding: '30px 0',
        marginBottom: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // 极简边框：上下纯色细线
        borderTop: `1px solid ${THEME.primary}`,
        borderBottom: `1px solid ${THEME.primary}`,
        background: 'transparent' // 无背景
      }}>
        <h2 style={{ 
          color: THEME.white, 
          fontSize: '2rem', // 克制的字号
          fontWeight: '400', // 纤细字重，更显高级
          margin: 0, 
          letterSpacing: '3px',
          fontFamily: '"Lexend", sans-serif',
          // 无 textShadow，纯净展示
        }}>
          Turning orbital chaos into conscious clarity.
        </h2>
      </div>

      {/* 第二行：向右滚动 */}
      <div>
        <MarqueeRow data={ROW_2_DATA} direction="right" />
      </div>

    </div>
  );
}