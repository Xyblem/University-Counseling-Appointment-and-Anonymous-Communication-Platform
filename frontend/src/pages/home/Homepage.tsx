//React框架
import React from "react";
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";
import { Navigate } from 'react-router-dom';
//样式
import './Home.css'
//自定义组件
import {Button} from "../../components/ui/widget/Button";



//主页
export const Homepage: React.FC = () => {

    return (<div className="home-container">
            <Navigate to="/home/main" />
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
                <Outlet></Outlet>
            </div>
        </div>
    )
}