**Button 使用示例**
```typescript jsx
import React from 'react';
import Button from './Button';

// 图标组件示例（实际项目中可使用图标库）
const SearchIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
);

const App: React.FC = () => {
    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* 不同类型按钮 */}
            <div>
                <Button type="primary">主要按钮</Button>
                <Button type="default">默认按钮</Button>
                <Button type="dashed">虚线按钮</Button>
                <Button type="text">文本按钮</Button>
                <Button type="link" href="#">链接按钮</Button>
            </div>

            {/* 不同尺寸按钮 */}
            <div>
                <Button size="small">小按钮</Button>
                <Button size="medium">中按钮</Button>
                <Button size="large">大按钮</Button>
            </div>

            {/* 不同形状按钮 */}
            <div>
                <Button shape="default">默认形状</Button>
                <Button shape="round">圆角按钮</Button>
                <Button shape="circle" icon={<SearchIcon />} />
            </div>

            {/* 图标按钮 */}
            <div>
                <Button icon={<SearchIcon />}>左侧图标</Button>
                <Button iconRight={<SearchIcon />}>右侧图标</Button>
                <Button icon={<SearchIcon />} iconOnly />
            </div>

            {/* 状态按钮 */}
            <div>
                <Button loading>加载中</Button>
                <Button disabled>禁用按钮</Button>
                <Button danger>危险按钮</Button>
                <Button ghost>幽灵按钮</Button>
                <Button block>块级按钮</Button>
            </div>
        </div>
    );
};

export default App;
```