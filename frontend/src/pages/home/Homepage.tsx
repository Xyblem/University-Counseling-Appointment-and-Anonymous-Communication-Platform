//React框架
import React, {useRef} from "react";
import {Outlet} from "react-router";
import {NavLink, useNavigate} from "react-router-dom";
import { Navigate } from 'react-router-dom';
//样式
import './Home.css'
//自定义组件
import {Button} from "../../components/ui/widget/Button";
import {CheckLogin, CheckLoginRef} from "../../components/functional/CheckLogin";
import {Loading} from "../../components/ui/widget/Loading";


//主页
export const Homepage: React.FC = () => {
    //路由
    const navigate = useNavigate();
    const checkLoginRef = useRef<CheckLoginRef>(null);
    return (<div className="home-container">
            <Navigate to="/home/main"/>
            <div className="home-box">
                {/* 导航栏 */}
                <header className="home-header">
                    <div className="container">
                        <nav className="nav">
                            <ul>
                                <li><NavLink to="main">首页</NavLink></li>
                                <li><NavLink to="appointment">预约</NavLink></li>
                                <li><NavLink to="community">社区</NavLink></li>
                                <li><NavLink to="mine">我的</NavLink></li>
                            </ul>
                        </nav>
                        <div className="exit-button">
                            <Button type="primary">退出</Button>
                        </div>
                    </div>
                </header>

                <CheckLogin
                    ref={checkLoginRef}
                    to={null}
                    request_api="/api/user/check_login"
                    loadingComponent={
                        <Loading
                            type="dots"
                            text='页面加载中...'
                            color="#2196f3"
                            size="large"
                            fullScreen
                        ></Loading>
                    }
                    errorComponent={
                        <div>
                            <div style={{display: 'flex'}}>
                                <h2 style={{color: 'red'}}>验证登录状态失败，请检查网络连接</h2>
                            </div>
                            <div style={{display: 'flex'}}>
                                <Button type="default" onClick={checkLoginRef.current?.handleRetry}>重新加载</Button>
                            </div>
                        </div>
                    }

                    notLoginComponent={
                        <div>
                            <div style={{display: 'flex'}}>
                                <h2>您还未登录，请登录</h2>
                            </div>
                            <div style={{display: 'flex'}}>
                                <Button type="default" onClick={checkLoginRef.current?.handleRetry}>重新加载</Button>
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