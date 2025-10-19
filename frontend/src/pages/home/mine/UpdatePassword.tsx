import React, {useEffect, useRef, useState} from "react";
import {confirmedPasswordValidationRules, passwordValidationRules, User} from "../../../entity/User";
import {UpdatePasswordRequest, UserController} from "../../../controller/UserController";
import {CaptchaController} from "../../../controller/CaptchaController";
import {InputField, InputRef} from "../../../components/ui/widget/InputField";
import {Button} from "../../../components/ui/widget/Button";
import {Loading} from "../../../components/ui/widget/Loading";
import {Captcha, CaptchaRef} from "../../../components/ui/combined/Captcha";

export const UpdatePassword: React.FC = () => {
    //控制器
    const userController=new UserController();
    const captchaController=new CaptchaController();
    //状态
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [done,setDone]=useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
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
        userController.loggedInUser().then(result => {
                //这里可能因为未登录返回null,但不需要管
                setUser(result);
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
        setLoading(true);
        setError(false);
        setMessage(null);
        setDone(false);
        formData.username=user?.username;
        await userController.updatePassword(formData).then(response=>{
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
            {loading ? <Loading type="dots" text='修改密码中...' color="#2196f3" size="large" fullScreen></Loading> : null}
            {done?(
                <div className="">
                <h2>修改密码{error?"出错":(message==null?"成功":"失败")}</h2>
                    {message==null?
                        <p>请牢记你的新密码~~~</p>
                        : <div>
                            <p className="home-error-detail-mini">详情：{message}</p>
                            <Button block type="default" className="btn-text-align-left" onClick={() => {setDone(false);}}>重试</Button>
                        </div>}
                </div>
            ):(<div>
                <h2>修改密码</h2>
                <form  onSubmit={handleSubmit}>
                    <InputField
                        ref={oldPasswordInputRef}
                        type="password"
                        label="旧密码"
                        placeholder="请输入旧密码"
                        prefix={<span>*</span>}
                        validationRules={passwordValidationRules}
                        onChange={handleInputChange("oldPassword")}
                        required
                    />
                    <InputField
                        ref={newPasswordInputRef}
                        type="password"
                        label="新密码"
                        placeholder="请输入新密码"
                        prefix={<span>*</span>}
                        validationRules={passwordValidationRules}
                        onChange={handleInputChange("newPassword")}
                        required
                    />
                    <InputField
                        ref={confirmedNewPasswordInputRef}
                        type="password"
                        label="确认新密码"
                        placeholder="请确认新密码"
                        prefix={<span>*</span>}
                        validationRules={confirmedPasswordValidationRules(newPasswordInputRef)}
                        onChange={handleInputChange("confirmedNewPassword")}
                        required
                    />
                    <Captcha
                        ref={captchaRef}
                        onChange={handleCaptchaInputChange("captcha")}
                        placeholder="请输入图片中的验证码"
                        autoRefresh={true}
                        getCaptcha={captchaController.captcha}
                    />
                    <br/>
                    <Button type="primary" block summit>提交修改</Button>
                </form>

            </div>)}

        </div>
    )
}