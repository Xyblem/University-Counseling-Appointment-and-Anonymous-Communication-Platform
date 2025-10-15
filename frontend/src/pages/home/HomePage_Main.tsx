//React框架
import React from "react";
//样式
import './Home.css'
import {Button} from "../../components/ui/widget/Button";
//自定义组件


//主页
export const Homepage_Main: React.FC = () => {
    return (<div className="home-main-container">
        <div className="hello-lable">
            <h2>你好XX同学，现在是XXXX年XX月XX日</h2>
        </div>
        <div className="double-page">
            <div className="box-appointment-consulation">

                <div className="buttons-list">
                    <h2>预约咨询</h2>
                    <br/>
                    <Button type="primary">匿名倾述</Button>
                    <br/>
                    <Button type="primary">心理测试</Button>
                    <br/>
                    <Button type="primary">科普广场</Button>
                </div>
            </div>
            <div className="box-popular-science">
                <h2>科普内容推荐</h2>
            </div>
        </div>
    </div>)
}