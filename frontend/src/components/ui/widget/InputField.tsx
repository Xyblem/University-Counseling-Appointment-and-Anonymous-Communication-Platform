import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import './InputField.css';

// 输入框类型定义
export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'radio' | 'checkbox' | 'select';

// 选项类型
export interface Option {
    label: string;
    value: string;
    disabled?: boolean;
}

// 验证规则类型
export interface ValidationRule {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    validator?: (value: string | string[]) => boolean;
    message?: string;
}

// 输入框组件属性
export interface InputProps {
    type?: InputType;
    value?: string | string[];
    defaultValue?: string | string[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    className?: string;
    style?: React.CSSProperties;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    options?: Option[]; // 用于radio、checkbox和select
    name?: string; // 用于radio和checkbox分组
    validationRules?: ValidationRule[];
    onChange?: (value: string | string[], event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

// 输入框引用方法
export interface InputRef {
    focus: () => void;
    blur: () => void;
    validate: () => boolean;
    getValue: () => string | string[];
    setValue: (value: string | string[]) => void;
    clear: () => void;
}

export const InputField = forwardRef<InputRef, InputProps>((props, ref) => {
    const {
        type = 'text',
        value: controlledValue,
        defaultValue = '',
        placeholder,
        label,
        disabled = false,
        required = false,
        readOnly = false,
        autoFocus = false,
        autoComplete = 'off',
        className = '',
        style,
        prefix,
        suffix,
        options = [],
        name,
        validationRules = [],
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
    } = props;

    // 状态管理
    const [internalValue, setInternalValue] = useState<string | string[]>(
        controlledValue !== undefined ? controlledValue : defaultValue
    );
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);

    // 引用
    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    // 受控/非受控值处理
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        focus: () => {
            if (type === 'select' && selectRef.current) {
                selectRef.current.focus();
            } else if (inputRef.current) {
                inputRef.current.focus();
            }
        },
        blur: () => {
            if (type === 'select' && selectRef.current) {
                selectRef.current.blur();
            } else if (inputRef.current) {
                inputRef.current.blur();
            }
        },
        validate: () => validateInput(value),
        getValue: () => value,
        setValue: (newValue: string | string[]) => {
            if (controlledValue === undefined) {
                setInternalValue(newValue);
            }
            if (onChange) {
                const event = {
                    target: { value: newValue }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(newValue, event);
            }
        },
        clear: () => {
            const clearValue = type === 'checkbox' ? [] : '';
            if (controlledValue === undefined) {
                setInternalValue(clearValue);
            }
            if (onChange) {
                const event = {
                    target: { value: clearValue }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(clearValue, event);
            }
            setError(null);
        }
    }));

    // 验证输入
    const validateInput = (val: string | string[]): boolean => {
        if (disabled) return true;

        // 必填验证
        if (required) {
            if (type === 'checkbox') {
                if (!Array.isArray(val) || val.length === 0) {
                    setError('至少需要选择一个选项');
                    return false;
                }
            } else {
                if (!val || (typeof val === 'string' && !val.trim())) {
                    setError('此字段为必填项');
                    return false;
                }
            }
        }

        // 自定义验证规则
        for (const rule of validationRules) {
            if (rule.required) {
                if (type === 'checkbox') {
                    if (!Array.isArray(val) || val.length === 0) {
                        setError(rule.message || '至少需要选择一个选项');
                        return false;
                    }
                } else {
                    if (!val || (typeof val === 'string' && !val.trim())) {
                        setError(rule.message || '此字段为必填项');
                        return false;
                    }
                }
            }

            if (rule.minLength && typeof val === 'string' &&val.length>0&&val.length < rule.minLength) {
                setError(rule.message || `至少需要${rule.minLength}个字符`);
                return false;
            }

            if (rule.maxLength && typeof val === 'string' && val.length > rule.maxLength) {
                setError(rule.message || `不能超过${rule.maxLength}个字符`);
                return false;
            }

            if (rule.pattern && typeof val === 'string' && !rule.pattern.test(val)) {
                setError(rule.message || '格式不正确');
                return false;
            }

            if (rule.validator && !rule.validator(val)) {
                setError(rule.message || '验证失败');
                return false;
            }
        }

        setError(null);
        return true;
    };

    // 处理文本输入变化
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        if (onChange) {
            onChange(newValue, event);
        }

        if (touched) {
            validateInput(newValue);
        }
    };

    // 处理单选变化
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        if (onChange) {
            onChange(newValue, event);
        }

        if (touched) {
            validateInput(newValue);
        }
    };

    // 处理多选变化
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const optionValue = event.target.value;
        const currentValues = Array.isArray(value) ? value : [];
        let newValues: string[];

        if (event.target.checked) {
            newValues = [...currentValues, optionValue];
        } else {
            newValues = currentValues.filter(v => v !== optionValue);
        }

        if (controlledValue === undefined) {
            setInternalValue(newValues);
        }

        if (onChange) {
            onChange(newValues, event);
        }

        if (touched) {
            validateInput(newValues);
        }
    };

    // 处理下拉选择变化
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;

        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        if (onChange) {
            onChange(newValue, event);
        }

        if (touched) {
            validateInput(newValue);
        }
    };

    // 处理焦点事件
    const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(event);
    };

    // 处理失去焦点事件
    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        setIsFocused(false);
        setTouched(true);
        validateInput(value);
        if (onBlur) onBlur(event);
    };

    // 渲染文本输入框
    const renderTextInput = () => (
        <input
            ref={inputRef}
            type={type}
            name={name}
            value={value as string}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={autoComplete}
            className="enhanced-input-element"
            onChange={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
        />
    );

    // 渲染单选框组
    const renderRadioGroup = () => (
        <div className="enhanced-input-options">
            {options.map((option, index) => (
                <label key={option.value} className="enhanced-input-option">
                    <input
                        ref={index === 0 ? inputRef : undefined}
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        disabled={disabled || option.disabled}
                        onChange={handleRadioChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <span className="enhanced-input-option-label">{option.label}</span>
                </label>
            ))}
        </div>
    );

    // 渲染复选框组
    const renderCheckboxGroup = () => (
        <div className="enhanced-input-options">
            {options.map((option, index) => {
                const isChecked = Array.isArray(value) && value.includes(option.value);
                return (
                    <label key={option.value} className="enhanced-input-option">
                        <input
                            ref={index === 0 ? inputRef : undefined}
                            type="checkbox"
                            name={name}
                            value={option.value}
                            checked={isChecked}
                            disabled={disabled || option.disabled}
                            onChange={handleCheckboxChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <span className="enhanced-input-option-label">{option.label}</span>
                    </label>
                );
            })}
        </div>
    );

    // 渲染下拉菜单
    const renderSelect = () => (
        <select
            ref={selectRef}
            value={value as string}
            disabled={disabled}
            name={name}
            className="enhanced-input-element"
            onChange={handleSelectChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(option => (
                <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );

    // 渲染输入元素
    const renderInputElement = () => {
        switch (type) {
            case 'radio':
                return renderRadioGroup();
            case 'checkbox':
                return options.length > 0 ? renderCheckboxGroup() : (
                    <label className="enhanced-input-option">
                        <input
                            ref={inputRef}
                            type="checkbox"
                            checked={!!value}
                            disabled={disabled}
                            onChange={(e) => {
                                const newValue = e.target.checked ? 'true' : '';
                                if (controlledValue === undefined) {
                                    setInternalValue(newValue);
                                }
                                if (onChange) {
                                    onChange(newValue, e);
                                }
                            }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <span className="enhanced-input-option-label">{label}</span>
                    </label>
                );
            case 'select':
                return renderSelect();
            default:
                return renderTextInput();
        }
    };

    // 当受控值变化时验证
    useEffect(() => {
        if (touched) {
            validateInput(value);
        }
    }, [value, touched]);

    // 自动聚焦
    useEffect(() => {
        if (autoFocus) {
            if (type === 'select' && selectRef.current) {
                selectRef.current.focus();
            } else if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [autoFocus, type]);

    // 构建CSS类名
    const isOptionType = type === 'radio' || type === 'checkbox';
    const containerClasses = [
        'enhanced-input-container',
        disabled && 'enhanced-input-container--disabled',
        readOnly && 'enhanced-input-container--readonly',
        isFocused && 'enhanced-input-container--focused',
        error && 'enhanced-input-container--error',
        isOptionType && 'enhanced-input-container--options',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses} style={style}>
            {label && type !== 'checkbox' && (
                <label className="enhanced-input-label">
                    {label}
                    {required && <span className="enhanced-input-required">*</span>}
                </label>
            )}

            {!isOptionType ? (
                <div className="enhanced-input-wrapper">
                    {prefix && <div className="enhanced-input-prefix">{prefix}</div>}
                    {renderInputElement()}
                    {suffix && <div className="enhanced-input-suffix">{suffix}</div>}
                </div>
            ) : (
                renderInputElement()
            )}

            {error && <div className="enhanced-input-error">{error}</div>}
        </div>
    );
});

// 设置显示名称
InputField.displayName = 'EnhancedInput';


