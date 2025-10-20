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

//子路由
export const Homepage_Children=[
    {path:"/home/main",element:<MainForm/>},
    {path:"/home/mine",element:<MineForm/>,children:MineForm_Children},
];

//主页
export const Homepage: React.FC = () => {
    //状态
    const [logoutError, setLogoutError] = useState<boolean>(false);
    const [logoutMessage, setLogoutMessage] = useState<string | null>(null);
    const [logoutLoading,setLogoutLoading]=useState<boolean>(false)
    //控制器
    const userController = new UserController();
    //引用
    const checkLoginRef = useRef<CheckLoginRef>(null);
    const logoutDialogRef = useRef<DialogRef>(null);
    const logoutResultDialogRef = useRef<DialogRef>(null);
    //路由
    const navigate = useNavigate();
    const urlLocation = useLocation();


    useEffect(() => {
        if(urlLocation.pathname==='/home'||urlLocation.pathname==='/home/'){
            window.location.href="/home/main";
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
                    setLogoutLoading(true);
                    //不需要await
                    userController.logout().then(result => {
                        setLogoutError(false);
                        setLogoutMessage(null);
                        if (result) {

                        } else {
                            setLogoutMessage("用户未登录");
                        }
                        setLogoutLoading(false);
                    }).catch(err => {
                            setLogoutError(true);
                            setLogoutMessage(err.message);
                            setLogoutLoading(false);
                        }
                    ).finally(()=>{
                        logoutResultDialogRef.current?.open();
                    });
                }}>确定</Button>
            </div>
        </div>
    </Dialog>);

    const logoutResultDialog = (<Dialog
        ref={logoutResultDialogRef}
        type="modal"
        title={"退出登录" + (logoutError ? "出错" : (logoutMessage == null ? "成功" : "失败"))}
        showCloseButton
        closeOnBackdropClick
        closeOnEscape
        onClose={() => {
            if (logoutError === false && logoutMessage == null) {
                window.location.href="/auth/login";
            }
        }}
    >
        <div className="layout-flex-column">
            <p className="text-align-left">{(logoutError ? logoutMessage : (logoutMessage == null ? "登出成功，即将返回登录界面" : logoutMessage))}</p>
            <br/>
            <div className="layout-flex-row justify-content-flex-end">
                <span style={{flexGrow: 3.1}}></span>
                <Button type={(logoutError ? "default" : (logoutMessage == null ? "primary" : "default"))}
                        style={{flexGrow: 1}} onClick={() => {
                    logoutResultDialogRef.current?.close();
                }}>{(logoutError ? "返回" : (logoutMessage == null ? "确定" : "返回"))}</Button>
            </div>
        </div>
    </Dialog>);

    return (<div className="home-background">
            {/*<Navigate to="/home/main" replace/>*/}
            {logoutDialog}
            {logoutResultDialog}
            {logoutLoading&&<Loading type="dots" text='登出中...' color="#2196f3" size="large" fullScreen></Loading>}
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
                <Divider color="Black" spacing="0" />

                <CheckLogin
                    ref={checkLoginRef}
                    to={null}
                    checkLogin={userController.checkLogin}
                    loadingComponent={
                        <Loading type="dots" text='页面加载中...' color="#2196f3" size="large" fullScreen></Loading>
                    }
                    errorComponent={
                        <div>
                            <div className="layout-flex">
                                <h2 style={{color: 'red'}}>验证登录状态失败，请检查网络连接</h2>
                            </div>
                            <div className="layout-flex">
                                <Button type="default" onClick={checkLoginRef.current?.handleRetry}>重新加载</Button>
                            </div>
                        </div>
                    }

                    notLoginComponent={
                        <div>
                            <div className="layout-flex">
                                <h2>您还未登录，请登录</h2>
                            </div>
                            <div className="layout-flex">
                                <Button type="default" onClick={checkLoginRef.current?.handleRetry}>重新加载</Button>
                                &nbsp;
                                <Button type="default" onClick={() => {
                                    navigate("/auth/login");
                                }}>去登录</Button>
                            </div>
                        </div>
                    }
                >
                    <Outlet></Outlet>
                </CheckLogin>
            </div>
        </div>
    )
}