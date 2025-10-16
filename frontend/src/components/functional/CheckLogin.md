# CheckLogin 使用示例
```typescript jsx
import React from 'react';
import CheckLogin from './CheckLogin';

const App: React.FC = () => {
  const handleLoginSuccess = () => {
    console.log('用户已登录');
  };

  const handleLoginFail = () => {
    console.log('用户未登录');
  };

  return (
    <div>
      <CheckLogin
        to="/login"
        request_api="/api/check-login"
        loadingComponent={<div>正在验证登录状态...</div>}
        errorComponent={
          <div style={{ color: 'red' }}>
            验证登录状态失败，请检查网络连接
          </div>
        }
        onLoginSuccess={handleLoginSuccess}
        onLoginFail={handleLoginFail}
      >
        <div>
          <h1>受保护的内容</h1>
          <p>只有登录用户才能看到这个内容</p>
        </div>
      </CheckLogin>
    </div>
  );
};

export default App;
```