import React, {useState, useEffect, ReactNode, forwardRef, useImperativeHandle} from 'react';
import api from "../../utils/api/api_config";
import {AxiosError, AxiosResponse} from "axios";
import ReactDOM from "react-dom/client";

// API响应数据类型
export interface LoginCheckResponse {
    code: number;
    data: {
        isLogin: 'true' | 'false';
    };
    status: string;
    timestamp: number;
}

// 组件Props类型
export interface CheckLoginProps {
    to: string | null,
    request_api: string,
    children: ReactNode,
    loadingComponent?: ReactNode,
    notLoginComponent?: ReactNode,
    errorComponent?: ReactNode,
    onLoginSuccess?: () => void,
    onLoginFail?: () => void
}


export interface CheckLoginRef {
    checkLoginStatus: () => void;
    handleRetry: () => void;
}

export const CheckLogin= forwardRef<CheckLoginRef, CheckLoginProps>((props, ref) => {
    const {
        to = null,
        request_api,
        children,
        loadingComponent,
        notLoginComponent,
        errorComponent,
        onLoginSuccess,
        onLoginFail
    } = props;

    const [isChecking, setIsChecking] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        checkLoginStatus: () => {
            _checkLoginStatus();
        },
        handleRetry: () => {
            _handleRetry();
        }
    }));
    useEffect(() => {
        _checkLoginStatus();
    }, [request_api]);

    //检查登录状态
    const _checkLoginStatus = async (): Promise<void> => {
        try {
            setIsChecking(true);
            setHasError(false);
            //alert("暂停测试");
            await api.get(request_api, {
                timeout: 10000, // 10秒超时
                withCredentials: true // 携带cookie
            }).then(response => {
                //@ts-ignore
                if (response.code === 200) {
                    //@ts-ignore
                    const loginStatus = response.data.isLogin === 'true';
                    setIsLoggedIn(loginStatus);
                    if (loginStatus) {
                        onLoginSuccess?.();
                    } else {
                        onLoginFail?.();
                        // 未登录，跳转到指定页面
                        if (to != null) {
                            window.location.href = to;
                        }
                    }
                } else {
                    //@ts-ignore
                    throw new Error(`API返回错误码: ${data.code}`);
                }
            });
        } catch (error) {
            setHasError(true);
            console.error('检查登录状态失败:', error);
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                // 服务器返回错误状态码
                console.error('服务器错误:', axiosError.response.status);
            } else if (axiosError.request) {
                // 请求发送失败
                console.error('网络错误: 无法连接到服务器');
            }
            onLoginFail?.();
        } finally {
            setIsChecking(false);
        }
    };

    //重试
    const _handleRetry = (): void => {
        _checkLoginStatus();
    };

    // 显示加载状态
    if (isChecking) {
        return loadingComponent ? (
            <>{loadingComponent}</>
        ) : (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}>
                <div>检查登录状态中...</div>
            </div>
        );
    }

    // 显示错误状态
    if (hasError) {
        return errorComponent ? (
            <>{errorComponent}</>
        ) : (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                gap: '10px'
            }}>
                <div>检查登录状态时发生错误</div>
                <button
                    onClick={_handleRetry}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    重试
                </button>
            </div>
        );
    }

    // 已登录，渲染子组件
    if (isLoggedIn) {
        return <>{children}</>;
    }



    // 未登录但正在跳转，显示跳转提示
    return (to==null?
        (notLoginComponent?(
            <>{notLoginComponent}</>
        ) : (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            gap: '10px'
        }}>
            <div>你还没有登录</div>
            <button
                onClick={_handleRetry}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#1890ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                重试
            </button>
        </div>
    ))
        : (<div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'}}>
        <div>未登录，正在跳转...</div>
    </div>));

});
