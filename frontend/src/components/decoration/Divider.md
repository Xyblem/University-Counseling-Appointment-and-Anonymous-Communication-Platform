# Divider 使用示例

```typescript jsx
import React from 'react';
import Divider, { DividerType } from './Divider';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>分界线组件示例</h1>
      
      <section>
        <h2>水平分界线</h2>
        <p>这是一段文字</p>
        <Divider />
        <p>这是另一段文字</p>
        
        <Divider type="dashed" />
        <Divider type="dotted" />
        <Divider type="double" thickness={2} />
        <Divider type="gradient" gradientFrom="#ff9a9e" gradientTo="#fad0c4" thickness={4} />
        <Divider type="shadow" thickness={8} />
        <Divider type="zigzag" thickness={4} color="#ff6b6b" />
        <Divider type="wave" thickness={4} color="#4ecdc4" />
      </section>
      
      <section style={{ display: 'flex', height: '200px', marginTop: '40px' }}>
        <h2>垂直分界线</h2>
        <div>左侧内容</div>
        <Divider orientation="vertical" spacing="20px" />
        <div>中间内容</div>
        <Divider orientation="vertical" type="dashed" spacing="20px" />
        <div>右侧内容</div>
      </section>
      
      <section style={{ marginTop: '40px' }}>
        <h2>带文字的分界线</h2>
        <Divider text="这是居中的文字" />
        <Divider text="左侧文字" textPosition="left" type="dashed" />
        <Divider text="右侧文字" textPosition="right" type="dotted" />
        <Divider 
          text="渐变文字分界线" 
          type="gradient" 
          gradientFrom="#667eea" 
          gradientTo="#764ba2" 
          thickness={3}
        />
      </section>
      
      <section style={{ marginTop: '40px' }}>
        <h2>自定义样式</h2>
        <Divider 
          type="solid" 
          color="#ff4757" 
          thickness={3} 
          spacing="30px"
          length="50%"
        />
        <Divider 
          type="dashed" 
          color="#2ed573" 
          thickness={2} 
          spacing="20px"
          style={{ borderRadius: '2px' }}
        />
      </section>
    </div>
  );
};

export default App;
```

## 功能特点

多种分界线样式：

- 实线 (`solid`)

- 虚线 (`dashed`)

- 点线 (`dotted`)

- 双线 (`double`)

- 渐变 (`gradient`)

- 阴影 (`shadow`)

- 锯齿 (`zigzag`)

- 波浪 (`wave`)

灵活的方向控制：

- 水平 (`horizontal`)

- 垂直 (`vertical`)

文字标签支持：

- 可添加文字标签

- 支持左、中、右三种文字位置

丰富的自定义选项：

- 颜色、粗细、长度、间距

- 渐变颜色自定义

- 自定义CSS类名和内联样式

完整的TypeScript支持：

- 完整的类型定义

- 属性类型检查

- 智能提示