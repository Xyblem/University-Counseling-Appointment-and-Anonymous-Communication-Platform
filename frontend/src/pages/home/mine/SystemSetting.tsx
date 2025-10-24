import React, {useEffect} from "react";
import {Button} from "../../../common/view/controller/Button";

export const SystemSetting: React.FC = () => {
    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-我的系统设置";
    });
    return (<div className="layout-flex-column" style={{marginLeft: "25px"}}>
        <h2>系统设置</h2>
        <p>这里显示系统设置....</p>
        <p>这里显示系统设置....</p>
        <p>这里显示系统设置....</p>
        <p>这里显示系统设置....</p>
        <p>这里显示系统设置....</p>
        <p>这里显示系统设置....</p>
        <p>这里显示系统设置....</p>
        <p>这里显示系统设置....</p>
        <p>这里显示系统设置....</p>
        <p>这里显示系统设置....</p>
    </div>)
}