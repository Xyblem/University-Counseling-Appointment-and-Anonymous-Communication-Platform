import React, {
    useState,
    useEffect,
    useRef,
    useId,
    forwardRef,
    useImperativeHandle,
    useMemo,
    useCallback
} from 'react';
import './Select.css';

// 下拉菜单选项类型
export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
    group?: string;
    [key: string]: any; // 允许额外属性
}

// 下拉菜单组件属性
export interface SelectProps {
    mode?: 'single' | 'multiple';
    value?: string | string[];
    defaultValue?: string | string[];
    options: SelectOption[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    showSelectAll?: boolean;
    groupBy?: string;
    virtualScroll?: boolean;
    virtualScrollItemSize?: number;
    maxTagCount?: number;
    loading?: boolean;
    error?: string;
    className?: string;
    style?: React.CSSProperties;
    optionRender?: (option: SelectOption) => React.ReactNode;
    tagRender?: (option: SelectOption, onClose: () => void) => React.ReactNode;
    onChange?: (value: string | string[], selectedOptions: SelectOption[]) => void;
    onSearch?: (query: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onDropdownVisibleChange?: (visible: boolean) => void;
}

// 下拉菜单引用方法
export interface SelectRef {
    focus: () => void;
    blur: () => void;
    validate: () => boolean;
    getValue: () => string | string[];
    setValue: (value: string | string[]) => void;
    clear: () => void;
    open: () => void;
    close: () => void;
}

export const Select = forwardRef<SelectRef, SelectProps>((props, ref) => {
    const {
        mode = 'single',
        value: controlledValue,
        defaultValue = mode === 'multiple' ? [] : '',
        options,
        placeholder = '请选择',
        label,
        disabled = false,
        required = false,
        searchable = false,
        clearable = true,
        showSelectAll = false,
        groupBy,
        virtualScroll = false,
        virtualScrollItemSize = 32,
        maxTagCount = 3,
        loading = false,
        error: externalError,
        className = '',
        style,
        optionRender,
        tagRender,
        onChange,
        onSearch,
        onFocus,
        onBlur,
        onDropdownVisibleChange,
    } = props;

    // 状态管理
    const [internalValue, setInternalValue] = useState<string | string[]>(
        controlledValue !== undefined ? controlledValue : defaultValue
    );
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [internalError, setInternalError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);
    const [visibleStartIndex, setVisibleStartIndex] = useState(0);

    // 引用
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // 生成唯一ID
    const selectId = useId();
    const errorId = `${selectId}-error`;

    // 受控/非受控值处理
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    // 错误显示（优先显示外部错误）
    const error = externalError || internalError;

    // 处理分组
    const groupedOptions = useMemo(() => {
        if (!groupBy) return { '': options };

        return options.reduce((acc, option) => {
            const group = option.group || '';
            if (!acc[group]) acc[group] = [];
            acc[group].push(option);
            return acc;
        }, {} as Record<string, SelectOption[]>);
    }, [options, groupBy]);

    // 过滤选项（基于搜索）
    const filteredOptions = useMemo(() => {
        if (!searchQuery) return options;

        return options.filter(option =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [options, searchQuery]);

    // 获取选中的选项
    const selectedOptions = useMemo(() => {
        if (mode === 'single') {
            return options.filter(option => option.value === value);
        } else {
            return options.filter(option => (value as string[]).includes(option.value));
        }
    }, [options, value, mode]);

    // 判断是否全选
    const isAllSelected = useMemo(() => {
        if (mode !== 'multiple') return false;
        const selectableOptions = options.filter(option => !option.disabled);
        return selectableOptions.length > 0 &&
            (value as string[]).length === selectableOptions.length;
    }, [options, value, mode]);

    // 判断是否部分选择
    const isSomeSelected = useMemo(() => {
        if (mode !== 'multiple') return false;
        const selectableOptions = options.filter(option => !option.disabled);
        return (value as string[]).length > 0 &&
            (value as string[]).length < selectableOptions.length;
    }, [options, value, mode]);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current?.focus();
        },
        blur: () => {
            inputRef.current?.blur();
        },
        validate: () => validateInput(value),
        getValue: () => value,
        setValue: (newValue: string | string[]) => {
            if (controlledValue === undefined) {
                setInternalValue(newValue);
            }
            if (onChange) {
                const selected = options.filter(option =>
                    mode === 'single'
                        ? option.value === newValue
                        : (newValue as string[]).includes(option.value)
                );
                onChange(newValue, selected);
            }
        },
        clear: () => {
            const newValue = mode === 'single' ? '' : [];
            if (controlledValue === undefined) {
                setInternalValue(newValue);
            }
            if (onChange) {
                onChange(newValue, []);
            }
            setInternalError(null);
        },
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }));

    // 验证输入
    const validateInput = (val: string | string[]): boolean => {
        if (disabled) return true;

        // 必填验证
        if (required) {
            if (mode === 'single' && !val) {
                setInternalError('请选择一个选项');
                return false;
            }
            if (mode === 'multiple' && (val as string[]).length === 0) {
                setInternalError('请至少选择一个选项');
                return false;
            }
        }

        setInternalError(null);
        return true;
    };

    // 处理选择变化
    const handleSelect = (option: SelectOption) => {
        if (option.disabled) return;

        let newValue: string | string[];
        let newSelectedOptions: SelectOption[] = [];

        if (mode === 'single') {
            newValue = option.value;
            newSelectedOptions = [option];
            setIsOpen(false);
            setSearchQuery('');
        } else {
            const currentValue = value as string[];
            if (currentValue.includes(option.value)) {
                newValue = currentValue.filter(val => val !== option.value);
                newSelectedOptions = selectedOptions.filter(opt => opt.value !== option.value);
            } else {
                newValue = [...currentValue, option.value];
                newSelectedOptions = [...selectedOptions, option];
            }
        }

        // 更新内部状态（如果是非受控组件）
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        // 调用外部onChange
        if (onChange) {
            onChange(newValue, newSelectedOptions);
        }

        // 如果已经触摸过，进行验证
        if (touched) {
            validateInput(newValue);
        }
    };

    // 处理全选
    const handleSelectAll = () => {
        if (mode !== 'multiple') return;

        const selectableOptions = options.filter(option => !option.disabled);
        const newValue = selectableOptions.map(option => option.value);

        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        if (onChange) {
            onChange(newValue, selectableOptions);
        }

        if (touched) {
            validateInput(newValue);
        }
    };

    // 处理清除
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();

        const newValue = mode === 'single' ? '' : [];

        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        if (onChange) {
            onChange(newValue, []);
        }

        setInternalError(null);
    };

    // 处理搜索
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (onSearch) {
            onSearch(query);
        }
    };

    // 处理焦点事件
    const handleFocus = () => {
        setIsFocused(true);
        if (!disabled) {
            setIsOpen(true);
        }
        if (onFocus) onFocus();
        if (onDropdownVisibleChange) onDropdownVisibleChange(true);
    };

    // 处理失去焦点事件
    const handleBlur = () => {
        setIsFocused(false);
        setTouched(true);
        validateInput(value);
        if (onBlur) onBlur();
    };

    // 点击外部关闭下拉框
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                if (onDropdownVisibleChange) onDropdownVisibleChange(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onDropdownVisibleChange]);

    // 当下拉框打开时聚焦搜索输入框
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen, searchable]);

    // 当受控值变化时验证
    useEffect(() => {
        if (touched) {
            validateInput(value);
        }
    }, [value, touched]);

    // 构建显示文本
    const displayText = useMemo(() => {
        if (mode === 'single') {
            const selected = selectedOptions[0];
            return selected ? selected.label : '';
        } else {
            if (selectedOptions.length === 0) return '';

            if (selectedOptions.length <= maxTagCount) {
                return selectedOptions.map(opt => opt.label).join(', ');
            } else {
                return `${selectedOptions.length} 项已选择`;
            }
        }
    }, [selectedOptions, mode, maxTagCount]);

    // 构建标签显示
    const renderTags = () => {
        if (mode !== 'multiple' || selectedOptions.length === 0) return null;

        const visibleTags = selectedOptions.slice(0, maxTagCount);
        const remainingCount = selectedOptions.length - maxTagCount;

        return (
            <div className="select-tags">
                {visibleTags.map(option => (
                    tagRender ? (
                        tagRender(option, () => handleSelect(option))
                    ) : (
                        <span key={option.value} className="select-tag">
              {option.label}
                            <button
                                type="button"
                                className="select-tag-close"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(option);
                                }}
                            >
                ×
              </button>
            </span>
                    )
                ))}
                {remainingCount > 0 && (
                    <span className="select-tag-more">+{remainingCount}</span>
                )}
            </div>
        );
    };

    // 渲染选项
    const renderOption = (option: SelectOption) => {
        const isSelected = mode === 'single'
            ? value === option.value
            : (value as string[]).includes(option.value);

        if (optionRender) {
            return optionRender(option);
        }

        return (
            <div
                key={option.value}
                className={[
                    'select-option',
                    isSelected && 'select-option--selected',
                    option.disabled && 'select-option--disabled'
                ].filter(Boolean).join(' ')}
                onClick={() => handleSelect(option)}
            >
                {mode === 'multiple' && (
                    <span className="select-option-checkbox">
            {isSelected && (
                <svg viewBox="0 0 12 10" width="12" height="10">
                    <path d="M1 5L4 8L11 1" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
            )}
          </span>
                )}
                <span className="select-option-label">{option.label}</span>
            </div>
        );
    };

    // 渲染下拉内容
    const renderDropdownContent = () => {
        if (loading) {
            return <div className="select-loading">加载中...</div>;
        }

        if (filteredOptions.length === 0) {
            return <div className="select-no-data">暂无数据</div>;
        }

        if (groupBy) {
            return Object.entries(groupedOptions).map(([group, groupOptions]) => (
                <div key={group} className="select-group">
                    {group && <div className="select-group-label">{group}</div>}
                    <div className="select-group-options">
                        {groupOptions.map(renderOption)}
                    </div>
                </div>
            ));
        }

        return (
            <>
                {mode === 'multiple' && showSelectAll && (
                    <div
                        className={[
                            'select-option',
                            'select-option--select-all',
                            isAllSelected && 'select-option--selected'
                        ].filter(Boolean).join(' ')}
                        onClick={handleSelectAll}
                    >
            <span className="select-option-checkbox">
              {isSomeSelected && !isAllSelected && (
                  <span className="select-option-indeterminate" />
              )}
                {isAllSelected && (
                    <svg viewBox="0 0 12 10" width="12" height="10">
                        <path d="M1 5L4 8L11 1" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                )}
            </span>
                        <span className="select-option-label">全选</span>
                    </div>
                )}
                {filteredOptions.map(renderOption)}
            </>
        );
    };

    // 构建CSS类名
    const containerClasses = [
        'select-container',
        `select--${mode}`,
        disabled && 'select--disabled',
        isOpen && 'select--open',
        isFocused && 'select--focused',
        error && 'select--error',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses} style={style} ref={containerRef}>
            {label && (
                <label className="select-label" htmlFor={selectId}>
                    {label}
                    {required && <span className="select-required">*</span>}
                </label>
            )}

            <div
                className="select-trigger"
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className="select-value">
                    {mode === 'multiple' ? renderTags() : (
                        <span className={displayText ? 'select-value-text' : 'select-placeholder'}>
              {displayText || placeholder}
            </span>
                    )}

                    {searchable && isOpen && (
                        <input
                            ref={searchInputRef}
                            type="text"
                            className="select-search-input"
                            value={searchQuery}
                            onChange={handleSearch}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="搜索..."
                        />
                    )}

                    <input
                        ref={inputRef}
                        id={selectId}
                        type="text"
                        readOnly={!searchable || !isOpen}
                        className="select-input"
                        value={mode === 'single' ? displayText : ''}
                        //placeholder={placeholder}
                        disabled={disabled}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={searchable ? handleSearch : undefined}
                    />
                </div>

                <div className="select-suffix">
                    {clearable && value && (mode === 'single' ? value : (value as string[]).length > 0) && (
                        <button
                            type="button"
                            className="select-clear"
                            onClick={handleClear}
                            disabled={disabled}
                        >
                            ×
                        </button>
                    )}
                    <span className="select-arrow">
            <svg viewBox="0 0 12 8" width="12" height="8">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </span>
                </div>
            </div>

            {isOpen && !disabled && (
                <div className="select-dropdown" ref={dropdownRef}>
                    <div className="select-dropdown-content">
                        {renderDropdownContent()}
                    </div>
                </div>
            )}

            {error && (
                <div id={errorId} className="select-error">
                    {error}
                </div>
            )}
        </div>
    );
});

// 设置显示名称
Select.displayName = 'Select';

