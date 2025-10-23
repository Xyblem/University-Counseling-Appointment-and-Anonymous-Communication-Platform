import React, {useEffect, useRef, useState} from "react";
import {UpdateUserRequest, UserController} from "../../../controller/UserController";
import {CaptchaController} from "../../../controller/CaptchaController";
import {
    descriptionValidationRules,
    emailValidationRules,
    majorValidationRules,
    nameValidationRules,
    nicknameValidationRules,
    phoneNumberValidationRules,
    qqValidationRules,
    schoolValidationRules,
    secondaryUnitValidationRules,
    User,
    wechatValidationRules
} from "../../../entity/User";
import {InputField, InputFieldCallback, InputRef} from "../../../components/ui/widget/InputField";
import {Select, SelectCallback, SelectRef} from "../../../components/ui/widget/Select";
import {RadioGroup, RadioGroupCallback, RadioGroupRef} from "../../../components/ui/widget/Radio";
import {Captcha, CaptchaCallback, CaptchaRef} from "../../../components/ui/combined/Captcha";
import {Loading} from "../../../components/ui/widget/Loading";
import {Button} from "../../../components/ui/widget/Button";
import {genderOptions, provinceOptions, userPositionOptions, userRoleOptions} from "../../../utils/option/input-option";
import {ReturnObject, ReturnStatus, ReturnStatusNamesCN} from "../../../utils/api/ReturnObject";
import {CheckReturnObject} from "../../../components/functional/CheckReturnObject";

export const UpdateUserForm: React.FC = () => {
//控制器
    const userController=new UserController();
    const captchaController=new CaptchaController();
    //状态
    const [userLoading, setUserLoading] = useState<boolean>(false);
    const [userReturnObject,setUserReturnObject]=useState<ReturnObject<User>|null>(null);
    const [userNetworkError, setUserNetworkError]=useState<Error|null>(null);
    const [userSuccess,setUserSuccess]=useState<boolean>(false);
    const user=userReturnObject?.data;
    const [updateUserLoading, setUpdateUserLoading] = useState<boolean>(false);
    const [updateUserReturnObject,setUpdateUserReturnObject]=useState<ReturnObject|null>(null);
    const [updateUserNetworkError, setUpdateUserNetworkError]=useState<Error|null>(null);
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
        setUserLoading(true);
        setUserReturnObject(null);
        setUserNetworkError(null);
        setUserSuccess(false);
        userController.loggedInUser().then(result => {
                setUserReturnObject(result);
                if(result.status===ReturnStatus.SUCCESS){
                    setUserSuccess(true);
                }
                usernameInputRef.current?.setValue(result.data?.username == null ? '' : result.data?.username);
                nicknameInputRef.current?.setValue(result.data?.nickname == null ? '' : result.data?.nickname);
                descriptionInputRef.current?.setValue(result.data?.description == null ? '' : result.data?.description);
                nameInputRef.current?.setValue('' + result.data?.name);
                genderRadioRef.current?.setValue('' + result.data?.gender);
                schoolProvinceSelectRef.current?.setValue('' + result.data?.schoolProvince);
                schoolInputRef.current?.setValue('' + result.data?.school);
                secondaryUnitInputRef.current?.setValue('' + result.data?.secondaryUnit);
                majorInputRef.current?.setValue(result.data?.major == null ? '' : result.data?.major);
                roleRadioRef.current?.setValue('' + result.data?.role);
                positionSelectRef.current?.setValue('' + result.data?.position);
                emailInputRef.current?.setValue('' + result.data?.email);
                phoneNumberInputRef.current?.setValue('' + result.data?.phoneNumber);
                qqInputRef.current?.setValue(result.data?.qq == null ? '' : result.data?.qq);
                wechatInputRef.current?.setValue(result.data?.wechat == null ? '' : result.data?.wechat);
            }
        ).catch(err => {
            setUserNetworkError(err);
        }).finally(()=>{
            setUserLoading(false);
        });
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
        formData.username=user==null?'':user.username;
        const isCaptchaValid=captchaRef.current?.validate();
        // 阻止默认提交
        event.preventDefault();
        if (isUsernameValid&&isNicknameValid&&isDescriptionValid&&isNameValid&& isGenderValid&& isSchoolProvinceValid &&isSchoolValid&& isSecondaryUnitValid&& isMajorValid&& isRoleValid&& isPositionValid&& isEmailValid&& isPhoneNumberValid&& isQqValid&& isWechatValid&&isCaptchaValid) {
            //console.log("暂停测试：",formData);alert("暂停测试");
            summitUpdateUser();
        } else {
            alert('请检查表单错误!');
        }
    };


    //提交修改密码
    const summitUpdateUser = async (): Promise<void> => {
        setUpdateUserLoading(true);
        setUpdateUserReturnObject(null);
        setUpdateUserNetworkError(null);
        formData.username=user==null?'':user.username;
        await userController.updateUser(formData).then(response=>{
            setUpdateUserReturnObject(response);
        }).catch(err=>{
            setUpdateUserNetworkError(err);
        }).finally(()=>{
            setUpdateUserLoading(false);
        });
    };

    const checkUserView=(<CheckReturnObject
        loading={userLoading}
        returnObject={userReturnObject}
        networkError={userNetworkError}
        loadingComponent={<Loading type="dots" text='加载页面中...' color="#2196f3" size="large" fullScreen></Loading>}
        networkErrorComponent={<div>
            <h3>网络错误</h3>
            <p className="home-error-detail">{userNetworkError?.message}</p>
</div>}
    >
        <div>
            <h3>加载信息{ReturnStatusNamesCN.get(userReturnObject?.status)}</h3>
            <p className="home-error-detail">{userReturnObject?.message}</p>
        </div>
    </CheckReturnObject>);


    const checkUpdateUserView=(<CheckReturnObject
        loading={updateUserLoading}
        returnObject={updateUserReturnObject}
        networkError={updateUserNetworkError}
        loadingComponent={<Loading type="dots" text='修改用户信息中...' color="#2196f3" size="large"
                                   fullScreen></Loading>}
        networkErrorComponent={<div>
            <h3>网络错误</h3>
            <p className="home-error-detail">{updateUserNetworkError?.message}</p>
        </div>}
    >
        <div>
            <h3>修改用户信息{ReturnStatusNamesCN.get(updateUserReturnObject?.status)}</h3>
            <p className="home-error-detail">{updateUserReturnObject?.message}</p>
        </div>
    </CheckReturnObject>);

    return (<div style={{marginLeft: "25px"}}>
        {!userSuccess? (checkUserView): (updateUserReturnObject!=null?(checkUpdateUserView) : (
            <div>
                <h2>修改信息</h2>
                <p className="home-notice">提示：若无法获取输入框中的初始信息，请尝试刷新</p>
                <form onSubmit={handleSubmit}>
                    <div className="home-pair-page">
                        <div style={{width: "400px"}}>
                            <InputField
                                ref={usernameInputRef}
                                type="text"
                                label="用户名"
                                placeholder="请输入用户名"
                                validationRules={nicknameValidationRules}
                                disabled
                                required
                            />
                            <InputField
                                ref={nicknameInputRef}
                                type="text"
                                label="昵称"
                                placeholder="请输入昵称"
                                onChange={InputFieldCallback.handleDataChange<UpdateUserRequest>("nickname",setFormData,null)}
                                validationRules={nicknameValidationRules}
                            />
                            <InputField
                                ref={descriptionInputRef}
                                type="text"
                                label="描述"
                                placeholder="请输入描述"
                                onChange={InputFieldCallback.handleDataChange<UpdateUserRequest>("description",setFormData,null)}
                                validationRules={descriptionValidationRules}
                            />

                            <InputField
                                ref={nameInputRef}
                                type="text"
                                label="姓名"
                                placeholder="请输入姓名"
                                onChange={InputFieldCallback.handleDataChange<UpdateUserRequest>("name",setFormData,null)}
                                validationRules={nameValidationRules}
                                required
                            />

                            <Select
                                ref={schoolProvinceSelectRef}
                                label="学校所在省份"
                                options={provinceOptions}
                                onChange={SelectCallback.handleDataChange<UpdateUserRequest>("schoolProvince",setFormData,null)}
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
                                onChange={InputFieldCallback.handleDataChange<UpdateUserRequest>("school",setFormData,null)}
                                validationRules={schoolValidationRules}
                                required
                            />
                            <InputField
                                ref={secondaryUnitInputRef}
                                type="text"
                                label="二级单位"
                                placeholder="二级单位"
                                onChange={InputFieldCallback.handleDataChange<UpdateUserRequest>("secondaryUnit",setFormData,null)}
                                validationRules={secondaryUnitValidationRules}
                                required
                            />
                            <InputField
                                ref={majorInputRef}
                                type="text"
                                label="专业"
                                onChange={InputFieldCallback.handleDataChange<UpdateUserRequest>("major",setFormData,null)}
                                placeholder="专业"
                                validationRules={majorValidationRules}
                            />

                        </div>
                        <div style={{width: "400px", marginLeft: "25px"}}>
                            <RadioGroup
                                ref={genderRadioRef}
                                name="gender"
                                label="性别"
                                onChange={RadioGroupCallback.handleDataChange<UpdateUserRequest>("gender",setFormData,null)}
                                size="large"
                                options={genderOptions}
                                required
                                layout="horizontal"
                            />
                            <RadioGroup
                                ref={roleRadioRef}
                                label="用户类型"
                                size="large"
                                options={userRoleOptions}
                                required
                                layout="horizontal"
                                disabled
                            />
                            <Select
                                ref={positionSelectRef}
                                label="职务"
                                options={userPositionOptions}
                                onChange={SelectCallback.handleDataChange<UpdateUserRequest>("position",setFormData,null)}
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
                                onChange={InputFieldCallback.handleDataChange<UpdateUserRequest>("email",setFormData,null)}
                                validationRules={emailValidationRules}
                                prefix={<span>@</span>}
                                required
                            />
                            <InputField
                                ref={phoneNumberInputRef}
                                type="text"
                                label="电话号码"
                                placeholder="电话号码"
                                onChange={InputFieldCallback.handleDataChange<UpdateUserRequest>("phoneNumber",setFormData,null)}
                                validationRules={phoneNumberValidationRules}
                                required
                            />
                            <InputField
                                ref={qqInputRef}
                                type="text"
                                label="QQ"
                                placeholder="QQ"
                                onChange={InputFieldCallback.handleDataChange<UpdateUserRequest>("qq",setFormData,null)}
                                validationRules={qqValidationRules}
                            />
                            <InputField
                                ref={wechatInputRef}
                                type="text"
                                label="微信"
                                placeholder="微信"
                                onChange={InputFieldCallback.handleDataChange<UpdateUserRequest>("wechat",setFormData,null)}
                                validationRules={wechatValidationRules}
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
            </div>
        ))}
    </div>)
}