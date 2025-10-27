import React, {useRef, useState} from "react";
import {Divider} from "../../common/view/decoration/Divider";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {PsychKnowledgeController} from "../../controller/PsychKnowledgeController";
import {PsychKnowledgeDTO} from "../../entity/DTO/PsychKnowledgeDTO";
import {ResponseState} from "../../common/response/ResponseState";
import {Loading} from "../../common/view/display/Loading";
import {ReturnObject} from "../../common/response/ReturnObject";
import {PsychKnowledgeCard} from "../../component/view/PsychKnowledgeCard";
import {Button} from "../../common/view/controller/Button";
import {useNavigate} from "react-router-dom";
import {useOutletContext} from "react-router"
import {PsychKnowledgeRoot} from "./PsychKnowledgeRootPage";
import {UserRole} from "../../entity/enums/UserRole";


export const PsychKnowledgeBrowseForm:React.FC = () => {

    const context=useOutletContext<PsychKnowledgeRoot.OutletContext>();
    const navigate = useNavigate();
    const psychKnowledgeController=new PsychKnowledgeController();
    const publicPsychKnowledgeHandlerRef=useRef<ResponseHandlerRef<null, PsychKnowledgeDTO[]>>(null);
    const [publicPsychKnowledgeState,setPublicPsychKnowledgeState]=useState<ResponseState<PsychKnowledgeDTO[]>>();
    const PsychKnowledgeCardList=publicPsychKnowledgeState?.returnObject?.data?.map(value=><PsychKnowledgeCard
        username={context.user==null?"":context.user.username}
        mode="browse"
        data={value}
        role={context.user==null?UserRole.UNKNOWN:context.user.role}
    />);



    return (
        <div className="layout-flex-column">
            <div className="layout-flex-row">
                <span style={{flexGrow: 1}}></span>
                <h2>心理知识科普</h2>
                <span style={{flexGrow: 1}}></span>
                <Button type="default" onClick={() => {
                    navigate("/home/main");
                }}>返回</Button>
            </div>
            <Divider color="Black" spacing="0"/>
            <ResponseHandler<null, PsychKnowledgeDTO[]>
                ref={publicPsychKnowledgeHandlerRef}
                setResponseState={setPublicPsychKnowledgeState}
                request={psychKnowledgeController.listPublic}
                autoRequest={null}

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
                    <p>详情：{publicPsychKnowledgeState?.networkError?.message}</p>
                </div>
                }
                finishedComponent={(!(publicPsychKnowledgeState?.returnObject?.status===ReturnObject.Status.SUCCESS))?(<div>
                    <h2>获取心理科普{ReturnObject.Status.ChineseName.get(publicPsychKnowledgeState?.returnObject?.status)}</h2>
                    <p>详情：{publicPsychKnowledgeState?.returnObject?.message}</p>
                </div>):(
                    <div className="post-container">{PsychKnowledgeCardList}</div>
                    )}
            />
        </div>);
}