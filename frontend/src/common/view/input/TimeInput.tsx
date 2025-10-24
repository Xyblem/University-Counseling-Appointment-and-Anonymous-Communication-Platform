import React, {
    useState,
    useEffect,
    useRef,
    useId,
    forwardRef,
    useImperativeHandle,
    useCallback
} from 'react';
import './TimeInput.css';

// 时间对象接口
export interface Time {
    hour: number;
    minute: number;
    second?: number;
}

// 时间输入组件属性
export interface TimeInputProps {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    use12Hours?: boolean;
    showSeconds?: boolean;
    minuteStep?: number;
    secondStep?: number;
    minTime?: string;
    maxTime?: string;
    format?: string;
    error?: string;
    className?: string;
    style?: React.CSSProperties;
    validationRules?: ValidationRule[];
    onChange?: (value: string, time: Time) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onOpenChange?: (open: boolean) => void;
}

// 验证规则类型
export interface ValidationRule {
    pattern?: RegExp;
    required?: boolean;
    validator?: (value: string, time: Time) => boolean;
    message?: string;
}

// 时间输入引用方法
export interface TimeInputRef {
    focus: () => void;
    blur: () => void;
    validate: () => boolean;
    getValue: () => string;
    setValue: (value: string) => void;
    clear: () => void;
    open: () => void;
    close: () => void;
}

export const TimeInput = forwardRef<TimeInputRef, TimeInputProps>((props, ref) => {
    const {
        value: controlledValue,
        defaultValue = '',
        placeholder,
        label,
        disabled = false,
        required = false,
        readOnly = false,
        autoFocus = false,
        use12Hours = false,
        showSeconds = false,
        minuteStep = 1,
        secondStep = 1,
        minTime,
        maxTime,
        format,
        error: externalError,
        className = '',
        style,
        validationRules = [],
        onChange,
        onFocus,
        onBlur,
        onOpenChange,
    } = props;

    // 状态管理
    const [internalValue, setInternalValue] = useState(controlledValue !== undefined ? controlledValue : defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [internalError, setInternalError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);
    const [currentTime, setCurrentTime] = useState<Time>({ hour: 0, minute: 0, second: 0 });

    // 引用
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 生成唯一ID
    const timeInputId = useId();
    const errorId = `${timeInputId}-error`;

    // 受控/非受控值处理
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    // 错误显示（优先显示外部错误）
    const error = externalError || internalError;

    // 解析时间字符串
    const parseTimeString = useCallback((timeStr: string): Time | null => {
        if (!timeStr) return null;

        let hour = 0, minute = 0, second = 0;
        let isPM = false;

        if (use12Hours) {
            // 12小时制解析
            const match = timeStr.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?/i);
            if (!match) return null;

            hour = parseInt(match[1], 10);
            minute = parseInt(match[2], 10);
            second = match[3] ? parseInt(match[3], 10) : 0;
            isPM = match[4] ? match[4].toUpperCase() === 'PM' : hour >= 12;

            if (hour === 12) {
                hour = isPM ? 12 : 0;
            } else {
                hour = isPM ? hour + 12 : hour;
            }
        } else {
            // 24小时制解析
            const match = timeStr.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
            if (!match) return null;

            hour = parseInt(match[1], 10);
            minute = parseInt(match[2], 10);
            second = match[3] ? parseInt(match[3], 10) : 0;
        }

        if (hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
            return null;
        }

        return { hour, minute, second: showSeconds ? second : undefined };
    }, [use12Hours, showSeconds]);

    // 格式化时间对象
    const formatTime = useCallback((time: Time): string => {
        if (!time) return '';

        let { hour, minute, second } = time;
        let ampm = '';

        if (use12Hours) {
            ampm = hour >= 12 ? ' PM' : ' AM';
            hour = hour % 12;
            hour = hour === 0 ? 12 : hour;
        }

        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');
        const secondStr = second !== undefined ? `:${second.toString().padStart(2, '0')}` : '';

        return `${hourStr}:${minuteStr}${secondStr}${ampm}`;
    }, [use12Hours, showSeconds]);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        validate: () => validateInput(value),
        getValue: () => value,
        setValue: (newValue: string) => {
            const time = parseTimeString(newValue);
            if (controlledValue === undefined) {
                setInternalValue(newValue);
            }
            if (time) {
                setCurrentTime(time);
            }
            if (onChange && time) {
                onChange(newValue, time);
            }
        },
        clear: () => {
            if (controlledValue === undefined) {
                setInternalValue('');
            }
            setCurrentTime({ hour: 0, minute: 0, second: 0 });
            setInternalError(null);
            if (onChange) {
                onChange('', { hour: 0, minute: 0, second: 0 });
            }
        },
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }));

    // 验证输入
    const validateInput = (val: string): boolean => {
        if (disabled || readOnly) return true;

        // 必填验证
        if (required && !val.trim()) {
            setInternalError('请选择时间');
            return false;
        }

        // 时间格式验证
        if (val && !parseTimeString(val)) {
            setInternalError('时间格式不正确');
            return false;
        }

        // 时间范围验证
        if (val && parseTimeString(val)) {
            const time = parseTimeString(val);
            if (time) {
                if (minTime && isTimeBefore(time, parseTimeString(minTime))) {
                    setInternalError(`时间不能早于 ${minTime}`);
                    return false;
                }

                if (maxTime && isTimeAfter(time, parseTimeString(maxTime))) {
                    setInternalError(`时间不能晚于 ${maxTime}`);
                    return false;
                }
            }
        }

        // 自定义验证规则
        for (const rule of validationRules) {
            if (rule.required && !val.trim()) {
                setInternalError(rule.message || '请选择时间');
                return false;
            }

            if (rule.pattern && !rule.pattern.test(val)) {
                setInternalError(rule.message || '时间格式不正确');
                return false;
            }

            if (rule.validator) {
                const time = parseTimeString(val);
                if (!rule.validator(val, time || { hour: 0, minute: 0, second: 0 })) {
                    setInternalError(rule.message || '验证失败');
                    return false;
                }
            }
        }

        setInternalError(null);
        return true;
    };

    // 比较时间
    const isTimeBefore = (time1: Time, time2: Time | null): boolean => {
        if (!time2) return false;

        const totalSeconds1 = time1.hour * 3600 + time1.minute * 60 + (time1.second || 0);
        const totalSeconds2 = time2.hour * 3600 + time2.minute * 60 + (time2.second || 0);

        return totalSeconds1 < totalSeconds2;
    };

    const isTimeAfter = (time1: Time, time2: Time | null): boolean => {
        if (!time2) return false;

        const totalSeconds1 = time1.hour * 3600 + time1.minute * 60 + (time1.second || 0);
        const totalSeconds2 = time2.hour * 3600 + time2.minute * 60 + (time2.second || 0);

        return totalSeconds1 > totalSeconds2;
    };

    // 处理输入变化
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        // 更新内部状态（如果是非受控组件）
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        const time = parseTimeString(newValue);
        if (time) {
            setCurrentTime(time);
        }

        // 调用外部onChange
        if (onChange) {
            onChange(newValue, time || { hour: 0, minute: 0, second: 0 });
        }

        // 如果已经触摸过，进行实时验证
        if (touched) {
            validateInput(newValue);
        }
    };

    // 处理时间选择
    const handleTimeSelect = (newTime: Time) => {
        const newValue = formatTime(newTime);

        // 更新内部状态（如果是非受控组件）
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        setCurrentTime(newTime);

        // 调用外部onChange
        if (onChange) {
            onChange(newValue, newTime);
        }

        // 验证并关闭下拉框
        validateInput(newValue);
        setIsOpen(false);
        if (onOpenChange) onOpenChange(false);
    };

    // 处理小时变化
    const handleHourChange = (hour: number) => {
        const newTime = { ...currentTime, hour };
        handleTimeSelect(newTime);
    };

    // 处理分钟变化
    const handleMinuteChange = (minute: number) => {
        const newTime = { ...currentTime, minute };
        handleTimeSelect(newTime);
    };

    // 处理秒钟变化
    const handleSecondChange = (second: number) => {
        const newTime = { ...currentTime, second };
        handleTimeSelect(newTime);
    };

    // 处理焦点事件
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (!disabled && !readOnly) {
            // setIsOpen(true);
            if (onOpenChange) onOpenChange(true);
        }
        if (onFocus) onFocus(event);
    };

    // 处理失去焦点事件
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        setTouched(true);
        validateInput(value);
        if (onBlur) onBlur(event);
    };

    // 点击外部关闭下拉框
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                if (onOpenChange) onOpenChange(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onOpenChange]);

    // 当值变化时更新当前时间
    useEffect(() => {
        if (value) {
            const time = parseTimeString(value);
            if (time) {
                setCurrentTime(time);
            }
        }
    }, [value, parseTimeString]);

    // 自动聚焦
    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    // 构建小时选项
    const hourOptions = Array.from({ length: use12Hours ? 12 : 24 }, (_, i) => {
        if (use12Hours) {
            return i === 0 ? 12 : i;
        }
        return i;
    });

    // 构建分钟选项
    const minuteOptions = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);

    // 构建秒钟选项
    const secondOptions = showSeconds ?
        Array.from({ length: 60 / secondStep }, (_, i) => i * secondStep) : [];

    // 构建CSS类名
    const containerClasses = [
        'time-input-container',
        disabled && 'time-input-container--disabled',
        readOnly && 'time-input-container--readonly',
        isOpen && 'time-input-container--open',
        isFocused && 'time-input-container--focused',
        error && 'time-input-container--error',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses} style={style} ref={containerRef}>
            {label && (
                <label className="time-input-label" htmlFor={timeInputId}>
                    {label}
                    {required && <span className="time-input-required">*</span>}
                </label>
            )}

            <div
                className="time-input-trigger"
                onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
            >
                <input
                    ref={inputRef}
                    id={timeInputId}
                    type="text"
                    value={value}
                    placeholder={placeholder || (use12Hours ? 'HH:MM AM/PM' : 'HH:MM')}
                    disabled={disabled}
                    readOnly={readOnly}
                    className="time-input-element"
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />

                <div className="time-input-suffix">
          <span className="time-input-icon">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2ZM12 20C7.6 20 4 16.4 4 12S7.6 4 12 4 20 7.6 20 12 16.4 20 12 20Z" fill="currentColor"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </span>
                </div>
            </div>

            {isOpen && !disabled && !readOnly && (
                <div className="time-input-dropdown" ref={dropdownRef}>
                    <div className="time-input-panel">
                        <div className="time-input-columns">
                            {/* 小时选择 */}
                            <div className="time-input-column">
                                <div className="time-input-column-header">时</div>
                                <div className="time-input-list">
                                    {hourOptions.map(hour => {
                                        const displayHour = use12Hours ? (hour === 0 ? 12 : hour) : hour;
                                        const isSelected = currentTime.hour === (use12Hours && currentTime.hour >= 12 ? hour + 12 : hour);
                                        const isDisabled = false; // 可以根据需要添加禁用逻辑

                                        return (
                                            <div
                                                key={hour}
                                                className={`time-input-option ${isSelected ? 'time-input-option--selected' : ''} ${isDisabled ? 'time-input-option--disabled' : ''}`}
                                                onClick={() => !isDisabled && handleHourChange(use12Hours && currentTime.hour >= 12 ? hour + 12 : hour)}
                                            >
                                                {displayHour.toString().padStart(2, '0')}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 分钟选择 */}
                            <div className="time-input-column">
                                <div className="time-input-column-header">分</div>
                                <div className="time-input-list">
                                    {minuteOptions.map(minute => {
                                        const isSelected = currentTime.minute === minute;
                                        const isDisabled = false; // 可以根据需要添加禁用逻辑

                                        return (
                                            <div
                                                key={minute}
                                                className={`time-input-option ${isSelected ? 'time-input-option--selected' : ''} ${isDisabled ? 'time-input-option--disabled' : ''}`}
                                                onClick={() => !isDisabled && handleMinuteChange(minute)}
                                            >
                                                {minute.toString().padStart(2, '0')}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 秒钟选择 */}
                            {showSeconds && (
                                <div className="time-input-column">
                                    <div className="time-input-column-header">秒</div>
                                    <div className="time-input-list">
                                        {secondOptions.map(second => {
                                            const isSelected = currentTime.second === second;
                                            const isDisabled = false; // 可以根据需要添加禁用逻辑

                                            return (
                                                <div
                                                    key={second}
                                                    className={`time-input-option ${isSelected ? 'time-input-option--selected' : ''} ${isDisabled ? 'time-input-option--disabled' : ''}`}
                                                    onClick={() => !isDisabled && handleSecondChange(second)}
                                                >
                                                    {second.toString().padStart(2, '0')}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* AM/PM 选择 */}
                            {use12Hours && (
                                <div className="time-input-column">
                                    <div className="time-input-column-header">&nbsp;</div>
                                    <div className="time-input-list">
                                        <div
                                            className={`time-input-option ${currentTime.hour < 12 ? 'time-input-option--selected' : ''}`}
                                            onClick={() => handleHourChange(currentTime.hour >= 12 ? currentTime.hour - 12 : currentTime.hour)}
                                        >
                                            AM
                                        </div>
                                        <div
                                            className={`time-input-option ${currentTime.hour >= 12 ? 'time-input-option--selected' : ''}`}
                                            onClick={() => handleHourChange(currentTime.hour < 12 ? currentTime.hour + 12 : currentTime.hour)}
                                        >
                                            PM
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="time-input-actions">
                            <button
                                type="button"
                                className="time-input-now"
                                onClick={() => {
                                    const now = new Date();
                                    handleTimeSelect({
                                        hour: now.getHours(),
                                        minute: now.getMinutes(),
                                        second: showSeconds ? now.getSeconds() : undefined
                                    });
                                }}
                            >
                                现在
                            </button>
                            <button
                                type="button"
                                className="time-input-clear"
                                onClick={() => {
                                    if (controlledValue === undefined) {
                                        setInternalValue('');
                                    }
                                    setCurrentTime({ hour: 0, minute: 0, second: 0 });
                                    setInternalError(null);
                                    if (onChange) {
                                        onChange('', { hour: 0, minute: 0, second: 0 });
                                    }
                                    setIsOpen(false);
                                    if (onOpenChange) onOpenChange(false);
                                }}
                            >
                                清除
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div id={errorId} className="time-input-error">
                    {error}
                </div>
            )}
        </div>
    );
});

// 设置显示名称
TimeInput.displayName = 'TimeInput';


export namespace TimeInputCallback{
    export const handleTimeStringDataChange =<T=any>(field: string,setData:React.Dispatch<React.SetStateAction<T>>,emptyValue:string|null=null)=> (value: string, time: any) => {
        if(value==null||value.length===0){
            setData((prev: any) => ({...prev, [field]: emptyValue}));
        }else{
            setData((prev: any) => ({...prev, [field]: value}));
        }
    };
}