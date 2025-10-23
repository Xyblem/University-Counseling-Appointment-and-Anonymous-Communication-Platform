**Radio 使用示例**
```typescript jsx
import React, { useRef, useState } from 'react';
 import RadioGroup, { RadioGroupRef, RadioOption } from './RadioGroup';

 const App = () => {
   const genderRef = useRef<RadioGroupRef>(null);
   const notificationRef = useRef<RadioGroupRef>(null);

   // 性别选项
   const genderOptions: RadioOption[] = [
     { label: '男', value: 'male' },
     { label: '女', value: 'female' },
     { label: '其他', value: 'other' },
     { label: '不愿透露', value: 'prefer-not-to-say', disabled: true }
   ];

   // 通知选项
   const notificationOptions: RadioOption[] = [
     {
       label: '实时通知',
       value: 'realtime',
       description: '所有重要更新都会立即通知您'
     },
     {
       label: '每日摘要',
       value: 'daily',
       description: '每天一次接收所有更新的摘要'
     },
     {
       label: '每周摘要',
       value: 'weekly',
       description: '每周一次接收所有更新的摘要'
     },
     {
       label: '不接收通知',
       value: 'none',
       description: '您将不会收到任何通知'
     }
   ];

   const [formData, setFormData] = useState({
     gender: '',
     notification: 'daily',
     theme: 'light'
   });

   const [errors, setErrors] = useState<Record<string, string>>({});

   const handleGenderChange = (value: string) => {
     setFormData(prev => ({ ...prev, gender: value }));
     if (errors.gender) {
       setErrors(prev => ({ ...prev, gender: '' }));
     }
   };

   const handleNotificationChange = (value: string) => {
     setFormData(prev => ({ ...prev, notification: value }));
   };

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();

     // 手动验证
     const isGenderValid = genderRef.current?.validate();

     if (isGenderValid) {
       console.log('表单提交:', formData);
       alert('表单提交成功!');
     } else {
       setErrors({ gender: '请选择性别' });
     }
   };

   const handleClear = () => {
     genderRef.current?.clear();
     notificationRef.current?.clear();
     setFormData({ gender: '', notification: 'daily', theme: 'light' });
     setErrors({});
   };

   return (
     <div style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
       <h2>用户偏好设置</h2>

       <form onSubmit={handleSubmit}>
         <RadioGroup
           ref={genderRef}
           name="gender"
           label="性别"
           options={genderOptions}
           value={formData.gender}
           required
           layout="horizontal"
           error={errors.gender}
           onChange={handleGenderChange}
         />

         <RadioGroup
           ref={notificationRef}
           name="notification"
           label="通知偏好"
           options={notificationOptions}
           value={formData.notification}
           layout="vertical"
           size="medium"
           onChange={handleNotificationChange}
         />

         <RadioGroup
           name="theme"
           label="主题偏好"
           options={[
             { label: '浅色主题', value: 'light' },
             { label: '深色主题', value: 'dark' },
             { label: '自动', value: 'auto' }
           ]}
           value={formData.theme}
           layout="horizontal"
           size="small"
           onChange={(value) => setFormData(prev => ({ ...prev, theme: value }))}
         />

         <div style={{ marginTop: 24 }}>
           <button type="submit" style={{ marginRight: 12 }}>
             保存设置
           </button>
           <button type="button" onClick={handleClear}>
             重置
           </button>
         </div>
       </form>

       <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5', borderRadius: 6 }}>
         <h3>当前选择:</h3>
         <pre>{JSON.stringify(formData, null, 2)}</pre>
       </div>
     </div>
   );
 };

 export default App;
```

## 组件特性

- 完整的类型安全: 使用TypeScript确保类型安全

- 单选组功能: 支持单选按钮组管理

- 多种布局: 水平和垂直布局选项

- 尺寸变体: 小、中、大三种尺寸

- 完整验证: 必填验证和错误提示

- 无障碍支持: 完整的ARIA属性支持

- 禁用状态: 支持整体禁用和单个选项禁用

- 丰富的事件: onChange、onFocus、onBlur等

- 描述文本: 支持选项描述信息

- 受控/非受控: 支持两种模式

- 完整的API: focus、validate、getValue等方法