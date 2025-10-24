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
import {CommunityForm,Community_Children} from "./CommunityForm";
import {UserController} from "../../controller/UserController";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {Button} from "../../common/view/controller/Button";
import {Dialog,DialogRef} from "../../common/view/container/Dialog";
import {Loading} from "../../common/view/display/Loading";
import {ReturnObject} from "../../common/response/ReturnObject";
import {Divider} from "../../common/view/decoration/Divider";
import {User} from "../../entity/User";
import {ResponseState} from "../../common/response/ResponseState";
import {CheckLoginComponent} from "../../component/CheckLoginComponent";
import {FetchUserComponent} from "../../component/FetchUserComponent";


export namespace Homepage{

    //子路由
    export const Children=[
        {path:"main",element:<MainForm/>},
        {path:"appointment",element:<AppointmentForm/>},
        {path:"community",element:<CommunityForm/>,children:Community_Children},
        {path:"mine",element:<MineForm/>,children:MineForm_Children},
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

    const [logoutState,setLogoutState] = useState<ResponseState>();
    //引用


    const logoutHandlerRef=useRef<ResponseHandlerRef<null,any>>(null);
    const logoutDialogRef = useRef<DialogRef>(null);
    const logoutResultDialogRef = useRef<DialogRef>(null);
    const [outletContext,setOutletContext] = useState<Homepage.OutletContext>({isLoggedIn:false,user:null});

    useEffect(() => {
        if(urlLocation.pathname==='/home'||urlLocation.pathname==='/home/'){
            navigate("/home/main");
        }
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
        setResponseState={setLogoutState}
        idleComponent={<></>}
        loadingComponent={<Loading type="dots" text='登出中...' color="#2196f3" size="large" fullScreen></Loading>}
        handlingReturnObjectComponent={<Loading type="dots" text='处理登出结果中...' color="#2196f3" size="large" fullScreen></Loading>}
        networkErrorComponent={<Dialog
            autoOpen
            ref={logoutResultDialogRef}
            type="modal"
            title="网络错误"
            showCloseButton
            closeOnBackdropClick
            closeOnEscape
        >
            <div className="layout-flex-column">
                <p className="text-align-left">详情：{logoutState?.networkError?.message}</p>
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
                autoOpen
                ref={logoutResultDialogRef}
                type="modal"
                title={"退出登录" + ReturnObject.Status.ChineseName.get(logoutState?.returnObject?.status)}
                showCloseButton
                closeOnBackdropClick
                closeOnEscape
                onClose={() => {
                    if (logoutState?.returnObject?.status === ReturnObject.Status.SUCCESS) {
                        navigate("/auth/login");
                    }
                }}
            >
                <div className="layout-flex-column">
                    <p className="text-align-left">{logoutState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "登出成功，即将返回登录界面" : logoutState?.returnObject?.message}</p>
                    <br/>
                    <div className="layout-flex-row justify-content-flex-end">
                        <span style={{flexGrow: 3.1}}></span>
                        <Button type={logoutState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "primary" : "default"}
                                style={{flexGrow: 1}} onClick={() => {
                            logoutResultDialogRef.current?.close();
                        }}>{logoutState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "确定" : "返回"}</Button>

                    </div>
                </div>

            </Dialog>
        }
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
                <CheckLoginComponent
                    resultCallback={(result )=>{
                        outletContext.isLoggedIn=result===true;
                    }}
                >
                    <FetchUserComponent resultCallback={(result)=>{
                        outletContext.user = result?result:null;
                    }}>
                        <Outlet context={outletContext}/>
                    </FetchUserComponent>
                </CheckLoginComponent>
            </div>
        </div>
    )
}