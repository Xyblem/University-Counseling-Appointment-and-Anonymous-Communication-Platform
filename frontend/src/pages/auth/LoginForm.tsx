//样式
import './Auth.css'
//React框架
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom'
//自定义组件
import {LoginRequest, UserController} from "../../controller/UserController";
import {CaptchaController} from "../../controller/CaptchaController";
import {ReturnObject} from "../../common/response/ReturnObject";
import {Input, InputCallback, InputRef} from "../../common/view/input/Input";
import {RadioGroup, RadioGroupCallback, RadioGroupRef} from "../../common/view/input/Radio";
import {CaptchaCallback, CaptchaRef} from "../../common/view/custom-input/Captcha";
import {Button} from "../../common/view/controller/Button";
import {Captcha} from "../../common/view/custom-input/Captcha";
import {User} from "../../entity/User";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {Loading} from "../../common/view/display/Loading";
import {ResponseState} from "../../common/response/ResponseState";

//登录界面
export const LoginForm: React.FC = () => {
    //控制器
    const userController = new UserController();
    const captchaController = new CaptchaController();
    //路由
    const navigate = useNavigate();
    //状态
    const [formData, setFormData] = useState<LoginRequest>({
        username: '',
        password: '',
        role: '',
        captcha: '',
        captchaKey: ''
    });
    const [loginState, setLoginState] = useState<ResponseState>();
    //引用
    const usernameInputRef = useRef<InputRef>(null);
    const passwordInputRef = useRef<InputRef>(null);
    const roleRef = useRef<RadioGroupRef>(null);
    const captchaRef = useRef<CaptchaRef>(null);
    const loginHandlerRef = useRef<ResponseHandlerRef<LoginRequest, any>>(null);

    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-用户登录";
    }, []);


    //处理表单提交
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        // 手动验证所有字段
        const isAccountValid = usernameInputRef.current?.validate();
        const isPasswordValid = passwordInputRef.current?.validate();
        const isRoleValid = roleRef.current?.validate();
        const isCaptchaValid = captchaRef.current?.validate();
        // 阻止默认提交
        event.preventDefault();
        if (isAccountValid && isPasswordValid && isRoleValid && isCaptchaValid) {
            //console.log("暂停测试：",formData);alert("暂停测试");
            loginHandlerRef.current?.request(formData);
        } else {
            alert('请检查表单错误!');
        }
    };


    const retryButton = (<Button type="link" className="btn-text-align-left" onClick={() => {
        loginHandlerRef.current?.recover();
    }}>重试</Button>);


    const mainForm = (<div>
        <h2>用户登录</h2>
        <form onSubmit={handleSubmit}>
            <Input
                ref={usernameInputRef}
                type="text"
                label="用户名"
                placeholder="请输入用户名"
                prefix={<span>A</span>}
                validationRules={User.ValidationRules.username}
                onChange={InputCallback.handleDataChange<LoginRequest>("username", setFormData, null)}
                required
            />
            <Input
                ref={passwordInputRef}
                type="password"
                label="密码"
                placeholder="请输入密码"
                prefix={<span>P</span>}
                validationRules={User.ValidationRules.password}
                onChange={InputCallback.handleDataChange<LoginRequest>("password", setFormData, null)}
                required
            />
            <RadioGroup
                ref={roleRef}
                label="用户类型"
                size="large"
                options={User.Options.role}
                required
                layout="horizontal"
                onChange={RadioGroupCallback.handleDataChange<LoginRequest>("role", setFormData, null)}
            />
            <Captcha
                ref={captchaRef}
                onChange={CaptchaCallback.handleDataChange<LoginRequest>("captchaKey", "captcha", captchaRef, setFormData, null)}
                placeholder="请输入图片中的验证码"
                autoRefresh={true}
                getCaptcha={captchaController.captcha}
            />
            <br/>
            <Button type="primary" block summit>登录</Button>
            <br/>
            <div className="auth-bottom">
                <Button type="link" className="btn-text-align-left" onClick={() => {
                    navigate('/auth/signup')
                }}>还没有账号？点击注册</Button>
                <Button type="link" className="btn-text-align-right">忘记密码</Button>
            </div>
        </form>
    </div>);


    return (<div className="auth-background">
        <div className="auth-login-form">
            <h2>高校心理咨询预约与匿名交流平台</h2>

            <ResponseHandler<LoginRequest, any>
                setResponseState={setLoginState}
                ref={loginHandlerRef}
                request={userController.login}
                idleComponent={mainForm}
                loadingComponent={
                    <div>{mainForm}
                        <Loading type="dots"
                                 text='登录中...'
                                 color="#2196f3"
                                 size="large"
                                 fullScreen/>
                    </div>
                }

                handlingReturnObjectComponent={
                    <div>
                        {mainForm}
                        <Loading type="dots"
                                 text='处理处理登录结果中...'
                                 color="#2196f3"
                                 size="large"
                                 fullScreen/>
                    </div>
                }

                finishedComponent={
                    <div>
                        <h2>登录{ReturnObject.Status.ChineseName.get(loginState?.returnObject?.status)}</h2>
                        <p className=".auth-error-detail">{loginState?.returnObject?.message}</p>
                        <div className="auth-bottom">{retryButton}</div>
                    </div>
                }

                onRequestEnd={(requestBody, returnObject) => {
                    if (returnObject.code === ReturnObject.Code.SUCCESS) {
                        navigate('/home/main');
                    }
                }}

                networkErrorComponent={<div>
                    <h2>网络错误</h2>
                    <p className=".auth-error-detail">详情：{loginState?.networkError?.message}</p>
                    <div className="auth-bottom">{retryButton}</div>
                </div>}
            />
        </div>
    </div>)
}