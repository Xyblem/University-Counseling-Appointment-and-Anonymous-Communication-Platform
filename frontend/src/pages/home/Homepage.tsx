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
import {Button} from "../../components/ui/widget/Button";
import {CheckLogin, CheckLoginRef} from "../../components/functional/CheckLogin";
import {Loading} from "../../components/ui/widget/Loading";
import {Dialog,DialogRef} from "../../components/ui/container/Dialog";
import {UserController} from "../../controller/UserController";
import {Divider} from "../../components/decoration/Divider";
import {MineForm, MineForm_Children} from "./MineForm";
import {MainForm} from "./MainForm";
import {AppointmentForm} from "./AppointmentForm";
import {CommunityForm} from "./CommunityForm";
import {CheckLoginErrorView, CheckLoginLoading, CheckLoginNotLoginView} from "../../utils/views/CommonViews";
import {ReturnObject, ReturnStatus, ReturnStatusNamesCN} from "../../utils/api/ReturnObject";
import {CheckReturnObject} from "../../components/functional/CheckReturnObject";

//子路由
export const Homepage_Children=[
    {path:"/home/main",element:<MainForm/>},
    {path:"/home/appointment",element:<AppointmentForm/>},
    {path:"/home/community",element:<CommunityForm/>},
    {path:"/home/mine",element:<MineForm/>,children:MineForm_Children},
];

//主页
export const Homepage: React.FC = () => {
    //控制器
    const userController = new UserController();
    //路由
    const navigate = useNavigate();
    const urlLocation = useLocation();
    //状态
    const [checkLoginLoading,setCheckLoginLoading] = useState<boolean>(false);
    const [checkLoginReturnObject,setCheckLoginReturnObject] = useState<ReturnObject|null>(null);
    const [checkLoginNetworkError,setCheckLoginNetworkError] = useState<Error|null>(null);
    const [checkLoginSuccess,setCheckLoginSuccess] = useState<boolean>(false);
    const [logoutLoading,setLogoutLoading]=useState<boolean>(false);
    const [logoutReturnObject,setLogoutReturnObject]=useState<ReturnObject|null>(null);
    const [logoutNetworkError,setLogoutNetworkError]=useState<Error|null>(null);
    //引用
    const checkLoginRef = useRef<CheckLoginRef>(null);
    const logoutDialogRef = useRef<DialogRef>(null);
    const logoutResultDialogRef = useRef<DialogRef>(null);

    useEffect(() => {
        if(urlLocation.pathname==='/home'||urlLocation.pathname==='/home/'){
            window.location.href="/home/main";
        }
        setCheckLoginLoading(true);
        setCheckLoginReturnObject(null);
        setCheckLoginNetworkError(null);
        setCheckLoginSuccess(false);
        userController.checkLogin().then(response=>{
            setCheckLoginReturnObject(response);
            if(response.status===ReturnStatus.SUCCESS&&response.data.isLogin==="true"){
                setCheckLoginSuccess(true);
            }
        }).catch(err=>{
            setCheckLoginNetworkError(err);
        }).finally(()=>{
            setCheckLoginLoading(false);
        })
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
                    setLogoutLoading(true);
                    setLogoutNetworkError(null);
                    setLogoutReturnObject(null);
                    userController.logout().then(result => {
                        setLogoutReturnObject(result);
                    }).catch(err => {
                            setLogoutNetworkError(err);
                        }
                    ).finally(()=>{
                        setLogoutLoading(false);
                        logoutResultDialogRef.current?.open();
                    });
                }}>确定</Button>
            </div>
        </div>
    </Dialog>);

    const logoutResultDialog = (<Dialog
        ref={logoutResultDialogRef}
        type="modal"
        title={logoutNetworkError!=null?"网络错误":("退出登录" + ReturnStatusNamesCN.get(logoutReturnObject?.status))}
        showCloseButton
        closeOnBackdropClick
        closeOnEscape
        onClose={() => {
            if (logoutLoading === false && logoutNetworkError == null && logoutReturnObject != null && logoutReturnObject.status===ReturnStatus.SUCCESS) {
                window.location.href="/auth/login";
            }
        }}
    >
        <CheckReturnObject
            returnObject={logoutReturnObject}
            networkError={logoutNetworkError}
            networkErrorComponent={<div className="layout-flex-column">
                <p className="text-align-left">{logoutNetworkError?.message}</p>
                <br/>
                <div className="layout-flex-row justify-content-flex-end">
                    <span style={{flexGrow: 3.1}}></span>
                    <Button type="default"
                            style={{flexGrow: 1}} onClick={() => {
                        logoutResultDialogRef.current?.close();
                    }}>返回</Button>
                </div>
            </div>}
        >
            <div className="layout-flex-column">
                <p className="text-align-left">{(logoutReturnObject?.status === ReturnStatus.SUCCESS) ? "登出成功，即将返回登录界面" : logoutReturnObject?.message}</p>
                <br/>
                <div className="layout-flex-row justify-content-flex-end">
                    <span style={{flexGrow: 3.1}}></span>

                        <Button type={(logoutReturnObject?.status === ReturnStatus.SUCCESS) ? "primary" : "default"}
                                style={{flexGrow: 1}} onClick={() => {
                            logoutResultDialogRef.current?.close();
                        }}>{(logoutReturnObject?.status === ReturnStatus.SUCCESS) ? "确定" : "返回"}</Button>

                </div>
            </div>
        </CheckReturnObject>
    </Dialog>);


    const checkLoginView=(<CheckReturnObject
        loading={checkLoginLoading}
        returnObject={checkLoginReturnObject}
        networkError={checkLoginNetworkError}
        loadingComponent={CheckLoginLoading}
        networkErrorComponent={CheckLoginErrorView}

    >
        {CheckLoginNotLoginView}
    </CheckReturnObject>);


    return (<div className="home-background">
            {logoutDialog}
            {logoutResultDialog}
            {!checkLoginRef.current?.loading&&logoutLoading&&<Loading type="dots" text='登出中...' color="#2196f3" size="large" fullScreen></Loading>}

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

                    {!checkLoginSuccess?(checkLoginView): (<Outlet/>)}
            </div>
        </div>
    )
}