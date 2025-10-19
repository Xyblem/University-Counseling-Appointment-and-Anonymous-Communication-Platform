//React框架
import React, {use, useEffect, useState} from "react";
//样式表
import '../Home.css'
import '../../../css/LayoutFlex.css'
import {User} from "../../../entity/User";
import {UserController} from "../../../controller/UserController";
import {TextView} from "../../../components/ui/widget/TextView"
import {GenderNamesCN, ProvinceCN_NamesCN, UserPositionNamesCN, UserRoleNamesCN} from "../../../entity/enums/enums";

export const BasicInformationForm: React.FC = () => {
    //控制器
    const userController = new UserController();
    //状态
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [errorDetail, setErrorDetail] = useState<string | null>(null);
    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-我的基本信息";
        setError(null);
        setErrorDetail(null);
        userController.loggedInUser().then(result => {
                //这里可能因为未登录返回null,但不需要管
                setUser(result);
            }
        ).catch(err => {
            setError("出错了");
            setErrorDetail(err.message)
        });
    }, []);

    const showError = (<div>
        <h3>{error}</h3>
        <p className="home-error-detail">{errorDetail}</p>
    </div>);

    return (<div className="layout-flex-column">
        <h2>基本信息</h2>
        {error ? showError : (
            <div className="layout-flex-column" style={{marginLeft: "25px"}}>
                <TextView label="用户名：" text={user == null ? "null" : user.username} copyable/>
                <TextView label="昵称：" text={user == null ? "null" : "" + user.nickname} copyable/>
                <TextView label="用户描述：" text={user == null ? "null" : "" + user.description} copyable/>
                <TextView label="姓名：" text={user == null ? "null" : user.name} copyable/>
                <TextView label="性别：" text={user == null ? "null" : "" + GenderNamesCN.get(Number(user.gender))}
                          copyable/>
                <TextView label="学校所在省份："
                          text={user == null ? "null" : "" + ProvinceCN_NamesCN.get(Number(user.schoolProvince))}
                          copyable/>
                <TextView label="学校：" text={user == null ? "null" : user.school} copyable/>
                <TextView label="二级单位：" text={user == null ? "null" : user.secondaryUnit} copyable/>
                <TextView label="专业：" text={user == null ? "null" : "" + user.major} copyable/>
                <TextView label="用户类型：" text={user == null ? "null" : "" + UserRoleNamesCN.get(Number(user.role))}
                          copyable/>
                <TextView label="职务：" text={user == null ? "null" : "" + UserPositionNamesCN.get(user.position)}
                          copyable/>
                <TextView label="邮箱：" text={user == null ? "null" : user.email} copyable/>
                <TextView label="电话号码：" text={user == null ? "null" : user.phoneNumber} copyable/>
                <TextView label="QQ：" text={user == null ? "null" : "" + user.qq} copyable/>
                <TextView label="微信：" text={user == null ? "null" : "" + user.wechat} copyable/>
                <TextView label="注册时间：" text={user == null ? "null" : "" + user.registrationTime} copyable/>
            </div>
        )}

    </div>)
}