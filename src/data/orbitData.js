// src/data/orbitData.js

export const ORBIT_DATA = {
    LEO: {
      name: "LEO",
      fullName: "Low Earth Orbit",
      range: "160km - 2,000km",
      desc: "低地球轨道是距离地面最近的轨道，也是人类航天活动最频繁的区域。国际空间站、大多数遥感卫星和通信卫星星座（如Starlink）都位于此。这里也是太空垃圾最密集的区域。",
      color: "#5456F0" // 蓝紫色
    },
    MEO: {
      name: "MEO",
      fullName: "Medium Earth Orbit",
      range: "2,000km - 35,786km",
      desc: "中地球轨道位于低轨道和地球静止轨道之间。这一区域主要用于导航卫星系统，如美国的GPS、中国的北斗、欧洲的伽利略和俄罗斯的格洛纳斯。",
      color: "#00BCD4" // 青色
    },
    GEO: {
      name: "GEO",
      fullName: "Geostationary Orbit",
      range: "35,786km (精确)",
      desc: "地球静止轨道是一个特殊的圆形轨道，位于赤道上空。在这里，卫星的轨道周期与地球自转周期相同，因此从地面看，卫星似乎静止在天空中。这对于通信和气象观测至关重要。",
      color: "#FF9800" // 橙色
    },
    HEO: {
      name: "HEO",
      fullName: "Highly Elliptical Orbit",
      range: "近地点 < 1,000km, 远地点 > 35,000km",
      desc: "大椭圆轨道是一种具有极高偏心率的轨道。卫星在远地点附近停留大部分时间，而在近地点附近快速掠过。常用于覆盖高纬度地区（如俄罗斯的闪电轨道通信卫星）。",
      color: "#E91E63" // 粉色
    },
    GTO: {
      name: "GTO",
      fullName: "Geostationary Transfer Orbit",
      range: "过渡轨道",
      desc: "地球静止转移轨道是一个用于将卫星从低轨道（LEO）送往地球静止轨道（GEO）的临时椭圆轨道。它的近地点在LEO高度，远地点在GEO高度。",
      color: "#9C27B0" // 紫色
    },
    SSO: {
      name: "SSO",
      fullName: "Sun-Synchronous Orbit",
      range: "600km - 800km (近极地)",
      desc: "太阳同步轨道是一种特殊的低地球轨道，其轨道平面与太阳保持固定的角度。这意味着卫星每次经过地球上某一点时，当地的太阳时间都是相同的，非常适合需要恒定光照条件的对地观测卫星。",
      color: "#FFEB3B" // 黄色
    }
  };