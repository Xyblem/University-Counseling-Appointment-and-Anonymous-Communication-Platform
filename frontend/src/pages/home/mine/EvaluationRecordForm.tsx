//React框架
import React, {useEffect, useState} from "react";
//样式表
import '../Home.css'
import '../../../css/LayoutFlex.css'
import {AppointmentStatus} from "../../../entity/enums/AppointmentStatus";
import {PsychTestQuestionView} from "../../psych_test/PsychTestQuestionView";
import {PsychAssessmentRecordDTO, PsychTestController} from "../../../controller/PsychTestController";
import {ResponseState} from "../../../common/response/ResponseState";
import {ResponseHandler} from "../../../common/response/ResponseHandler";
import {Loading} from "../../../common/view/display/Loading";
import {ReturnObject} from "../../../common/response/ReturnObject";
import {Table} from "../../../common/view/display/Table";


export const EvaluationRecordForm: React.FC = () => {
    //控制器
    const psychTestController=new PsychTestController()
    const [psychAssessmentRecordListState,setPsychAssessmentRecordListState] = useState<ResponseState<PsychAssessmentRecordDTO[]>>();

    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-我的测评记录";
    });

    const tableColumns=[{
        key: 'assessmentId',
        title: '测评记录ID',
        width: 80,
        sortable: true,
    },{
        key: 'assessmentName',
        title: '测评名',
        width: 80,
        sortable: true,
    },{
        key: 'testName',
        title: '用户',
        width: 80,
        sortable: true,
    },{
        key: 'assessmentReport',
        title: '报告',
        width: 700,
        sortable: true,
    },{
        key: 'assessmentTime',
        title: '测评时间',
        width: 80,
        sortable: true,
    }];


    return (<div className="layout-flex-column" style={{marginLeft: "25px"}}>
        <h2>测评记录</h2>
        <ResponseHandler<null, PsychAssessmentRecordDTO[]>

            request={psychTestController.listMine}
            autoRequest={null}
            setResponseState={setPsychAssessmentRecordListState}
            loadingComponent={<Loading type="dots"
                                       text='获取测评记录中...'
                                       color="#2196f3"
                                       size="large"
                                       fullScreen/>}
            handlingReturnObjectComponent={<Loading type="dots"
                                                    text='处理测评记录中...'
                                                    color="#2196f3"
                                                    size="large"
                                                    fullScreen/>}
            networkErrorComponent={
                <div className="layout-flex-column">
                    <h2>网络错误</h2>
                    <p>详情：{psychAssessmentRecordListState?.networkError?.message}</p>
                </div>
            }
            finishedComponent={(!(psychAssessmentRecordListState?.returnObject?.status===ReturnObject.Status.SUCCESS))?(
                <div className="layout-flex-column">
                    <h2>获取测评记录{ReturnObject.Status.ChineseName.get(psychAssessmentRecordListState?.returnObject?.status)}</h2>
                    <p>详情：{psychAssessmentRecordListState?.returnObject?.message}</p>
                </div>
            ):(
                <Table dataSource={psychAssessmentRecordListState?.returnObject?.data==null?[]:psychAssessmentRecordListState?.returnObject?.data} columns={tableColumns}/>
            )}

        />
    </div>)
}