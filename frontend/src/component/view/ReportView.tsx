import {ReplyDTO} from "../../entity/ReplyDTO";
import React, {useRef, useState} from "react";
import {Button} from "../../common/view/controller/Button";
import {PostReport} from "../../entity/PostReport";
import {Dialog, DialogRef} from "../../common/view/container/Dialog";
import {PostController} from "../../controller/PostController";
import {ResponseState} from "../../common/response/ResponseState";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {Loading} from "../../common/view/display/Loading";
import {ReturnObject} from "../../common/response/ReturnObject";

export interface ReportViewProps {
    postReport:PostReport;
    onDeleteReport:(postReport:PostReport) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({postReport,onDeleteReport}) => {
    const postController = new PostController();
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
                    deleteReportHandlerRef.current?.request({reportId: postReport.reportId});
                }}>确定</Button>
            </div>
        </div>
    </Dialog>);


    const deleteReportResultDialog=(<ResponseHandler<{reportId:number},null>
        ref={deleteReportHandlerRef}
        request={postController.deleteReport}
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
                    onDeleteReport?.(postReport);
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
                <p>{postReport.reportReason}</p>
            </div>
            <div className="reply-meta">
                <div className="reply-author">
                    <div className="reply-avatar">{postReport.reporterUsername[0]}</div>
                    <span className="author-name">{postReport.reporterUsername}</span>
                </div>
                <div className="reply-time">
                    <span className="time-icon"><i className="far fa-clock"></i></span>
                    <span>{'' + postReport.reportTime}</span>
                        <div className="layout-flex-row">
                            <Button type="primary" summit block color={"#ff5959"} onClick={()=>{confirmDialogRef.current?.open()}}>删除举报</Button>
                        </div>
                </div>
            </div>
        </div>
    )
}