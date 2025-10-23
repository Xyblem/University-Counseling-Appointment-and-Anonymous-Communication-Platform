# ResponseHandler 使用示例
```typescript jsx
import React, { useRef } from 'react';
import ResponseHandler, { ResponseHandlerRef, ReturnObject } from './ResponseHandler';

// 定义您的数据类型
interface UserData {
  id: number;
  name: string;
  email: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const responseHandlerRef = useRef<ResponseHandlerRef<LoginRequest, UserData>>(null);

  const handleLogin = async () => {
    const loginData: LoginRequest = {
      username: 'user@example.com',
      password: 'password123'
    };

    try {
      const result = await responseHandlerRef.current?.request(loginData);
      console.log('Login result:', result);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRecover = () => {
    responseHandlerRef.current?.recover();
  };

  return (
    <div>
      <button onClick={handleLogin}>登录</button>
      <button onClick={handleRecover}>重置</button>
      
      <ResponseHandler<LoginRequest, UserData>
        ref={responseHandlerRef}
        idleComponent={<div>请点击登录按钮</div>}
        loadingComponent={<div>登录中...</div>}
        handlingReturnObjectComponent={<div>处理登录结果...</div>}
        finishedComponent={<div>登录完成！</div>}
        networkErrorComponent={<div>网络错误，请重试</div>}
        request={async (loginData) => {
          // 模拟 API 调用
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
          });
          
          if (!response.ok) {
            throw new Error('Network error');
          }
          
          return response.json();
        }}
        onRequestBegin={(requestBody) => {
          console.log('开始请求:', requestBody);
        }}
        onHandlingReturnObject={(requestBody, returnObject) => {
          console.log('处理返回对象:', returnObject);
        }}
        onRequestEnd={(requestBody) => {
          console.log('请求结束:', requestBody);
        }}
        onRequestError={(requestBody, error) => {
          console.error('请求错误:', error);
        }}
      />
    </div>
  );
};

export default LoginForm;
```

## 主要特性

**类型安全:** 完整的 **TypeScript** 支持，确保类型安全

**状态管理:** 自动管理请求的各个状态（`idle`、`loading`、`handling`、`finished`、`networkError`）

**生命周期回调:** 提供完整的请求生命周期回调函数

**Ref 暴露:** 通过 `ref` 暴露 `request` 和 `recover` 方法

**灵活渲染:** 根据不同的状态渲染不同的组件

**错误处理:** 完善的错误处理机制