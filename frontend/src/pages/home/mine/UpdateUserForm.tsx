import React, {useEffect, useRef, useState} from "react";
import {UpdateUserRequest, UserController} from "../../../controller/UserController";
import {CaptchaController} from "../../../controller/CaptchaController";
import {useOutletContext} from "react-router";
import {Homepage} from "../HomepageForm";
import {ResponseHandler, ResponseHandlerRef} from "../../../common/response/ResponseHandler";
import {Input, InputCallback, InputRef} from "../../../common/view/input/Input";
import {Captcha, CaptchaCallback, CaptchaRef} from "../../../common/view/custom-input/Captcha";
import {Button} from "../../../common/view/controller/Button";
import {Select, SelectCallback, SelectRef} from "../../../common/view/input/Select";
import {RadioGroup, RadioGroupCallback, RadioGroupRef} from "../../../common/view/input/Radio";
import {User} from "../../../entity/User";
import {Loading} from "../../../common/view/display/Loading";
import {ReturnObject} from "../../../common/response/ReturnObject";

export const UpdateUserForm: React.FC = () => {
//控制器
    const userController=new UserController();
    const captchaController=new CaptchaController();
    const context=useOutletContext<Homepage.OutletContext>();
    //状态
    const updateUserHandler=useRef<ResponseHandlerRef<UpdateUserRequest,any>>(null);
    const [formData, setFormData] = useState<UpdateUserRequest>({
        description: null,
        email: "",
        gender: 0,
        major: null,
        name: "",
        nickname: null,
        phoneNumber: "",
        position: "",
        qq: null,
        school: "",
        schoolProvince: 0,
        secondaryUnit: "",
        username: "",
        wechat: null
    });
    //引用
    const usernameInputRef=useRef<InputRef>(null);
    const nicknameInputRef = useRef<InputRef>(null);
    const descriptionInputRef = useRef<InputRef>(null);
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
    const captchaRef = useRef<CaptchaRef>(null);
    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-我的修改信息";
        usernameInputRef.current?.setValue(''+context.user?.username);
        nicknameInputRef.current?.setValue(''+context.user?.nickname);
        descriptionInputRef.current?.setValue(''+ context.user?.description);
        nameInputRef.current?.setValue('' + context.user?.name);
        genderRadioRef.current?.setValue('' + context.user?.gender);
        schoolProvinceSelectRef.current?.setValue('' + context.user?.schoolProvince);
        schoolInputRef.current?.setValue('' + context.user?.school);
        secondaryUnitInputRef.current?.setValue('' + context.user?.secondaryUnit);
        majorInputRef.current?.setValue('' + context.user?.major);
        roleRadioRef.current?.setValue('' + context.user?.role);
        positionSelectRef.current?.setValue('' + context.user?.position);
        emailInputRef.current?.setValue('' + context.user?.email);
        phoneNumberInputRef.current?.setValue('' + context.user?.phoneNumber);
        qqInputRef.current?.setValue(''+context.user?.qq);
        wechatInputRef.current?.setValue(''+context.user?.wechat);
    },[]);


    //处理表单提交
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        // 手动验证所有字段
        const isUsernameValid=usernameInputRef.current?.getValue();
        const isNicknameValid=nicknameInputRef.current?.validate();
        const isDescriptionValid=nicknameInputRef.current?.validate();
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
        formData.username=""+context.user?.username;
        const isCaptchaValid=captchaRef.current?.validate();
        // 阻止默认提交
        event.preventDefault();
        if (isUsernameValid&&isNicknameValid&&isDescriptionValid&&isNameValid&& isGenderValid&& isSchoolProvinceValid &&isSchoolValid&& isSecondaryUnitValid&& isMajorValid&& isRoleValid&& isPositionValid&& isEmailValid&& isPhoneNumberValid&& isQqValid&& isWechatValid&&isCaptchaValid) {
            //console.log("暂停测试：",formData);alert("暂停测试");
            updateUserHandler.current?.request(formData);
        } else {
            alert('请检查表单错误!');
        }
    };


    return (<div style={{marginLeft: "25px"}}>
        <ResponseHandler<UpdateUserRequest,any>
            ref={updateUserHandler}
            request={userController.updateUser}
            idleComponent={<div>
                <h2>修改信息</h2>
                <p className="home-notice">提示：若无法获取输入框中的初始信息，请尝试刷新</p>
                <form onSubmit={handleSubmit}>
                    <div className="home-pair-page">
                        <div style={{width: "400px"}}>
                            <Input
                                ref={usernameInputRef}
                                type="text"
                                label="用户名"
                                placeholder="请输入用户名"
                                validationRules={User.ValidationRules.username}
                                disabled
                                required
                            />
                            <Input
                                ref={nicknameInputRef}
                                type="text"
                                label="昵称"
                                placeholder="请输入昵称"
                                onChange={InputCallback.handleDataChange<UpdateUserRequest>("nickname", setFormData, null)}
                                validationRules={User.ValidationRules.nickname}
                            />
                            <Input
                                ref={descriptionInputRef}
                                type="text"
                                label="描述"
                                placeholder="请输入描述"
                                onChange={InputCallback.handleDataChange<UpdateUserRequest>("description", setFormData, null)}
                                validationRules={User.ValidationRules.description}
                            />

                            <Input
                                ref={nameInputRef}
                                type="text"
                                label="姓名"
                                placeholder="请输入姓名"
                                onChange={InputCallback.handleDataChange<UpdateUserRequest>("name", setFormData, null)}
                                validationRules={User.ValidationRules.name}
                                required
                            />

                            <Select
                                ref={schoolProvinceSelectRef}
                                label="学校所在省份"
                                options={User.Options.schoolProvince}
                                onChange={SelectCallback.handleDataChange<UpdateUserRequest>("schoolProvince", setFormData, null)}
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
                                onChange={InputCallback.handleDataChange<UpdateUserRequest>("school", setFormData, null)}
                                validationRules={User.ValidationRules.school}
                                required
                            />
                            <Input
                                ref={secondaryUnitInputRef}
                                type="text"
                                label="二级单位"
                                placeholder="二级单位"
                                onChange={InputCallback.handleDataChange<UpdateUserRequest>("secondaryUnit", setFormData, null)}
                                validationRules={User.ValidationRules.secondaryUnit}
                                required
                            />
                            <Input
                                ref={majorInputRef}
                                type="text"
                                label="专业"
                                onChange={InputCallback.handleDataChange<UpdateUserRequest>("major", setFormData, null)}
                                placeholder="专业"
                                validationRules={User.ValidationRules.major}
                            />

                        </div>
                        <div style={{width: "400px", marginLeft: "25px"}}>
                            <RadioGroup
                                ref={genderRadioRef}
                                name="gender"
                                label="性别"
                                onChange={RadioGroupCallback.handleDataChange<UpdateUserRequest>("gender", setFormData, null)}
                                size="large"
                                options={User.Options.gender}
                                required
                                layout="horizontal"
                            />
                            <RadioGroup
                                ref={roleRadioRef}
                                label="用户类型"
                                size="large"
                                options={User.Options.role}
                                required
                                layout="horizontal"
                                disabled
                            />
                            <Select
                                ref={positionSelectRef}
                                label="职务"
                                options={User.Options.position}
                                onChange={SelectCallback.handleDataChange<UpdateUserRequest>("position", setFormData, null)}
                                placeholder="请选择职务"
                                required
                                showSelectAll
                                maxTagCount={2}
                            />
                            <Input
                                ref={emailInputRef}
                                type="email"
                                label="Email"
                                placeholder="Email"
                                onChange={InputCallback.handleDataChange<UpdateUserRequest>("email", setFormData, null)}
                                validationRules={User.ValidationRules.email}
                                prefix={<span>@</span>}
                                required
                            />
                            <Input
                                ref={phoneNumberInputRef}
                                type="text"
                                label="电话号码"
                                placeholder="电话号码"
                                onChange={InputCallback.handleDataChange<UpdateUserRequest>("phoneNumber", setFormData, null)}
                                validationRules={User.ValidationRules.phoneNumber}
                                required
                            />
                            <Input
                                ref={qqInputRef}
                                type="text"
                                label="QQ"
                                placeholder="QQ"
                                onChange={InputCallback.handleDataChange<UpdateUserRequest>("qq", setFormData, null)}
                                validationRules={User.ValidationRules.qq}
                            />
                            <Input
                                ref={wechatInputRef}
                                type="text"
                                label="微信"
                                placeholder="微信"
                                onChange={InputCallback.handleDataChange<UpdateUserRequest>("wechat", setFormData, null)}
                                validationRules={User.ValidationRules.wechat}
                            />

                            <Captcha
                                ref={captchaRef}
                                onChange={CaptchaCallback.handleDataChange<UpdateUserRequest>("captchaKey", "captcha", captchaRef, setFormData, null)}
                                placeholder="请输入图片中的验证码"
                                autoRefresh={true}
                                getCaptcha={captchaController.captcha}
                            />
                        </div>
                    </div>
                    <br/>
                    <Button type="primary" block={true} summit>提交修改</Button>
                </form>
            </div>}
            loadingComponent={<Loading type="dots" text='修改用户信息中...' color="#2196f3" size="large"
                                       fullScreen></Loading>}
            handlingReturnObjectComponent={<Loading type="dots" text='处理修改用户信息结果中...' color="#2196f3" size="large"
                                                    fullScreen></Loading>}

            networkErrorComponent={<div>
                <h3>网络错误</h3>
                <p className="home-error-detail">{updateUserHandler.current?.returnObject?.message}</p>
            </div>}

            finishedComponent={<div>
                <h3>修改用户信息{ReturnObject.Status.ChineseName.get(updateUserHandler.current?.returnObject?.status)}</h3>
                <p className="home-error-detail">{updateUserHandler.current?.returnObject?.message}</p>
            </div>}

        />
    </div>)
}