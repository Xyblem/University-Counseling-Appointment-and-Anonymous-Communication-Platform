import React, {useEffect, useRef, useState} from "react";
import {UpdateUserRequest, UserController} from "../../../controller/UserController";
import {CaptchaController} from "../../../controller/CaptchaController";
import {
    confirmedPasswordValidationRules,
    descriptionValidationRules,
    emailValidationRules,
    majorValidationRules,
    nameValidationRules,
    nicknameValidationRules,
    passwordValidationRules,
    phoneNumberValidationRules,
    qqValidationRules,
    schoolValidationRules,
    secondaryUnitValidationRules,
    User,
    usernameValidationRules,
    wechatValidationRules
} from "../../../entity/User";
import {InputField, InputRef} from "../../../components/ui/widget/InputField";
import {Select, SelectRef} from "../../../components/ui/widget/Select";
import {RadioGroup, RadioGroupRef} from "../../../components/ui/widget/Radio";
import {Captcha, CaptchaRef} from "../../../components/ui/combined/Captcha";
import {Loading} from "../../../components/ui/widget/Loading";
import {Button} from "../../../components/ui/widget/Button";
import {genderOptions, provinceOptions, userPositionOptions, userRoleOptions} from "../../../utils/option/input-option";

export const UpdateUserForm: React.FC = () => {
//控制器
    const userController=new UserController();
    const captchaController=new CaptchaController();
    //状态
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [done,setDone]=useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
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
        role: 0,
        school: "",
        schoolProvince: 0,
        secondaryUnit: "",
        username: "",
        wechat: null
    });
    //引用
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
        userController.loggedInUser().then(result => {
                //这里可能因为未登录返回null,但不需要管
                setUser(result);
                //设置信息
                nicknameInputRef.current?.setValue(result==null?'':''+(result.nickname==null?'':result.nickname));
                descriptionInputRef.current?.setValue(result==null?'':''+(result.description==null?'':result.description));
                nameInputRef.current?.setValue(result==null?'':''+result.name);
                genderRadioRef.current?.setValue(result==null?'':''+result.gender);
                schoolProvinceSelectRef.current?.setValue(result==null?'':''+result.schoolProvince);
                schoolInputRef.current?.setValue(result==null?'':''+result.school);
                secondaryUnitInputRef.current?.setValue(result==null?'':''+result.secondaryUnit);
                majorInputRef.current?.setValue(result==null?'':''+(result.major==null?'':result.major));
                roleRadioRef.current?.setValue(result==null?'':''+result.role);
                positionSelectRef.current?.setValue(result==null?'':''+result.position);
                emailInputRef.current?.setValue(result==null?'':''+result.email);
                phoneNumberInputRef.current?.setValue(result==null?'':''+result.phoneNumber);
                qqInputRef.current?.setValue(result==null?'':''+(result.qq==null?'':result.qq));
                wechatInputRef.current?.setValue(result==null?'':''+(result.wechat==null?'':result.wechat));

            }
        );
    },[]);

    //处理输入变化
    const handleInputChange = (field: string) => (value: string | string[]) => {
        if(value==null||value.length===0){
            setFormData(prev => ({...prev, [field]: null}));
        }else{
            setFormData(prev => ({...prev, [field]: value}));
        }
    };

    //处理验证码的输入变化
    const handleCaptchaInputChange = (field: string) => (value: string | string[]) => {
        const kd = captchaRef.current == null ? null : captchaRef.current.getCaptchaData();
        const key=kd==null ? '' : kd.key;
        setFormData(prev => ({...prev, [field]: value,captchaKey:key}));
    };

    //处理表单提交
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        // 手动验证所有字段
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
        formData.username=user==null?'':user.username;
        const isCaptchaValid=captchaRef.current?.validate();

        // 阻止默认提交
        event.preventDefault();
        if (isNicknameValid&&isDescriptionValid&&isNameValid&& isGenderValid&& isSchoolProvinceValid &&isSchoolValid&& isSecondaryUnitValid&& isMajorValid&& isRoleValid&& isPositionValid&& isEmailValid&& isPhoneNumberValid&& isQqValid&& isWechatValid&&isCaptchaValid) {
            //console.log("暂停测试：",formData);alert("暂停测试");
            summitUpdateUser();
        } else {
            alert('请检查表单错误!');
        }
    };

    //提交修改密码
    const summitUpdateUser = async (): Promise<void> => {
        setLoading(true);
        setError(false);
        setMessage(null);
        setDone(false);
        formData.username=user==null?'':user.username;
        await userController.updateUser(formData).then(response=>{
            if(!response.success){
                setMessage(response.message);
            }
        }).catch(err=>{
            setError(true);
            setMessage(err.message);
        }).finally(()=>{
            setDone(true);
            setLoading(false);
        });
    };

    return (<div style={{marginLeft: "25px"}}>
        {loading ? <Loading type="dots" text='修改信息中...' color="#2196f3" size="large" fullScreen></Loading> : null}
        {done?(
                <div className="">
                    <h2>修改信息{error?"出错":(message==null?"成功":"失败")}</h2>
                    {message==null?
                        <p>信息修改成功~~~</p>
                        : <div>
                            <p className="home-error-detail-mini">详情：{message}</p>
                            <Button block type="default" className="btn-text-align-left" onClick={() => {setDone(false);}}>重试</Button>
                        </div>}
                </div>
            ):(
            <div>
                <h2>修改信息</h2>
                <form onSubmit={handleSubmit}>
                    <div className="home-pair-page">
                        <div style={{width: "400px"}}>
                            <InputField
                                ref={nicknameInputRef}
                                type="text"
                                label="昵称"
                                placeholder="请输入昵称"
                                onChange={handleInputChange("nickname")}
                                validationRules={nicknameValidationRules}
                            />
                            <InputField
                                ref={descriptionInputRef}
                                type="text"
                                label="描述"
                                placeholder="请输入描述"
                                onChange={handleInputChange("description")}
                                validationRules={descriptionValidationRules}
                            />

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

                        </div>
                        <div style={{width: "400px",marginLeft:"25px"}}>
                            <RadioGroup
                                ref={roleRadioRef}
                                label="用户类型"
                                size="large"
                                options={userRoleOptions}
                                onChange={handleInputChange("role")}
                                required
                                layout="horizontal"
                                disabled
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

                            <Captcha
                                ref={captchaRef}
                                onChange={handleCaptchaInputChange("captcha")}
                                placeholder="请输入图片中的验证码"
                                autoRefresh={true}
                                getCaptcha={captchaController.captcha}
                            />
                        </div>
                    </div>
                    <br/>
                    <Button type="primary" block={true} summit>提交修改</Button>
                </form>
            </div>
        )}
    </div>)
}