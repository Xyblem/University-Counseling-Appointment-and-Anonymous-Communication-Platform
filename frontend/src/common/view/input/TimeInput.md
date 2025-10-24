# TimeInput 使用示例

```typescript jsx
import React, { useRef, useState } from 'react';
import TimeInput, { TimeInputRef, ValidationRule } from './TimeInput';

const App = () => {
  const meetingTimeRef = useRef<TimeInputRef>(null);
  const workoutTimeRef = useRef<TimeInputRef>(null);

  // 验证规则
  const businessHoursRule: ValidationRule[] = [
    {
      validator: (value, time) => {
        if (!time) return true;
        return time.hour >= 9 && time.hour < 18;
      },
      message: '请选择工作时间（9:00 - 18:00）'
    }
  ];

  const [schedule, setSchedule] = useState({
    meetingTime: '',
    workoutTime: '18:30',
    breakTime: '',
    deadline: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleMeetingTimeChange = (value: string, time: any) => {
    setSchedule(prev => ({ ...prev, meetingTime: value }));
    if (errors.meetingTime) {
      setErrors(prev => ({ ...prev, meetingTime: '' }));
    }
    console.log('会议时间:', value, time);
  };

  const handleWorkoutTimeChange = (value: string, time: any) => {
    setSchedule(prev => ({ ...prev, workoutTime: value }));
    console.log('锻炼时间:', value, time);
  };

  const handleBreakTimeChange = (value: string, time: any) => {
    setSchedule(prev => ({ ...prev, breakTime: value }));
  };

  const handleDeadlineChange = (value: string, time: any) => {
    setSchedule(prev => ({ ...prev, deadline: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 手动验证
    const isMeetingTimeValid = meetingTimeRef.current?.validate();
    
    if (isMeetingTimeValid) {
      console.log('日程安排:', schedule);
      alert('日程保存成功!');
    } else {
      setErrors({ meetingTime: '请选择有效的会议时间' });
    }
  };

  const handleClearAll = () => {
    meetingTimeRef.current?.clear();
    workoutTimeRef.current?.clear();
    setSchedule({
      meetingTime: '',
      workoutTime: '',
      breakTime: '',
      deadline: ''
    });
    setErrors({});
  };

  const handleSetToNow = () => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    meetingTimeRef.current?.setValue(timeString);
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', padding: 20 }}>
      <h2>日程安排</h2>
      
      <form onSubmit={handleSubmit}>
        {/* 基础时间输入 */}
        <TimeInput
          ref={meetingTimeRef}
          label="会议时间"
          placeholder="选择会议时间"
          value={schedule.meetingTime}
          required
          minuteStep={5}
          error={errors.meetingTime}
          validationRules={businessHoursRule}
          onChange={handleMeetingTimeChange}
        />
        
        {/* 12小时制 */}
        <TimeInput
          label="休息时间 (12小时制)"
          placeholder="选择休息时间"
          value={schedule.breakTime}
          use12Hours
          onChange={handleBreakTimeChange}
        />
        
        {/* 带秒钟显示 */}
        <TimeInput
          label="截止时间 (精确到秒)"
          placeholder="选择截止时间"
          value={schedule.deadline}
          showSeconds
          secondStep={5}
          onChange={handleDeadlineChange}
        />
        
        {/* 时间范围限制 */}
        <TimeInput
          ref={workoutTimeRef}
          label="锻炼时间"
          placeholder="选择锻炼时间"
          value={schedule.workoutTime}
          minTime="06:00"
          maxTime="22:00"
          onChange={handleWorkoutTimeChange}
        />
        
        {/* 禁用状态 */}
        <TimeInput
          label="固定时间 (只读)"
          value="09:00"
          readOnly
        />
        
        {/* 自定义分钟步长 */}
        <TimeInput
          label="自定义步长 (15分钟)"
          placeholder="选择时间"
          minuteStep={15}
          onChange={(value, time) => console.log('自定义步长:', value, time)}
        />
        
        <div style={{ marginTop: 24 }}>
          <button type="submit" style={{ marginRight: 12 }}>
            保存日程
          </button>
          <button type="button" onClick={handleClearAll} style={{ marginRight: 12 }}>
            清空所有
          </button>
          <button type="button" onClick={handleSetToNow}>
            设为当前时间
          </button>
        </div>
      </form>
      
      <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5', borderRadius: 6 }}>
        <h3>当前日程:</h3>
        <pre>{JSON.stringify(schedule, null, 2)}</pre>
      </div>
      
      <div style={{ marginTop: 24 }}>
        <h4>功能说明:</h4>
        <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <li>会议时间：必须选择，且必须在工作时间（9:00-18:00）</li>
          <li>休息时间：使用12小时制显示</li>
          <li>截止时间：精确到秒，每5秒一个选项</li>
          <li>锻炼时间：限制在6:00-22:00之间</li>
          <li>固定时间：只读状态，不可编辑</li>
          <li>自定义步长：分钟选项每15分钟一个</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
```



## 组件特性

**完整的类型安全:** 使用**TypeScript**确保类型安全

**多种时间格式:** 支持**12小时制**和**24小时制**

**精确度控制:** 支持显示秒钟和自定义步长

**时间范围限制:** 支持最小和最大时间限制

**完整验证:** 必填验证、格式验证和自定义验证规则

**多种交互方式:** 支持手动输入和选择器选择

**无障碍支持:** 完整的ARIA属性支持

**多种状态:** 支持禁用、只读状态

**丰富的事件:** onChange、onFocus、onBlur等

**受控/非受控:** 支持两种模式

**完整的API:** `focus`、`validate`、`getValue`、`setValue`、`clear`、`open`、`close`等方法

**用户体验优化:** 快速操作按钮（`现在`、`清除`）
