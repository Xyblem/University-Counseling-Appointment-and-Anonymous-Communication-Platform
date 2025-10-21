//React框架
import React, {useEffect, useState} from "react";
//样式
import './Home.css'
import '../../css/LayoutFlex.css'
//自定义组件
import {Button} from "../../components/ui/widget/Button";
//实体
import {User} from "../../entity/User";
//控制器
import {UserController} from "../../controller/UserController";
import {Divider} from "../../components/decoration/Divider";


//主页
export const AppointmentForm: React.FC = () => {
    return (<div className="layout-flex-column">
        <div className="home-main-hello-label">
            <h2>预约</h2>
        </div>


    </div>);
}