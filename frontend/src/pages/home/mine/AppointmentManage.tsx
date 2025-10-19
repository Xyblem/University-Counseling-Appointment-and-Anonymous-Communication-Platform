//React框架
import React, {useEffect} from "react";
//样式表
import '../Home.css'
import '../../../css/LayoutFlex.css'


export const AppointmentManage: React.FC = () => {
    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-我的预约管理";
    });
    return (<div className="layout-flex-column">
        <h2>预约管理</h2>
        <p>这里显示预约情况....</p>
    </div>)
}