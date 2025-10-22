import React, {
    useState,
    useEffect,
    useRef,
    useId,
    forwardRef,
    useImperativeHandle,
    useCallback
} from 'react';
import './Textarea.css';

// 多行输入组件属性
export interface TextareaProps {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    rows?: number;
    minRows?: number;
    maxRows?: number;
    maxLength?: number;
    showCount?: boolean;
    countMode?: 'remaining' | 'entered';
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    className?: string;
    style?: React.CSSProperties;
    validationRules?: ValidationRule[];
    onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

// 验证规则类型
export interface ValidationRule {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    validator?: (value: string) => boolean;
    message?: string;
}

// 多行输入引用方法
export interface TextareaRef {
    focus: () => void;
    blur: () => void;
    validate: () => boolean;
    getValue: () => string;
    setValue: (value: string) => void;
    clear: () => void;
    resize: () => void;
}

export const Textarea = forwardRef<TextareaRef, TextareaProps>((props, ref) => {
    const {
        value: controlledValue,
        defaultValue = '',
        placeholder,
        label,
        disabled = false,
        required = false,
        readOnly = false,
        autoFocus = false,
        autoComplete = 'off',
        rows = 3,
        minRows = rows,
        maxRows = 10,
        maxLength,
        showCount = false,
        countMode = 'remaining',
        resize = 'vertical',
        className = '',
        style,
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
    const [height, setHeight] = useState<number>(0);

    // 引用
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const hiddenTextareaRef = useRef<HTMLTextAreaElement>(null);

    // 生成唯一ID
    const textareaId = useId();
    const errorId = `${textareaId}-error`;

    // 受控/非受控值处理
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    // 计算字符数
    const charCount = value.length;
    const remainingChars = maxLength ? maxLength - charCount : 0;

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        focus: () => textareaRef.current?.focus(),
        blur: () => textareaRef.current?.blur(),
        validate: () => validateInput(value),
        getValue: () => value,
        setValue: (newValue: string) => {
            if (controlledValue === undefined) {
                setInternalValue(newValue);
            }
            if (onChange) {
                const event = {
                    target: { value: newValue }
                } as React.ChangeEvent<HTMLTextAreaElement>;
                onChange(newValue, event);
            }
            // 触发高度调整
            setTimeout(() => resizeTextarea(), 0);
        },
        clear: () => {
            if (controlledValue === undefined) {
                setInternalValue('');
            }
            if (onChange) {
                const event = {
                    target: { value: '' }
                } as React.ChangeEvent<HTMLTextAreaElement>;
                onChange('', event);
            }
            setError(null);
            // 触发高度调整
            setTimeout(() => resizeTextarea(), 0);
        },
        resize: () => resizeTextarea()
    }));

    // 验证输入
    const validateInput = (val: string): boolean => {
        if (disabled) return true;

        // 必填验证
        if (required && !val.trim()) {
            setError('此字段为必填项');
            return false;
        }

        // 最大长度验证
        if (maxLength && val.length > maxLength) {
            setError(`内容不能超过${maxLength}个字符`);
            return false;
        }

        // 自定义验证规则
        for (const rule of validationRules) {
            if (rule.required && !val.trim()) {
                setError(rule.message || '此字段为必填项');
                return false;
            }

            if (rule.minLength && val.length < rule.minLength) {
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

    // 调整文本域高度
    const resizeTextarea = useCallback(() => {
        if (!textareaRef.current || !hiddenTextareaRef.current) return;

        const textarea = textareaRef.current;
        const hiddenTextarea = hiddenTextareaRef.current;

        // 复制样式到隐藏的文本域
        const computedStyle = window.getComputedStyle(textarea);
        hiddenTextarea.style.width = computedStyle.width;
        hiddenTextarea.style.font = computedStyle.font;
        hiddenTextarea.style.letterSpacing = computedStyle.letterSpacing;
        hiddenTextarea.style.padding = computedStyle.padding;
        hiddenTextarea.style.border = computedStyle.border;
        hiddenTextarea.style.boxSizing = computedStyle.boxSizing;
        hiddenTextarea.style.lineHeight = computedStyle.lineHeight;
        hiddenTextarea.style.whiteSpace = 'pre-wrap';
        hiddenTextarea.style.wordWrap = 'break-word';
        hiddenTextarea.style.overflowWrap = 'break-word';

        // 设置内容并计算高度
        hiddenTextarea.value = value || placeholder || '';

        // 计算最小和最大高度
        const lineHeight = parseInt(computedStyle.lineHeight, 10) || 20;
        const padding = parseInt(computedStyle.paddingTop, 10) + parseInt(computedStyle.paddingBottom, 10);
        const border = parseInt(computedStyle.borderTopWidth, 10) + parseInt(computedStyle.borderBottomWidth, 10);

        const minHeight = lineHeight * minRows + padding + border;
        const maxHeight = lineHeight * maxRows + padding + border;

        // 计算内容高度
        let contentHeight = hiddenTextarea.scrollHeight;

        // 应用最小和最大高度限制
        if (contentHeight < minHeight) {
            contentHeight = minHeight;
        } else if (contentHeight > maxHeight) {
            contentHeight = maxHeight;
        }

        setHeight(contentHeight);
    }, [value, placeholder, minRows, maxRows]);

    // 处理值变化
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;

        // 检查长度限制
        if (maxLength && newValue.length > maxLength) {
            return;
        }

        // 更新内部状态（如果是非受控组件）
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        // 调用外部onChange
        if (onChange) {
            onChange(newValue, event);
        }

        // 调整高度
        resizeTextarea();

        // 如果已经触摸过，进行实时验证
        if (touched) {
            validateInput(newValue);
        }
    };

    // 处理焦点事件
    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(event);
    };

    // 处理失去焦点事件
    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        setTouched(true);
        validateInput(value);
        if (onBlur) onBlur(event);
    };

    // 当受控值变化时验证和调整高度
    useEffect(() => {
        if (touched) {
            validateInput(value);
        }
        resizeTextarea();
    }, [value, touched, resizeTextarea]);

    // 自动聚焦
    useEffect(() => {
        if (autoFocus && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [autoFocus]);

    // 初始高度调整
    useEffect(() => {
        resizeTextarea();
    }, [resizeTextarea]);

    // 构建CSS类名
    const containerClasses = [
        'textarea-container',
        disabled && 'textarea-container--disabled',
        readOnly && 'textarea-container--readonly',
        isFocused && 'textarea-container--focused',
        error && 'textarea-container--error',
        className
    ].filter(Boolean).join(' ');

    // 构建文本域样式
    const textareaStyle: React.CSSProperties = {
        ...style,
        resize,
        height: resize === 'none' || resize === 'vertical' ? height : 'auto'
    };

    return (
        <div className={containerClasses}>
            {label && (
                <label className="textarea-label" htmlFor={textareaId}>
                    {label}
                    {required && <span className="textarea-required">*</span>}
                </label>
            )}

            <div className="textarea-wrapper">
        <textarea
            ref={textareaRef}
            id={textareaId}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={autoComplete}
            maxLength={maxLength}
            className="textarea-element"
            style={textareaStyle}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
        />

                {/* 隐藏的文本域用于计算高度 */}
                <textarea
                    ref={hiddenTextareaRef}
                    className="textarea-hidden"
                    aria-hidden="true"
                    readOnly
                    tabIndex={-1}
                />

                {(showCount || maxLength) && (
                    <div className="textarea-count">
                        {countMode === 'remaining' && maxLength ? (
                            <span className={remainingChars < 0 ? 'textarea-count--error' : ''}>
                {remainingChars}
              </span>
                        ) : (
                            <span>
                {charCount}
                                {maxLength && ` / ${maxLength}`}
              </span>
                        )}
                    </div>
                )}
            </div>

            {error && (
                <div id={errorId} className="textarea-error">
                    {error}
                </div>
            )}
        </div>
    );
});

// 设置显示名称
Textarea.displayName = 'Textarea';