import React, {useRef, useState} from "react";
import {useOutletContext} from "react-router";
import {PsychKnowledgeRoot} from "../PsychKnowledgeRootPage";
import {useNavigate} from "react-router-dom";
import {PsychKnowledgeController} from "../../../controller/PsychKnowledgeController";
import {ResponseHandler, ResponseHandlerRef} from "../../../common/response/ResponseHandler";
import {PsychKnowledgeDTO} from "../../../entity/DTO/PsychKnowledgeDTO";
import {ResponseState} from "../../../common/response/ResponseState";
import {PsychKnowledgeCard} from "../../../component/view/PsychKnowledgeCard";
import {Button} from "../../../common/view/controller/Button";
import {Divider} from "../../../common/view/decoration/Divider";
import {Loading} from "../../../common/view/display/Loading";
import {ReturnObject} from "../../../common/response/ReturnObject";
import {UserRole} from "../../../entity/enums/UserRole";

export const MyPsychKnowledgeAdminForm:React.FC = () => {
    const context=useOutletContext<PsychKnowledgeRoot.OutletContext>();
    const navigate = useNavigate();
    const psychKnowledgeController=new PsychKnowledgeController();
    const MyPsychKnowledgeHandlerRef=useRef<ResponseHandlerRef<{adminReviewerUsername:string}, PsychKnowledgeDTO[]>>(null);
    const [myPsychKnowledgeState,setMyPsychKnowledgeState]=useState<ResponseState<PsychKnowledgeDTO[]>>();
    const PsychKnowledgeCardList=myPsychKnowledgeState?.returnObject?.data?.map(value=><PsychKnowledgeCard
        username={context.user==null?"":context.user.username}
        mode="mine"
        data={value}
        role={context.user==null?UserRole.UNKNOWN:context.user.role}
    />);

    return (<div className="layout-flex-column">
        <div className="layout-flex-row">
            <span style={{flexGrow: 1}}></span>
            <h2>我的审核科普</h2>
            <span style={{flexGrow: 1}}></span>
            <Button type="default" onClick={() => {
                navigate("/home/main");
            }}>返回</Button>
        </div>
        <Divider color="Black" spacing="0"/>
        <ResponseHandler<{adminReviewerUsername:string}, PsychKnowledgeDTO[]>
            ref={MyPsychKnowledgeHandlerRef}
            setResponseState={setMyPsychKnowledgeState}
            request={psychKnowledgeController.adminReviewed}
            autoRequest={{adminReviewerUsername:context.user==null?"":context.user.username}}

            loadingComponent={<Loading type="dots"
                                       text='获取心理知识科普中...'
                                       color="#2196f3"
                                       size="large"
                                       fullScreen/>}
            handlingReturnObjectComponent={<Loading type="dots"
                                                    text='处理获取心理知识科普结果中...'
                                                    color="#2196f3"
                                                    size="large"
                                                    fullScreen/>}
            networkErrorComponent={
                <div>
                    <h2>网络错误</h2>
                    <p>详情：{myPsychKnowledgeState?.networkError?.message}</p>
                </div>
            }
            finishedComponent={(!(myPsychKnowledgeState?.returnObject?.status === ReturnObject.Status.SUCCESS)) ? (
                <div>
                    <h2>获取心理科普{ReturnObject.Status.ChineseName.get(myPsychKnowledgeState?.returnObject?.status)}</h2>
                    <p>详情：{myPsychKnowledgeState?.returnObject?.message}</p>
                </div>) : (myPsychKnowledgeState?.returnObject?.data!=null&&myPsychKnowledgeState?.returnObject?.data.length>0?
                    <div className="post-container">{PsychKnowledgeCardList}</div>:<p>你还审核任何科普</p>
            )}
        />
    </div>)
}