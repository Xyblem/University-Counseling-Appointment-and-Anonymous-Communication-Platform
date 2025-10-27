import {PsychKnowledgeReport} from "../../entity/PsychKnowledgeReport";
import React, {useRef, useState} from "react";
import {Dialog, DialogRef} from "../../common/view/container/Dialog";
import {ResponseState} from "../../common/response/ResponseState";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {Button} from "../../common/view/controller/Button";
import {Loading} from "../../common/view/display/Loading";
import {ReturnObject} from "../../common/response/ReturnObject";
import {PsychKnowledgeController} from "../../controller/PsychKnowledgeController";


export interface PsychKnowledgeReportViewProps {
    psychKnowledgeReport:PsychKnowledgeReport;
    onDeleteReport:(psychKnowledgeReport:PsychKnowledgeReport) => void;
}

export const PsychKnowledgeReportView: React.FC<PsychKnowledgeReportViewProps> = ({psychKnowledgeReport,onDeleteReport}) => {
    const psychKnowledgeController = new PsychKnowledgeController();
    const confirmDialogRef = useRef<DialogRef>(null);
    const [deleteReportState,setDeleteReportState] = useState<ResponseState>();
    const deleteReportHandlerRef=useRef<ResponseHandlerRef<{reportId:number},null>>(null);
    const deleteReportResultDialogRef=useRef<DialogRef>(null);


    const confirmDialog = (<Dialog
        ref={confirmDialogRef}
        type="modal"
        title="删除举报"
        showCloseButton
        closeOnBackdropClick
        closeOnEscape
    >
        <div className="layout-flex-column">
            <p className="text-align-left">确定要删除该举报吗？</p>
            <br/>
            <div className="layout-flex-row justify-content-flex-end">
                <span style={{flexGrow: 2}}></span>
                <Button type="default" style={{flexGrow: 1}} onClick={() => {
                    confirmDialogRef.current?.close();
                }}>返回</Button>
                <span style={{flexGrow: 0.1}}></span>
                <Button type="primary" style={{flexGrow: 1}} onClick={() => {
                    confirmDialogRef.current?.close();
                    deleteReportHandlerRef.current?.request({reportId:psychKnowledgeReport.reportId});
                }}>确定</Button>
            </div>
        </div>
    </Dialog>);


    const deleteReportResultDialog=(<ResponseHandler<{reportId:number},null>
        ref={deleteReportHandlerRef}
        request={psychKnowledgeController.adminReportDelete}
        setResponseState={setDeleteReportState}
        idleComponent={<></>}
        loadingComponent={<Loading type="dots" text='删除中...' color="#2196f3" size="large" fullScreen></Loading>}
        handlingReturnObjectComponent={<Loading type="dots" text='处理删除结果中...' color="#2196f3" size="large" fullScreen></Loading>}
        networkErrorComponent={<Dialog
            autoOpen
            ref={deleteReportResultDialogRef}
            type="modal"
            title="网络错误"
            showCloseButton
            closeOnBackdropClick
            closeOnEscape
        >
            <div className="layout-flex-column">
                <p className="text-align-left">详情：{deleteReportState?.networkError?.message}</p>
                <br/>
                <div className="layout-flex-row justify-content-flex-end">
                    <span style={{flexGrow: 3.1}}></span>
                    <Button type="default"
                            style={{flexGrow: 1}} onClick={() => {
                        deleteReportResultDialogRef.current?.close();
                    }}>返回</Button>
                </div>
            </div>

        </Dialog>}
        finishedComponent={<Dialog
            autoOpen
            ref={deleteReportResultDialogRef}
            type="modal"
            title={"删除举报" + ReturnObject.Status.ChineseName.get(deleteReportState?.returnObject?.status)}
            showCloseButton
            closeOnBackdropClick
            closeOnEscape
            onClose={() => {
                if (deleteReportState?.returnObject?.status === ReturnObject.Status.SUCCESS) {
                    onDeleteReport?.(psychKnowledgeReport);
                }
            }}
        >
            <div className="layout-flex-column">
                <p className="text-align-left">{deleteReportState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "删除举报成功" : deleteReportState?.returnObject?.message}</p>
                <br/>
                <div className="layout-flex-row justify-content-flex-end">
                    <span style={{flexGrow: 3.1}}></span>
                    <Button type={deleteReportState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "primary" : "default"}
                            style={{flexGrow: 1}} onClick={() => {
                        deleteReportResultDialogRef.current?.close();
                    }}>{deleteReportState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "确定" : "返回"}</Button>
                </div>
            </div>

        </Dialog>}
    />);


    return (
        <div className="reply-card">
            {confirmDialog}
            {deleteReportResultDialog}
            <div className="reply-content">
                <p>{psychKnowledgeReport.reportReason}</p>
            </div>
            <div className="reply-meta">
                <div className="reply-author">
                    <div className="reply-avatar">{psychKnowledgeReport.reporterUsername[0]}</div>
                    <span className="author-name">{psychKnowledgeReport.reporterUsername}</span>
                </div>
                <div className="reply-time">
                    <span className="time-icon"><i className="far fa-clock"></i></span>
                    <span>{'' + psychKnowledgeReport.reportTime}</span>
                    <div className="layout-flex-row">
                        <Button type="primary" summit block color={"#ff5959"} onClick={()=>{confirmDialogRef.current?.open()}}>删除举报</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}