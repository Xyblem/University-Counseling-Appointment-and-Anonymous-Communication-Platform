import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import './Input.css';

// 输入框类型定义
export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url';

// 验证规则类型
export interface ValidationRule {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    validator?: (value: string) => boolean;
    message?: string;
}

// 输入框组件属性
export interface InputProps {
    type?: InputType;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    label?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    className?: string;
    style?: React.CSSProperties;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    validationRules?: ValidationRule[];
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

// 输入框引用方法
export interface InputRef {
    focus: () => void;
    blur: () => void;
    validate: () => boolean;
    getValue: () => string;
    setValue: (value: string) => void;
    clear: () => void;
}

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
    const {
        type = 'text',
        value: controlledValue,
        defaultValue = '',
        placeholder,
        label,
        name,
        disabled = false,
        required = false,
        readOnly = false,
        autoFocus = false,
        autoComplete = 'off',
        className = '',
        style,
        prefix,
        suffix,
        validationRules = [],
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
    } = props;

    // 状态管理
    const [internalValue, setInternalValue] = useState(controlledValue !== undefined ? controlledValue : defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);

    // 引用
    const inputRef = useRef<HTMLInputElement>(null);

    // 受控/非受控值处理
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        validate: () => validateInput(value),
        getValue: () => value,
        setValue: (newValue: string) => {
            if (controlledValue === undefined) {
                setInternalValue(newValue);
            }
            // 如果组件是受控的，我们不应该直接设置值，而是应该调用onChange
            if (onChange) {
                const event = {
                    target: { value: newValue }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(newValue, event);
            }
        },
        clear: () => {
            if (controlledValue === undefined) {
                setInternalValue('');
            }
            if (onChange) {
                const event = {
                    target: { value: '' }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange('', event);
            }
            setError(null);
        }
    }));

    // 验证输入
    const validateInput = (val: string): boolean => {
        if (disabled) return true;

        // 必填验证
        if (required && !val.trim()) {
            setError('此字段为必填项');
            return false;
        }

        // 自定义验证规则
        for (const rule of validationRules) {
            if (rule.required && !val.trim()) {
                setError(rule.message || '此字段为必填项');
                return false;
            }

            if (rule.minLength && (val.length>0&&val.length < rule.minLength)) {
                setError(rule.message || `至少需要${rule.minLength}个字符`);
                return false;
            }

            if (rule.maxLength && val.length > rule.maxLength) {
                setError(rule.message || `不能超过${rule.maxLength}个字符`);
                return false;
            }

            if (rule.pattern && !rule.pattern.test(val)) {
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

    // 处理值变化
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        //const newValue = internalValue;

        // 更新内部状态（如果是非受控组件）
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        // 调用外部onChange
        if (onChange) {
            onChange(newValue, event);
        }

        // 如果已经触摸过，进行实时验证
        if (touched) {
            validateInput(newValue);
        }
    };

    // 处理焦点事件
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(event);
    };

    // 处理失去焦点事件
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        setTouched(true);
        validateInput(value);
        if (onBlur) onBlur(event);
    };

    // 当受控值变化时验证
    useEffect(() => {
        if (touched) {
            validateInput(value);
        }
    }, [value, touched]);

    // 自动聚焦
    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    // 构建CSS类名
    const containerClasses = [
        'input-container',
        disabled && 'input-container--disabled',
        readOnly && 'input-container--readonly',
        isFocused && 'input-container--focused',
        error && 'input-container--error',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses} style={style}>
            {label && (
                <label className="input-label">
                    {label}
                    {required && <span className="input-required">*</span>}
                </label>
            )}

            <div className="input-wrapper">
                {prefix && <div className="input-prefix">{prefix}</div>}

                <input
                    ref={inputRef}
                    type={type}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    autoComplete={autoComplete}
                    className="input-element"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                />

                {suffix && <div className="input-suffix">{suffix}</div>}
            </div>

            {error && <div className="input-error">{error}</div>}
        </div>
    );
});

// 设置显示名称
Input.displayName = 'Input';


export namespace InputCallback{
    /**
     * 处理输入框输入变化
     * @param field 字段名
     * @param setData 设置数据状态的方法
     * @param emptyValue 输入为空时的值
     */
    export const handleDataChange=<T=any>(field: string,setData:React.Dispatch<React.SetStateAction<T>>,emptyValue:string|null=null) => (value: string) => {
        if(value==null||value.length===0){
            setData((prev: any) => ({...prev, [field]: emptyValue}));
        }else{
            setData((prev: any) => ({...prev, [field]: value}));
        }
    }
}


