**Select 使用示例**
```typescript jsx
import React, { useRef, useState } from 'react';
import Select, { SelectRef, SelectOption } from './Select';

const App = () => {
    const singleSelectRef = useRef<SelectRef>(null);
    const multiSelectRef = useRef<SelectRef>(null);

    // 基础选项
    const baseOptions: SelectOption[] = [
        { label: '苹果', value: 'apple' },
        { label: '香蕉', value: 'banana' },
        { label: '橙子', value: 'orange' },
        { label: '葡萄', value: 'grape', disabled: true },
        { label: '草莓', value: 'strawberry' },
        { label: '西瓜', value: 'watermelon' },
        { label: '菠萝', value: 'pineapple' },
        { label: '芒果', value: 'mango' },
    ];

    // 分组选项
    const groupedOptions: SelectOption[] = [
        { label: 'React', value: 'react', group: '前端' },
        { label: 'Vue', value: 'vue', group: '前端' },
        { label: 'Angular', value: 'angular', group: '前端' },
        { label: 'Node.js', value: 'nodejs', group: '后端' },
        { label: 'Python', value: 'python', group: '后端' },
        { label: 'Java', value: 'java', group: '后端' },
        { label: 'Go', value: 'go', group: '后端' },
    ];

    const [formData, setFormData] = useState({
        fruit: '',
        fruits: [],
        technology: [],
        category: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [asyncOptions, setAsyncOptions] = useState<SelectOption[]>([]);

    // 处理单选变化
    const handleSingleChange = (value: string, selectedOptions: SelectOption[]) => {
        setFormData(prev => ({ ...prev, fruit: value }));
        if (errors.fruit) {
            setErrors(prev => ({ ...prev, fruit: '' }));
        }
    };

    // 处理多选变化
    const handleMultiChange = (value: string[], selectedOptions: SelectOption[]) => {
        setFormData(prev => ({ ...prev, fruits: value }));
        if (errors.fruits) {
            setErrors(prev => ({ ...prev, fruits: '' }));
        }
    };

    // 处理技术选择变化
    const handleTechChange = (value: string[], selectedOptions: SelectOption[]) => {
        setFormData(prev => ({ ...prev, technology: value }));
    };

    // 处理分类变化
    const handleCategoryChange = (value: string, selectedOptions: SelectOption[]) => {
        setFormData(prev => ({ ...prev, category: value }));
    };

    // 模拟异步加载数据
    const handleAsyncSearch = (query: string) => {
        if (query.length < 2) return;

        setLoading(true);

        // 模拟API调用
        setTimeout(() => {
            const mockData: SelectOption[] = [
                { label: `搜索结果 1 - ${query}`, value: `result-1-${query}` },
                { label: `搜索结果 2 - ${query}`, value: `result-2-${query}` },
                { label: `搜索结果 3 - ${query}`, value: `result-3-${query}` },
            ];

            setAsyncOptions(mockData);
            setLoading(false);
        }, 1000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 手动验证
        const isFruitValid = singleSelectRef.current?.validate();
        const isFruitsValid = multiSelectRef.current?.validate();

        if (isFruitValid && isFruitsValid) {
            console.log('表单提交:', formData);
            alert('表单提交成功!');
        } else {
            setErrors({
                fruit: !formData.fruit ? '请选择最喜欢的水果' : '',
                fruits: formData.fruits.length === 0 ? '请至少选择一种水果' : ''
            });
        }
    };

    const handleClearAll = () => {
        singleSelectRef.current?.clear();
        multiSelectRef.current?.clear();
        setFormData({ fruit: '', fruits: [], technology: [], category: '' });
        setErrors({});
    };

    // 自定义选项渲染
    const customOptionRender = (option: SelectOption) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span>{option.label}</span>
            <span style={{ fontSize: '12px', color: '#8c8c8c' }}>{option.value}</span>
        </div>
    );

    // 自定义标签渲染
    const customTagRender = (option: SelectOption, onClose: () => void) => (
        <span style={{
            background: '#1890ff',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center'
        }}>
      {option.label}
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    marginLeft: '4px',
                    cursor: 'pointer'
                }}
            >
        ×
      </button>
    </span>
    );

    return (
        <div style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
            <h2>下拉菜单示例</h2>

            <form onSubmit={handleSubmit}>
                {/* 基础单选 */}
                <Select
                    ref={singleSelectRef}
                    label="最喜欢的水果"
                    options={baseOptions}
                    value={formData.fruit}
                    placeholder="请选择一种水果"
                    required
                    error={errors.fruit}
                    onChange={handleSingleChange}
                />

                {/* 基础多选 */}
                <Select
                    ref={multiSelectRef}
                    mode="multiple"
                    label="喜欢的水果 (多选)"
                    options={baseOptions}
                    value={formData.fruits}
                    placeholder="请选择多种水果"
                    required
                    showSelectAll
                    maxTagCount={2}
                    error={errors.fruits}
                    onChange={handleMultiChange}
                />

                {/* 分组选择 */}
                <Select
                    mode="multiple"
                    label="技术栈"
                    options={groupedOptions}
                    value={formData.technology}
                    placeholder="请选择技术栈"
                    groupBy="group"
                    showSelectAll
                    onChange={handleTechChange}
                />

                {/* 搜索选择 */}
                <Select
                    label="分类搜索"
                    options={baseOptions}
                    value={formData.category}
                    placeholder="请输入关键词搜索"
                    searchable
                    clearable
                    onChange={handleCategoryChange}
                />

                {/* 异步搜索 */}
                <Select
                    mode="multiple"
                    label="异步搜索"
                    options={asyncOptions}
                    placeholder="输入至少2个字符进行搜索"
                    searchable
                    loading={loading}
                    onSearch={handleAsyncSearch}
                />

                {/* 自定义渲染 */}
                <Select
                    mode="multiple"
                    label="自定义渲染"
                    options={baseOptions}
                    placeholder="选择水果"
                    optionRender={customOptionRender}
                    tagRender={customTagRender}
                    showSelectAll
                />

                <div style={{ marginTop: 24 }}>
                    <button type="submit" style={{ marginRight: 12 }}>
                        提交表单
                    </button>
                    <button type="button" onClick={handleClearAll}>
                        清空所有
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