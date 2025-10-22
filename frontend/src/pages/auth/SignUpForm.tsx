//React 框架
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom'
//样式
import './Auth.css'
//自定义组件
import {InputField, InputFieldCallback, InputRef} from '../../components/ui/widget/InputField'
import {Button} from '../../components/ui/widget/Button'
import {Captcha, CaptchaCallback, CaptchaRef} from '../../components/ui/combined/Captcha'
import {RadioGroup, RadioGroupCallback, RadioGroupRef} from "../../components/ui/widget/Radio";
import {Select, SelectCallback, SelectRef} from "../../components/ui/widget/Select";
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
import {ReturnCode, ReturnObject, ReturnStatusNamesCN} from "../../utils/api/ReturnObject";
import {CaptchaController} from "../../controller/CaptchaController";
import {UserController, SignupRequest, LoginRequest} from "../../controller/UserController";
import {CheckReturnObject} from "../../components/functional/CheckReturnObject";


//注册界面
export const SignUpForm: React.FC = () => {
    //控制器
    const userController=new UserController();
    const captchaController=new CaptchaController();
    //路由
    const navigate = useNavigate();
    //状态
    const [signupLoading, setSignupLoading] = useState<boolean>(false);
    const [signupReturnObject,setSignupReturnObject]=useState<ReturnObject|null>(null);
    const [signupNetworkError, setSignupNetworkError]=useState<Error|null>(null);
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

    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-用户注册";
    }, []);

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
            //console.log("暂停测试：",formData);alert("暂停测试");
            summitSignup();
        } else {
            alert('请检查表单错误!');
        }
    };

    //提交注册
    const summitSignup = async (): Promise<void> => {
        setSignupLoading(true);
        setSignupNetworkError(null);
        setSignupReturnObject(null);
        await userController.signup(formData).then(result=>{
            setSignupReturnObject(result);
        }).catch(err=>{
            setSignupNetworkError(err);
        }).finally(()=>{
            setSignupLoading(false);
        });
    }

    const retryButton=(<Button type="link" className="btn-text-align-left" onClick={() => {
        setSignupNetworkError(null);
        setSignupReturnObject(null);
    }}>重试</Button>);

    return (<div className="auth-background">
        <div className="auth-signup-form">
            <h2>高校心理咨询预约与匿名交流平台</h2>
            {signupReturnObject!=null?(
                <CheckReturnObject
                    loading={signupLoading}
                    returnObject={signupReturnObject}
                    networkError={signupNetworkError}
                    loadingComponent={<Loading type="dots" text='注册中...' color="#2196f3" size="large"
                                               fullScreen></Loading>}
                    networkErrorComponent={
                        <div>
                            <h2>网络错误</h2>
                            <p className=".auth-error-detail">{signupNetworkError?.message}</p>
                            <div className="auth-bottom">{retryButton}</div>
                        </div>}
                >
                    <div>
                        <h2>注册{ReturnStatusNamesCN.get(signupReturnObject?.status)}</h2>
                        {signupReturnObject?.code===ReturnCode.SUCCESS?(
                            <>
                                <div className="auth-bottom">
                                    <Button type="link" className="btn-text-align-left" onClick={() => {
                                        navigate('/auth/login')
                                    }}>返回登录</Button>
                                </div>
                            </>
                        ):(
                            <>
                                <p className=".auth-error-detail">{signupReturnObject?.message}</p>
                                <div className="auth-bottom">{retryButton}</div>
                            </>
                        )}
                    </div>
                </CheckReturnObject>
            ) : (
                <div>
                    <h2>用户注册</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="auth-pair-divide">
                            <div style={{width: "400px"}}>
                                <InputField
                                    ref={nameInputRef}
                                    type="text"
                                    label="姓名"
                                    placeholder="请输入姓名"
                                    onChange={InputFieldCallback.handleDataChange<SignupRequest>("name", setFormData, null)}
                                    validationRules={nameValidationRules}
                                    required
                                />
                                <RadioGroup
                                    ref={genderRadioRef}
                                    name="gender"
                                    label="性别"
                                    onChange={RadioGroupCallback.handleDataChange("gender", setFormData, null)}
                                    size="large"
                                    options={genderOptions}
                                    required
                                    layout="horizontal"
                                />
                                <Select
                                    ref={schoolProvinceSelectRef}
                                    label="学校所在省份"
                                    options={provinceOptions}
                                    onChange={SelectCallback.handleDataChange<SignupRequest>("schoolProvince", setFormData, null)}
                                    placeholder="请选择入学校所在省份"
                                    required
                                    showSelectAll
                                    maxTagCount={2}
                                />
                                <InputField
                                    ref={schoolInputRef}
                                    type="text"
                                    label="所属学校"
                                    placeholder="所属学校"
                                    onChange={InputFieldCallback.handleDataChange<SignupRequest>("school", setFormData, null)}
                                    validationRules={schoolValidationRules}
                                    required
                                />
                                <InputField
                                    ref={secondaryUnitInputRef}
                                    type="text"
                                    label="二级单位"
                                    placeholder="二级单位"
                                    onChange={InputFieldCallback.handleDataChange<SignupRequest>("secondaryUnit", setFormData, null)}
                                    validationRules={secondaryUnitValidationRules}
                                    required
                                />
                                <InputField
                                    ref={majorInputRef}
                                    type="text"
                                    label="专业"
                                    onChange={InputFieldCallback.handleDataChange<SignupRequest>("major", setFormData, null)}
                                    placeholder="专业"
                                    validationRules={majorValidationRules}
                                />
                                <RadioGroup
                                    ref={roleRadioRef}
                                    label="用户类型"
                                    size="large"
                                    options={userRoleOptions}
                                    onChange={RadioGroupCallback.handleDataChange("role", setFormData, null)}
                                    required
                                    layout="horizontal"
                                />
                                <Select
                                    ref={positionSelectRef}
                                    label="职务"
                                    options={userPositionOptions}
                                    onChange={SelectCallback.handleDataChange<SignupRequest>("position", setFormData, null)}
                                    placeholder="请选择职务"
                                    required
                                    showSelectAll
                                    maxTagCount={2}
                                />
                            </div>
                            <div style={{width: "400px"}}>
                                <InputField
                                    ref={usernameInputRef}
                                    type="text"
                                    label="用户名"
                                    placeholder="请输入用户名"
                                    onChange={InputFieldCallback.handleDataChange<SignupRequest>("username", setFormData, null)}
                                    validationRules={usernameValidationRules}
                                    required
                                />
                                <InputField
                                    ref={emailInputRef}
                                    type="email"
                                    label="Email"
                                    placeholder="Email"
                                    onChange={InputFieldCallback.handleDataChange<SignupRequest>("email", setFormData, null)}
                                    validationRules={emailValidationRules}
                                    prefix={<span>@</span>}
                                    required
                                />
                                <InputField
                                    ref={phoneNumberInputRef}
                                    type="text"
                                    label="电话号码"
                                    placeholder="电话号码"
                                    onChange={InputFieldCallback.handleDataChange<SignupRequest>("phoneNumber", setFormData, null)}
                                    validationRules={phoneNumberValidationRules}
                                    required
                                />
                                <InputField
                                    ref={qqInputRef}
                                    type="text"
                                    label="QQ"
                                    placeholder="QQ"
                                    onChange={InputFieldCallback.handleDataChange<SignupRequest>("qq", setFormData, null)}
                                    validationRules={qqValidationRules}
                                />
                                <InputField
                                    ref={wechatInputRef}
                                    type="text"
                                    label="微信"
                                    placeholder="微信"
                                    onChange={InputFieldCallback.handleDataChange<SignupRequest>("wechat", setFormData, null)}
                                    validationRules={wechatValidationRules}
                                />
                                <InputField
                                    ref={passwordInputRef}
                                    type="password"
                                    label="密码"
                                    placeholder="请输入密码"
                                    prefix={<span>*</span>}
                                    onChange={InputFieldCallback.handleDataChange<SignupRequest>("password", setFormData, null)}
                                    validationRules={passwordValidationRules}
                                    required
                                />
                                <InputField
                                    ref={confirmedPasswordInputRef}
                                    type="password"
                                    label="确认密码"
                                    prefix={<span>*</span>}
                                    placeholder="请确认密码"
                                    onChange={InputFieldCallback.handleDataChange<SignupRequest>("confirmedPassword", setFormData, null)}
                                    validationRules={confirmedPasswordValidationRules(passwordInputRef)}
                                    required
                                />
                                <Captcha
                                    ref={captchaRef}
                                    onChange={CaptchaCallback.handleDataChange<LoginRequest>("captchaKey", "captcha", captchaRef, setFormData, null)}
                                    placeholder="请输入图片中的验证码"
                                    autoRefresh={true}
                                    getCaptcha={captchaController.captcha}
                                />
                            </div>
                        </div>
                        <br/>
                        <Button type="primary" block={true} summit>注册</Button>
                        <br/>
                        <div className="auth-bottom">
                            <Button type="link" className="btn-text-align-left" onClick={() => {
                                navigate('/auth/login')
                            }}>返回登录</Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    </div>)
}