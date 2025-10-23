import React, {useEffect, useRef, useState} from "react";
import {passwordValidationRules, User} from "../../../entity/User";
import {CloseAccountRequest, UserController} from "../../../controller/UserController";
import {CaptchaController} from "../../../controller/CaptchaController";
import {InputField, InputFieldCallback, InputRef} from "../../../components/ui/widget/InputField";
import {Button} from "../../../components/ui/widget/Button";
import {Loading} from "../../../components/ui/widget/Loading";
import {Captcha, CaptchaCallback, CaptchaRef} from "../../../components/ui/combined/Captcha";
import {ReturnObject, ReturnStatus, ReturnStatusNamesCN} from "../../../utils/api/ReturnObject";
import {CheckReturnObject} from "../../../components/functional/CheckReturnObject";

export const CloseAccount: React.FC = () => {
    //控制器
    const userController=new UserController();
    const captchaController=new CaptchaController();
    //状态
    const [userLoading, setUserLoading] = useState<boolean>(false);
    const [userReturnObject,setUserReturnObject]=useState<ReturnObject<User>|null>(null);
    const [userNetworkError, setUserNetworkError]=useState<Error|null>(null);
    const [userSuccess,setUserSuccess]=useState<boolean>(false);
    const user=userReturnObject?.data;
    const [closeAccountLoading, setCloseAccountLoading] = useState<boolean>(false);
    const [closeAccountReturnObject,setCloseAccountReturnObject]=useState<ReturnObject|null>(null);
    const [closeAccountNetworkError, setCloseAccountNetworkError]=useState<Error|null>(null);
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
        const isPasswordValid=passwordInputRef.current?.validate();
        const isCaptchaValid=captchaRef.current?.validate();
        // 阻止默认提交
        event.preventDefault();
        if (isPasswordValid &&isCaptchaValid) {
            summitCloseAccount();
        } else {
            alert('请检查表单错误!');
        }
    };

    //提交注销账号
    const summitCloseAccount = async (): Promise<void> => {
        setCloseAccountLoading(true);
        setCloseAccountReturnObject(null);
        setCloseAccountNetworkError(null);
        formData.username=user?.username;
        await userController.closeAccount(formData).then(response=>{
            setCloseAccountReturnObject(response);
        }).catch(err=>{
            setCloseAccountNetworkError(err);
        }).finally(()=>{
            setCloseAccountLoading(false);
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


    const checkCloseAccountView=(<CheckReturnObject
        loading={closeAccountLoading}
        returnObject={closeAccountReturnObject}
        networkError={closeAccountNetworkError}
        loadingComponent={<Loading type="dots" text='注销账号中...' color="#2196f3" size="large"
                                   fullScreen></Loading>}
        networkErrorComponent={<div>
            <h3>网络错误</h3>
            <p className="home-error-detail">{closeAccountNetworkError?.message}</p>
        </div>}
    >
        <div>
            <h3>注销账号{ReturnStatusNamesCN.get(closeAccountReturnObject?.status)}</h3>
            <p className="home-error-detail">{closeAccountReturnObject?.message}</p>
            {closeAccountReturnObject?.status==ReturnStatus.SUCCESS && (
                <Button type="primary" block onChange={()=>{window.location.href="auth/login";}}>返回登录界面</Button>
            )}
        </div>
    </CheckReturnObject>);

    return (<div style={{marginLeft: "25px"}}>
        {!userSuccess? (checkUserView): (closeAccountReturnObject!=null?(checkCloseAccountView) : (
                <div>
                    <h2>注销账号</h2>
                    <p className="home-warning">提示：注销账号后将删除你的所有信息</p>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            ref={passwordInputRef}
                            type="password"
                            label="确认密码"
                            placeholder="请输入密码"
                            prefix={<span>*</span>}
                            validationRules={passwordValidationRules}
                            onChange={InputFieldCallback.handleDataChange<CloseAccountRequest>("password", setFormData, null)}
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
                </div>
            )
        )}
    </div>)
}