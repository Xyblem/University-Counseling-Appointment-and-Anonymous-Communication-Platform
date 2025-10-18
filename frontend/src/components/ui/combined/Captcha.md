# Captcha 使用方法

```typescript jsx
// CaptchaDemo.tsx - 完整的使用示例
import React, { useState, useRef, useCallback } from 'react';
import Captcha, { CaptchaRef } from './Captcha';
import './Captcha.css';

const CaptchaDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captchaKey: '',
    captchaValue: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const captchaRef = useRef<CaptchaRef>(null);

  const handleCaptchaChange = useCallback((captchaKey: string, captchaValue: string) => {
    setFormData(prev => ({
      ...prev,
      captchaKey,
      captchaValue
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    // 获取验证码数据
    const captchaData = captchaRef.current?.getCaptchaData();
    if (!captchaData) {
      alert('请填写验证码');
      setSubmitStatus('error');
      return;
    }

    const submitData = {
      username: formData.username,
      password: formData.password,
      captchaKey: captchaData.key,
      captchaValue: captchaData.value
    };

    console.log('提交数据:', submitData);
    
    // 模拟API调用
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 这里调用真实的登录API
      setSubmitStatus('success');
      alert('提交成功！');
    } catch (error) {
      setSubmitStatus('error');
      alert('提交失败，请重试');
    }
  };

  const handleManualRefresh = () => {
    captchaRef.current?.refresh();
  };

  const handleClearCaptcha = () => {
    captchaRef.current?.clearInput();
  };

  const handleFocusCaptcha = () => {
    captchaRef.current?.focus();
  };

  return (
    <div className="demo-container">
      <h2>验证码组件演示</h2>
      
      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label>用户名:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            required
          />
        </div>
        
        <div className="form-group">
          <label>密码:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            required
          />
        </div>
        
        <div className="form-group">
          <label>验证码:</label>
          <Captcha
            ref={captchaRef}
            onCaptchaChange={handleCaptchaChange}
            placeholder="请输入图片中的验证码"
            autoRefresh={true}
            className="demo-captcha"
            inputClassName="demo-captcha-input"
            imageClassName="demo-captcha-image"
            buttonClassName="demo-captcha-button"
          />
        </div>

        <div className="button-group">
          <button 
            type="submit" 
            disabled={submitStatus === 'loading' || !formData.captchaValue}
            className="submit-button"
          >
            {submitStatus === 'loading' ? '提交中...' : '登录'}
          </button>
          
          <button 
            type="button" 
            onClick={handleManualRefresh}
            className="action-button"
          >
            手动刷新验证码
          </button>
          
          <button 
            type="button" 
            onClick={handleClearCaptcha}
            className="action-button"
          >
            清空验证码
          </button>
          
          <button 
            type="button" 
            onClick={handleFocusCaptcha}
            className="action-button"
          >
            聚焦验证码输入框
          </button>
        </div>
      </form>

      <div className="debug-info">
        <h3>调试信息:</h3>
        <p>用户名: {formData.username}</p>
        <p>密码: {formData.password.replace(/./g, '*')}</p>
        <p>验证码Key: {formData.captchaKey}</p>
        <p>验证码值: {formData.captchaValue}</p>
        <p>提交状态: {submitStatus}</p>
      </div>
    </div>
  );
};

export default CaptchaDemo;
```

完整的 Ref 支持：

- refresh() - 手动刷新验证码

- getCaptchaData() - 获取当前验证码数据

- clearInput() - 清空输入框

- focus() - 聚焦输入框

增强的 TypeScript 支持：

- 完整的类型定义

- 泛型支持

- 严格的类型检查

更好的用户体验：

- 响应式设计

- 移动端适配

- 自定义样式支持

- 错误处理和加载状态

灵活的可配置性：

- 支持自定义 CSS 类名

- 可选的自动刷新

- 灵活的回调函数