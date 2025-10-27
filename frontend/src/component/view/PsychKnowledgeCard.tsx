import React, {useRef, useState} from 'react';
import {PsychKnowledgeDTO} from "../../entity/DTO/PsychKnowledgeDTO";
import {ReviewStatus} from "../../entity/enums/ReviewStatus";
import './PsychKnowledgeCard.css';
import {Button} from "../../common/view/controller/Button";
import {Dialog, DialogRef} from "../../common/view/container/Dialog";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {ResponseState} from "../../common/response/ResponseState";
import {Textarea, TextareaCallback, TextareaRef} from "../../common/view/input/Textarea";
import {
    PsychKnowledgeController,
    PsychKnowledgePostRequest,
    PsychKnowledgeReportRequest
} from "../../controller/PsychKnowledgeController";
import {Loading} from "../../common/view/display/Loading";
import {ReturnObject} from "../../common/response/ReturnObject";

interface PsychKnowledgeCardProps {
    username: string;
    mode:'browse'|'mine'|'audit'
    data: PsychKnowledgeDTO;
    onExpand?: (knowledgeId: number) => void;
    onEdit?: (knowledgeId: number) => void;
    onInvoke?: (knowledgeId: number) => void;
}

export const PsychKnowledgeCard: React.FC<PsychKnowledgeCardProps> = ({
    mode,username,onInvoke,
                                                                   data,
                                                                   onExpand,
                                                                   onEdit
                                                               }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const psychKnowledgeController=new PsychKnowledgeController();
    const reportDialogRef = useRef<DialogRef>(null);
    const reportReasonTextareaRef = useRef<TextareaRef>(null);
    const [reportFormData, setReportFormData] = React.useState<PsychKnowledgeReportRequest>({
        knowledgeId: data.knowledgeId, reportReason: "", reporterUsername: username
    });
    const reportResultDialogRef = useRef<DialogRef>(null);
    const reportHandlerRef = useRef<ResponseHandlerRef<PsychKnowledgeReportRequest, any>>(null);
    const [reportState, setReportState] = useState<ResponseState>();

    const handleReportSummit = (event: { preventDefault: () => void; }) => {
        // 手动验证所有字段
        const isReportReasonValid = reportReasonTextareaRef.current?.validate();
        // 阻止默认提交
        event.preventDefault();
        if (isReportReasonValid) {
            //console.log("暂停测试：",formData);alert("暂停测试");
            reportDialogRef.current?.close();
            reportHandlerRef.current?.request(reportFormData);
        } else {
            alert('请检查表单错误!');
        }
    };

    const ReportResultDialog = (<ResponseHandler<PsychKnowledgeReportRequest, any>
        ref={reportHandlerRef}
        request={psychKnowledgeController.report}
        setResponseState={setReportState}
        loadingComponent={<Loading
            type="dots"
            text='举报中...'
            color="#2196f3"
            size="large"
            fullScreen/>}
        handlingReturnObjectComponent={<Loading
            type="dots"
            text='处理举报结果中...'
            color="#2196f3"
            size="large"
            fullScreen/>}
        networkErrorComponent={
            <Dialog
                autoOpen
                ref={reportResultDialogRef}
                type="modal"
                title="网络错误"
                showCloseButton
                closeOnBackdropClick
                closeOnEscape
            >
                <div className="layout-flex-column">
                    <p className="text-align-left">{reportState?.networkError?.message}</p>
                    <br/>
                    <div className="layout-flex-row justify-content-flex-end">
                        <span style={{flexGrow: 3.1}}></span>
                        <Button type="default"
                                style={{flexGrow: 1}} onClick={() => {
                            reportResultDialogRef.current?.close();
                        }}>返回</Button>
                    </div>
                </div>

            </Dialog>}
        finishedComponent={
            <Dialog
                ref={reportResultDialogRef}
                autoOpen
                type="modal"
                title={"举报" + ReturnObject.Status.ChineseName.get(reportState?.returnObject?.status)}
                showCloseButton
                closeOnBackdropClick
                closeOnEscape
            >
                <div className="layout-flex-column">
                    {reportState?.returnObject?.status === ReturnObject.Status.SUCCESS ? (
                        <p className="text-align-left">举报成功</p>
                    ) : (
                        <p className="text-align-left">{reportState?.returnObject?.message}
                        </p>
                    )}
                    <br/>
                    <div className="layout-flex-row justify-content-flex-end">
                        <span style={{flexGrow: 3.1}}></span>
                        <Button
                            type={(reportState?.returnObject?.status === ReturnObject.Status.SUCCESS) ? "primary" : "default"}
                            style={{flexGrow: 1}} onClick={() => {
                            reportResultDialogRef.current?.close();
                        }}>{(reportState?.returnObject?.status === ReturnObject.Status.SUCCESS) ? "确定" : "返回"}</Button>
                    </div>
                </div>
            </Dialog>
        }
    />);


    const ReportDialog = (
        <Dialog
            ref={reportDialogRef}
            type="modal"
            title="举报"
            showCloseButton
            closeOnBackdropClick
            closeOnEscape
        >
            <div className="layout-flex-column">
                <form onSubmit={handleReportSummit}>
                    <Textarea
                        ref={reportReasonTextareaRef}
                        label="举报理由"
                        placeholder="请输入举报理由"
                        onChange={TextareaCallback.handleDataChange<PsychKnowledgeReportRequest>("reportReason", setReportFormData, null)}
                        required
                    />
                    <br/>
                    <div className="layout-flex-row justify-content-flex-end">
                        <span style={{flexGrow: 2}}></span>
                        <Button type="default" style={{flexGrow: 1}} onClick={() => {
                            reportDialogRef.current?.close();
                        }}>返回</Button>
                        <span style={{flexGrow: 0.1}}></span>
                        <Button type="primary" style={{flexGrow: 1}} summit>举报</Button>
                    </div>
                </form>
            </div>


        </Dialog>);

    // 格式化日期显示
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // 获取审核状态对应的样式和文本
    const getReviewStatusInfo = (status: ReviewStatus) => {
        const statusMap = {
            [ReviewStatus.PENDING]: { className: 'status-pending', text: '待处理' },
            [ReviewStatus.PASSED]: { className: 'status-passed', text: '通过' },
            [ReviewStatus.BANNED]: { className: 'status-banned', text: '驳回' },
            [ReviewStatus.REVOKED]: { className: 'status-revoked', text: '撤回' },
        };
        return statusMap[status] || { className: 'status-pending', text: '待处理' };
    };

    const statusInfo = getReviewStatusInfo(data.reviewStatus);
    const displayContent = isExpanded ? data.content :
        data.content.length > 150 ? `${data.content.substring(0, 150)}...` : data.content;

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded && onExpand) {
            onExpand(data.knowledgeId);
        }
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit(data.knowledgeId);
        }
    };

    const invokeResultDialogRef=useRef<DialogRef>(null);
    const invokeHandlerRef=useRef<ResponseHandlerRef<{knowledgeId:number},any>>(null);
    const [invokeState,setInvokeState]=useState<ResponseState>();
    const InvokeResultDialog=(<ResponseHandler<{knowledgeId:number},any>
        ref={invokeHandlerRef}
        request={psychKnowledgeController.teacherInvoke}
        setResponseState={setInvokeState}
        idleComponent={<></>}
        loadingComponent={<Loading type="dots" text='撤回中...' color="#2196f3" size="large" fullScreen/>}
        handlingReturnObjectComponent={<Loading type="dots" text='处理撤回结果中...' color="#2196f3" size="large" fullScreen></Loading>}
        networkErrorComponent={<Dialog
            autoOpen
            ref={invokeResultDialogRef}
            type="modal"
            title="网络错误"
            showCloseButton
            closeOnBackdropClick
            closeOnEscape
        >
            <div className="layout-flex-column">
                <p className="text-align-left">详情：{invokeState?.networkError?.message}</p>
                <br/>
                <div className="layout-flex-row justify-content-flex-end">
                    <span style={{flexGrow: 3.1}}></span>
                    <Button type="default"
                            style={{flexGrow: 1}} onClick={() => {
                        invokeResultDialogRef.current?.close();
                    }}>返回</Button>
                </div>
            </div>

        </Dialog>
        }
        finishedComponent={
            <Dialog
                autoOpen
                ref={invokeResultDialogRef}
                type="modal"
                title={"撤回" + ReturnObject.Status.ChineseName.get(invokeState?.returnObject?.status)}
                showCloseButton
                closeOnBackdropClick
                closeOnEscape
                onClose={() => {
                    if (invokeState?.returnObject?.status === ReturnObject.Status.SUCCESS) {
                        onInvoke?.(data.knowledgeId);
                    }
                }}
            >
                <div className="layout-flex-column">
                    <p className="text-align-left">{invokeState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "撤回成功" : invokeState?.returnObject?.message}</p>
                    <br/>
                    <div className="layout-flex-row justify-content-flex-end">
                        <span style={{flexGrow: 3.1}}></span>
                        <Button type={invokeState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "primary" : "default"}
                                style={{flexGrow: 1}} onClick={() => {
                            invokeResultDialogRef.current?.close();
                        }}>{invokeState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "确定" : "返回"}</Button>

                    </div>
                </div>

            </Dialog>
        }
    />);

    const invokeConfirmDialogRef=useRef<DialogRef>(null);
    const InvokeConfirmDialog = (<Dialog
        ref={invokeConfirmDialogRef}
        type="modal"
        title="撤回"
        showCloseButton
        closeOnBackdropClick
        closeOnEscape
    >
        <div className="layout-flex-column">
            <p className="text-align-left">确定要撤回吗？</p>
            <br/>
            <div className="layout-flex-row justify-content-flex-end">
                <span style={{flexGrow: 2}}></span>
                <Button type="default" style={{flexGrow: 1}} onClick={() => {
                    invokeConfirmDialogRef.current?.close();
                }}>返回</Button>
                <span style={{flexGrow: 0.1}}></span>
                <Button type="primary" style={{flexGrow: 1}} onClick={() => {
                    invokeConfirmDialogRef.current?.close();
                    invokeHandlerRef.current?.request({knowledgeId:data.knowledgeId});
                }}>确定</Button>
            </div>
        </div>
    </Dialog>);


    return (<>
            {ReportDialog}
            {ReportResultDialog}
            {InvokeConfirmDialog}
            {InvokeResultDialog}
            <div className="psych-knowledge-card">
                {/* 卡片头部 */}
                <div className="card-header">
                    <h3 className="card-title">{data.title}</h3>
                    {mode === "mine"&&data.reviewStatus!==ReviewStatus.REVOKED&& <Button type="default" onClick={()=>{invokeConfirmDialogRef.current?.open()}}>撤回</Button>}
                    {(mode === "mine" || mode === "audit") && <div className={`status-badge ${statusInfo.className}`}>
                        {statusInfo.text}
                    </div>}
                    {mode === "browse" && <Button type="default" onClick={()=>{reportDialogRef.current?.open();}}>举报</Button>}
                </div>

                {/* 卡片内容 */}
                <div className="card-content">
                    <p className="content-text">{displayContent}</p>
                    {data.content.length > 150 && (
                        <button className="expand-btn" onClick={handleExpand}>
                            {isExpanded ? '收起' : '展开全文'}
                        </button>
                    )}
                </div>

                {/* 卡片底部信息 */}
                <div className="card-footer">
                    <div className="publisher-info">
                        <span className="publisher-name">{data.teacherPublisherDisplayName}</span>
                        <span className="publish-time">{formatDate(data.publishTime)}</span>
                    </div>

                    <div className="card-actions">
                        {onEdit && (
                            <button className="edit-btn" onClick={handleEdit}>
                                编辑
                            </button>
                        )}
                    </div>
                </div>

                {/* 审核信息（如果已审核） */}
                {data.reviewStatus !== ReviewStatus.PENDING && data.adminReviewerUsername && (
                    <div className="review-info">
          <span className="reviewer">
            审核人: {data.adminReviewerUsername}
          </span>
                        {data.reviewTime && (
                            <span className="review-time">
              审核时间: {formatDate(data.reviewTime)}
            </span>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};