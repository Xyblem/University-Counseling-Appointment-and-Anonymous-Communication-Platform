//React 框架
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom'
//样式
import './Auth.css'
//自定义组件
import {InputField, InputRef} from '../../components/ui/widget/InputField'
import {Button} from '../../components/ui/widget/Button'
import {Captcha, CaptchaRef} from '../../components/ui/combined/Captcha'
import {RadioGroup, RadioGroupRef} from "../../components/ui/widget/Radio";
import {Select, SelectRef} from "../../components/ui/widget/Select";
//输入验证规则
import {accountValidationRules, emailValidationRules, passwordValidationRules} from "../../utils/validation/input_validation";
//输入选项
import {userRoleOptions,genderOptions,provinceOptions,jobRoleOptions} from "../../utils/option/input-option";

//登录请求类型
interface SignupRequest{
    name?: string;
    gender?: string;
    province?: string;
    school?: string;
    subunit?: string;
    major?: string;
    role?: string;
    jobRole?: string;
    email?: string;
    phone?: string;
    qq?: string;
    wechat?: string;
    username?: string;
    password?: string;
    comfirmedPassword?:string;
    captcha?: string;
}

// 登录响应类型
interface SignupResponse {
    code: number;
    message: string;
    status: string;
    data:any;
}

//注册界面
export const SignUpForm: React.FC = () => {
    //状态
    const [errors, setErrors] = useState<Record<string, string>>({});
    //引用
    const nameInputRef=useRef<InputRef>(null);
    const genderRef = useRef<RadioGroupRef>(null);
    const provinceSelectRef = useRef<SelectRef>(null);
    const schoolInputRef=useRef<InputRef>(null);
    const subunitInputRef=useRef<InputRef>(null);
    const majorInputRef=useRef<InputRef>(null);
    const roleRef = useRef<RadioGroupRef>(null);
    const jobRoleSelectRef=useRef<SelectRef>(null);
    const emailInputRef=useRef<InputRef>(null);
    const phoneInputRef=useRef<InputRef>(null);
    const qqInputRef=useRef<InputRef>(null);
    const wechatInputRef=useRef<InputRef>(null);
    const accountInputRef = useRef<InputRef>(null);
    const passwordInputRef = useRef<InputRef>(null);
    const confirmedPasswordInputRef=useRef<InputRef>(null);

    const captchaRef = useRef<CaptchaRef>(null);

    //路由
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-用户注册";
    }, []);


    return (<div className="auth-container">
        <div className="auth-form" style={{maxWidth:"900px"}}>
            <h2>高校心理咨询预约与匿名交流平台</h2>
            <h2>用户注册</h2>
            <form>
                <div className="auth-divide">
                    <div style={{width:"400px"}}>
                        <InputField
                            ref={nameInputRef}
                            type="text"
                            label="姓名"
                            placeholder="请输入姓名"
                            required
                        />
                        <RadioGroup
                            ref={genderRef}
                            name="gender"
                            label="性别"
                            size="large"
                            options={genderOptions}
                            // value={formData.gender}
                            required
                            layout="horizontal"
                            error={errors.gender}
                        />
                        <Select
                            ref={provinceSelectRef}
                            label="学校所在省份"
                            options={provinceOptions}
                            //value={formData.province}
                            placeholder="请选择入学校所在省份"
                            required
                            showSelectAll
                            maxTagCount={2}
                            error={errors.province}
                            //onChange={handleMultiChange}
                        />
                        <InputField
                            ref={schoolInputRef}
                            type="text"
                            label="所属学校"
                            placeholder="所属学校"
                            required
                        />
                        <InputField
                            ref={subunitInputRef}
                            type="text"
                            label="二级单位"
                            placeholder="二级单位"
                            required
                        />
                        <InputField
                            ref={majorInputRef}
                            type="text"
                            label="专业"
                            placeholder="专业"
                        />
                        <RadioGroup
                            ref={roleRef}
                            name="role"
                            label="用户类型"
                            size="large"
                            options={userRoleOptions}
                            // value={formData.role}
                            required
                            layout="horizontal"
                            error={errors.role}
                        />
                        <Select
                            ref={jobRoleSelectRef}
                            label="职务"
                            options={jobRoleOptions}
                            //value={formData.jobRole}
                            placeholder="请选择职务"
                            required
                            showSelectAll
                            maxTagCount={2}
                            error={errors.jobRole}
                            //onChange={handleMultiChange}
                        />
                    </div>
                    <div style={{width:"400px"}}>
                        <InputField
                            ref={accountInputRef}
                            type="text"
                            label="用户名"
                            placeholder="请输入用户名"
                            validationRules={accountValidationRules}
                            required
                        />
                        <InputField
                            ref={emailInputRef}
                            type="email"
                            label="Email"
                            placeholder="Email"
                            validationRules={emailValidationRules}
                            prefix={<span>@</span>}
                            required
                        />
                        <InputField
                            ref={phoneInputRef}
                            type="text"
                            label="电话号码"
                            placeholder="电话号码"
                            required
                        />
                        <InputField
                            ref={qqInputRef}
                            type="text"
                            label="QQ"
                            placeholder="QQ"
                        />
                        <InputField
                            ref={wechatInputRef}
                            type="text"
                            label="微信"
                            placeholder="微信"
                        />
                        <InputField
                            ref={passwordInputRef}
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            validationRules={passwordValidationRules}
                            required
                        />
                        <InputField
                            ref={confirmedPasswordInputRef}
                            type="password"
                            label="确认密码"
                            placeholder="请确认密码"
                            validationRules={passwordValidationRules}
                            required
                        />
                        <Captcha
                            ref={captchaRef}
                            //onCaptchaChange={handleCaptchaChange}
                            placeholder="请输入图片中的验证码"
                            autoRefresh={true}
                            api_getCaptcha="api/captcha"
                        />
                    </div>
                </div>
                <br/>
                <Button type="primary" block={true} summit>注册</Button>
                <br/>
                <div className="auth-bottom">
                    <Button type="link" style={{textAlign: "left"}}
                            onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
                                navigate('/auth/login')
                            }}>返回登录</Button>
                </div>
            </form>
        </div>
    </div>)
}