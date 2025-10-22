# Textarea 使用示例

```typescript jsx
import React, { useRef, useState } from 'react';
import Textarea, { TextareaRef, ValidationRule } from './Textarea';

const App = () => {
  const commentRef = useRef<TextareaRef>(null);
  const bioRef = useRef<TextareaRef>(null);

  // 评论验证规则
  const commentRules: ValidationRule[] = [
    {
      required: true,
      message: '请输入评论内容'
    },
    {
      minLength: 10,
      message: '评论至少需要10个字符'
    },
    {
      maxLength: 500,
      message: '评论不能超过500个字符'
    }
  ];

  // 简介验证规则
  const bioRules: ValidationRule[] = [
    {
      validator: (value) => !value.includes('广告') && !value.includes('推广'),
      message: '简介中不能包含广告或推广内容'
    }
  ];

  const [formData, setFormData] = useState({
    comment: '',
    bio: '',
    feedback: '',
    notes: '这是只读的文本域，用户无法编辑。'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCommentChange = (value: string) => {
    setFormData(prev => ({ ...prev, comment: value }));
    if (errors.comment) {
      setErrors(prev => ({ ...prev, comment: '' }));
    }
  };

  const handleBioChange = (value: string) => {
    setFormData(prev => ({ ...prev, bio: value }));
    if (errors.bio) {
      setErrors(prev => ({ ...prev, bio: '' }));
    }
  };

  const handleFeedbackChange = (value: string) => {
    setFormData(prev => ({ ...prev, feedback: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 手动验证
    const isCommentValid = commentRef.current?.validate();
    const isBioValid = bioRef.current?.validate();
    
    if (isCommentValid && isBioValid) {
      console.log('表单提交:', formData);
      alert('表单提交成功!');
    } else {
      setErrors({ 
        comment: !formData.comment ? '请输入评论内容' : 
                 formData.comment.length < 10 ? '评论至少需要10个字符' : '',
        bio: formData.bio.includes('广告') || formData.bio.includes('推广') ? 
             '简介中不能包含广告或推广内容' : ''
      });
    }
  };

  const handleClear = () => {
    commentRef.current?.clear();
    bioRef.current?.clear();
    setFormData(prev => ({ ...prev, comment: '', bio: '', feedback: '' }));
    setErrors({});
  };

  const handleResize = () => {
    commentRef.current?.resize();
    bioRef.current?.resize();
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
      <h2>多行输入组件示例</h2>
      
      <form onSubmit={handleSubmit}>
        {/* 基础多行输入 */}
        <Textarea
          ref={commentRef}
          label="评论"
          placeholder="请输入您的评论..."
          value={formData.comment}
          required
          minRows={3}
          maxRows={8}
          maxLength={500}
          showCount
          countMode="remaining"
          resize="vertical"
          validationRules={commentRules}
          error={errors.comment}
          onChange={handleCommentChange}
        />
        
        {/* 自适应高度 */}
        <Textarea
          ref={bioRef}
          label="个人简介"
          placeholder="请输入您的个人简介..."
          value={formData.bio}
          minRows={2}
          maxRows={6}
          showCount
          countMode="entered"
          resize="none"
          validationRules={bioRules}
          error={errors.bio}
          onChange={handleBioChange}
        />
        
        {/* 禁用状态 */}
        <Textarea
          label="反馈意见 (禁用)"
          placeholder="此输入框已被禁用"
          value={formData.feedback}
          disabled
          onChange={handleFeedbackChange}
        />
        
        {/* 只读状态 */}
        <Textarea
          label="备注信息 (只读)"
          value={formData.notes}
          readOnly
          rows={2}
        />
        
        {/* 水平调整 */}
        <Textarea
          label="可水平调整的文本域"
          placeholder="您可以水平调整此文本域的大小..."
          rows={3}
          resize="horizontal"
        />
        
        {/* 双向调整 */}
        <Textarea
          label="可双向调整的文本域"
          placeholder="您可以任意调整此文本域的大小..."
          rows={3}
          resize="both"
        />
        
        <div style={{ marginTop: 24 }}>
          <button type="submit" style={{ marginRight: 12 }}>
            提交表单
          </button>
          <button type="button" onClick={handleClear} style={{ marginRight: 12 }}>
            清空内容
          </button>
          <button type="button" onClick={handleResize}>
            重新调整高度
          </button>
        </div>
      </form>
      
      <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5', borderRadius: 6 }}>
        <h3>当前内容:</h3>
        <div style={{ whiteSpace: 'pre-wrap' }}>
          <strong>评论:</strong> {formData.comment || '(空)'}
          {'\n\n'}
          <strong>简介:</strong> {formData.bio || '(空)'}
          {'\n\n'}
          <strong>反馈:</strong> {formData.feedback || '(空)'}
        </div>
      </div>
    </div>
  );
};

export default App;
```

## 组件特性

**完整的类型安全:** 使用**TypeScript**确保类型安全

**自适应高度:** 根据内容自动调整高度，支持最小和最大行数限制

**字数统计:** 支持显示已输入字符数或剩余字符数

**多种调整模式:** 支持垂直、水平、双向和禁止调整

**完整验证:** 必填验证、长度限制和自定义验证规则

**多种状态:** 支持禁用、只读状态

**无障碍支持:** 完整的ARIA属性支持

**丰富的事件:** `onChange`、`onFocus`、`onBlur`、`onKeyDown`、`onKeyUp`等

**受控/非受控:** 支持两种模式

**完整的API:** `focus`、`validate`、`getValue`、`setValue`、`clear`、`resize`等方法

**性能优化:** 使用`useCallback`和`useRef`优化性能