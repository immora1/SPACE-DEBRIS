import React from 'react';
import { ORBIT_DATA } from '../data/orbitData';

export default function OrbitUI({ currentOrbit }) {
  const data = ORBIT_DATA[currentOrbit] || ORBIT_DATA['LEO']; // 防崩坏

  return (
    <section style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '10vw', // 稍微往左一点
      pointerEvents: 'none' 
    }}>
      
      {/* 白色卡片容器 */}
      <div style={{
        width: '400px',
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)', // 强烈的阴影让它浮起来
        pointerEvents: 'auto',
        fontFamily: 'Arial, sans-serif'
      }}>
        
        {/* 标题 */}
        <h1 style={{ 
            color: '#5456F0', // 你的设计蓝色
            fontSize: '3rem', 
            margin: '0 0 10px 0', 
            fontWeight: '800'
        }}>
            {data.name}
        </h1>
        
        <h2 style={{ 
            color: '#888', 
            fontSize: '1.2rem', 
            margin: '0 0 30px 0', 
            fontWeight: '400' 
        }}>
            {data.fullName}
        </h2>

        {/* 分割线 */}
        <div style={{ width: '100%', height: '2px', background: '#5456F0', marginBottom: '20px' }}></div>

        {/* 高度信息 */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', background: '#5456F0', borderRadius: '50%' }}></div>
            <span style={{ fontFamily: 'monospace', color: '#333', fontWeight: 'bold' }}>
                ALTITUDE: {data.range}
            </span>
        </div>

        {/* 描述文字 */}
        <p style={{ 
            color: '#666', 
            lineHeight: '1.8', 
            fontSize: '0.95rem', 
            textAlign: 'justify' 
        }}>
            {data.desc}
        </p>

      </div>
    </section>
  );
}