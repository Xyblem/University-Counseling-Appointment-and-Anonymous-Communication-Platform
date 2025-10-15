// Captcha.tsx
import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import api from '../../../utils/api/api_config';
import {InputField, InputRef, ValidationRule} from "../widget/InputField";
import './Captcha.css'

// 验证码响应类型
interface CaptchaResponse {
    code: number;
    data: {
        captchaKey: string;
        base64Image: string;
    };
    status: string;
    timestamp: number;
}

// 组件props类型
interface CaptchaProps {
    onCaptchaChange?: (captchaKey: string, captchaValue: string) => void;
    className?: string;
    placeholder?: string;
    autoRefresh?: boolean;
    inputClassName?: string;
    imageClassName?: string;
    buttonClassName?: string;
    api_getCaptcha?:string;
    onChange?: (value: string | string[], event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    label?:string;
    name?:string;
}

// Ref 暴露的方法类型
export interface CaptchaRef {
    refresh: () => Promise<void>;
    getCaptchaData: () => { key: string; value: string } | null;
    clearInput: () => void;
    focus: () => void;
}

export const Captcha = forwardRef<CaptchaRef, CaptchaProps>(({
                                                          onCaptchaChange,
                                                          className = '',
                                                          placeholder = '请输入验证码',
                                                          autoRefresh = false,
                                                          inputClassName = '',
                                                          imageClassName = '',
                                                          buttonClassName = '',
                                                          api_getCaptcha='',
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
        {
            minLength: 4,
            maxLength: 4,
            message:'验证码长度为4个字符'
        }
    ];

    // 获取验证码
    const fetchCaptcha = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError('');
        try {
            await api.get<CaptchaResponse>(api_getCaptcha).then(response=>{
                //console.log('获取验证码response:', response);
                // @ts-ignore
                if (response.code === 200 && response.data) {
                    const newCaptchaInfo = {
                        // @ts-ignore
                        key: response.data.captchaKey,
                        // @ts-ignore
                        image: response.data.base64Image
                    };
                    setCaptchaInfo(newCaptchaInfo);
                    setInputValue('');
                    // 通知父组件验证码已更新
                    onCaptchaChange?.(newCaptchaInfo.key, '');
                } else {
                    setError('获取验证码失败');
                    throw new Error('获取验证码失败');
                }
            });
        } catch (err) {
            setError('网络错误，请重试');
            console.error('获取验证码失败:', err);
            throw err;
        } finally {
            setLoading(false);
        }
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
        focus: focusInput
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

export default Captcha;