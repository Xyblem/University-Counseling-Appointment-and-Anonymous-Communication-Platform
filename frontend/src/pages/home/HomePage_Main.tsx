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

//主页
export const Homepage_Main: React.FC = () => {
    //控制器
    const userController=new UserController();
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
            //这里可能因为未登录返回null,但不需要管
            userController.loggedInUser().then(result=>{
                    setUser(result);
                }
            );
        }catch(err:any){
            setError("出错了");
            setErrorDetail(err.message)
        }
    }, []);


    return (<div className="home-main-form">
        <div className="home-main-hello-label">
            {error?(
                <div>
                    <h2>{error}</h2>
                    <p className="home-error-detail">{errorDetail}</p>
                </div>
            ) : (
                <h2>你好{user == null ? null : user.name}同学，现在是{year}年{month}月{date}日</h2>
            )}
        </div>
        <div className="home-pair-page">
            <div className="box-appointment-consultation">
                <div className="layout-flex-column">
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