//React框架
import React, {useEffect, useRef, useState} from "react";
//样式
import './Home.css'
import '../../css/LayoutFlex.css'
//自定义组件
//实体
import {User} from "../../entity/User";
//控制器
import {UserController} from "../../controller/UserController";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {Button} from "../../common/view/controller/Button";
import {Loading} from "../../common/view/display/Loading";
import {useOutletContext} from "react-router";
import {Homepage} from "./HomepageForm";


//主页
export const MainForm: React.FC = () => {
    //控制器
    const userController=new UserController();
    //变量
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份从0开始，需要加1
    const date = currentDate.getDate();
    const context=useOutletContext<Homepage.OutletContext>();
    //状态
    const userHandler=useRef<ResponseHandlerRef<null,User>>(null);

    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-首页";
    }, []);


    return (<div className="layout-flex-column">
                <div>
                    <div className="home-main-hello-label">
                        <h2>你好{context.user?.name == null ? null : context.user?.name}同学，现在是{year}年{month}月{date}日</h2>
                    </div>
                    <div className="home-pair-page">
                        <div className="box-appointment-consultation">
                            <div className="layout-flex-column">
                                <h2>预约咨询</h2>
                                <br/>
                                <Button type="primary">匿名倾述</Button>
                                <br/>
                                <Button type="primary" onClick={() => {
                                    window.location.href = "/psych_test_entrance"
                                }}>心理测试</Button>
                                <br/>
                                <Button type="primary">科普广场</Button>
                            </div>
                        </div>
                        <div className="box-popular-science">
                            <h2>科普内容推荐</h2>
                        </div>
                    </div>
                </div>
    </div>)
}