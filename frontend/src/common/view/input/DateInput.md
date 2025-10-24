# DateInput 使用示例

```typescript jsx
import React, { useRef, useState } from 'react';
import DateInput, { DateInputRef, ValidationRule } from './DateInput';

const App = () => {
  const birthdayRef = useRef<DateInputRef>(null);
  const appointmentRef = useRef<DateInputRef>(null);

  // 验证规则
  const adultRule: ValidationRule[] = [
    {
      validator: (value, date) => {
        if (!date) return true;
        const today = new Date();
        const birthDate = new Date(date.year, date.month, date.day);
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18;
      },
      message: '必须年满18岁'
    }
  ];

  const [formData, setFormData] = useState({
    birthday: '',
    appointment: '',
    eventDate: '',
    startDate: '',
    anniversary: '2024-05-20'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBirthdayChange = (value: string, date: any) => {
    setFormData(prev => ({ ...prev, birthday: value }));
    if (errors.birthday) {
      setErrors(prev => ({ ...prev, birthday: '' }));
    }
    console.log('生日:', value, date);
  };

  const handleAppointmentChange = (value: string, date: any) => {
    setFormData(prev => ({ ...prev, appointment: value }));
    console.log('预约时间:', value, date);
  };

  const handleEventDateChange = (value: string, date: any) => {
    setFormData(prev => ({ ...prev, eventDate: value }));
  };

  const handleStartDateChange = (value: string, date: any) => {
    setFormData(prev => ({ ...prev, startDate: value }));
  };

  const handleAnniversaryChange = (value: string, date: any) => {
    setFormData(prev => ({ ...prev, anniversary: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 手动验证
    const isBirthdayValid = birthdayRef.current?.validate();
    
    if (isBirthdayValid) {
      console.log('表单数据:', formData);
      alert('表单提交成功!');
    } else {
      setErrors({ birthday: '请选择有效的生日日期' });
    }
  };

  const handleClearAll = () => {
    birthdayRef.current?.clear();
    appointmentRef.current?.clear();
    setFormData({
      birthday: '',
      appointment: '',
      eventDate: '',
      startDate: '',
      anniversary: '2024-05-20'
    });
    setErrors({});
  };

  const handleSetToToday = () => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    birthdayRef.current?.setValue(dateString);
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', padding: 20 }}>
      <h2>日期输入组件示例</h2>
      
      <form onSubmit={handleSubmit}>
        {/* 基础日期输入 */}
        <DateInput
          ref={birthdayRef}
          label="生日"
          placeholder="选择生日"
          value={formData.birthday}
          required
          minDate="1900-01-01"
          maxDate={new Date().toISOString().split('T')[0]}
          error={errors.birthday}
          validationRules={adultRule}
          onChange={handleBirthdayChange}
        />
        
        {/* 不同日期格式 */}
        <DateInput
          label="事件日期 (DD/MM/YYYY)"
          placeholder="DD/MM/YYYY"
          value={formData.eventDate}
          format="DD/MM/YYYY"
          onChange={handleEventDateChange}
        />
        
        <DateInput
          label="开始日期 (MM-DD-YYYY)"
          placeholder="MM-DD-YYYY"
          value={formData.startDate}
          format="MM-DD-YYYY"
          onChange={handleStartDateChange}
        />
        
        {/* 日期范围限制 */}
        <DateInput
          ref={appointmentRef}
          label="预约时间"
          placeholder="选择预约时间"
          value={formData.appointment}
          minDate={new Date().toISOString().split('T')[0]}
          maxDate="2024-12-31"
          onChange={handleAppointmentChange}
        />
        
        {/* 只读状态 */}
        <DateInput
          label="纪念日 (只读)"
          value={formData.anniversary}
          readOnly
          onChange={handleAnniversaryChange}
        />
        
        {/* 英文界面 */}
        <DateInput
          label="International Date"
          placeholder="Select date"
          value={formData.startDate}
          locale="en-US"
          format="MM/DD/YYYY"
          onChange={handleStartDateChange}
        />
        
        {/* 月份选择模式 */}
        <DateInput
          label="选择月份"
          placeholder="选择月份"
          mode="month"
          format="YYYY-MM"
          onChange={(value, date) => console.log('月份:', value, date)}
        />
        
        {/* 年份选择模式 */}
        <DateInput
          label="选择年份"
          placeholder="选择年份"
          mode="year"
          format="YYYY"
          onChange={(value, date) => console.log('年份:', value, date)}
        />
        
        <div style={{ marginTop: 24 }}>
          <button type="submit" style={{ marginRight: 12 }}>
            提交表单
          </button>
          <button type="button" onClick={handleClearAll} style={{ marginRight: 12 }}>
            清空所有
          </button>
          <button type="button" onClick={handleSetToToday}>
            设为今天
          </button>
        </div>
      </form>
      
      <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5', borderRadius: 6 }}>
        <h3>当前选择:</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
      
      <div style={{ marginTop: 24 }}>
        <h4>功能说明:</h4>
        <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <li>生日：必须选择，且必须年满18岁，限制在1900-01-01到今天之间</li>
          <li>事件日期：使用DD/MM/YYYY格式</li>
          <li>开始日期：使用MM-DD-YYYY格式</li>
          <li>预约时间：限制在今天到2024-12-31之间</li>
          <li>纪念日：只读状态，不可编辑</li>
          <li>国际日期：英文界面，MM/DD/YYYY格式</li>
          <li>月份选择：只选择年月</li>
          <li>年份选择：只选择年份</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
```

## 组件特性

**完整的类型安全:** 使用**TypeScript**确保类型安全

**多种日期格式:** 支持`YYYY-MM-DD`、`DD/MM/YYYY`、`MM-DD-YYYY`等多种格式

**多种选择模式:** 支持日期、月份、年份选择

**日期范围限制:** 支持最小和最大日期限制

**国际化支持:** 支持中英文界面

**完整验证:** 必填验证、格式验证、年龄验证等自定义验证规则

**多种交互方式:** 支持手动输入和选择器选择

**无障碍支持:** 完整的ARIA属性支持

**多种状态:** 支持禁用、只读状态

**丰富的事件:** `onChange`、`onFocus`、`onBlur`等

**受控/非受控:** 支持两种模式

**完整的API:** `focus`、`validate`、`getValue`、`setValue`、`clear`、`open`、`close`等方法

**用户体验优化:** 快速操作按钮（`今天`、`清除`）、`月份`/`年份`导航