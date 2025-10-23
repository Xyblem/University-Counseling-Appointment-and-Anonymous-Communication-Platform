**InputField 使用示例**
```typescript jsx
import React, { useRef } from 'react';
import Input, { InputRef, ValidationRule } from './Input';

const App = () => {
    const emailRef = useRef<InputRef>(null);
    const passwordRef = useRef<InputRef>(null);

    // 邮箱验证规则
    const emailRules: ValidationRule[] = [
        {
            required: true,
            message: '请输入邮箱地址'
        },
        {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '请输入有效的邮箱地址'
        }
    ];

    // 密码验证规则
    const passwordRules: ValidationRule[] = [
        {
            required: true,
            message: '请输入密码'
        },
        {
            minLength: 6,
            message: '密码至少6位'
        }
    ];

    const handleSubmit = () => {
        // 手动验证
        const isEmailValid = emailRef.current?.validate();
        const isPasswordValid = passwordRef.current?.validate();

        if (isEmailValid && isPasswordValid) {
            console.log('表单验证通过');
            console.log('邮箱:', emailRef.current?.getValue());
            console.log('密码:', passwordRef.current?.getValue());
        }
    };

    const handleClear = () => {
        emailRef.current?.clear();
        passwordRef.current?.clear();
    };

    return (
        <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
            <h2>登录表单</h2>

            <Input
                ref={emailRef}
                type="email"
                label="邮箱"
                placeholder="请输入邮箱地址"
                prefix={<span>@</span>}
                validationRules={emailRules}
                required
            />

            <Input
                ref={passwordRef}
                type="password"
                label="密码"
                placeholder="请输入密码"
                validationRules={passwordRules}
                required
            />

            <div style={{ marginTop: 20 }}>
                <button onClick={handleSubmit} style={{ marginRight: 10 }}>
                    提交
                </button>
                <button onClick={handleClear}>
                    清空
                </button>
            </div>
        </div>
    );
};

export default App;

```

## 组件特性

类型安全: 使用TypeScript确保类型安全

受控/非受控模式: 支持两种模式

完整验证系统: 内置多种验证规则和自定义验证

丰富的事件处理: `onChange`、`onFocus`、`onBlur`等

灵活的自定义: 支持前缀、后缀、自定义样式

完整的API: 提供`focus`、`blur`、`validate`等方法

无障碍支持: 适当的标签和属性