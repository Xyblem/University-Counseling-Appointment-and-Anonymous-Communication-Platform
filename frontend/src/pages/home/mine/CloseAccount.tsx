import React, {useEffect, useRef, useState} from "react";
import {confirmedPasswordValidationRules, passwordValidationRules, User} from "../../../entity/User";
import {CloseAccountRequest, UserController} from "../../../controller/UserController";
import {CaptchaController} from "../../../controller/CaptchaController";
import {InputField, InputRef} from "../../../components/ui/widget/InputField";
import {Button} from "../../../components/ui/widget/Button";
import {Loading} from "../../../components/ui/widget/Loading";
import {Captcha, CaptchaRef} from "../../../components/ui/combined/Captcha";

export const CloseAccount: React.FC = () => {
    //控制器
    const userController=new UserController();
    const captchaController=new CaptchaController();
    //状态
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [done,setDone]=useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
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
        const isPasswordValid=passwordInputRef.current?.validate();
        const isCaptchaValid=captchaRef.current?.validate();
        // 阻止默认提交
        event.preventDefault();
        if (isPasswordValid &&isCaptchaValid) {
            //console.log("暂停测试：",formData);alert("暂停测试");
            summitCloseAccount();
        } else {
            alert('请检查表单错误!');
        }
    };


    //提交注销账号
    const summitCloseAccount = async (): Promise<void> => {
        setLoading(true);
        setError(false);
        setMessage(null);
        setDone(false);
        formData.username=user?.username;
        await userController.closeAccount(formData).then(response=>{
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
                <h2>注销账号{error?"出错":(message==null?"成功":"失败")}</h2>
                {message==null?
                    <div>
                        <p>成功注销账号，并删除你的所有个人信息。</p>
                        <Button block type="primary" className="btn-text-align-left" onClick={() => {window.location.href="/auth/login";}}>登录页面</Button>
                    </div>
                    : <div>
                        <p className="home-error-detail-mini">详情：{message}</p>
                        <Button block type="default" className="btn-text-align-left" onClick={() => {setDone(false);}}>重试</Button>
                    </div>}
            </div>
        ): (
            <div>
            <h2>注销账号</h2>
                <p style={{color:"Red",fontSize:"12px"}}>提示：注销账号后将删除你的所有信息</p>
            <form onSubmit={handleSubmit}>
                <InputField
                    ref={passwordInputRef}
                    type="password"
                    label="确认密码"
                    placeholder="请输入密码"
                    prefix={<span>*</span>}
                    validationRules={passwordValidationRules}
                    onChange={handleInputChange("password")}
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
                <Button type="primary" block summit>注销账号</Button>
            </form>
            </div>
            )}
        </div>)
        }