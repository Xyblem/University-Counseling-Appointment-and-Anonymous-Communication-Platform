// Captcha.tsx
import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import api from '../../../utils/api/api_config';
import {InputField, InputRef, ValidationRule} from "../widget/InputField";
import './Captcha.css'


// 组件props类型
interface CaptchaProps {
    onCaptchaChange?: (captchaKey: string, captchaValue: string) => void;
    className?: string;
    placeholder?: string;
    autoRefresh?: boolean;
    inputClassName?: string;
    imageClassName?: string;
    buttonClassName?: string;
    // api_getCaptcha?:string;弃用
    getCaptcha: () => Promise<{captchaKey: string; base64Image: string;}>;
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    label?:string;
    name?:string;
}

// Ref 暴露的方法类型
export interface CaptchaRef {
    refresh: () => Promise<void>;
    getCaptchaData: () => { key: string; value: string } | null;
    clearInput: () => void;
    focus: () => void;
    validate: () => boolean;
}

export const Captcha = forwardRef<CaptchaRef, CaptchaProps>(({
                                                          onCaptchaChange,
                                                          className = '',
                                                          placeholder = '请输入验证码',
                                                          autoRefresh = false,
                                                          inputClassName = '',
                                                          imageClassName = '',
                                                          buttonClassName = '',
                                                          // api_getCaptcha='',弃用
                                                          getCaptcha,
                                                          label='验证码',
                                                          onChange,
                                                          name
                                                      }, ref) => {
    const [captchaInfo, setCaptchaInfo] = useState<{ key: string; image: string } | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const inputRef = React.useRef<InputRef>(null);

    const captchaInputRules: ValidationRule[] = [
        {
            required: true,
            message: '验证码不能为空'
        },
        {
            pattern: /^[A-Za-z0-9_]+$/,
            message: '验证码只能为字母、数字和下划线'
        },
    ];

    // 获取验证码
    const fetchCaptcha = useCallback(async ():Promise<void>=> {
        setLoading(true);
        setError('');
        await getCaptcha().then(result=>{
                const newCaptchaInfo = {
                    // @ts-ignore
                    key: result.captchaKey,
                    // @ts-ignore
                    image: result.base64Image
                };
                setCaptchaInfo(newCaptchaInfo);
                setInputValue('');
                // 通知父组件验证码已更新
                onCaptchaChange?.(newCaptchaInfo.key, '');
            }
        ).catch(err =>{
                setError('网络错误，请重试');
                console.error('获取验证码失败:', err);
            }
        ).finally(()=>{
                setLoading(false);
            }
        );
    }, [onCaptchaChange]);

    // 刷新验证码
    const handleRefresh = async () => {
        try {
            await fetchCaptcha();
        } catch (err) {
            // 错误已经在 fetchCaptcha 中处理
        }
    };

    // 处理输入变化
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (captchaInfo) {
            onCaptchaChange?.(captchaInfo.key, value);
        }

        if (onChange) {
            onChange(value, e);
        }
    };

    // 清空输入
    const clearInput = () => {
        setInputValue('');
        if (captchaInfo) {
            onCaptchaChange?.(captchaInfo.key, '');
        }
    };

    // 聚焦输入框
    const focusInput = () => {
        inputRef.current?.focus();
    };

    // 获取验证码数据
    const getCaptchaData = () => {
        if (!captchaInfo || !inputValue) return null;
        return {
            key: captchaInfo.key,
            value: inputValue
        };
    };

    // 暴露方法给 ref
    useImperativeHandle(ref, () => ({
        refresh: fetchCaptcha,
        getCaptchaData,
        clearInput,
        focus: focusInput,
        validate: ():boolean=> {
            if(inputRef.current!=null) {
                return inputRef.current?.validate();
            }
            return false;
        }
    }));

    // 自动刷新处理
    useEffect(() => {
        if (autoRefresh && !captchaInfo) {
            fetchCaptcha();
        }
    }, [autoRefresh, captchaInfo, fetchCaptcha]);

    // 组件挂载时获取验证码
    useEffect(() => {
        fetchCaptcha();
    }, [fetchCaptcha]);

    return (
        <div className={`captcha-container ${className}`}>
            <div className="captcha-input-group">
                <InputField
                    label={label}
                    placeholder={placeholder}
                    validationRules={captchaInputRules}
                    ref={inputRef}
                    type="text"
                    name={name}
                    value={inputValue}
                    onChange={(value,event)=>{handleInputChange(event)}}
                    className={`${inputClassName}`}
                    disabled={loading || !captchaInfo}
                    required
                />
                <div className="captcha-image-container">
                    {loading ? (
                        <div className="captcha-loading">加载中...</div>
                    ) : captchaInfo ? (
                        <img
                            src={captchaInfo.image}
                            alt="验证码"
                            className={`captcha-image ${imageClassName}`}
                            onClick={handleRefresh}
                            title="点击刷新验证码"
                        />
                    ) : (
                        <div className="captcha-error" onClick={handleRefresh}>
                            加载失败，点击重试
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleRefresh}
                    className={`captcha-refresh-btn ${buttonClassName}`}
                    disabled={loading}
                    title="刷新验证码"
                >
                    刷新
                </button>

            </div>
            {error && <div className="captcha-error-message">{error}</div>}
        </div>
    );
});

// 设置显示名称，便于调试
Captcha.displayName = 'Captcha';


export class CaptchaCallback{
    /**
     * 处理验证码的输入变化
     * @param captchaKeyField 验证码Key的字段名
     * @param captchaCodeField 验证码的字段名
     * @param captchaRef 验证码输入组件引用
     * @param setData 设置数据状态的方法
     * @param emptyValue 输入为空时的验证码的值
     */
    static handleDataChange=<T=any>(captchaKeyField:string,captchaCodeField: string,captchaRef:React.RefObject<CaptchaRef | null>,setData:React.Dispatch<React.SetStateAction<T>>,emptyValue:string|null=null) => (value: string) => {
        const code = captchaRef.current == null ? null : captchaRef.current.getCaptchaData();
        const key=code==null ? '' : code.key;
        if(value==null||value.length===0){
            setData((prev: any) => ({...prev, [captchaCodeField]: emptyValue,[captchaKeyField]:key}));
        }else{
            setData((prev: any) => ({...prev, [captchaCodeField]: value,[captchaKeyField]:key}));
        }
    }
}

