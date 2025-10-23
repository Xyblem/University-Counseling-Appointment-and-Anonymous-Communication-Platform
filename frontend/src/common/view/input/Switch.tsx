import React, {
    useState,
    useEffect,
    useId,
    forwardRef,
    useImperativeHandle,
    useCallback
} from 'react';
import './Switch.css';

// 开关组件属性
export interface SwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    label?: string;
    checkedLabel?: string;
    unCheckedLabel?: string;
    disabled?: boolean;
    required?: boolean;
    loading?: boolean;
    size?: 'small' | 'medium' | 'large';
    error?: string;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

// 开关引用方法
export interface SwitchRef {
    focus: () => void;
    blur: () => void;
    validate: () => boolean;
    getChecked: () => boolean;
    setChecked: (checked: boolean) => void;
    toggle: () => void;
}

export const Switch = forwardRef<SwitchRef, SwitchProps>((props, ref) => {
    const {
        checked: controlledChecked,
        defaultChecked = false,
        label,
        checkedLabel,
        unCheckedLabel,
        disabled = false,
        required = false,
        loading = false,
        size = 'medium',
        error: externalError,
        className = '',
        style,
        onChange,
        onFocus,
        onBlur,
        onClick,
    } = props;

    // 状态管理
    const [internalChecked, setInternalChecked] = useState(
        controlledChecked !== undefined ? controlledChecked : defaultChecked
    );
    const [isFocused, setIsFocused] = useState(false);
    const [internalError, setInternalError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);

    // 生成唯一ID
    const switchId = useId();
    const errorId = `${switchId}-error`;

    // 受控/非受控值处理
    const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;

    // 错误显示（优先显示外部错误）
    const error = externalError || internalError;

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        focus: () => {
            const input = document.getElementById(switchId) as HTMLInputElement;
            input?.focus();
        },
        blur: () => {
            const input = document.getElementById(switchId) as HTMLInputElement;
            input?.blur();
        },
        validate: () => validateInput(checked),
        getChecked: () => checked,
        setChecked: (newChecked: boolean) => {
            if (controlledChecked === undefined) {
                setInternalChecked(newChecked);
            }
            if (onChange) {
                const event = {
                    target: { checked: newChecked }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(newChecked, event);
            }
        },
        toggle: () => {
            const newChecked = !checked;
            if (controlledChecked === undefined) {
                setInternalChecked(newChecked);
            }
            if (onChange) {
                const event = {
                    target: { checked: newChecked }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(newChecked, event);
            }
        }
    }));

    // 验证输入
    const validateInput = (isChecked: boolean): boolean => {
        if (disabled || loading) return true;

        // 必填验证
        if (required && !isChecked) {
            setInternalError('必须开启此选项');
            return false;
        }

        setInternalError(null);
        return true;
    };

    // 处理变化事件
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled || loading) return;

        const newChecked = event.target.checked;

        // 更新内部状态（如果是非受控组件）
        if (controlledChecked === undefined) {
            setInternalChecked(newChecked);
        }

        // 调用外部onChange
        if (onChange) {
            onChange(newChecked, event);
        }

        // 如果已经触摸过，进行验证
        if (touched) {
            validateInput(newChecked);
        }
    }, [controlledChecked, disabled, loading, onChange, touched]);

    // 处理焦点事件
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(event);
    };

    // 处理失去焦点事件
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        setTouched(true);
        validateInput(checked);
        if (onBlur) onBlur(event);
    };

    // 处理点击事件
    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        if (disabled || loading) return;
        if (onClick) onClick(event);
    };

    // 当受控值变化时验证
    useEffect(() => {
        if (touched) {
            validateInput(checked);
        }
    }, [checked, touched]);

    // 构建显示标签
    const displayLabel = checked ? (checkedLabel || label) : (unCheckedLabel || label);

    // 构建CSS类名
    const containerClasses = [
        'switch-container',
        `switch--${size}`,
        checked && 'switch--checked',
        disabled && 'switch--disabled',
        loading && 'switch--loading',
        isFocused && 'switch--focused',
        error && 'switch--error',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses} style={style}>
            <label htmlFor={switchId} className="switch-label">
                <input
                    id={switchId}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled || loading}
                    className="switch-input"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onClick={handleClick}
                    aria-describedby={error ? errorId : undefined}
                    aria-invalid={!!error}
                />

                <span className="switch-track">
          <span className="switch-handle">
            {loading && (
                <span className="switch-loading-spinner">
                <svg viewBox="0 0 24 24" width="12" height="12">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"
                          strokeDasharray="15.7 15.7" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12"
                                      dur="1s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </span>
            )}
          </span>

                    {(checkedLabel || unCheckedLabel) && (
                        <span className="switch-labels">
              <span className="switch-checked-label">{checkedLabel}</span>
              <span className="switch-unchecked-label">{unCheckedLabel}</span>
            </span>
                    )}
        </span>

                {displayLabel && (
                    <span className="switch-text">
            {displayLabel}
                        {required && <span className="switch-required">*</span>}
          </span>
                )}
            </label>

            {error && (
                <div id={errorId} className="switch-error">
                    {error}
                </div>
            )}
        </div>
    );
});

// 设置显示名称
Switch.displayName = 'Switch';


export namespace SwitchCallback{
    /**
     * 处理开关输入变化
     * @param field 字段名
     * @param setData 设置数据状态的方法
     */
    export const handleDataChange=<T=any>(field: string,setData:React.Dispatch<React.SetStateAction<T>>) => (value: boolean) => {
        setData((prev: any) => ({...prev, [field]: value}));
    }
}