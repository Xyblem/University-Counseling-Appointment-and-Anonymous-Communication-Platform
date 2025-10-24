import React, {useEffect, useRef, useState} from "react";
import {Divider} from "../../common/view/decoration/Divider";
import {CheckLoginComponent} from "../../component/CheckLoginComponent";
import {
    PsychOptions,
    PsychTest,
    PsychTestAnswer,
    PsychTestController,
    PsychTestResult
} from "../../controller/PsychTestController";
import {useLocation, useNavigate} from "react-router-dom";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {Loading} from "../../common/view/display/Loading";
import {ResponseState} from "../../common/response/ResponseState";
import {ReturnObject} from "../../common/response/ReturnObject";
import {Button} from "../../common/view/controller/Button";
import {PsychTestQuestionView, PsychTestQuestionViewRef} from "./PsychTestQuestionView";


export const PsychTestForm: React.FC = () => {

    const navigate = useNavigate();
    const psychTestController=new PsychTestController();
    const [psychTestState,setPsychTestState]=useState<ResponseState<PsychTest>>();
    const psychQuestionRefList=useRef<PsychTestQuestionViewRef[]>([]);
    function getRef(dom:any) {
        psychQuestionRefList.current.push(dom)
    }
    const [done,setDone]=useState<boolean>(false);
    const [answerList,setAnswerList]=useState<string[][]>();
    const [psychTestAnswerState,setPsychTestAnswerState]=useState<ResponseState<PsychTestResult>>();
    const psychTestHandlerRef=useRef<ResponseHandlerRef<{test:string},PsychTest>>(null);
    const psychTestAnswerHandlerRef=useRef<ResponseHandlerRef<PsychTestAnswer,PsychTestResult>>(null);
    const urlLocation = useLocation();
    const searchParams = new URLSearchParams(urlLocation.search);
    const paramTest = searchParams.get('test');

    //处理表单提交
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        // 手动验证所有字段

        let isQuestionValid=true;
        for(let i=0;i<psychQuestionRefList.current?.length;++i){
            if(psychQuestionRefList.current?.at(i)!=null&&psychQuestionRefList.current?.at(i)?.validate()!==true){
                isQuestionValid=false;
            }
        }


        // 阻止默认提交
        event.preventDefault();
        if (isQuestionValid) {
            setDone(true);
        } else {
            alert('请检查表单错误!');
        }
    };
    const renderResult=(<ResponseHandler<PsychTestAnswer,PsychTestResult>
            ref={psychTestAnswerHandlerRef}
            request={psychTestController.answer}
            setResponseState={setPsychTestAnswerState}
            autoRequest={{answer:answerList,test:paramTest==null?"null":paramTest}}
            idleComponent={<div>
                <h2>未提交</h2>
            </div>
            }

            loadingComponent={<Loading type="dots"
                                       text='提交测评问卷中...'
                                       color="#2196f3"
                                       size="large"
                                       fullScreen/>}
            handlingReturnObjectComponent={<Loading type="dots"
                                                    text='处理提交测评问卷结果中...'
                                                    color="#2196f3"
                                                    size="large"
                                                    fullScreen/>}
            networkErrorComponent={<div>
                <h2>网络错误</h2>
                <p className=".auth-error-detail">详情：{psychTestAnswerState?.networkError?.message}</p>
            </div>}

            finishedComponent={<div>
                <h2>测评提交{ReturnObject.Status.ChineseName.get(psychTestAnswerState?.returnObject?.status)}</h2>
                {psychTestAnswerState?.returnObject?.status !== ReturnObject.Status.SUCCESS && <div>
                    <p>{psychTestAnswerState?.returnObject?.message}</p>
                </div>}
                {psychTestAnswerState?.returnObject?.data?.message == null ? null : <p>{psychTestAnswerState?.returnObject?.data?.message}</p>}
                <Button block type="default" onClick={() => {
                    navigate("/home/main");
                }}>返回主界面</Button>
            </div>}
        />
    );



    const renderQuestion=(
        <ResponseHandler<{test:string},PsychTest>
            ref={psychTestHandlerRef}
            request={psychTestController.getTest}
            setResponseState={setPsychTestState}
            autoRequest={{test:paramTest==null?"null":paramTest}}
            loadingComponent={<Loading type="dots"
                                       text='获取心理测评问卷中...'
                                       color="#2196f3"
                                       size="large"
                                       fullScreen/>}
            handlingReturnObjectComponent={<Loading type="dots"
                                                    text='处理获取心理测评问卷结果中...'
                                                    color="#2196f3"
                                                    size="large"
                                                    fullScreen/>}

            onHandlingReturnObject={(requestBody,returnObject)=>{
                setAnswerList(new Array(returnObject.data?.questions.length).fill([]));
            }}


            networkErrorComponent={<div>
                <h2>网络错误</h2>
                <p className=".auth-error-detail">详情：{psychTestState?.networkError?.message}</p>
            </div>}
            finishedComponent={(!(psychTestState?.returnObject?.status===ReturnObject.Status.SUCCESS))?(
                <div>
                    <h2>获取问卷{ReturnObject.Status.ChineseName.get(psychTestState?.returnObject?.status)}</h2>
                    <p className=".auth-error-detail">详情：{psychTestState?.returnObject?.message}</p>
                </div>
            ): (
                <div>
                    <p className="psych-test-description">{psychTestState?.returnObject?.data?.description}</p>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div className="psych-test-question-box">
                            <form onSubmit={handleSubmit}>
                                {psychTestState?.returnObject?.data?.questions.map((q,i)=><PsychTestQuestionView
                                    ref={getRef}
                                    style={{marginBottom:"50px"}}
                                    question={q}
                                    onChange={(a)=>{
                                        answerList?.splice(i,1,a);
                                    }}
                                />)}
                                <Button type="primary" block summit>提交测评</Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        />
    );



    return (
        <div className="layout-flex-column">
            <h2>{psychTestState?.returnObject?.data == null ? "心理测评" : psychTestState?.returnObject?.data.title}</h2>
            <Divider color="Black" spacing="0"/>
            <CheckLoginComponent>
                {!done&&renderQuestion}
                {done&&renderResult}
            </CheckLoginComponent>
        </div>)

}