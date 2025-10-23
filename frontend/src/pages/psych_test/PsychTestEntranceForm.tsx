import React, {useEffect, useRef, useState} from 'react';
import {PsychTestController, PsychTestQueryListItem} from "../../controller/PsychTestController";
import './PsychTest.css'
import {Button} from "../../components/ui/widget/Button";
import {CheckLogin, CheckLoginRef} from "../../components/functional/CheckLogin";
import {UserController} from "../../controller/UserController";
import {Divider} from "../../components/decoration/Divider";
import {
    CheckLoginErrorViewOld,
    CheckLoginLoading,
   CheckLoginNotLoginViewOld
} from "../../utils/views/CommonViews";

export const PsychTestEntranceForm: React.FC = () => {
    //控制器
    const userController = new UserController();
    const psychTestController:PsychTestController=new PsychTestController();
    //引用
    const checkLoginRef = useRef<CheckLoginRef>(null);
    //状态
    const [psychTestList,setPsychTestList] = useState<PsychTestQueryListItem[]|null>(null);
    const [error, setError] = useState<boolean>(false);
    const [messageDetail, setMessageDetail] = useState<string | null>(null);
    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-心理测评";
        setError(false);
        setMessageDetail(null);
        psychTestController.listAll().then(response=>{
            setPsychTestList(response);
        }).catch(err=>{
            setError(true);
            setMessageDetail(err.message);
        });
    }, []);


    const buttonList=psychTestList?.map((value:PsychTestQueryListItem)=>
    <div>
        <div className="psych-test-entry-box">
            <h2>{value.title}</h2>
            <p className="description">{value.description}</p>
            <p className="questionNumber">测试问题：{value.questionsNumber}道</p>
            <Button type="default" block onClick={()=>{window.location.href="psych_test?test="+value.className}}>开始测试</Button>
        </div>
    </div>
    )
    return (
        <div className="layout-flex-column">
            <h2>心理测评入口</h2>
            <Divider color="Black" spacing="0" />
            <CheckLogin
                ref={checkLoginRef}
                checkLogin={userController.checkLogin}
                loadingComponent={CheckLoginLoading}
                errorComponent={CheckLoginErrorViewOld(checkLoginRef)}
                notLoginComponent={CheckLoginNotLoginViewOld(checkLoginRef)}
            >
                {error ? <div>
                        <p className="psych-error-detail">{messageDetail}</p>
                    </div> :
                    <div className="layout-flex-column" style={{marginLeft: "25px"}}>
                        <div className="layout-flex-row">
                            <p>请选择心理测评问卷</p>
                            <br/>
                        </div>
                        <div className="layout-flex-row">
                            {buttonList}
                        </div>
                    </div>
                }
            </CheckLogin>
        </div>)
}