import React, {ReactNode, useRef, useState} from "react";
import {Button} from "../common/view/controller/Button";
import {Loading} from "../common/view/display/Loading";
import {ReturnObject} from "../common/response/ReturnObject";
import {ResponseHandler, ResponseHandlerRef} from "../common/response/ResponseHandler";
import {User} from "../entity/User";
import {Outlet} from "react-router";
import {ResponseState} from "../common/response/ResponseState";
import {UserController} from "../controller/UserController";
import {useNavigate} from "react-router-dom";


export interface CheckLoginComponentProps {
    setIsLoggedIn?:  React.Dispatch<React.SetStateAction<boolean | undefined>>;
    resultCallback?:(isLoggedIn: boolean | undefined)=>void;
    children: ReactNode;
}


export const CheckLoginComponent: React.FC<CheckLoginComponentProps> = ({
    setIsLoggedIn,children,resultCallback
  }) => {

    //控制器
    const navigate = useNavigate();
    const userController = new UserController();
    const checkLoginHandlerRef=useRef<ResponseHandlerRef<null,any>>(null);
    const [checkLoginState,setCheckLoginState] = useState<ResponseState>();

    return (<ResponseHandler<null,any>
        ref={checkLoginHandlerRef}
        request={userController.checkLogin}
        setResponseState={setCheckLoginState}
        autoRequest={null}
        idleComponent={<div>
            <div className="layout-flex">
                <h2>好奇怪哦，这个页面似乎没有启动登录检查</h2>
            </div>
            <div className="layout-flex">
                <Button type="default" onClick={() => {
                    checkLoginHandlerRef.current?.recover();
                    checkLoginHandlerRef.current?.request(null);
                }}>重新加载</Button>
            </div>
        </div>}

        loadingComponent={<Loading type="dots" text='页面加载中...' color="#2196f3" size="large" fullScreen></Loading>}

        handlingReturnObjectComponent={<Loading type="dots" text='页面加载中...' color="#2196f3" size="large" fullScreen></Loading>}

        networkErrorComponent={<div>
            <div className="layout-flex">
                <h2 style={{color: 'red'}}>验证登录状态失败，请检查网络连接</h2>
            </div>
            <div className="layout-flex">
                <Button type="default" onClick={() => {
                    checkLoginHandlerRef.current?.recover();
                    checkLoginHandlerRef.current?.request(null);
                }}>重新加载</Button>
            </div>
        </div>}
        finishedComponent={
            (!(checkLoginState?.returnObject?.code === ReturnObject.Code.SUCCESS&&checkLoginState?.returnObject?.data.isLogin==="true"))?(
                <div>
                    <div className="layout-flex">
                        <h2>您还未登录，请登录</h2>
                    </div>
                    <div className="layout-flex">
                        <Button type="default" onClick={()=>{
                            checkLoginHandlerRef.current?.recover();
                            checkLoginHandlerRef.current?.request(null);
                        }}>重新加载</Button>
                        &nbsp;
                        <Button type="default" onClick={() => {
                            navigate("/auth/login");
                        }}>去登录</Button>
                    </div>
                </div>
            ):(children)
        }

        onRequestEnd={()=>{
            const result=checkLoginHandlerRef.current?.returnObject?.code === ReturnObject.Code.SUCCESS;
            setIsLoggedIn?.(result);
            resultCallback?.(result);
        }}
    />)
}