**InputField 使用示例**
```typescript jsx

 import React, { useRef, useState } from 'react';
 import EnhancedInput, { EnhancedInputRef, Option } from './EnhancedInput';

 const App = () => {
   const emailRef = useRef<EnhancedInputRef>(null);
   const [formData, setFormData] = useState({
     email: '',
     gender: '',
     interests: [] as string[],
     country: '',
     newsletter: false
   });

   // 性别选项
   const genderOptions: Option[] = [
     { label: '男', value: 'male' },
     { label: '女', value: 'female' },
     { label: '其他', value: 'other' }
   ];

   // 兴趣选项
   const interestOptions: Option[] = [
     { label: '阅读', value: 'reading' },
     { label: '运动', value: 'sports' },
     { label: '音乐', value: 'music' },
     { label: '旅行', value: 'travel' }
   ];

   // 国家选项
   const countryOptions: Option[] = [
     { label: '中国', value: 'cn' },
     { label: '美国', value: 'us' },
     { label: '英国', value: 'uk' },
     { label: '日本', value: 'jp' }
   ];

   const handleInputChange = (field: string) => (value: string | string[]) => {
     setFormData(prev => ({ ...prev, [field]: value }));
   };

   const handleSubmit = () => {
     // 手动验证所有字段
     const isEmailValid = emailRef.current?.validate();

     if (isEmailValid) {
       console.log('表单数据:', formData);
       alert('表单提交成功!');
     } else {
       alert('请检查表单错误!');
     }
   };

   return (
     <div style={{ maxWidth: 500, margin: '50px auto', padding: 20 }}>
       <h2>用户信息表单</h2>

       <EnhancedInput
         ref={emailRef}
         type="email"
         label="邮箱地址"
         placeholder="请输入邮箱地址"
         value={formData.email}
         onChange={handleInputChange('email')}
         required
         validationRules={[
           {
             pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
             message: '请输入有效的邮箱地址'
           }
         ]}
       />

       <EnhancedInput
         type="radio"
         label="性别"
         name="gender"
         options={genderOptions}
         value={formData.gender}
         onChange={handleInputChange('gender')}
         required
       />

       <EnhancedInput
         type="checkbox"
         label="兴趣爱好"
         name="interests"
         options={interestOptions}
         value={formData.interests}
         onChange={handleInputChange('interests')}
       />

       <EnhancedInput
         type="select"
         label="国家"
         placeholder="请选择国家"
         options={countryOptions}
         value={formData.country}
         onChange={handleInputChange('country')}
         required
       />

       <EnhancedInput
         type="checkbox"
         label="订阅新闻通讯"
         value={formData.newsletter ? 'true' : ''}
         onChange={(value) => setFormData(prev => ({
           ...prev,
           newsletter: value === 'true'
         }))}
       />

       <div style={{ marginTop: 20 }}>
         <button
           onClick={handleSubmit}
           style={{
             padding: '10px 20px',
             backgroundColor: '#1890ff',
             color: 'white',
             border: 'none',
             borderRadius: 4,
             cursor: 'pointer'
           }}
         >
           提交
         </button>
       </div>

       <div style={{ marginTop: 20, padding: 10, background: '#f5f5f5' }}>
         <h3>当前表单数据:</h3>
         <pre>{JSON.stringify(formData, null, 2)}</pre>
       </div>
     </div>
   );
 };

 export default App;

```