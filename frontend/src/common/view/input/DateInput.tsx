import React, {
    useState,
    useEffect,
    useRef,
    useId,
    forwardRef,
    useImperativeHandle,
    useCallback,
    useMemo
} from 'react';
import './DateInput.css';

// 日期对象接口
export interface DateObject {
    year: number;
    month: number; // 0-11
    day: number;
}

// 日期输入组件属性
export interface DateInputProps {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    mode?: 'date' | 'month' | 'year' | 'range';
    format?: string;
    locale?: 'zh-CN' | 'en-US';
    minDate?: string;
    maxDate?: string;
    showToday?: boolean;
    showClear?: boolean;
    error?: string;
    className?: string;
    style?: React.CSSProperties;
    validationRules?: ValidationRule[];
    onChange?: (value: string, date: DateObject | null) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onOpenChange?: (open: boolean) => void;
}

// 验证规则类型
export interface ValidationRule {
    pattern?: RegExp;
    required?: boolean;
    validator?: (value: string, date: DateObject | null) => boolean;
    message?: string;
}

// 日期输入引用方法
export interface DateInputRef {
    focus: () => void;
    blur: () => void;
    validate: () => boolean;
    getValue: () => string;
    setValue: (value: string) => void;
    clear: () => void;
    open: () => void;
    close: () => void;
}

// 国际化配置
const locales = {
    'zh-CN': {
        days: ['日', '一', '二', '三', '四', '五', '六'],
        months: [
            '一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'
        ],
        shortMonths: [
            '1月', '2月', '3月', '4月', '5月', '6月',
            '7月', '8月', '9月', '10月', '11月', '12月'
        ],
        today: '今天',
        clear: '清除',
        selectDate: '选择日期',
        selectMonth: '选择月份',
        selectYear: '选择年份'
    },
    'en-US': {
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        shortMonths: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        today: 'Today',
        clear: 'Clear',
        selectDate: 'Select date',
        selectMonth: 'Select month',
        selectYear: 'Select year'
    }
};

export const DateInput = forwardRef<DateInputRef, DateInputProps>((props, ref) => {
    const {
        value: controlledValue,
        defaultValue = '',
        placeholder,
        label,
        disabled = false,
        required = false,
        readOnly = false,
        autoFocus = false,
        mode = 'date',
        format = 'YYYY-MM-DD',
        locale = 'zh-CN',
        minDate,
        maxDate,
        showToday = true,
        showClear = true,
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
    const [currentDate, setCurrentDate] = useState<DateObject | null>(null);
    const [viewDate, setViewDate] = useState<DateObject>(getCurrentDate());
    const [viewMode, setViewMode] = useState<'date' | 'month' | 'year'>(mode === 'date' ? 'date' : 'month');

    // 引用
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 生成唯一ID
    const dateInputId = useId();
    const errorId = `${dateInputId}-error`;

    // 受控/非受控值处理
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    // 错误显示（优先显示外部错误）
    const error = externalError || internalError;

    // 获取当前日期
    function getCurrentDate(): DateObject {
        const now = new Date();
        return {
            year: now.getFullYear(),
            month: now.getMonth(),
            day: now.getDate()
        };
    }

    // 解析日期字符串
    const parseDateString = useCallback((dateStr: string): DateObject | null => {
        if (!dateStr) return null;

        // 支持多种日期格式
        const formats = [
            /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
            /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/,
            /^(\d{1,2})-(\d{1,2})-(\d{4})$/,
            /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
        ];

        for (const pattern of formats) {
            const match = dateStr.match(pattern);
            if (match) {
                let year, month, day;

                if (pattern === formats[0] || pattern === formats[1]) {
                    // YYYY-MM-DD 或 YYYY/MM/DD
                    year = parseInt(match[1], 10);
                    month = parseInt(match[2], 10) - 1;
                    day = parseInt(match[3], 10);
                } else {
                    // MM-DD-YYYY 或 MM/DD/YYYY
                    year = parseInt(match[3], 10);
                    month = parseInt(match[1], 10) - 1;
                    day = parseInt(match[2], 10);
                }

                // 验证日期有效性
                const date = new Date(year, month, day);
                if (
                    date.getFullYear() === year &&
                    date.getMonth() === month &&
                    date.getDate() === day
                ) {
                    return { year, month, day };
                }
            }
        }

        return null;
    }, []);

    // 格式化日期对象
    const formatDate = useCallback((date: DateObject | null): string => {
        if (!date) return '';

        const { year, month, day } = date;

        switch (format) {
            case 'YYYY-MM-DD':
                return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            case 'YYYY/MM/DD':
                return `${year}/${(month + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
            case 'MM-DD-YYYY':
                return `${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
            case 'MM/DD/YYYY':
                return `${(month + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
            case 'DD-MM-YYYY':
                return `${day.toString().padStart(2, '0')}-${(month + 1).toString().padStart(2, '0')}-${year}`;
            case 'DD/MM/YYYY':
                return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
            default:
                // 自定义格式
                return format
                    .replace('YYYY', year.toString())
                    .replace('MM', (month + 1).toString().padStart(2, '0'))
                    .replace('DD', day.toString().padStart(2, '0'))
                    .replace('M', (month + 1).toString())
                    .replace('D', day.toString());
        }
    }, [format]);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        validate: () => validateInput(value),
        getValue: () => value,
        setValue: (newValue: string) => {
            const date = parseDateString(newValue);
            if (controlledValue === undefined) {
                setInternalValue(newValue);
            }
            if (date) {
                setCurrentDate(date);
                setViewDate(date);
            }
            if (onChange && date) {
                onChange(newValue, date);
            }
        },
        clear: () => {
            if (controlledValue === undefined) {
                setInternalValue('');
            }
            setCurrentDate(null);
            setInternalError(null);
            if (onChange) {
                onChange('', null);
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
            setInternalError('请选择日期');
            return false;
        }

        // 日期格式验证
        if (val && !parseDateString(val)) {
            setInternalError('日期格式不正确');
            return false;
        }

        // 日期范围验证
        if (val && parseDateString(val)) {
            const date = parseDateString(val);
            if (date) {
                if (minDate && isDateBefore(date, parseDateString(minDate))) {
                    setInternalError(`日期不能早于 ${minDate}`);
                    return false;
                }

                if (maxDate && isDateAfter(date, parseDateString(maxDate))) {
                    setInternalError(`日期不能晚于 ${maxDate}`);
                    return false;
                }
            }
        }

        // 自定义验证规则
        for (const rule of validationRules) {
            if (rule.required && !val.trim()) {
                setInternalError(rule.message || '请选择日期');
                return false;
            }

            if (rule.pattern && !rule.pattern.test(val)) {
                setInternalError(rule.message || '日期格式不正确');
                return false;
            }

            if (rule.validator) {
                const date = parseDateString(val);
                if (!rule.validator(val, date)) {
                    setInternalError(rule.message || '验证失败');
                    return false;
                }
            }
        }

        setInternalError(null);
        return true;
    };

    // 比较日期
    const isDateBefore = (date1: DateObject, date2: DateObject | null): boolean => {
        if (!date2) return false;

        const time1 = new Date(date1.year, date1.month, date1.day).getTime();
        const time2 = new Date(date2.year, date2.month, date2.day).getTime();

        return time1 < time2;
    };

    const isDateAfter = (date1: DateObject, date2: DateObject | null): boolean => {
        if (!date2) return false;

        const time1 = new Date(date1.year, date1.month, date1.day).getTime();
        const time2 = new Date(date2.year, date2.month, date2.day).getTime();

        return time1 > time2;
    };

    // 处理输入变化
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        // 更新内部状态（如果是非受控组件）
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        const date = parseDateString(newValue);
        if (date) {
            setCurrentDate(date);
            setViewDate(date);
        }

        // 调用外部onChange
        if (onChange) {
            onChange(newValue, date);
        }

        // 如果已经触摸过，进行实时验证
        if (touched) {
            validateInput(newValue);
        }
    };

    // 处理日期选择
    const handleDateSelect = (date: DateObject) => {
        const newValue = formatDate(date);

        // 更新内部状态（如果是非受控组件）
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }

        setCurrentDate(date);

        // 调用外部onChange
        if (onChange) {
            onChange(newValue, date);
        }

        // 验证并关闭下拉框
        validateInput(newValue);
        setIsOpen(false);
        if (onOpenChange) onOpenChange(false);
    };

    // 处理月份选择
    const handleMonthSelect = (month: number) => {
        if (mode === 'month') {
            const date = { ...viewDate, month, day: 1 };
            handleDateSelect(date);
        } else {
            setViewDate(prev => ({ ...prev, month }));
            setViewMode('date');
        }
    };

    // 处理年份选择
    const handleYearSelect = (year: number) => {
        if (mode === 'year') {
            const date = { ...viewDate, year, month: 0, day: 1 };
            handleDateSelect(date);
        } else {
            setViewDate(prev => ({ ...prev, year }));
            setViewMode('month');
        }
    };

    // 处理今天选择
    const handleTodaySelect = () => {
        const today = getCurrentDate();
        handleDateSelect(today);
    };

    // 处理清除
    const handleClear = () => {
        if (controlledValue === undefined) {
            setInternalValue('');
        }
        setCurrentDate(null);
        setInternalError(null);
        if (onChange) {
            onChange('', null);
        }
        setIsOpen(false);
        if (onOpenChange) onOpenChange(false);
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

    // 当值变化时更新当前日期
    useEffect(() => {
        if (value) {
            const date = parseDateString(value);
            if (date) {
                setCurrentDate(date);
                setViewDate(date);
            }
        }
    }, [value, parseDateString]);

    // 自动聚焦
    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    // 生成月份数据
    const monthData = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            value: i,
            label: locales[locale].shortMonths[i]
        }));
    }, [locale]);

    // 生成年份数据
    const yearData = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear - 10; i <= currentYear + 10; i++) {
            years.push(i);
        }
        return years;
    }, []);

    // 生成日期数据
    const dateData = useMemo(() => {
        const year = viewDate.year;
        const month = viewDate.month;

        // 获取该月第一天和最后一天
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        // 获取该月第一天是星期几（0-6，0代表周日）
        const firstDayOfWeek = firstDay.getDay();

        // 获取该月总天数
        const daysInMonth = lastDay.getDate();

        // 获取上个月最后几天
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        const days = [];

        // 添加上个月的日期
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, prevMonthLastDay - i),
                isCurrentMonth: false,
                isToday: false
            });
        }

        // 添加当前月的日期
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            days.push({
                date,
                isCurrentMonth: true,
                isToday:
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear()
            });
        }

        // 添加下个月的日期
        const totalCells = 42; // 6行x7列
        const nextMonthDays = totalCells - days.length;
        for (let i = 1; i <= nextMonthDays; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false,
                isToday: false
            });
        }

        return days;
    }, [viewDate]);

    // 构建CSS类名
    const containerClasses = [
        'date-input-container',
        disabled && 'date-input-container--disabled',
        readOnly && 'date-input-container--readonly',
        isOpen && 'date-input-container--open',
        isFocused && 'date-input-container--focused',
        error && 'date-input-container--error',
        className
    ].filter(Boolean).join(' ');

    // 渲染日期视图
    const renderDateView = () => (
        <>
            <div className="date-input-header">
                <button
                    type="button"
                    className="date-input-nav date-input-nav--prev"
                    onClick={() => setViewDate(prev => ({
                        ...prev,
                        month: prev.month === 0 ? 11 : prev.month - 1,
                        year: prev.month === 0 ? prev.year - 1 : prev.year
                    }))}
                >
                    ‹
                </button>

                <div className="date-input-title">
                    <button
                        type="button"
                        className="date-input-title-button"
                        onClick={() => setViewMode('month')}
                    >
                        {locales[locale].months[viewDate.month]}
                    </button>
                    <button
                        type="button"
                        className="date-input-title-button"
                        onClick={() => setViewMode('year')}
                    >
                        {viewDate.year}
                    </button>
                </div>

                <button
                    type="button"
                    className="date-input-nav date-input-nav--next"
                    onClick={() => setViewDate(prev => ({
                        ...prev,
                        month: prev.month === 11 ? 0 : prev.month + 1,
                        year: prev.month === 11 ? prev.year + 1 : prev.year
                    }))}
                >
                    ›
                </button>
            </div>

            <div className="date-input-weekdays">
                {locales[locale].days.map(day => (
                    <div key={day} className="date-input-weekday">{day}</div>
                ))}
            </div>

            <div className="date-input-days">
                {dateData.map((day, index) => {
                    const isSelected = currentDate &&
                        day.date.getDate() === currentDate.day &&
                        day.date.getMonth() === currentDate.month &&
                        day.date.getFullYear() === currentDate.year;

                    // @ts-ignore
                    const isDisabled:boolean|undefined =
                        (minDate && isDateBefore(
                            { year: day.date.getFullYear(), month: day.date.getMonth(), day: day.date.getDate() },
                            parseDateString(minDate)
                        )) ||
                        (maxDate && isDateAfter(
                            { year: day.date.getFullYear(), month: day.date.getMonth(), day: day.date.getDate() },
                            parseDateString(maxDate)
                        ));

                    return (
                        <button
                            key={index}
                            type="button"
                            className={[
                                'date-input-day',
                                !day.isCurrentMonth && 'date-input-day--other-month',
                                day.isToday && 'date-input-day--today',
                                isSelected && 'date-input-day--selected',
                                isDisabled && 'date-input-day--disabled'
                            ].filter(Boolean).join(' ')}
                            disabled={isDisabled}
                            onClick={() => {
                                if (day.isCurrentMonth && !isDisabled) {
                                    handleDateSelect({
                                        year: day.date.getFullYear(),
                                        month: day.date.getMonth(),
                                        day: day.date.getDate()
                                    });
                                }
                            }}
                        >
                            {day.date.getDate()}
                        </button>
                    );
                })}
            </div>
        </>
    );

    // 渲染月份视图
    const renderMonthView = () => (
        <>
            <div className="date-input-header">
                <button
                    type="button"
                    className="date-input-nav date-input-nav--prev"
                    onClick={() => setViewDate(prev => ({ ...prev, year: prev.year - 1 }))}
                >
                    ‹
                </button>

                <div className="date-input-title">
                    <button
                        type="button"
                        className="date-input-title-button"
                        onClick={() => setViewMode('year')}
                    >
                        {viewDate.year}
                    </button>
                </div>

                <button
                    type="button"
                    className="date-input-nav date-input-nav--next"
                    onClick={() => setViewDate(prev => ({ ...prev, year: prev.year + 1 }))}
                >
                    ›
                </button>
            </div>

            <div className="date-input-months">
                {monthData.map(month => (
                    <button
                        key={month.value}
                        type="button"
                        className={[
                            'date-input-month',
                            month.value === viewDate.month && 'date-input-month--selected'
                        ].filter(Boolean).join(' ')}
                        onClick={() => handleMonthSelect(month.value)}
                    >
                        {month.label}
                    </button>
                ))}
            </div>
        </>
    );

    // 渲染年份视图
    const renderYearView = () => (
        <>
            <div className="date-input-header">
                <button
                    type="button"
                    className="date-input-nav date-input-nav--prev"
                    onClick={() => setViewDate(prev => ({ ...prev, year: prev.year - 12 }))}
                >
                    ‹
                </button>

                <div className="date-input-title">
                    {`${yearData[0]} - ${yearData[yearData.length - 1]}`}
                </div>

                <button
                    type="button"
                    className="date-input-nav date-input-nav--next"
                    onClick={() => setViewDate(prev => ({ ...prev, year: prev.year + 12 }))}
                >
                    ›
                </button>
            </div>

            <div className="date-input-years">
                {yearData.map(year => (
                    <button
                        key={year}
                        type="button"
                        className={[
                            'date-input-year',
                            year === viewDate.year && 'date-input-year--selected'
                        ].filter(Boolean).join(' ')}
                        onClick={() => handleYearSelect(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>
        </>
    );

    return (
        <div className={containerClasses} style={style} ref={containerRef}>
            {label && (
                <label className="date-input-label" htmlFor={dateInputId}>
                    {label}
                    {required && <span className="date-input-required">*</span>}
                </label>
            )}

            <div
                className="date-input-trigger"
                onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
            >
                <input
                    ref={inputRef}
                    id={dateInputId}
                    type="text"
                    value={value}
                    placeholder={placeholder || format}
                    disabled={disabled}
                    readOnly={readOnly}
                    className="date-input-element"
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />

                <div className="date-input-suffix">
          <span className="date-input-icon">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7v-2zm0 4h7v2H7v-2z" fill="currentColor"/>
            </svg>
          </span>
                </div>
            </div>

            {isOpen && !disabled && !readOnly && (
                <div className="date-input-dropdown" ref={dropdownRef}>
                    <div className="date-input-panel">
                        {viewMode === 'date' && renderDateView()}
                        {viewMode === 'month' && renderMonthView()}
                        {viewMode === 'year' && renderYearView()}

                        <div className="date-input-actions">
                            {showToday && (
                                <button
                                    type="button"
                                    className="date-input-today"
                                    onClick={handleTodaySelect}
                                >
                                    {locales[locale].today}
                                </button>
                            )}
                            {showClear && (
                                <button
                                    type="button"
                                    className="date-input-clear"
                                    onClick={handleClear}
                                >
                                    {locales[locale].clear}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div id={errorId} className="date-input-error">
                    {error}
                </div>
            )}
        </div>
    );
});

// 设置显示名称
DateInput.displayName = 'DateInput';

export namespace DateInputCallback{

    export const handleDateStringDataChange =<T=any>(field: string,setData:React.Dispatch<React.SetStateAction<T>>,emptyValue:string|null=null)=> (value: string, date: any) => {
        if(value==null||value.length===0){
            setData((prev: any) => ({...prev, [field]: emptyValue}));
        }else{
            setData((prev: any) => ({...prev, [field]: value}));
        }
    };

    // export const handleDateDataChange =<T extends object = any>(field: string,data:T|undefined,emptyValue:Date|null=null)=> (value: string, date: DateObject) => {
    //
    //     // if(!data){
    //     //     throw Error("data is undefined");
    //     // }
    //     //
    //     // if(typeof data === "object"){
    //     //     if(data.hasOwnProperty(field)){
    //     //         if(data[field] instanceof Date){
    //     //             if(data[field]==null){
    //     //
    //     //             }else{
    //     //
    //     //             }
    //     //         }else if(typeof data[field] === "string"){
    //     //             if(data[field]==null){
    //     //
    //     //             }else{
    //     //
    //     //             }
    //     //         }else{
    //     //             throw Error("data["+field+"]is neither Date nor string!");
    //     //         }
    //     //     }else{
    //     //         throw Error("data doesn't have property named "+field);
    //     //     }
    //     //
    //     // }else{
    //     //     throw Error("data is not an object");
    //     // }
    //
    // };
}