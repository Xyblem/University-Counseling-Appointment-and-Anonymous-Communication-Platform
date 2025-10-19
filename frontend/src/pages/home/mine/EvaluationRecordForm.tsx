//React框架
import React, {useEffect} from "react";
//样式表
import '../Home.css'
import '../../../css/LayoutFlex.css'


export const EvaluationRecordForm: React.FC = () => {
    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-我的测评记录";
    });
    return (<div className="layout-flex-column">
        <h2>测评记录</h2>
        <p>这里显示测评结果记录....</p>
    </div>)
}