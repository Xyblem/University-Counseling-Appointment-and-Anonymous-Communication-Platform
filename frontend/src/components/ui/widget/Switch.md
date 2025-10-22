# Switch 使用示例

```typescript jsx
import React, { useRef, useState } from 'react';
import Switch, { SwitchRef } from './Switch';

const App = () => {
  const notificationRef = useRef<SwitchRef>(null);
  const themeRef = useRef<SwitchRef>(null);

  const [settings, setSettings] = useState({
    notifications: false,
    darkMode: true,
    autoSave: false,
    twoFactorAuth: false,
    publicProfile: true
  });

  const [loadingStates, setLoadingStates] = useState({
    twoFactorAuth: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNotificationChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, notifications: checked }));
    if (errors.notifications) {
      setErrors(prev => ({ ...prev, notifications: '' }));
    }
  };

  const handleThemeChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, darkMode: checked }));
    document.body.style.background = checked ? '#1f1f1f' : '#ffffff';
    document.body.style.color = checked ? '#ffffff' : '#000000';
  };

  const handleAutoSaveChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, autoSave: checked }));
  };

  const handleTwoFactorAuthChange = async (checked: boolean) => {
    // 模拟异步操作
    setLoadingStates(prev => ({ ...prev, twoFactorAuth: true }));
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSettings(prev => ({ ...prev, twoFactorAuth: checked }));
    setLoadingStates(prev => ({ ...prev, twoFactorAuth: false }));
  };

  const handlePublicProfileChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, publicProfile: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 手动验证
    const isNotificationsValid = notificationRef.current?.validate();
    
    if (isNotificationsValid) {
      console.log('设置保存:', settings);
      alert('设置保存成功!');
    } else {
      setErrors({ notifications: '必须开启通知功能' });
    }
  };

  const handleReset = () => {
    notificationRef.current?.setChecked(false);
    themeRef.current?.setChecked(false);
    setSettings({
      notifications: false,
      darkMode: false,
      autoSave: false,
      twoFactorAuth: false,
      publicProfile: true
    });
    setErrors({});
    document.body.style.background = '#ffffff';
    document.body.style.color = '#000000';
  };

  const handleToggleAll = () => {
    notificationRef.current?.toggle();
    themeRef.current?.toggle();
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', padding: 20 }}>
      <h2>用户设置</h2>
      
      <form onSubmit={handleSubmit}>
        {/* 基础开关 */}
        <Switch
          ref={notificationRef}
          label="启用通知"
          checked={settings.notifications}
          required
          error={errors.notifications}
          onChange={handleNotificationChange}
        />
        
        {/* 带状态标签的开关 */}
        <Switch
          ref={themeRef}
          checkedLabel="深色"
          unCheckedLabel="浅色"
          label="主题模式"
          checked={settings.darkMode}
          size="medium"
          onChange={handleThemeChange}
        />
        
        {/* 不同尺寸 */}
        <Switch
          label="自动保存 (小尺寸)"
          checked={settings.autoSave}
          size="small"
          onChange={handleAutoSaveChange}
        />
        
        <Switch
          label="自动保存 (中尺寸)"
          checked={settings.autoSave}
          size="medium"
          onChange={handleAutoSaveChange}
        />
        
        <Switch
          label="自动保存 (大尺寸)"
          checked={settings.autoSave}
          size="large"
          onChange={handleAutoSaveChange}
        />
        
        {/* 加载状态 */}
        <Switch
          label="双重验证"
          checked={settings.twoFactorAuth}
          loading={loadingStates.twoFactorAuth}
          onChange={handleTwoFactorAuthChange}
        />
        
        {/* 禁用状态 */}
        <Switch
          label="公开个人资料"
          checked={settings.publicProfile}
          disabled
          onChange={handlePublicProfileChange}
        />
        
        {/* 复杂标签 */}
        <Switch
          checkedLabel="ON"
          unCheckedLabel="OFF"
          label="高级模式"
          checked={settings.autoSave}
          size="large"
          onChange={handleAutoSaveChange}
        />
        
        <div style={{ marginTop: 24 }}>
          <button type="submit" style={{ marginRight: 12 }}>
            保存设置
          </button>
          <button type="button" onClick={handleReset} style={{ marginRight: 12 }}>
            重置设置
          </button>
          <button type="button" onClick={handleToggleAll}>
            切换所有开关
          </button>
        </div>
      </form>
      
      <div style={{ 
        marginTop: 24, 
        padding: 16, 
        background: settings.darkMode ? '#2f2f2f' : '#f5f5f5',
        color: settings.darkMode ? '#ffffff' : '#000000',
        borderRadius: 6 
      }}>
        <h3>当前设置:</h3>
        <pre style={{ 
          background: settings.darkMode ? '#1a1a1a' : '#ffffff',
          padding: 12,
          borderRadius: 4,
          overflow: 'auto'
        }}>
          {JSON.stringify(settings, null, 2)}
        </pre>
      </div>
      
      <div style={{ marginTop: 24 }}>
        <h4>开关状态:</h4>
        <ul>
          <li>通知: {settings.notifications ? '开启' : '关闭'}</li>
          <li>主题: {settings.darkMode ? '深色' : '浅色'}</li>
          <li>自动保存: {settings.autoSave ? '开启' : '关闭'}</li>
          <li>双重验证: {settings.twoFactorAuth ? '开启' : '关闭'}</li>
          <li>公开资料: {settings.publicProfile ? '开启' : '关闭'}</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
```

## 组件特性

**完整的类型安全:** 使用`TypeScript`确保类型安全

**多种尺寸:** 小、中、大三种尺寸选项

**加载状态:** 支持异步操作时的加载状态显示

**自定义标签:** 支持开关轨道内的状态标签和外部标签

**完整验证:** 必填验证和错误提示

**无障碍支持:** 完整的ARIA属性支持

**禁用状态:** 支持禁用开关交互

**丰富的事件:** `onChange`、`onFocus`、`onBlur`、`onClick`等

**受控/非受控:** 支持两种模式

**完整的API:** `focus`、`validate`、`getChecked`、`setChecked`、`toggle`等方法

**平滑动画:** 流畅的状态切换动画

**悬停效果:** 丰富的悬停状态反馈