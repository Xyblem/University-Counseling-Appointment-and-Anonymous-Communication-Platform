**TextView 使用示例**
```typescript jsx
import React from 'react';
import TextDisplay from './TextDisplay';

const App: React.FC = () => {
  const longText = "这是一个非常长的文本示例，用于演示文本显示组件的功能。当文本内容超过最大行数限制时，会自动显示省略号，并且可以通过点击或悬停查看完整内容。";

  return (
    <div style={{ maxWidth: '500px', margin: '20px' }}>
      <h2>文本显示组件示例</h2>
      
      <h3>单行文本（默认）</h3>
      <TextDisplay text={longText} copyable />
      
      <h3>多行文本（最多3行）</h3>
      <TextDisplay 
        text={longText} 
        maxLines={3} 
        copyable 
        onCopy={(text) => console.log('已复制:', text)}
      />
      
      <h3>可选择的文本</h3>
      <TextDisplay 
        text="这段文本可以被用户选择" 
        selectable 
        align="center"
      />
      
      <h3>自定义样式</h3>
      <TextDisplay 
        text="自定义样式的文本" 
        className="custom-text"
        style={{ color: 'blue', fontWeight: 'bold' }}
        copyable
      />
    </div>
  );
};

export default App;
```

## 功能说明
文本溢出处理：
 
- 单行文本：自动显示省略号

- 多行文本：支持2-5行限制，超出部分显示省略号

复制功能：

- 点击复制按钮将文本复制到剪贴板

- 支持现代**Clipboard API**和传统**execCommand**降级方案

- 复制成功后显示反馈

文本选择控制：

- 可选择或不可选择文本

- 通过CSS控制用户选择行为

完整文本查看：

- 点击溢出文本可查看完整内容

- 支持弹出层显示完整文本

自定义样式：

- 支持自定义CSS类名和内联样式

- 支持文本对齐方式设置