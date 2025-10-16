//React框架
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom'
//样式
import './Auth.css'
//自定义组件
import {InputField, InputRef} from '../../components/ui/widget/InputField'
import {RadioGroup, RadioGroupRef} from "../../components/ui/widget/Radio";
import {Button} from '../../components/ui/widget/Button'
import {Captcha, CaptchaRef} from '../../components/ui/combined/Captcha'
import {Loading} from "../../components/ui/widget/Loading";
//API
import api from "../../utils/api/api_config";
//输入验证规则
import {usernameValidationRules,passwordValidationRules} from "../../entity/User";
//输入选项
import {userRoleOptions} from "../../utils/option/input-option";

//登录请求类型
interface LoginRequest{
    username?: string;
    password?: string;
    role?: string;
    captcha?: string;
    captchaKey?:string;
}

// 登录响应类型
interface LoginResponse {
    code: number;
    message: string;
    status: string;
    data:any;
}

//登录界面
export const LoginForm: React.FC = () => {
    //状态
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [errorDetail, setErrorDetail] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
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

    //路由
    const navigate = useNavigate();

    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-用户登录";
    }, []);

    //处理输入变化
    const handleInputChange = (field: string) => (value: string | string[]) => {
        if(value==null||value.length===0){
            setFormData(prev => ({...prev, [field]: null}));
        }else{
            setFormData(prev => ({...prev, [field]: value}));
        }
    };

    const handleCaptchaInputChange = (field: string) => (value: string | string[]) => {
        const kd = captchaRef.current == null ? null : captchaRef.current.getCaptchaData();
        const key=kd==null ? '' : kd.key;
        setFormData(prev => ({...prev, [field]: value,captchaKey:key}));
    };

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
        setLoading(true);
        setError(null);
        setErrorDetail(null);
        try {
            await api.get<LoginResponse>("api/user/login", {params: formData}).then(response => {
                //console.log("暂停测试：",response);alert("暂停测试");
                // @ts-ignore
                if (response.code === 200) {
                    navigate('/home');
                } else {
                    setError('登录失败');
                    // @ts-ignore
                    setErrorDetail('详情：' + response.msg);
                    // @ts-ignore
                    throw new Error(response.message);
                }
            });
        } catch (err:any) {
            setError('登录失败');
            setErrorDetail('详情：' + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (<div className="auth-container">
        <div className="auth-form">
            <h2>高校心理咨询预约与匿名交流平台</h2>

            {loading ? <Loading
                type="dots"
                text='登录中...'
                color="#2196f3"
                size="large"
                fullScreen
            ></Loading> : null}

            {error ? <div>
                    <h2>{error}</h2>
                    <p
                        style={{minHeight: '400px', fontSize: "16px", display: "flex",textAlign:"left"}}
                    >{errorDetail}</p>
                    <div className="auth-bottom">
                        <Button type="link" style={{textAlign: "left"}}
                                onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
                                    setError(null);
                                    setErrorDetail(null);
                                }}>重试</Button>
                    </div>
                </div> :
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
                            onChange={handleInputChange("username")}
                            required
                        />
                        <InputField
                            ref={passwordInputRef}
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            prefix={<span>P</span>}
                            validationRules={passwordValidationRules}
                            onChange={handleInputChange("password")}
                            required
                        />
                        <RadioGroup
                            ref={roleRef}
                            label="用户类型"
                            size="large"
                            options={userRoleOptions}
                            required
                            layout="horizontal"
                            onChange={handleInputChange("role")}
                            error={errors.role}
                        />
                        <Captcha
                            ref={captchaRef}
                            onChange={handleCaptchaInputChange("captcha")}
                            placeholder="请输入图片中的验证码"
                            autoRefresh={true}
                            api_getCaptcha="api/captcha"
                        />
                        <br/>
                        <Button type="primary" block={true} summit>登录</Button>
                        <br/>
                        <div className="auth-bottom">
                            <Button type="link" style={{textAlign: "left"}}
                                    onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
                                        navigate('/auth/signup')
                                    }}>还没有账号？点击注册</Button>
                            <Button type="link" style={{textAlign: "right"}}>忘记密码</Button>
                        </div>
                    </form>
                </div>
            }
        </div>
    </div>)
}