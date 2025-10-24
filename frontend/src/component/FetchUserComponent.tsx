import React, {ReactNode, useRef, useState} from "react";
import {User} from "../entity/User";
import {CheckLoginComponentProps} from "./CheckLoginComponent";
import {Loading} from "../common/view/display/Loading";
import {ReturnObject} from "../common/response/ReturnObject";
import {Outlet} from "react-router";
import {ResponseHandler, ResponseHandlerRef} from "../common/response/ResponseHandler";
import {ResponseState} from "../common/response/ResponseState";
import {UserController} from "../controller/UserController";

export interface FetchUserComponentProps {
    setUser?:  React.Dispatch<React.SetStateAction<User | undefined>>;
    resultCallback?:(user: User | undefined)=>void;
    children: ReactNode;
}


export const FetchUserComponent: React.FC<FetchUserComponentProps> = ({setUser,children,resultCallback}) => {

    //控制器
    const userController = new UserController();
    const [userState,setUserState] = useState<ResponseState<User>>();
    const userHandlerRef=useRef<ResponseHandlerRef<null,User>>(null);


    return (<ResponseHandler<null,User>
        ref={userHandlerRef}
        request={userController.loggedInUser}
        setResponseState={setUserState}
        autoRequest={null}
        idleComponent={<div className="layout-flex-row">
            <h3>好奇怪哦，这个页面似乎没有启动登录信息获取</h3>
        </div>}

        loadingComponent={<Loading type="dots" text='页面加载中...' color="#2196f3" size="large"
                                   fullScreen></Loading>}

        handlingReturnObjectComponent={<Loading type="dots" text='页面加载中...' color="#2196f3"
                                                size="large" fullScreen></Loading>}
        networkErrorComponent={
            <div>
                <h3>网络错误</h3>
                <p className="home-error-detail">请检查网络连接{userHandlerRef.current?.networkError?.message}</p>
            </div>
        }
        finishedComponent={userState?.returnObject?.code === ReturnObject.Code.SUCCESS?(children): (
            <div>
                <h3>获取用户信息失败</h3>
                <p className="home-error-detail">{userState?.returnObject?.message}</p>
            </div>
        )
        }

        onRequestEnd={(requestBody, returnObject) => {
            if(returnObject.data!=null){
                setUser?.(returnObject.data);
                resultCallback?.(returnObject.data);
            }else{
                setUser?.(undefined);
                resultCallback?.(undefined);
            }
        }
        }
    />)
}