//样式
import './Auth.css'
//React 框架
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom'
//自定义组件
import {SignupRequest, UserController} from "../../controller/UserController";
import {CaptchaController} from "../../controller/CaptchaController";
import {RadioGroup, RadioGroupCallback, RadioGroupRef} from "../../common/view/input/Radio";
import {Select, SelectCallback, SelectRef} from "../../common/view/input/Select";
import {Input, InputCallback, InputRef} from "../../common/view/input/Input";
import {Captcha, CaptchaCallback, CaptchaRef} from "../../common/view/custom-input/Captcha";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {Button} from "../../common/view/controller/Button";
import {User} from "../../entity/User";
import {Loading} from "../../common/view/display/Loading";
import {ReturnObject} from "../../common/response/ReturnObject";


//注册界面
export const SignUpForm: React.FC = () => {
    //控制器
    const userController=new UserController();
    const captchaController=new CaptchaController();
    //路由
    const navigate = useNavigate();
    //状态
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
    const signupHandlerRef=useRef<ResponseHandlerRef<SignupRequest,any>>(null);

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
            signupHandlerRef.current?.request(formData);
        } else {
            alert('请检查表单错误!');
        }
    };


    const retryButton=(<Button type="link" className="btn-text-align-left" onClick={() => {
        signupHandlerRef.current?.recover();
    }}>重试</Button>);

    return (<div className="auth-background">
        <div className="auth-signup-form">
            <h2>高校心理咨询预约与匿名交流平台</h2>
            <ResponseHandler<SignupRequest,any>
                ref={signupHandlerRef}
                request={userController.signup}
                idleComponent={
                    <div>
                        <h2>用户注册</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="auth-pair-divide">
                                <div style={{width: "400px"}}>
                                    <Input
                                        ref={nameInputRef}
                                        type="text"
                                        label="姓名"
                                        placeholder="请输入姓名"
                                        onChange={InputCallback.handleDataChange<SignupRequest>("name", setFormData, null)}
                                        validationRules={User.ValidationRules.name}
                                        required
                                    />
                                    <RadioGroup
                                        ref={genderRadioRef}
                                        name="gender"
                                        label="性别"
                                        onChange={RadioGroupCallback.handleDataChange<SignupRequest>("gender", setFormData, null)}
                                        size="large"
                                        options={User.Options.gender}
                                        required
                                        layout="horizontal"
                                    />
                                    <Select
                                        ref={schoolProvinceSelectRef}
                                        label="学校所在省份"
                                        options={User.Options.schoolProvince}
                                        onChange={SelectCallback.handleDataChange<SignupRequest>("schoolProvince", setFormData, null)}
                                        placeholder="请选择入学校所在省份"
                                        required
                                        showSelectAll
                                        maxTagCount={2}
                                    />
                                    <Input
                                        ref={schoolInputRef}
                                        type="text"
                                        label="所属学校"
                                        placeholder="所属学校"
                                        onChange={InputCallback.handleDataChange<SignupRequest>("school", setFormData, null)}
                                        validationRules={User.ValidationRules.school}
                                        required
                                    />
                                    <Input
                                        ref={secondaryUnitInputRef}
                                        type="text"
                                        label="二级单位"
                                        placeholder="二级单位"
                                        onChange={InputCallback.handleDataChange<SignupRequest>("secondaryUnit", setFormData, null)}
                                        validationRules={User.ValidationRules.secondaryUnit}
                                        required
                                    />
                                    <Input
                                        ref={majorInputRef}
                                        type="text"
                                        label="专业"
                                        onChange={InputCallback.handleDataChange<SignupRequest>("major", setFormData, null)}
                                        placeholder="专业"
                                        validationRules={User.ValidationRules.major}
                                    />
                                    <RadioGroup
                                        ref={roleRadioRef}
                                        label="用户类型"
                                        size="large"
                                        options={User.Options.role}
                                        onChange={RadioGroupCallback.handleDataChange<SignupRequest>("role", setFormData, null)}
                                        required
                                        layout="horizontal"
                                    />
                                    <Select
                                        ref={positionSelectRef}
                                        label="职务"
                                        options={User.Options.position}
                                        onChange={SelectCallback.handleDataChange<SignupRequest>("position", setFormData, null)}
                                        placeholder="请选择职务"
                                        required
                                        showSelectAll
                                        maxTagCount={2}
                                    />
                                </div>
                                <div style={{width: "400px"}}>
                                    <Input
                                        ref={usernameInputRef}
                                        type="text"
                                        label="用户名"
                                        placeholder="请输入用户名"
                                        onChange={InputCallback.handleDataChange<SignupRequest>("username", setFormData, null)}
                                        validationRules={User.ValidationRules.username}
                                        required
                                    />
                                    <Input
                                        ref={emailInputRef}
                                        type="email"
                                        label="Email"
                                        placeholder="Email"
                                        onChange={InputCallback.handleDataChange<SignupRequest>("email", setFormData, null)}
                                        validationRules={User.ValidationRules.email}
                                        prefix={<span>@</span>}
                                        required
                                    />
                                    <Input
                                        ref={phoneNumberInputRef}
                                        type="text"
                                        label="电话号码"
                                        placeholder="电话号码"
                                        onChange={InputCallback.handleDataChange<SignupRequest>("phoneNumber", setFormData, null)}
                                        validationRules={User.ValidationRules.phoneNumber}
                                        required
                                    />
                                    <Input
                                        ref={qqInputRef}
                                        type="text"
                                        label="QQ"
                                        placeholder="QQ"
                                        onChange={InputCallback.handleDataChange<SignupRequest>("qq", setFormData, null)}
                                        validationRules={User.ValidationRules.qq}
                                    />
                                    <Input
                                        ref={wechatInputRef}
                                        type="text"
                                        label="微信"
                                        placeholder="微信"
                                        onChange={InputCallback.handleDataChange<SignupRequest>("wechat", setFormData, null)}
                                        validationRules={User.ValidationRules.wechat}
                                    />
                                    <Input
                                        ref={passwordInputRef}
                                        type="password"
                                        label="密码"
                                        placeholder="请输入密码"
                                        prefix={<span>*</span>}
                                        onChange={InputCallback.handleDataChange<SignupRequest>("password", setFormData, null)}
                                        validationRules={User.ValidationRules.password}
                                        required
                                    />
                                    <Input
                                        ref={confirmedPasswordInputRef}
                                        type="password"
                                        label="确认密码"
                                        prefix={<span>*</span>}
                                        placeholder="请确认密码"
                                        onChange={InputCallback.handleDataChange<SignupRequest>("confirmedPassword", setFormData, null)}
                                        validationRules={User.ValidationRules.confirmedPassword(passwordInputRef)}
                                        required
                                    />
                                    <Captcha
                                        ref={captchaRef}
                                        onChange={CaptchaCallback.handleDataChange<SignupRequest>("captchaKey", "captcha", captchaRef, setFormData, null)}
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
                }

                loadingComponent={<Loading type="dots" text='注册中...' color="#2196f3" size="large"
                                           fullScreen></Loading>}

                handlingReturnObjectComponent={<Loading type="dots" text='处理注册结果中...' color="#2196f3" size="large"
                                                        fullScreen></Loading>}

                networkErrorComponent={<div>
                    <h2>网络错误</h2>
                    <p className=".auth-error-detail">{signupHandlerRef.current?.networkError?.message}</p>
                    <div className="auth-bottom">{retryButton}</div>
                </div>}

                finishedComponent={<div>
                    <h2>注册{ReturnObject.Status.ChineseName.get(signupHandlerRef.current?.returnObject?.status)}</h2>
                    {signupHandlerRef.current?.returnObject?.code === ReturnObject.Code.SUCCESS ? (
                        <>
                            <div className="auth-bottom">
                                <Button type="link" className="btn-text-align-left" onClick={() => {
                                    navigate('/auth/login')
                                }}>返回登录</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className=".auth-error-detail">{signupHandlerRef.current?.returnObject?.message}</p>
                            <div className="auth-bottom">{retryButton}</div>
                        </>
                    )}
                </div>}
            />
        </div>
    </div>)
}