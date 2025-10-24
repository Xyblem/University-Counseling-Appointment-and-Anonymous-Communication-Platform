import React, { useState, useEffect, useId, forwardRef, useImperativeHandle } from 'react';
import './Radio.css';

// 单选框选项类型
export interface RadioOption {
    label: string;
    value: string;
    disabled?: boolean;
    description?: string;
}

// 单选框组件属性
export interface RadioGroupProps {
    name?: string;
    value?: string;
    defaultValue?: string;
    options: RadioOption[];
    label?: string;
    disabled?: boolean;
    required?: boolean;
    layout?: 'horizontal' | 'vertical';
    size?: 'small' | 'medium' | 'large';
    error?: string;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

// 单选框引用方法
export interface RadioGroupRef {
    focus: () => void;
    validate: () => boolean;
    getValue: () => string;
    setValue: (value: string) => void;
    clear: () => void;
}

export const RadioGroup = forwardRef<RadioGroupRef, RadioGroupProps>((props, ref) => {
    const {
        name,
        value: controlledValue,
        defaultValue = '',
        options,
        label,
        disabled = false,
        required = false,
        layout = 'horizontal',
        size = 'medium',
        error: externalError,
        className = '',
        style,
        onChange,
        onBlur,
        onFocus,
    } = props;

    // 状态管理
    const [internalValue, setInternalValue] = useState(controlledValue !== undefined ? controlledValue : defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const [internalError, setInternalError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);

    // 生成唯一ID
    const groupId = useId();
    const errorId = `${groupId}-error`;

    // 受控/非受控值处理
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    // 错误显示（优先显示外部错误）
    const error = externalError || internalError;

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        focus: () => {
            // 聚焦到第一个可用的单选框
            const firstRadio = document.querySelector(`[name="${name || groupId}"]:not(:disabled)`) as HTMLInputElement;
            firstRadio?.focus();
        },
        validate: () => validateInput(value),
        getValue: () => value,
        setValue: (newValue: string) => {
            if (controlledValue === undefined) {
                setInternalValue(newValue);
            }
            if (onChange) {
                onChange(newValue);
            }
        },
        clear: () => {
            if (controlledValue === undefined) {
                setInternalValue('');
            }
            if (onChange) {
                onChange('');
            }
            setInternalError(null);
        }
    }));

    // 验证输入
    const validateInput = (val: string): boolean => {
        if (disabled) return true;

        // 必填验证
        if (required && !val) {
            setInternalError('请选择一个选项');
            return false;
        }

        setInternalError(null);
        return true;
    };

    // 处理选项变化
    const handleChange = (optionValue: string) => {
        // 更新内部状态（如果是非受控组件）
        if (controlledValue === undefined) {
            setInternalValue(optionValue);
        }

        // 调用外部onChange
        if (onChange) {
            onChange(optionValue);
        }

        // 如果已经触摸过，进行验证
        if (touched) {
            validateInput(optionValue);
        }
    };

    // 处理焦点事件
    const handleFocus = () => {
        setIsFocused(true);
        if (onFocus) onFocus();
    };

    // 处理失去焦点事件
    const handleBlur = () => {
        setIsFocused(false);
        setTouched(true);
        validateInput(value);
        if (onBlur) onBlur();
    };

    // 当受控值变化时验证
    useEffect(() => {
        if (touched) {
            validateInput(value);
        }
    }, [value, touched]);

    // 构建CSS类名
    const containerClasses = [
        'radio-group-container',
        `radio-group--${layout}`,
        `radio-group--${size}`,
        disabled && 'radio-group--disabled',
        isFocused && 'radio-group--focused',
        error && 'radio-group--error',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses} style={style}>
            {label && (
                <legend className="radio-group-label">
                    {label}
                    {required && <span className="radio-required">*</span>}
                </legend>
            )}

            <div
                className="radio-group-options"
                role="radiogroup"
                aria-labelledby={label ? `${groupId}-label` : undefined}
                aria-describedby={error ? errorId : undefined}
                aria-required={required}
                aria-invalid={!!error}
            >
                {options.map((option, index) => {
                    const optionId = `${groupId}-option-${index}`;
                    const isChecked = value === option.value;
                    const isOptionDisabled = disabled || option.disabled;

                    return (
                        <div key={option.value} className="radio-option-wrapper">
                            <label
                                htmlFor={optionId}
                                className={[
                                    'radio-option-label',
                                    isOptionDisabled && 'radio-option-label--disabled',
                                    isChecked && 'radio-option-label--checked'
                                ].filter(Boolean).join(' ')}
                            >
                                <input
                                    id={optionId}
                                    type="radio"
                                    name={name || groupId}
                                    value={option.value}
                                    checked={isChecked}
                                    disabled={isOptionDisabled}
                                    className="radio-input"
                                    onChange={() => handleChange(option.value)}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />

                                <span className="radio-custom">
                  <span className="radio-inner" />
                </span>

                                <span className="radio-text">
                  {option.label}
                                    {option.description && (
                                        <span className="radio-description">{option.description}</span>
                                    )}
                </span>
                            </label>
                        </div>
                    );
                })}
            </div>

            {error && (
                <div id={errorId} className="radio-group-error">
                    {error}
                </div>
            )}
        </div>
    );
});

// 设置显示名称
RadioGroup.displayName = 'RadioGroup';

export namespace RadioGroupCallback{

    export const handleArrayChange = (set: React.Dispatch<React.SetStateAction<string[]|undefined>>, emptyValue: string|null =null) => (value: string) => {
        if (value == null || value.length === 0) {
            if(emptyValue==null){
                set([]);
            }else{
                set([emptyValue]);
            }

        } else {
            set([value]);
        }
    }

    export const handleChange = (set: React.Dispatch<React.SetStateAction<string|undefined>>, emptyValue: string = "") => (value: string) => {
        if (value == null || value.length === 0) {
            set(emptyValue);
        } else {
            set(value);
        }
    }
    /**
     * 处理单选框输入变化
     * @param field 字段名
     * @param setData 设置数据状态的方法
     * @param emptyValue  输入为空时的值
     */
    export const handleDataChange=<T=any>(field: string,setData:React.Dispatch<React.SetStateAction<T>>,emptyValue:string|null=null) => (value: string) => {
        if(value==null||value.length===0){
            setData((prev: any) => ({...prev, [field]: emptyValue}));
        }else{
            setData((prev: any) => ({...prev, [field]: value}));
        }
    }
}