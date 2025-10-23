//React框架
import React, {useEffect, useRef, useState} from "react";
import {Outlet} from "react-router";
import {NavLink, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom"
//样式
import './Home.css'
import '../../css/LayoutFlex.css'
import '../../css/Text.css'
import '../../css/Decoration.css'
//自定义组件
import {MineForm, MineForm_Children} from "./MineForm";
import {MainForm} from "./MainForm";
import {AppointmentForm} from "./AppointmentForm";
import {CommunityForm} from "./CommunityForm";
import {UserController} from "../../controller/UserController";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {Button} from "../../common/view/controller/Button";
import {Dialog,DialogRef} from "../../common/view/container/Dialog";
import {Loading} from "../../common/view/display/Loading";
import {ReturnObject} from "../../common/response/ReturnObject";
import {Divider} from "../../common/view/decoration/Divider";
import {User} from "../../entity/User";
import OutletContext = Homepage.OutletContext;


export namespace Homepage{

    //子路由
    export const Children=[
        {path:"/home/main",element:<MainForm/>},
        {path:"/home/appointment",element:<AppointmentForm/>},
        {path:"/home/community",element:<CommunityForm/>},
        {path:"/home/mine",element:<MineForm/>,children:MineForm_Children},
    ];

    export interface OutletContext{
        isLoggedIn: boolean;
        user:User|null;
    }
}





//主页
export const HomepageForm: React.FC = () => {
    //控制器
    const userController = new UserController();
    //路由
    const navigate = useNavigate();
    const urlLocation = useLocation();
    //引用
    const checkLoginHandlerRef=useRef<ResponseHandlerRef<null,any>>(null);
    const userHandler=useRef<ResponseHandlerRef<null,User>>(null);
    const logoutHandlerRef=useRef<ResponseHandlerRef<null,any>>(null);
    const logoutDialogRef = useRef<DialogRef>(null);
    const logoutResultDialogRef = useRef<DialogRef>(null);
    const [outletContext,setOutletContext] = useState<Homepage.OutletContext>({isLoggedIn:false,user:null});

    useEffect(() => {
        if(urlLocation.pathname==='/home'||urlLocation.pathname==='/home/'){
            window.location.href="/home/main";
        }
        checkLoginHandlerRef.current?.request(null);
        userHandler.current?.request(null);
    }, []);

    const logoutDialog = (<Dialog
        ref={logoutDialogRef}
        type="modal"
        title="退出登录"
        showCloseButton
        closeOnBackdropClick
        closeOnEscape
    >
        <div className="layout-flex-column">
            <p className="text-align-left">确定要退出登录吗？</p>
            <br/>
            <div className="layout-flex-row justify-content-flex-end">
                <span style={{flexGrow: 2}}></span>
                <Button type="default" style={{flexGrow: 1}} onClick={() => {
                    logoutDialogRef.current?.close();
                }}>返回</Button>
                <span style={{flexGrow: 0.1}}></span>
                <Button type="primary" style={{flexGrow: 1}} onClick={() => {
                    logoutDialogRef.current?.close();
                    logoutHandlerRef.current?.request(null);
                }}>确定</Button>
            </div>
        </div>
    </Dialog>);

    const logoutResultDialog=(<ResponseHandler<null,any>
        ref={logoutHandlerRef}
        request={userController.logout}
        idleComponent={<></>}
        loadingComponent={<Loading type="dots" text='登出中...' color="#2196f3" size="large" fullScreen></Loading>}
        handlingReturnObjectComponent={<Loading type="dots" text='处理登出结果中...' color="#2196f3" size="large" fullScreen></Loading>}
        networkErrorComponent={<Dialog
            ref={logoutResultDialogRef}
            type="modal"
            title="网络错误"
            showCloseButton
            closeOnBackdropClick
            closeOnEscape
        >
            <div className="layout-flex-column">
                <p className="text-align-left">{logoutHandlerRef.current?.returnObject?.message}</p>
                <br/>
                <div className="layout-flex-row justify-content-flex-end">
                    <span style={{flexGrow: 3.1}}></span>
                    <Button type="default"
                            style={{flexGrow: 1}} onClick={() => {
                        logoutResultDialogRef.current?.close();
                    }}>返回</Button>
                </div>
            </div>

        </Dialog>
        }
        finishedComponent={
            <Dialog
                ref={logoutResultDialogRef}
                type="modal"
                title={"退出登录" + ReturnObject.Status.ChineseName.get(logoutHandlerRef.current?.returnObject?.status)}
                showCloseButton
                closeOnBackdropClick
                closeOnEscape
                onClose={() => {
                    if (logoutHandlerRef.current?.returnObject?.status === ReturnObject.Status.SUCCESS) {
                        window.location.href = "/auth/login";
                    }
                }}
            >
                <div className="layout-flex-column">
                    <p className="text-align-left">{logoutHandlerRef.current?.returnObject?.status === ReturnObject.Status.SUCCESS ? "登出成功，即将返回登录界面" : logoutHandlerRef.current?.returnObject?.message}</p>
                    <br/>
                    <div className="layout-flex-row justify-content-flex-end">
                        <span style={{flexGrow: 3.1}}></span>
                        <Button type={logoutHandlerRef.current?.returnObject?.status === ReturnObject.Status.SUCCESS ? "primary" : "default"}
                                style={{flexGrow: 1}} onClick={() => {
                            logoutResultDialogRef.current?.close();
                        }}>{logoutHandlerRef.current?.returnObject?.status === ReturnObject.Status.SUCCESS ? "确定" : "返回"}</Button>

                    </div>
                </div>

            </Dialog>
        }

        onRequestEnd={() => {
            logoutResultDialogRef.current?.open();
        }}
    />);


    return (<div className="home-background">
            {logoutDialog}
            {logoutResultDialog}
            <div className="home-form">
                {/* 导航栏 */}
                <header className="home-header">
                    <div className="container">
                        <nav className="nav">
                            <ul>
                                <li><NavLink to="main">首页</NavLink></li>
                                {/*<Divider color="Black" spacing="0" orientation="vertical" length="32px"/>*/}
                                <li><NavLink to="appointment">预约</NavLink></li>
                                {/*<Divider color="Black" spacing="0" orientation="vertical" length="32px"/>*/}
                                <li><NavLink to="community">社区</NavLink></li>
                                {/*<Divider color="Black" spacing="0" orientation="vertical" length="32px"/>*/}
                                <li><NavLink to="mine">我的</NavLink></li>
                            </ul>
                        </nav>
                        <div className="exit-button">
                            <Button type="primary" onClick={() => {
                                logoutDialogRef.current?.open();
                            }}>退出</Button>
                        </div>
                    </div>
                </header>
                <Divider color="Black" spacing="0"/>

                <ResponseHandler<null,any>
                    ref={checkLoginHandlerRef}
                    request={userController.checkLogin}
                    idleComponent={<div>
                        <div className="layout-flex">
                            <h2>好奇怪哦，这个页面似乎没有启动登录检查</h2>
                        </div>
                        <div className="layout-flex">
                            <Button type="default" onClick={() => {
                                window.location.reload();
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
                                window.location.reload();
                            }}>重新加载</Button>
                        </div>
                    </div>}

                    finishedComponent={
                        (!(checkLoginHandlerRef.current?.returnObject?.code === ReturnObject.Code.SUCCESS))?(
                            <div>
                                <div className="layout-flex">
                                    <h2>您还未登录，请登录</h2>
                                </div>
                                <div className="layout-flex">
                                    <Button type="default" onClick={()=>{window.location.reload();}}>重新加载</Button>
                                    &nbsp;
                                    <Button type="default" onClick={() => {
                                        window.location.href = "/auth/login";
                                    }}>去登录</Button>
                                </div>
                            </div>
                        ):(
                            <ResponseHandler<null,User>
                                request={userController.loggedInUser}
                                loadingComponent={<Loading type="dots" text='页面加载中...' color="#2196f3" size="large"
                                                           fullScreen></Loading>}
                                handlingReturnObjectComponent={<Loading type="dots" text='页面加载中...' color="#2196f3"
                                                                        size="large" fullScreen></Loading>}
                                networkErrorComponent={
                                    <div>
                                        <h3>网络错误</h3>
                                        <p className="home-error-detail">请检查网络连接{userHandler.current?.networkError?.message}</p>
                                    </div>
                                }
                                finishedComponent={<Outlet context={outletContext}/>}

                                onRequestEnd={()=>{
                                    outletContext.user=userHandler.current?.returnObject?.data?userHandler.current?.returnObject?.data:null;
                                }
                                }
                            />
                        )
                    }

                    onRequestEnd={()=>{
                        outletContext.isLoggedIn=checkLoginHandlerRef.current?.returnObject?.code === ReturnObject.Code.SUCCESS;
                    }}
                />

            </div>
        </div>
    )
}