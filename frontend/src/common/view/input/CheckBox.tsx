import React, { useState, useEffect, useId, forwardRef, useImperativeHandle, useMemo } from 'react';
import './CheckBox.css';

// 复选框选项类型
export interface CheckboxOption {
    label: string;
    value: string;
    disabled?: boolean;
    description?: string;
}

// 复选框组件属性
export interface CheckboxGroupProps {
    name?: string;
    value?: string[];
    defaultValue?: string[];
    options: CheckboxOption[];
    label?: string;
    disabled?: boolean;
    required?: boolean;
    showSelectAll?: boolean;
    selectAllText?: string;
    layout?: 'horizontal' | 'vertical';
    size?: 'small' | 'medium' | 'large';
    error?: string;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (value: string[]) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

// 复选框引用方法
export interface CheckboxGroupRef {
    focus: () => void;
    validate: () => boolean;
    getValue: () => string[];
    setValue: (value: string[]) => void;
    clear: () => void;
    selectAll: () => void;
    deselectAll: () => void;
}

export const CheckboxGroup = forwardRef<CheckboxGroupRef, CheckboxGroupProps>((props, ref) => {
    const {
        name,
        value: controlledValue,
        defaultValue = [],
        options,
        label,
        disabled = false,
        required = false,
        showSelectAll = false,
        selectAllText = '全选',
        layout = 'vertical',
        size = 'medium',
        error: externalError,
        className = '',
        style,
        onChange,
        onBlur,
        onFocus,
    } = props;

    // 状态管理
    const [internalValue, setInternalValue] = useState<string[]>(
        controlledValue !== undefined ? controlledValue : defaultValue
    );
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

    // 计算选择状态
    const { allSelected, someSelected } = useMemo(() => {
        const enabledOptions = options.filter(option => !option.disabled && !disabled);
        const selectedEnabledCount = value.filter(val =>
            enabledOptions.some(option => option.value === val)
        ).length;

        return {
            allSelected: enabledOptions.length > 0 && selectedEnabledCount === enabledOptions.length,
            someSelected: selectedEnabledCount > 0 && selectedEnabledCount < enabledOptions.length
        };
    }, [value, options, disabled]);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        focus: () => {
            // 聚焦到第一个可用的复选框
            const firstCheckbox = document.querySelector(`[name="${name || groupId}"]:not(:disabled)`) as HTMLInputElement;
            firstCheckbox?.focus();
        },
        validate: () => validateInput(value),
        getValue: () => value,
        setValue: (newValue: string[]) => {
            if (controlledValue === undefined) {
                setInternalValue(newValue);
            }
            if (onChange) {
                onChange(newValue);
            }
        },
        clear: () => {
            if (controlledValue === undefined) {
                setInternalValue([]);
            }
            if (onChange) {
                onChange([]);
            }
            setInternalError(null);
        },
        selectAll: () => {
            const allValues = options
                .filter(option => !option.disabled && !disabled)
                .map(option => option.value);

            if (controlledValue === undefined) {
                setInternalValue(allValues);
            }
            if (onChange) {
                onChange(allValues);
            }
        },
        deselectAll: () => {
            if (controlledValue === undefined) {
                setInternalValue([]);
            }
            if (onChange) {
                onChange([]);
            }
        }
    }));

    // 验证输入
    const validateInput = (val: string[]): boolean => {
        if (disabled) return true;

        // 必填验证
        if (required && val.length === 0) {
            setInternalError('请至少选择一个选项');
            return false;
        }

        setInternalError(null);
        return true;
    };

    // 处理选项变化
    const handleOptionChange = (optionValue: string, checked: boolean) => {
        let newValue: string[];

        if (checked) {
            // 添加选项
            newValue = [...value, optionValue];
        } else {
            // 移除选项
            newValue = value.filter(val => val !== optionValue);
        }

        // 更新内部状态（如果是非受控组件）
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        // 调用外部onChange
        if (onChange) {
            onChange(newValue);
        }

        // 如果已经触摸过，进行验证
        if (touched) {
            validateInput(newValue);
        }
    };

    // 处理全选变化
    const handleSelectAllChange = (checked: boolean) => {
        let newValue: string[];

        if (checked) {
            // 选择所有可用的选项
            newValue = options
                .filter(option => !option.disabled && !disabled)
                .map(option => option.value);
        } else {
            // 清空所有选择
            newValue = [];
        }

        // 更新内部状态（如果是非受控组件）
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        // 调用外部onChange
        if (onChange) {
            onChange(newValue);
        }

        // 如果已经触摸过，进行验证
        if (touched) {
            validateInput(newValue);
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
        'checkbox-group-container',
        `checkbox-group--${layout}`,
        `checkbox-group--${size}`,
        disabled && 'checkbox-group--disabled',
        isFocused && 'checkbox-group--focused',
        error && 'checkbox-group--error',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses} style={style}>
            {label && (
                <legend className="checkbox-group-label">
                    {label}
                    {required && <span className="checkbox-required">*</span>}
                </legend>
            )}

            <div
                className="checkbox-group-options"
                role="group"
                aria-labelledby={label ? `${groupId}-label` : undefined}
                aria-describedby={error ? errorId : undefined}
                aria-required={required}
                aria-invalid={!!error}
            >
                {showSelectAll && (
                    <div className="checkbox-option-wrapper checkbox-select-all">
                        <label
                            className={[
                                'checkbox-option-label',
                                disabled && 'checkbox-option-label--disabled'
                            ].filter(Boolean).join(' ')}
                        >
                            <input
                                type="checkbox"
                                checked={allSelected}
                                ref={input => {
                                    // 处理不确定状态
                                    if (input) {
                                        input.indeterminate = someSelected && !allSelected;
                                    }
                                }}
                                disabled={disabled}
                                className="checkbox-input"
                                onChange={(e) => handleSelectAllChange(e.target.checked)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />

                            <span className="checkbox-custom">
                {someSelected && !allSelected && (
                    <span className="checkbox-indeterminate" />
                )}
                                {allSelected && (
                                    <span className="checkbox-checkmark">
                    <svg viewBox="0 0 12 10" width="12" height="10">
                      <path d="M1 5L4 8L11 1" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                                )}
              </span>

                            <span className="checkbox-text">
                {selectAllText}
              </span>
                        </label>
                    </div>
                )}

                {options.map((option, index) => {
                    const optionId = `${groupId}-option-${index}`;
                    const isChecked = value.includes(option.value);
                    const isOptionDisabled = disabled || option.disabled;

                    return (
                        <div key={option.value} className="checkbox-option-wrapper">
                            <label
                                htmlFor={optionId}
                                className={[
                                    'checkbox-option-label',
                                    isOptionDisabled && 'checkbox-option-label--disabled',
                                    isChecked && 'checkbox-option-label--checked'
                                ].filter(Boolean).join(' ')}
                            >
                                <input
                                    id={optionId}
                                    type="checkbox"
                                    name={name || groupId}
                                    value={option.value}
                                    checked={isChecked}
                                    disabled={isOptionDisabled}
                                    className="checkbox-input"
                                    onChange={(e) => handleOptionChange(option.value, e.target.checked)}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />

                                <span className="checkbox-custom">
                  {isChecked && (
                      <span className="checkbox-checkmark">
                      <svg viewBox="0 0 12 10" width="12" height="10">
                        <path d="M1 5L4 8L11 1" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </span>
                  )}
                </span>

                                <span className="checkbox-text">
                  {option.label}
                                    {option.description && (
                                        <span className="checkbox-description">{option.description}</span>
                                    )}
                </span>
                            </label>
                        </div>
                    );
                })}
            </div>

            {error && (
                <div id={errorId} className="checkbox-group-error">
                    {error}
                </div>
            )}
        </div>
    );
});

// 设置显示名称
CheckboxGroup.displayName = 'CheckboxGroup';



export namespace CheckBoxCallback {


    export const handleChange = (set: React.Dispatch<React.SetStateAction<string[] | undefined>>, emptyValue: string[] = []) => (value: string[]) => {
        if (value == null || value.length === 0) {
            set(emptyValue);
        } else {
            set(value);
        }

    }


    /**
     * 处理多选框输入变化
     * @param field 字段名
     * @param setData 设置数据状态的方法
     * @param emptyValue  输入为空时的值
     */
    export const handleDataChange = <T = any>(field: string, setData: React.Dispatch<React.SetStateAction<T>>, emptyValue: string[] | null = null) => (value: string[]) => {
        if (value == null || value.length === 0) {
            setData((prev: any) => ({...prev, [field]: emptyValue}));
        } else {
            setData((prev: any) => ({...prev, [field]: value}));
        }
    }
}
