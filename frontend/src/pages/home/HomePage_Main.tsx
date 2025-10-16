//React框架
import React, {useEffect, useState} from "react";
//样式
import './Home.css'
import {Button} from "../../components/ui/widget/Button";
import {getLoggedInUser, User} from "../../entity/User";
//自定义组件


//主页
export const Homepage_Main: React.FC = () => {
    //变量
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份从0开始，需要加1
    const date = currentDate.getDate();
    //状态
    const [user,setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [errorDetail, setErrorDetail] = useState<string | null>(null);
    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-首页";
        try{
            setError(null);
            setErrorDetail(null);
            getLoggedInUser(setUser);
        }catch(err:any){
            setError("出错了");
            setErrorDetail(err.message)
        }
    }, []);


    return (<div className="home-main-container">
        <div className="hello-lable">
            {error?(
                <div>
                    <h2>{error}</h2>
                    <p style={{minHeight: '400px', fontSize: "16px", display: "flex", textAlign: "left"}}
                    >{errorDetail}</p>
                </div>

            ) : (
                <h2>你好{user == null ? null : user.name}同学，现在是{year}年{month}月{date}日</h2>
            )}
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