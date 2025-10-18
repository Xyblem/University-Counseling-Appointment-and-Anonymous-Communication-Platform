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
    phoneNumberValidationRules,
    wechatValidationRules,
    qqValidationRules,
    majorValidationRules,
    secondaryUnitValidationRules,
    schoolValidationRules,
    nameValidationRules, confirmedPasswordValidationRules
} from "../../entity/User";
//输入选项
import {userRoleOptions,genderOptions,provinceOptions,userPositionOptions} from "../../utils/option/input-option";
import {Loading} from "../../components/ui/widget/Loading";
import api from "../../utils/api/api_config";
import {ReturnCode, ReturnObject} from "../../utils/api/ReturnObject";

//登录请求类型
interface SignupRequest{
    name?: string;
    gender?: string;
    schoolProvince?: string;
    school?: string;
    secondaryUnit?: string;
    major?: string|null;
    role?: string;
    position?: string;
    email?: string;
    phoneNumber?: string;
    qq?: string|null;
    wechat?: string|null;
    username?: string;
    password?: string;
    confirmedPassword?:string;
    captcha?: string;
    captchaKey?:string;
}
//注册界面
export const SignUpForm: React.FC = () => {
    //状态
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [errorDetail, setErrorDetail] = useState<string | null>(null);
    const [succeeded, setSucceeded] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<SignupRequest>({
        name: '',
        gender: '',
        schoolProvince: '',
        school: '',
        secondaryUnit: '',
        major: null,
        role: '',
        position: '',
        email: '',
        phoneNumber: '',
        qq: null,
        wechat: null,
        username: '',
        password: '',
        confirmedPassword: '',
        captcha: '',
        captchaKey: ''
    });

    //引用
    const nameInputRef = useRef<InputRef>(null);
    const genderRadioRef = useRef<RadioGroupRef>(null);
    const schoolProvinceSelectRef = useRef<SelectRef>(null);
    const schoolInputRef = useRef<InputRef>(null);
    const secondaryUnitInputRef = useRef<InputRef>(null);
    const majorInputRef = useRef<InputRef>(null);
    const roleRadioRef = useRef<RadioGroupRef>(null);
    const positionSelectRef = useRef<SelectRef>(null);
    const emailInputRef = useRef<InputRef>(null);
    const phoneNumberInputRef = useRef<InputRef>(null);
    const qqInputRef = useRef<InputRef>(null);
    const wechatInputRef = useRef<InputRef>(null);
    const usernameInputRef = useRef<InputRef>(null);
    const passwordInputRef = useRef<InputRef>(null);
    const confirmedPasswordInputRef = useRef<InputRef>(null);
    const captchaRef = useRef<CaptchaRef>(null);

    //路由
    const navigate = useNavigate();


    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-用户注册";
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
        const key = kd == null ? '' : kd.key;
        setFormData(prev => ({...prev, [field]: value, captchaKey: key}));
    };

    //处理表单提交
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        // 手动验证所有字段

        const isNameValid=nameInputRef.current?.validate();
        const isGenderValid=genderRadioRef.current?.validate();
        const isSchoolProvinceValid = schoolProvinceSelectRef.current?.validate();
        const isSchoolValid=schoolInputRef.current?.validate();
        const isSecondaryUnitValid=secondaryUnitInputRef.current?.validate();
        const isMajorValid=majorInputRef.current?.validate();
        const isRoleValid = roleRadioRef.current?.validate();
        const isPositionValid = positionSelectRef.current?.validate();
        const isEmailValid=emailInputRef.current?.validate();
        const isPhoneNumberValid=phoneNumberInputRef.current?.validate();
        const isQqValid=qqInputRef.current?.validate();
        const isWechatValid=wechatInputRef.current?.validate();
        const isUsernameValid = usernameInputRef.current?.validate();
        const isPasswordValid = passwordInputRef.current?.validate();
        const isConfirmedPasswordValid = confirmedPasswordInputRef.current?.validate();
        const isCaptchaValid=captchaRef.current?.validate();


        // 阻止默认提交
        event.preventDefault();
        if (isNameValid&& isGenderValid&& isSchoolProvinceValid &&isSchoolValid&& isSecondaryUnitValid&& isMajorValid&& isRoleValid&& isPositionValid&& isEmailValid&& isPhoneNumberValid&& isQqValid&& isWechatValid&& isUsernameValid&& isPasswordValid&& isConfirmedPasswordValid&&isCaptchaValid) {
            console.log("暂停测试：",formData);alert("暂停测试");
            summitSignup();
        } else {
            alert('请检查表单错误!');
        }
    };

    //提交注册
    const summitSignup = async (): Promise<void> => {
        setLoading(true);
        setError(null);
        setErrorDetail(null);
        try {
            await api.get<ReturnObject>("api/user/signup", {params: formData}).then(response => {
                //console.log("暂停测试：",response);alert("暂停测试");
                // @ts-ignore
                if (response.code === ReturnCode.SUCCESS) {
                    setSucceeded(true);
                } else {
                    setError('注册失败');
                    // @ts-ignore
                    setErrorDetail('详情：' + response.msg);
                    // @ts-ignore
                    throw new Error(response.message);
                }
            });
        } catch (err:any) {
            setError('注册失败');
            setErrorDetail('详情：' + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (<div className="auth-background">
        <div className="auth-signup-form">
            <h2>高校心理咨询预约与匿名交流平台</h2>
            {loading ? <Loading type="dots" text='注册中...' color="#2196f3" size="large" fullScreen></Loading> : null}
            {error ?
                <div>
                    <h2>{error}</h2>
                    <p className=".auth-error-detail">{errorDetail}</p>
                    <div className="auth-bottom">
                        <Button type="link" className="btn-text-align-left" onClick={() => {setError(null);setErrorDetail(null);}}>重试</Button>
                    </div>
                </div> :
                succeeded ? <div>
                    <h2>注册成功</h2>
                    <div className="auth-bottom">
                        <Button type="link" className="btn-text-align-left" onClick={() => {navigate('/auth/login')}}>返回登录</Button>
                    </div>
                </div> : <div>
                    <h2>用户注册</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="auth-pair-divide">
                            <div style={{width: "400px"}}>
                                <InputField
                                    ref={nameInputRef}
                                    type="text"
                                    label="姓名"
                                    placeholder="请输入姓名"
                                    onChange={handleInputChange("name")}
                                    validationRules={nameValidationRules}
                                    required
                                />
                                <RadioGroup
                                    ref={genderRadioRef}
                                    name="gender"
                                    label="性别"
                                    onChange={handleInputChange("gender")}
                                    size="large"
                                    options={genderOptions}
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
                                    validationRules={schoolValidationRules}
                                    required
                                />
                                <InputField
                                    ref={secondaryUnitInputRef}
                                    type="text"
                                    label="二级单位"
                                    placeholder="二级单位"
                                    onChange={handleInputChange("secondaryUnit")}
                                    validationRules={secondaryUnitValidationRules}
                                    required
                                />
                                <InputField
                                    ref={majorInputRef}
                                    type="text"
                                    label="专业"
                                    onChange={handleInputChange("major")}
                                    placeholder="专业"
                                    validationRules={majorValidationRules}
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
                                />
                            </div>
                            <div style={{width: "400px"}}>
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
                                    validationRules={qqValidationRules}
                                />
                                <InputField
                                    ref={wechatInputRef}
                                    type="text"
                                    label="微信"
                                    placeholder="微信"
                                    onChange={handleInputChange("wechat")}
                                    validationRules={wechatValidationRules}
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
                                    validationRules={confirmedPasswordValidationRules(passwordInputRef)}
                                    required
                                />
                                <Captcha
                                    ref={captchaRef}
                                    onChange={handleCaptchaInputChange("captcha")}
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
                            <Button type="link" className="btn-text-align-left" onClick={() => {navigate('/auth/login')}}>返回登录</Button>
                        </div>
                    </form>
                </div>}
        </div>
    </div>)
}