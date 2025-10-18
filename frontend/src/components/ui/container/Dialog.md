# Dialog 使用示例

```typescript jsx
import React, { useRef } from 'react';
import Dialog, { DialogRef } from './Dialog';

const App: React.FC = () => {
    const modalDialogRef = useRef<DialogRef>(null);
    const fixedDialogRef = useRef<DialogRef>(null);

    return (
        <div>
            <h1>对话框组件示例</h1>

            <button onClick={() => modalDialogRef.current?.open()}>
                打开模态对话框
            </button>

            <button onClick={() => fixedDialogRef.current?.open()}>
                打开固定对话框
            </button>

            {/* 模态对话框 */}
            <Dialog
                ref={modalDialogRef}
                type="modal"
                title="模态对话框"
                width={600}
                height={400}
                showCloseButton
                closeOnBackdropClick
                closeOnEscape
                onOpen={() => console.log('对话框打开')}
                onClose={() => console.log('对话框关闭')}
            >
                <div>
                    <h2>这是一个模态对话框</h2>
                    <p>模态对话框会阻止与背景内容的交互，通常用于重要操作。</p>
                    <button onClick={() => modalDialogRef.current?.close()}>
                        关闭对话框
                    </button>
                </div>
            </Dialog>

            {/* 固定对话框 */}
            <Dialog
                ref={fixedDialogRef}
                type="fixed"
                title="固定对话框"
                width={400}
                height={300}
                position={{ top: 100, left: 100 }}
                draggable
                resizable
                minWidth={300}
                minHeight={200}
                showCloseButton
            >
                <div>
                    <h2>这是一个固定对话框</h2>
                    <p>固定对话框不会阻止与背景内容的交互，可以拖动和调整大小。</p>
                    <ul>
                        <li>可以拖动标题栏移动对话框</li>
                        <li>可以拖动边缘调整大小</li>
                        <li>点击右上角按钮关闭</li>
                    </ul>
                </div>
            </Dialog>
        </div>
    );
};

export default App;
```

## 功能特性

两种对话框模式：

- 模态对话框：阻止背景交互，有半透明遮罩

- 固定对话框：不阻止背景交互，可自由定位

丰富功能：

- 可拖动（固定模式）

- 可调整大小

- 支持ESC键关闭

- 支持点击遮罩关闭

- 自定义尺寸和位置

- 最小/最大尺寸限制

完整类型支持：

- 完整的TypeScript类型定义

- `DialogRef`接口提供`open`/`close`控制

响应式设计：

- 移动端适配

- 动画效果

可访问性：

- 适当的ARIA标签

- 键盘导航支持