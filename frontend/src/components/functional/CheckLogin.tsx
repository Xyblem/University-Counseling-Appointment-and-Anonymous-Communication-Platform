import React, {useState, useEffect, ReactNode, forwardRef, useImperativeHandle} from 'react';
import {AxiosError} from "axios";
import {ReturnObject} from "../../utils/api/ReturnObject";

// 组件Props类型
export interface CheckLoginProps {
    to?: string | null,
    // request_api: string, 弃用
    checkLogin:()=>Promise<ReturnObject>,
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
    loading:boolean;
}

export const CheckLogin= forwardRef<CheckLoginRef, CheckLoginProps>((props, ref) => {
    const {
        to = null,
        // request_api, 弃用
        checkLogin,
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
        },
        loading:isChecking
    }));
    useEffect(() => {
        _checkLoginStatus();
    }, [children]);

    //检查登录状态
    const _checkLoginStatus = async (): Promise<void> => {
        setIsChecking(true);
        setHasError(false);
        await checkLogin().then(result=>{
                setIsLoggedIn(result.data.isLogin==="true");
                if (result.data.isLogin==="true") {
                    onLoginSuccess?.();
                } else {
                    onLoginFail?.();
                    // 未登录，跳转到指定页面
                    if (to != null) {
                        window.location.href = to;
                    }
                }
            }
        ).catch(error=>{
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
                }
        ).finally(()=>{
            setIsChecking(false);
            }
        );
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
