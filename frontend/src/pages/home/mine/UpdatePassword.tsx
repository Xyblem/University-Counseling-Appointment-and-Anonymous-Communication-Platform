import React, {useEffect, useRef, useState} from "react";
import {UpdatePasswordRequest, UserController} from "../../../controller/UserController";
import {CaptchaController} from "../../../controller/CaptchaController";
import {useOutletContext} from "react-router";
import {Homepage} from "../HomepageForm";
import {ResponseHandler, ResponseHandlerRef} from "../../../common/response/ResponseHandler";
import {InputCallback, InputRef} from "../../../common/view/input/Input";
import {CaptchaCallback, CaptchaRef} from "../../../common/view/custom-input/Captcha";
import {Input} from "../../../common/view/input/Input";
import {Captcha} from "../../../common/view/custom-input/Captcha";
import {Button} from "../../../common/view/controller/Button";
import {User} from "../../../entity/User";
import {Loading} from "../../../common/view/display/Loading";
import {ReturnObject} from "../../../common/response/ReturnObject";
import {ResponseState} from "../../../common/response/ResponseState";

export const UpdatePassword: React.FC = () => {
    //控制器
    const userController=new UserController();
    const captchaController=new CaptchaController();
    const context=useOutletContext<Homepage.OutletContext>();
    //状态
    const [updatePasswordState,setUpdatePasswordState] = useState<ResponseState>();
    const [formData, setFormData] = useState<UpdatePasswordRequest>({
        username: '',
        oldPassword: '',
        newPassword: '',
        confirmedNewPassword: '',
        captcha:'' ,
        captchaKey:''
    });
    //引用
    const updatePasswordHandler=useRef<ResponseHandlerRef<UpdatePasswordRequest,any>>(null);
    const oldPasswordInputRef = useRef<InputRef>(null);
    const newPasswordInputRef = useRef<InputRef>(null);
    const confirmedNewPasswordInputRef = useRef<InputRef>(null);
    const captchaRef = useRef<CaptchaRef>(null);

    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-我的修改密码";
    },[]);

    //处理表单提交
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        // 手动验证所有字段
        const isOldPasswordValid=oldPasswordInputRef.current?.validate();
        const isNewPasswordValid=newPasswordInputRef.current?.validate();
        const isConfirmedNewPasswordValid=confirmedNewPasswordInputRef.current?.validate();
        const isCaptchaValid=captchaRef.current?.validate();
        formData.username=context.user?.username;
        // 阻止默认提交
        event.preventDefault();
        if (isOldPasswordValid && isNewPasswordValid && isConfirmedNewPasswordValid &&isCaptchaValid) {
            //console.log("暂停测试：",formData);alert("暂停测试");
            updatePasswordHandler.current?.request(formData);
        } else {
            alert('请检查表单错误!');
        }
    };


    const mainForm= (<div>
        <h2>修改密码</h2>
        <form onSubmit={handleSubmit}>
            <Input
                ref={oldPasswordInputRef}
                type="password"
                label="旧密码"
                placeholder="请输入旧密码"
                prefix={<span>*</span>}
                validationRules={User.ValidationRules.password}
                onChange={InputCallback.handleDataChange<UpdatePasswordRequest>("oldPassword", setFormData, null)}
                required
            />
            <Input
                ref={newPasswordInputRef}
                type="password"
                label="新密码"
                placeholder="请输入新密码"
                prefix={<span>*</span>}
                validationRules={User.ValidationRules.password}
                onChange={InputCallback.handleDataChange<UpdatePasswordRequest>("newPassword", setFormData, null)}
                required
            />
            <Input
                ref={confirmedNewPasswordInputRef}
                type="password"
                label="确认新密码"
                placeholder="请确认新密码"
                prefix={<span>*</span>}
                validationRules={User.ValidationRules.confirmedPassword(newPasswordInputRef)}
                onChange={InputCallback.handleDataChange<UpdatePasswordRequest>("confirmedNewPassword", setFormData, null)}
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

    </div>);

    return (<div style={{marginLeft: "25px"}}>
            <ResponseHandler<UpdatePasswordRequest, any>
                ref={updatePasswordHandler}
                request={userController.updatePassword}
                setResponseState={setUpdatePasswordState}
                idleComponent={mainForm}
                loadingComponent={
                    <div>
                        {mainForm}
                        <Loading
                            type="dots"
                            text='修改密码中...'
                            color="#2196f3"
                            size="large"
                            fullScreen/>
                    </div>
                    }

                handlingReturnObjectComponent={
                    <div>
                    {mainForm}
                        <Loading
                            type="dots"
                            text='处理修改密码结果中...'
                            color="#2196f3"
                            size="large"
                            fullScreen/>
                    </div>
                }

                networkErrorComponent={<div>
                    <h3>网络错误</h3>
                    <p className="home-error-detail">{updatePasswordState?.networkError?.message}</p>
                </div>}

                finishedComponent={<div>
                    <h3>修改密码{ReturnObject.Status.ChineseName.get(updatePasswordState?.returnObject?.status)}</h3>
                    {updatePasswordState?.returnObject?.status === ReturnObject.Status.SUCCESS ? (
                        <p className="home-error-detail">修改密码成功，请牢记你的新密码哟~~~</p>
                    ) : (
                        <p className="home-error-detail">{updatePasswordState?.returnObject?.message}</p>
                    )}

                </div>}
            />
        </div>
    )
}