import React, {useEffect, useRef, useState} from "react";
import {CloseAccountRequest, UserController} from "../../../controller/UserController";
import {CaptchaController} from "../../../controller/CaptchaController";
import {useOutletContext} from "react-router";
import {Homepage} from "../HomepageForm";
import {InputCallback, InputRef} from "../../../common/view/input/Input";
import {CaptchaCallback, CaptchaRef} from "../../../common/view/custom-input/Captcha";
import {ResponseHandler, ResponseHandlerRef} from "../../../common/response/ResponseHandler";
import {Input} from "../../../common/view/input/Input";
import {Captcha} from "../../../common/view/custom-input/Captcha";
import {Button} from "../../../common/view/controller/Button";
import {User} from "../../../entity/User";
import {Loading} from "../../../common/view/display/Loading";
import {ReturnObject} from "../../../common/response/ReturnObject";


export const CloseAccount: React.FC = () => {
    //控制器
    const userController=new UserController();
    const captchaController=new CaptchaController();
    //状态
    const context=useOutletContext<Homepage.OutletContext>();
    const closeAccountHandler=useRef<ResponseHandlerRef<CloseAccountRequest,any>>(null);
    const [formData, setFormData] = useState<CloseAccountRequest>({
        username: '',
        password: '',
        captcha: '',
        captchaKey:'',
    });
    //引用
    const passwordInputRef = useRef<InputRef>(null);
    const captchaRef = useRef<CaptchaRef>(null);
    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-我的注销账号";
    },[]);

    //处理表单提交
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        // 手动验证所有字段
        const isPasswordValid=passwordInputRef.current?.validate();
        const isCaptchaValid=captchaRef.current?.validate();
        formData.username=context.user?.username;
        // 阻止默认提交
        event.preventDefault();
        if (isPasswordValid &&isCaptchaValid) {
            closeAccountHandler.current?.request(formData);
        } else {
            alert('请检查表单错误!');
        }
    };


    return (<div style={{marginLeft: "25px"}}>

        <ResponseHandler<CloseAccountRequest,any>
            ref={closeAccountHandler}
            request={userController.closeAccount}
            idleComponent={<div>
                <h2>注销账号</h2>
                <p className="home-warning">提示：注销账号后将删除你的所有信息</p>
                <form onSubmit={handleSubmit}>
                    <Input
                        ref={passwordInputRef}
                        type="password"
                        label="确认密码"
                        placeholder="请输入密码"
                        prefix={<span>*</span>}
                        validationRules={User.ValidationRules.password}
                        onChange={InputCallback.handleDataChange<CloseAccountRequest>("password", setFormData, null)}
                        required
                    />
                    <Captcha
                        ref={captchaRef}
                        onChange={CaptchaCallback.handleDataChange<CloseAccountRequest>("captchaKey", "captcha", captchaRef, setFormData, null)}
                        placeholder="请输入图片中的验证码"
                        autoRefresh={true}
                        getCaptcha={captchaController.captcha}
                    />
                    <br/>
                    <Button type="primary" block summit>注销账号</Button>
                </form>
            </div>}

            loadingComponent={<Loading type="dots" text='注销账号中...' color="#2196f3" size="large"
                                       fullScreen></Loading>}

            handlingReturnObjectComponent={<Loading type="dots" text='处理注销结果中...' color="#2196f3" size="large"
                                                    fullScreen></Loading>}

            networkErrorComponent={
                <div>
                    <h3>网络错误</h3>
                    <p className="home-error-detail">{closeAccountHandler.current?.networkError?.message}</p>
                </div>
            }

            finishedComponent={
                <div>
                    <h3>注销账号{ReturnObject.Status.ChineseName.get(closeAccountHandler.current?.returnObject?.status)}</h3>
                    <p className="home-error-detail">{closeAccountHandler.current?.returnObject?.message}</p>
                    {closeAccountHandler.current?.returnObject?.status===ReturnObject.Status.SUCCESS && (
                        <Button type="primary" block onChange={() => {
                            window.location.href = "auth/login";
                        }}>返回登录界面</Button>
                    )}
                </div>
            }
        />
    </div>)
}