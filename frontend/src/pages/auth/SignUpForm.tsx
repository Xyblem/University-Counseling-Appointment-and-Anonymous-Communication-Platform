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
import {
    usernameValidationRules,
    emailValidationRules,
    passwordValidationRules,
    phoneNumberValidationRules
} from "../../utils/validation/input_validation";
//输入选项
import {userRoleOptions,genderOptions,provinceOptions,userPositionOptions} from "../../utils/option/input-option";

//登录请求类型
interface SignupRequest{
    name?: string;
    gender?: string;
    schoolProvince?: string;
    school?: string;
    secondaryUnit?: string;
    major?: string;
    role?: string;
    position?: string;
    email?: string;
    phoneNumber?: string;
    qq?: string;
    wechat?: string;
    username?: string;
    password?: string;
    confirmedPassword?:string;
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
    const genderRadioRef = useRef<RadioGroupRef>(null);
    const schoolProvinceSelectRef = useRef<SelectRef>(null);
    const schoolInputRef=useRef<InputRef>(null);
    const SecondaryInputRef=useRef<InputRef>(null);
    const majorInputRef=useRef<InputRef>(null);
    const roleRadioRef = useRef<RadioGroupRef>(null);
    const positionSelectRef=useRef<SelectRef>(null);
    const emailInputRef=useRef<InputRef>(null);
    const phoneNumberInputRef=useRef<InputRef>(null);
    const qqInputRef=useRef<InputRef>(null);
    const wechatInputRef=useRef<InputRef>(null);
    const usernameInputRef = useRef<InputRef>(null);
    const passwordInputRef = useRef<InputRef>(null);
    const confirmedPasswordInputRef=useRef<InputRef>(null);
    const captchaRef = useRef<CaptchaRef>(null);
    const [formData, setFormData] = useState<SignupRequest>({
        name:'',
        gender:'',
        schoolProvince:'',
        school:'',
        secondaryUnit:'',
        major:'',
        role:'',
        position:'',
        email:'',
        phoneNumber:'',
        qq:'',
        wechat:'',
        username:'',
        password:'',
        confirmedPassword:'',
        captcha:'',
    });
    //路由
    const navigate = useNavigate();


    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-用户注册";
    }, []);

    //处理输入变化
    const handleInputChange = (field: string) => (value: string | string[]) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

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
                            onChange={handleInputChange("name")}
                            required
                        />
                        <RadioGroup
                            ref={genderRadioRef}
                            name="gender"
                            label="性别"
                            onChange={handleInputChange("gender")}
                            size="large"
                            options={genderOptions}
                            // value={formData.gender}
                            required
                            layout="horizontal"
                            error={errors.gender}
                        />
                        <Select
                            ref={schoolProvinceSelectRef}
                            label="学校所在省份"
                            options={provinceOptions}
                            onChange={handleInputChange("schoolProvince")}
                            placeholder="请选择入学校所在省份"
                            required
                            showSelectAll
                            maxTagCount={2}
                            error={errors.province}
                        />
                        <InputField
                            ref={schoolInputRef}
                            type="text"
                            label="所属学校"
                            placeholder="所属学校"
                            onChange={handleInputChange("school")}
                            required
                        />
                        <InputField
                            ref={SecondaryInputRef}
                            type="text"
                            label="二级单位"
                            placeholder="二级单位"
                            onChange={handleInputChange("secondaryUnit")}
                            required
                        />
                        <InputField
                            ref={majorInputRef}
                            type="text"
                            label="专业"
                            onChange={handleInputChange("major")}
                            placeholder="专业"
                        />
                        <RadioGroup
                            ref={roleRadioRef}
                            label="用户类型"
                            size="large"
                            options={userRoleOptions}
                            onChange={handleInputChange("role")}
                            required
                            layout="horizontal"
                            error={errors.role}
                        />
                        <Select
                            ref={positionSelectRef}
                            label="职务"
                            options={userPositionOptions}
                            onChange={handleInputChange("position")}
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
                            ref={usernameInputRef}
                            type="text"
                            label="用户名"
                            placeholder="请输入用户名"
                            onChange={handleInputChange("username")}
                            validationRules={usernameValidationRules}
                            required
                        />
                        <InputField
                            ref={emailInputRef}
                            type="email"
                            label="Email"
                            placeholder="Email"
                            onChange={handleInputChange("email")}
                            validationRules={emailValidationRules}
                            prefix={<span>@</span>}
                            required
                        />
                        <InputField
                            ref={phoneNumberInputRef}
                            type="text"
                            label="电话号码"
                            placeholder="电话号码"
                            onChange={handleInputChange("phoneNumber")}
                            validationRules={phoneNumberValidationRules}
                            required
                        />
                        <InputField
                            ref={qqInputRef}
                            type="text"
                            label="QQ"
                            placeholder="QQ"
                            onChange={handleInputChange("qq")}
                        />
                        <InputField
                            ref={wechatInputRef}
                            type="text"
                            label="微信"
                            placeholder="微信"
                            onChange={handleInputChange("wechat")}
                        />
                        <InputField
                            ref={passwordInputRef}
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            onChange={handleInputChange("password")}
                            validationRules={passwordValidationRules}
                            required
                        />
                        <InputField
                            ref={confirmedPasswordInputRef}
                            type="password"
                            label="确认密码"
                            placeholder="请确认密码"
                            onChange={handleInputChange("confirmedPassword")}
                            validationRules={passwordValidationRules}
                            required
                        />
                        <Captcha
                            ref={captchaRef}
                            onChange={handleInputChange("captcha")}
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