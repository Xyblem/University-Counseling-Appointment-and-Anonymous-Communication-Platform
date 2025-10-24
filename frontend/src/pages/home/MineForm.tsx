//React框架
import React, {useEffect} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Outlet, useOutletContext} from "react-router";
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
import {Homepage} from "./HomepageForm";
//子路由
export const MineForm_Children=[
    {path:"appointment_manage",element:<AppointmentManage/>},
    {path:"basic_information",element:<BasicInformationForm/>},
    {path:"close_account",element:<CloseAccount/>},
    {path:"evaluation_record",element:<EvaluationRecordForm/>},
    {path:"system_setting",element:<SystemSetting/>},
    {path:"update_password",element:<UpdatePassword/>},
    {path:"update_user",element: <UpdateUserForm/>}
];
//我的
export const MineForm: React.FC = () => {
    const urlLocation = useLocation();
    const context=useOutletContext<Homepage.OutletContext>();
    const navigate = useNavigate();
    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-我的";
        if(urlLocation.pathname==='/home/mine'||urlLocation.pathname==='/home/mine/'){
            navigate("/home/mine/basic_information");
        }
    });
    return (
        <div className="layout-flex-row">
            <div className="vertical-menu">
                    <NavLink to="basic_information" onClick={()=>{
                        navigate("basic_information");
                        window.location.reload();
                    }}>基本信息</NavLink>
                    <NavLink to="appointment_manage">预约管理</NavLink>
                    <NavLink to="evaluation_record">测评记录</NavLink>
                    <NavLink to="update_password">修改密码</NavLink>
                    <NavLink to="update_user" onClick={()=>{
                        navigate("update_user");
                        window.location.reload();
                    }}>修改信息</NavLink>
                    <NavLink to="system_setting">系统设置</NavLink>
                    <NavLink to="close_account">注销账号</NavLink>
                </div>
                <div className="layout-flex-column">
                    <Outlet context={context}></Outlet>
                </div>
            </div>
        )
    }