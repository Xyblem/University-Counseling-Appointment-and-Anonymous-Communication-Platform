import React, {useEffect, useRef, useState} from "react";
import {confirmedPasswordValidationRules, passwordValidationRules, User} from "../../../entity/User";
import {UpdatePasswordRequest, UserController} from "../../../controller/UserController";
import {CaptchaController} from "../../../controller/CaptchaController";
import {InputField, InputFieldCallback, InputRef} from "../../../components/ui/widget/InputField";
import {Button} from "../../../components/ui/widget/Button";
import {Loading} from "../../../components/ui/widget/Loading";
import {Captcha, CaptchaCallback, CaptchaRef} from "../../../components/ui/combined/Captcha";
import {ReturnObject, ReturnStatus, ReturnStatusNamesCN} from "../../../utils/api/ReturnObject";
import {CheckReturnObject} from "../../../components/functional/CheckReturnObject";

export const UpdatePassword: React.FC = () => {
    //控制器
    const userController=new UserController();
    const captchaController=new CaptchaController();
    //状态
    const [userLoading, setUserLoading] = useState<boolean>(false);
    const [userReturnObject,setUserReturnObject]=useState<ReturnObject<User>|null>(null);
    const [userNetworkError, setUserNetworkError]=useState<Error|null>(null);
    const [userSuccess,setUserSuccess]=useState<boolean>(false);
    const user=userReturnObject?.data;
    const [updatePasswordLoading, setUpdatePasswordLoading] = useState<boolean>(false);
    const [updatePasswordReturnObject,setUpdatePasswordReturnObject]=useState<ReturnObject|null>(null);
    const [updatePasswordNetworkError, setUpdatePasswordNetworkError]=useState<Error|null>(null);
    const [formData, setFormData] = useState<UpdatePasswordRequest>({
        username: '',
        oldPassword: '',
        newPassword: '',
        confirmedNewPassword: '',
        captcha:'' ,
        captchaKey:''
    });
    //引用
    const oldPasswordInputRef = useRef<InputRef>(null);
    const newPasswordInputRef = useRef<InputRef>(null);
    const confirmedNewPasswordInputRef = useRef<InputRef>(null);
    const captchaRef = useRef<CaptchaRef>(null);

    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-我的修改密码";
        setUserLoading(true);
        setUserReturnObject(null);
        setUserNetworkError(null);
        setUserSuccess(false);
        userController.loggedInUser().then(result => {
                setUserReturnObject(result);
                if (result.status === ReturnStatus.SUCCESS) {
                    setUserSuccess(true);
                }
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
        const isOldPasswordValid=oldPasswordInputRef.current?.validate();
        const isNewPasswordValid=newPasswordInputRef.current?.validate();
        const isConfirmedNewPasswordValid=confirmedNewPasswordInputRef.current?.validate();
        const isCaptchaValid=captchaRef.current?.validate();
        // 阻止默认提交
        event.preventDefault();
        if (isOldPasswordValid && isNewPasswordValid && isConfirmedNewPasswordValid &&isCaptchaValid) {
            //console.log("暂停测试：",formData);alert("暂停测试");
            summitUpdatePassword();
        } else {
            alert('请检查表单错误!');
        }
    };

    //提交修改密码
    const summitUpdatePassword = async (): Promise<void> => {
        setUpdatePasswordLoading(true);
        setUpdatePasswordReturnObject(null);
        setUpdatePasswordNetworkError(null);
        formData.username=user?.username;
        await userController.updatePassword(formData).then(response=>{
            setUpdatePasswordReturnObject(response);
        }).catch(err=>{
            setUpdatePasswordNetworkError(err);
        }).finally(()=>{
            setUpdatePasswordLoading(false);
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


    const checkUpdatePasswordView=(<CheckReturnObject
        loading={updatePasswordLoading}
        returnObject={updatePasswordReturnObject}
        networkError={updatePasswordNetworkError}
        loadingComponent={<Loading type="dots" text='修改密码中...' color="#2196f3" size="large"
                                   fullScreen></Loading>}
        networkErrorComponent={<div>
            <h3>网络错误</h3>
            <p className="home-error-detail">{updatePasswordNetworkError?.message}</p>
        </div>}
    >
        <div>
            <h3>修改密码{ReturnStatusNamesCN.get(updatePasswordReturnObject?.status)}</h3>
            <p className="home-error-detail">{updatePasswordReturnObject?.message}</p>
        </div>
    </CheckReturnObject>);

    return (<div style={{marginLeft: "25px"}}>
        {!userSuccess? (checkUserView): (updatePasswordReturnObject!=null?(checkUpdatePasswordView) : (
            <div>
                <h2>修改密码</h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        ref={oldPasswordInputRef}
                        type="password"
                        label="旧密码"
                        placeholder="请输入旧密码"
                        prefix={<span>*</span>}
                        validationRules={passwordValidationRules}
                        onChange={InputFieldCallback.handleDataChange<UpdatePasswordRequest>("oldPassword",setFormData,null)}
                        required
                    />
                    <InputField
                        ref={newPasswordInputRef}
                        type="password"
                        label="新密码"
                        placeholder="请输入新密码"
                        prefix={<span>*</span>}
                        validationRules={passwordValidationRules}
                        onChange={InputFieldCallback.handleDataChange<UpdatePasswordRequest>("newPassword",setFormData,null)}
                        required
                    />
                    <InputField
                        ref={confirmedNewPasswordInputRef}
                        type="password"
                        label="确认新密码"
                        placeholder="请确认新密码"
                        prefix={<span>*</span>}
                        validationRules={confirmedPasswordValidationRules(newPasswordInputRef)}
                        onChange={InputFieldCallback.handleDataChange<UpdatePasswordRequest>("confirmedNewPassword",setFormData,null)}
                        required
                    />
                    <Captcha
                        ref={captchaRef}
                        onChange={CaptchaCallback.handleDataChange<UpdatePasswordRequest>("captchaKey", "captcha", captchaRef, setFormData, null)}
                        placeholder="请输入图片中的验证码"
                        autoRefresh={true}
                        getCaptcha={captchaController.captcha}
                    />
                    <br/>
                    <Button type="primary" block summit>提交修改</Button>
                </form>

            </div>
        ))}
        </div>
    )
}