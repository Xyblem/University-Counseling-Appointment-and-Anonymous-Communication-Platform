//React框架
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom'
//样式
import './Auth.css'
//自定义组件
import {InputField, InputFieldCallback, InputRef} from '../../components/ui/widget/InputField'
import {RadioGroup, RadioGroupCallback, RadioGroupRef} from "../../components/ui/widget/Radio";
import {Button} from '../../components/ui/widget/Button'
import {Captcha, CaptchaCallback, CaptchaRef} from '../../components/ui/combined/Captcha'
import {Loading} from "../../components/ui/widget/Loading";
//输入验证规则
import {usernameValidationRules,passwordValidationRules} from "../../entity/User";
//输入选项
import {userRoleOptions} from "../../utils/option/input-option";
import {CaptchaController} from "../../controller/CaptchaController";
import {LoginRequest, UserController} from "../../controller/UserController";
import {ReturnObject, ReturnStatus, ReturnStatusNamesCN} from "../../utils/api/ReturnObject";
import {CheckReturnObject} from "../../components/functional/CheckReturnObject";

//登录界面
export const LoginForm: React.FC = () => {
    //控制器
    const userController=new UserController();
    const captchaController=new CaptchaController();
    //路由
    const navigate = useNavigate();
    //状态
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [loginReturnObject,setLoginReturnObject]=useState<ReturnObject|null>(null);
    const [loginNetworkError, setLoginNetworkError]=useState<Error|null>(null);
    const [formData, setFormData] = useState<LoginRequest>({
        username: '',
        password: '',
        role: '',
        captcha: '',
        captchaKey:''
    });
    //引用
    const usernameInputRef = useRef<InputRef>(null);
    const passwordInputRef = useRef<InputRef>(null);
    const roleRef = useRef<RadioGroupRef>(null);
    const captchaRef = useRef<CaptchaRef>(null);


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
        const isCaptchaValid=captchaRef.current?.validate();
        // 阻止默认提交
        event.preventDefault();
        if (isAccountValid && isPasswordValid && isRoleValid&&isCaptchaValid) {
            //console.log("暂停测试：",formData);alert("暂停测试");
            summitLogin();
        } else {
            alert('请检查表单错误!');
        }
    };

    //提交登录
    const summitLogin = async (): Promise<void> => {
        setLoginLoading(true);
        setLoginNetworkError(null);
        setLoginReturnObject(null);
        await userController.login(formData).then(result=>{
            setLoginReturnObject(result);
            if(result.status===ReturnStatus.SUCCESS){
                navigate('/home/main');
            }
        }).catch(err=>{
            setLoginNetworkError(err);
        }).finally(()=>{
            setLoginLoading(false);
        });
    }

    const retryButton=(<Button type="link" className="btn-text-align-left" onClick={() => {
        setLoginNetworkError(null);
        setLoginReturnObject(null);
    }}>重试</Button>);

    return (<div className="auth-background">
        <div className="auth-login-form">
            <h2>高校心理咨询预约与匿名交流平台</h2>

            {loginReturnObject!=null ? (
                <CheckReturnObject
                    loading={loginLoading}
                    returnObject={loginReturnObject}
                    networkError={loginNetworkError}
                    loadingComponent={<Loading type="dots" text='登录中...' color="#2196f3" size="large"
                                               fullScreen></Loading>}
                    networkErrorComponent={
                        <div>
                            <h2>网络错误</h2>
                            <p className=".auth-error-detail">{loginNetworkError?.message}</p>
                            <div className="auth-bottom">{retryButton}</div>
                        </div>
                    }
                >
                    <div>
                        <h2>登录{ReturnStatusNamesCN.get(loginReturnObject?.status)}</h2>
                        <p className=".auth-error-detail">{loginReturnObject?.message}</p>
                        <div className="auth-bottom">{retryButton}</div>
                    </div>
                </CheckReturnObject>
            ): (
                <div>
                    <h2>用户登录</h2>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            ref={usernameInputRef}
                            type="text"
                            label="用户名"
                            placeholder="请输入用户名"
                            prefix={<span>A</span>}
                            validationRules={usernameValidationRules}
                            onChange={InputFieldCallback.handleDataChange<LoginRequest>("username", setFormData, null)}
                            required
                        />
                        <InputField
                            ref={passwordInputRef}
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            prefix={<span>P</span>}
                            validationRules={passwordValidationRules}
                            onChange={InputFieldCallback.handleDataChange<LoginRequest>("password", setFormData, null)}
                            required
                        />
                        <RadioGroup
                            ref={roleRef}
                            label="用户类型"
                            size="large"
                            options={userRoleOptions}
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
                </div>
            )}
        </div>
    </div>)
}