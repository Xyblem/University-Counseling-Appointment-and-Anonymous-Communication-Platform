**CheckBox 使用示例**
```typescript jsx
import React, { useRef, useState } from 'react';
 import CheckboxGroup, { CheckboxGroupRef, CheckboxOption } from './CheckboxGroup';

 const App = () => {
   const hobbiesRef = useRef<CheckboxGroupRef>(null);
   const skillsRef = useRef<CheckboxGroupRef>(null);

   // 爱好选项
   const hobbyOptions: CheckboxOption[] = [
     { label: '阅读', value: 'reading' },
     { label: '运动', value: 'sports' },
     { label: '音乐', value: 'music' },
     { label: '旅行', value: 'travel' },
     { label: '烹饪', value: 'cooking' },
     { label: '游戏', value: 'gaming', disabled: true }
   ];

   // 技能选项
   const skillOptions: CheckboxOption[] = [
     {
       label: 'React',
       value: 'react',
       description: '用于构建用户界面的 JavaScript 库'
     },
     {
       label: 'TypeScript',
       value: 'typescript',
       description: 'JavaScript 的超集，添加了类型系统'
     },
     {
       label: 'Node.js',
       value: 'nodejs',
       description: '基于 Chrome V8 引擎的 JavaScript 运行环境'
     },
     {
       label: 'Python',
       value: 'python',
       description: '一种解释型、高级编程语言'
     }
   ];

   const [formData, setFormData] = useState({
     hobbies: ['reading', 'music'],
     skills: ['react', 'typescript'],
     notifications: []
   });

   const [errors, setErrors] = useState<Record<string, string>>({});

   const handleHobbiesChange = (value: string[]) => {
     setFormData(prev => ({ ...prev, hobbies: value }));
     if (errors.hobbies) {
       setErrors(prev => ({ ...prev, hobbies: '' }));
     }
   };

   const handleSkillsChange = (value: string[]) => {
     setFormData(prev => ({ ...prev, skills: value }));
   };

   const handleNotificationsChange = (value: string[]) => {
     setFormData(prev => ({ ...prev, notifications: value }));
   };

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();

     // 手动验证
     const isHobbiesValid = hobbiesRef.current?.validate();

     if (isHobbiesValid) {
       console.log('表单提交:', formData);
       alert('表单提交成功!');
     } else {
       setErrors({ hobbies: '请至少选择一个爱好' });
     }
   };

   const handleClear = () => {
     hobbiesRef.current?.clear();
     skillsRef.current?.clear();
     setFormData({ hobbies: [], skills: [], notifications: [] });
     setErrors({});
   };

   const handleSelectAllSkills = () => {
     skillsRef.current?.selectAll();
   };

   const handleDeselectAllSkills = () => {
     skillsRef.current?.deselectAll();
   };

   return (
     <div style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
       <h2>用户兴趣调查</h2>

       <form onSubmit={handleSubmit}>
         <CheckboxGroup
           ref={hobbiesRef}
           name="hobbies"
           label="兴趣爱好"
           options={hobbyOptions}
           value={formData.hobbies}
           required
           layout="horizontal"
           showSelectAll
           selectAllText="选择所有爱好"
           error={errors.hobbies}
           onChange={handleHobbiesChange}
         />

         <CheckboxGroup
           ref={skillsRef}
           name="skills"
           label="技术技能"
           options={skillOptions}
           value={formData.skills}
           layout="vertical"
           size="medium"
           showSelectAll
           selectAllText="全选技能"
           onChange={handleSkillsChange}
         />

         <CheckboxGroup
           name="notifications"
           label="通知设置"
           options={[
             { label: '邮件通知', value: 'email' },
             { label: '短信通知', value: 'sms' },
             { label: '推送通知', value: 'push' }
           ]}
           value={formData.notifications}
           layout="vertical"
           size="small"
           onChange={handleNotificationsChange}
         />

         <div style={{ marginTop: 24 }}>
           <button type="submit" style={{ marginRight: 12 }}>
             提交表单
           </button>
           <button type="button" onClick={handleClear} style={{ marginRight: 12 }}>
             清空选择
           </button>
           <button type="button" onClick={handleSelectAllSkills} style={{ marginRight: 12 }}>
             全选技能
           </button>
           <button type="button" onClick={handleDeselectAllSkills}>
             清空技能
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