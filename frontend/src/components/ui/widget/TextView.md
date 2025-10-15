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