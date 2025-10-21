import React, {useEffect, useRef, useState} from "react";
import {UserController} from "../../controller/UserController";
import {Divider} from "../../components/decoration/Divider";
import {Button} from "../../components/ui/widget/Button";
import {CheckLogin, CheckLoginRef} from "../../components/functional/CheckLogin";
import {CheckLoginErrorView, CheckLoginLoading, CheckLoginNotLoginView} from "../../utils/views/CommonViews";
import {useLocation, useNavigate} from "react-router-dom";
import {PsychOptions, PsychTest, PsychTestController, PsychTestResult} from "../../controller/PsychTestController";
import {CheckboxGroup, CheckboxOption} from "../../components/ui/widget/Checkbox";
import {RadioGroup} from "../../components/ui/widget/Radio";

export const PsychTestForm: React.FC = () => {
    //控制器
    const userController = new UserController();
    const psychTestController:PsychTestController=new PsychTestController();
    //状态
    const [psychTest,setPsychTest] = useState<PsychTest|null>(null);
    const [error, setError] = useState<boolean>(false);
    const [messageDetail, setMessageDetail] = useState<string | null>(null);
    const [done,setDone]=useState<boolean>(false);
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [answerList,setAnswerList]=useState<string[][]>();
    const [psychTestResult,setPsychTestResult]=useState<PsychTestResult | null>(null);

    //引用
    const checkLoginRef = useRef<CheckLoginRef>(null);
    //路由
    const navigate = useNavigate();
    const urlLocation = useLocation();
    const searchParams = new URLSearchParams(urlLocation.search);
    const paramTest = searchParams.get('test');

    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-心理测评";
        setError(false);
        setMessageDetail(null);
        psychTestController.getTest(paramTest==null?"null":paramTest).then(
            response=>{
                document.title = "高校心理咨询预约与匿名交流平台-心理测评-"+response?.title;
                setPsychTest(response);
                if(response!=null){
                    setAnswerList(new Array(response.questions.length).fill([]));
                }
            }
        ).catch(
            err=>{
                setError(true);
                setMessageDetail(err.message);
            }
        );
    }, []);


    const getOptions=psychTest?.questions?.at(questionIndex)?.options?.map(
        (value0: PsychOptions, index: number):CheckboxOption =>({label:value0.key+":"+value0.text,value:""+value0.key}));

    //处理输入变化
    const handleSelectionChange = (index:number) => (value: string | string[])=>{
        if(typeof value === "string"){
            answerList?.splice(index,1,[value]);
        }else{
            answerList?.splice(index,1,value);
        }
    }

    const summitAnswer=()=>{
        setError(false);
        setMessageDetail(null);
        setDone(false);
        psychTestController.answer({answer:answerList,test:paramTest==null?"null":paramTest}).then(response=>{
            setPsychTestResult(response);
        }).catch(err=>{
            setError(true);
            setMessageDetail(err.message);
        }).finally(()=>{
            setDone(true);
        });
    }


    const renderQuestion= (<div>
        <p className="psych-test-description">{psychTest?.description}</p>
        <div style={{display: "flex", justifyContent: "center"}}>
            <div className="psych-test-question-box">
                <div className="layout-flex-row">
                    <p className="psych-test-question-key">{psychTest?.questions.at(questionIndex)?.title}:</p>
                    <p>{psychTest?.questions.at(questionIndex)?.content}</p>
                </div>
                <br/>
                {psychTest?.questions.at(questionIndex)?.multiOptional ?
                    <CheckboxGroup options={getOptions ? getOptions : []}
                                   onChange={handleSelectionChange(questionIndex)} value={answerList?.at(questionIndex)}
                    ></CheckboxGroup> :
                    <RadioGroup options={getOptions ? getOptions : []} layout="vertical"
                                onChange={handleSelectionChange(questionIndex)}
                                value={answerList?.at(questionIndex)?.at(0)}
                    ></RadioGroup>
                }
                <span style={{flexGrow: 1}}></span>
                <div className="layout-flex-row">
                    <Button style={{flexGrow: 1}} type="default" disabled={questionIndex === 0}
                            onClick={() => {
                                if (questionIndex > 0) {
                                    setQuestionIndex(questionIndex - 1);
                                }
                            }}>上一题</Button>
                    <span style={{flexGrow: 1}}></span>
                    {questionIndex === ((psychTest == null ? 0 : psychTest?.questions.length) - 1) ?
                        <Button style={{flexGrow: 1}} type="primary" onClick={() => {
                            summitAnswer();
                        }}>提交</Button>
                        :
                        <Button style={{flexGrow: 1}} type="default" onClick={() => {
                            if (questionIndex < (psychTest == null ? 0 : psychTest?.questions.length) - 1) {
                                setQuestionIndex(questionIndex + 1);
                            }
                        }}>下一题</Button>
                    }
                </div>
            </div>
        </div>
    </div>);


    const renderResult=(
        <div>
            <h2>测评提交{error?"出错":(messageDetail==null?"成功":"失败")}</h2>
            {messageDetail!=null&&<div>
                <p>{messageDetail}</p>
            </div>}
            {psychTestResult==null?null:<p>{psychTestResult.message}</p>}
            <Button block type="default" onClick={()=>{
                window.location.href="/home/main";
            }}>返回主界面</Button>
        </div>
    );

    return (
        <div className="layout-flex-column">
            <h2>{psychTest == null ? "心理测评" : psychTest.title}</h2>
            <Divider color="Black" spacing="0"/>
            <CheckLogin
                ref={checkLoginRef}
                checkLogin={userController.checkLogin}
                loadingComponent={CheckLoginLoading}
                errorComponent={CheckLoginErrorView(checkLoginRef)}
                notLoginComponent={CheckLoginNotLoginView(checkLoginRef)}
            >
                {done?renderResult:renderQuestion}
            </CheckLogin>
        </div>)
}