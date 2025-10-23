**Loading 使用示例**
```typescript jsx
import React, { useState, useEffect } from 'react';
import Loading, { LoadingType } from './Loading';

const App: React.FC = () => {
  const [loadingType, setLoadingType] = useState<LoadingType>('spinner');
  const [progress, setProgress] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // 模拟进度变化
  useEffect(() => {
    if (loadingType === 'progress') {
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 10));
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [loadingType]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>精美加载组件演示</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>加载类型: </label>
        <select 
          value={loadingType} 
          onChange={(e) => {
            setLoadingType(e.target.value as LoadingType);
            setProgress(0);
          }}
        >
          <option value="spinner">旋转器</option>
          <option value="dots">点状</option>
          <option value="pulse">脉冲</option>
          <option value="skeleton">骨架屏</option>
          <option value="progress">进度条</option>
        </select>
        
        <label style={{ marginLeft: '20px' }}>
          <input 
            type="checkbox" 
            checked={isFullScreen}
            onChange={(e) => setIsFullScreen(e.target.checked)}
          />
          全屏显示
        </label>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center' }}>
          <h3>默认样式</h3>
          <Loading />
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center' }}>
          <h3>自定义颜色</h3>
          <Loading color="#e91e63" text="加载中..." />
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center' }}>
          <h3>大尺寸</h3>
          <Loading size="large" text="正在加载内容" />
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center' }}>
          <h3>快速加载</h3>
          <Loading speed="fast" text="快速加载中" />
        </div>
      </div>
      
      <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
        <h3>当前选择的加载类型: {loadingType}</h3>
        <Loading 
          type={loadingType}
          text={loadingType === 'progress' ? `加载进度: ${progress}%` : '正在加载...'}
          color="#2196f3"
          size="medium"
          fullScreen={isFullScreen}
          progress={progress}
        />
      </div>
    </div>
  );
};

export default App;
```

## 组件特性
多种加载动画：

- **旋转器(Spinner)**：经典的圆形旋转动画

- **点状(Dots)**：三个点依次显示/隐藏

- **脉冲(Pulse)**：圆形缩放脉冲效果

- **骨架屏(Skeleton)**：模拟内容结构的加载状态

- **进度条(Progress)**：显示具体加载进度

高度可定制：

- 自定义颜色、尺寸和速度

- 支持全屏模式或嵌入容器

- 可添加自定义文本和样式

TypeScript支持：

- 完整的类型定义

- 属性类型检查

响应式设计：

- 适应不同屏幕尺寸

- 流畅的动画效果

- 这个组件提供了多种精美的加载状态，可以根据不同场景选择合适的加载动画，同时保持了高度的可定制性和TypeScript类型安全。