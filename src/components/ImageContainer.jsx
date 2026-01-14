import React from 'react';
// 🔴 核心：引入同一目录下的图片文件
// 如果你的图片是 .jpg，请改为 './dashboard.jpg'
import dashboardImg from './dashboard.png';

export default function ImageContainer() {
  return (
    <div style={{
      // 占满父容器 (也就是整个第四页屏幕)
      width: '100%',
      height: '110%',
      // 居中对齐
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // 深色科技感背景衬托
      background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)',
      // 防止图片贴边，加点内边距
      padding: '40px',
      boxSizing: 'border-box'
    }}>
      <img
        src={dashboardImg}
        alt="Dashboard Exhibit"
        style={{
          // 🔴 核心尺寸控制：
          // 让图片尽可能大，但绝不超过屏幕范围
          maxWidth: '100%',
          maxHeight: '100%',
          // 关键：保持原始比例，完整显示，不裁切
          objectFit: 'contain',

          // 添加高级悬浮阴影，提升质感
          filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8))',
          // 可选：加一点点圆角
          // borderRadius: '12px'
        }}
      />
    </div>
  );
}