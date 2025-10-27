import React, {useEffect, useRef, useState} from 'react';
import {PsychTestController, PsychTestQueryListItem} from "../../controller/PsychTestController";
import './PsychTest.css'
import {UserController} from "../../controller/UserController";
import {Divider} from "../../common/view/decoration/Divider";
import {CheckLoginComponent} from "../../component/CheckLoginComponent";
import {Button} from "../../common/view/controller/Button";
import {ResponseHandler} from "../../common/response/ResponseHandler";
import {ResponseState} from "../../common/response/ResponseState";
import {Loading} from "../../common/view/display/Loading";
import {useNavigate} from "react-router-dom";

export const PsychTestEntranceForm: React.FC = () => {
     //控制器
     const psychTestController: PsychTestController = new PsychTestController();
    const navigate = useNavigate();
     //状态

     const [psychTestListState, setPsychTestListState] = useState<ResponseState<PsychTestQueryListItem[]>>();
     //钩子
     useEffect(() => {
          document.title = "高校心理咨询预约与匿名交流平台-心理测评";
     }, []);


     const buttonList = psychTestListState?.returnObject?.data?.map((value: PsychTestQueryListItem) =>
         <div>
              <div className="psych-test-entry-box">
                   <h2>{value.title}</h2>
                   <p className="description">{value.description}</p>
                   <p className="questionNumber">测试问题：{value.questionsNumber}道</p>
                   <Button type="default" block onClick={() => {
                        navigate("/psych_test?test=" + value.className);
                   }}>开始测试</Button>
              </div>
         </div>
     )
     return (
         <div className="layout-flex-column">
              <h2>心理测评入口</h2>
              <Divider color="Black" spacing="0"/>
              <CheckLoginComponent>
                   <div className="layout-flex-column" style={{marginLeft: "25px"}}>
                        <div className="layout-flex-row">
                             <p>请选择心理测评问卷</p>
                             <br/>
                        </div>
                        <div className="layout-flex-row flex-warp-warp">
                             <ResponseHandler<any,PsychTestQueryListItem[]>
                                 request={psychTestController.listAll}
                                 autoRequest={null}
                                 setResponseState={setPsychTestListState}
                                 idleComponent={<div>
                                      <h2>未获取心理测评列表</h2>
                                 </div>}
                                 loadingComponent={<Loading type="dots"
                                                            text='获取心理测评列表中...'
                                                            color="#2196f3"
                                                            size="large"
                                                            fullScreen/>}
                                 handlingReturnObjectComponent={<Loading type="dots"
                                                                         text='处理获取心理测评列表结果中...'
                                                                         color="#2196f3"
                                                                         size="large"
                                                                         fullScreen/>}
                                 networkErrorComponent={
                                      <div>
                                      <h2>网络错误</h2>
                                      <p className=".auth-error-detail">详情：{psychTestListState?.networkError?.message}</p>
                                 </div>}
                                 finishedComponent={buttonList}
                             />
                        </div>
                   </div>
              </CheckLoginComponent>
         </div>)
}