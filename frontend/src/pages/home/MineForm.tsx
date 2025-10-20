//React框架
import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {Outlet} from "react-router";
//样式
import './Home.css'
import '../../css/LayoutFlex.css'
//子组件
import {AppointmentManage} from "./mine/AppointmentManage";
import {BasicInformationForm} from "./mine/BasicInformationForm";
import {CloseAccount} from "./mine/CloseAccount";
import {EvaluationRecordForm} from "./mine/EvaluationRecordForm";
import {SystemSetting} from "./mine/SystemSetting";
import {UpdatePassword} from "./mine/UpdatePassword";
import {UpdateUserForm} from "./mine/UpdateUserForm";
//子路由
export const MineForm_Children=[
    {path:"/home/mine/appointment_manage",element:<AppointmentManage/>},
    {path:"/home/mine/basic_information",element:<BasicInformationForm/>},
    {path:"/home/mine/close_account",element:<CloseAccount/>},
    {path:"/home/mine/evaluation_record",element:<EvaluationRecordForm/>},
    {path:"/home/mine/system_setting",element:<SystemSetting/>},
    {path:"/home/mine/update_password",element:<UpdatePassword/>},
    {path: "/home/mine/update_user",element: <UpdateUserForm/>}
];
//我的
export const MineForm: React.FC = () => {
    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-我的";
    });
    return (
        <div className="layout-flex-row">
            <div className="vertical-menu">
                    <NavLink to="basic_information">基本信息</NavLink>
                    <NavLink to="appointment_manage">预约管理</NavLink>
                    <NavLink to="evaluation_record">测评记录</NavLink>
                    <NavLink to="update_password">修改密码</NavLink>
                    <NavLink to="update_user">修改信息</NavLink>
                    <NavLink to="system_setting">系统设置</NavLink>
                    <NavLink to="close_account">注销账号</NavLink>
                </div>
                <div className="layout-flex-column">
                    <Outlet></Outlet>
                </div>
            </div>
            )
            }