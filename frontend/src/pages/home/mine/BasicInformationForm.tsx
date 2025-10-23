//React框架
import React, {useEffect, useState} from "react";
//样式表
import '../Home.css'
import '../../../css/LayoutFlex.css'
import {Text} from "../../../common/view/display/Text";
import {useOutletContext} from "react-router";
import {Homepage} from "../HomepageForm";
import {Gender} from "../../../entity/enums/Gender";
import {ProvinceCN} from "../../../entity/enums/ProvinceCN";
import {UserRole} from "../../../entity/enums/UserRole";
import {UserPosition} from "../../../entity/enums/UserPosition";



export const BasicInformationForm: React.FC = () => {
    const context=useOutletContext<Homepage.OutletContext>();
    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-我的基本信息";
    }, []);
    return (<div className="layout-flex-column">
        <h2>基本信息</h2>
        {context.user?(
            <div className="layout-flex-column" style={{marginLeft: "25px"}}>
                <Text label="用户名：" text={''+context.user.username} copyable/>
                <Text label="昵称：" text={"" + context.user.nickname} copyable/>
                <Text label="用户描述：" text={"" + context.user.description} copyable/>
                <Text label="姓名：" text={context.user.name} copyable/>
                <Text label="性别：" text={"" + Gender.ChineseName.get(Number(context.user.gender))}
                      copyable/>
                <Text label="学校所在省份："
                      text={"" + ProvinceCN.ChineseName.get(Number(context.user.schoolProvince))}
                      copyable/>
                <Text label="学校：" text={context.user.school} copyable/>
                <Text label="二级单位：" text={context.user.secondaryUnit} copyable/>
                <Text label="专业：" text={""+context.user.major} copyable/>
                <Text label="用户类型：" text={"" + UserRole.ChineseName.get(Number(context.user.role))}
                      copyable/>
                <Text label="职务：" text={"" + UserPosition.ChineseName.get(context.user.position)}
                      copyable/>
                <Text label="邮箱：" text={context.user.email} copyable/>
                <Text label="电话号码：" text={context.user.phoneNumber} copyable/>
                <Text label="QQ：" text={"" + context.user.qq} copyable/>
                <Text label="微信：" text={"" + context.user.wechat} copyable/>
                <Text label="注册时间：" text={"" + context.user.registrationTime} copyable/>
            </div>
            ): (
            <div>
                <p>获取用户信息失败</p>
            </div>
        )}
    </div>)
}