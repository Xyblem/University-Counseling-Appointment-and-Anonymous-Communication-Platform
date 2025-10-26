import React, {useRef, useState} from "react";
import {PostController, PostReportRequest, ReplyRequest} from "../../../controller/PostController";
import {ResponseState} from "../../../common/response/ResponseState";
import {ResponseHandler, ResponseHandlerRef} from "../../../common/response/ResponseHandler";
import {ReplyDTO} from "../../../entity/ReplyDTO";
import {PostDTO} from "../../../entity/PostDTO";
import {Loading} from "../../../common/view/display/Loading";
import {ReturnObject} from "../../../common/response/ReturnObject";
import {Textarea, TextareaCallback, TextareaRef} from "../../../common/view/input/Textarea";
import {Button} from "../../../common/view/controller/Button";
import {Reply} from "../../../entity/Reply";
import {Dialog, DialogRef} from "../../../common/view/container/Dialog";
import {ReportHandler} from "web-vitals";
import {ReplyView} from "../../../component/view/ReplyView";

export interface PostCardProps {
    username:string;
    mode:'browse'|'report';
    postDTO: PostDTO;
}


export const PostCard:React.FC<PostCardProps>=({username,postDTO,mode}) => {

    //控制器
    const postController = new PostController();
    const [repliesState, setRepliesState] = React.useState<ResponseState<ReplyDTO[]>>();
    const repliesHandlerRef = useRef<ResponseHandlerRef<{ postId: number }, ReplyDTO[]>>(null);

    const [replyState, setReplyState] = React.useState<ResponseState<any>>();
    const replyHandlerRef = useRef<ResponseHandlerRef<ReplyRequest, any>>(null);
    const replyContentTextareaRef = useRef<TextareaRef>(null);
    const replyResultDialogRef = useRef<DialogRef>(null);
    const [replyFormData, setReplyFormData] = React.useState<ReplyRequest>({
        content: "", postId: 0, username: username
    });
    const reportDialogRef = useRef<DialogRef>(null);
    const reportReasonTextareaRef = useRef<TextareaRef>(null);
    const [reportFormData, setReportFormData] = React.useState<PostReportRequest>({
        postId: postDTO.postId, reportReason: "", reporterUsername: username
    });
    const reportResultDialogRef = useRef<DialogRef>(null);
    const reportHandlerRef = useRef<ResponseHandlerRef<PostReportRequest, any>>(null);
    const [reportState, setReportState] = useState<ResponseState>();


    const replayCardList = repliesState?.returnObject?.data?.map((value: ReplyDTO) =>
        <ReplyView replyDTO={value}/>
    )

    const summitReplay = (event: { preventDefault: () => void; }) => {
        // 手动验证所有字段
        const isReplayContentValid = replyContentTextareaRef.current?.validate();
        replyFormData.postId = postDTO.postId;
        replyFormData.username = username;
        event.preventDefault();
        if (isReplayContentValid) {
            replyHandlerRef.current?.request(replyFormData);
        } else {
            alert('请检查表单错误!');
        }
    };

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

    const ReportResultDialog = (<ResponseHandler<PostReportRequest, any>
        ref={reportHandlerRef}
        request={postController.report}
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
                        onChange={TextareaCallback.handleDataChange<PostReportRequest>("reportReason", setReportFormData, null)}
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

    const ReplyResultDialog = (
        <ResponseHandler<ReplyRequest, any>
            ref={replyHandlerRef}
            request={postController.reply}
            setResponseState={setReplyState}
            idleComponent={<></>}
            loadingComponent={
                <Loading
                    type="dots"
                    text='回复中...'
                    color="#2196f3"
                    size="large"
                    fullScreen/>}
            handlingReturnObjectComponent={<Loading
                type="dots"
                text='处理回复结果中...'
                color="#2196f3"
                size="large"
                fullScreen/>}
            networkErrorComponent={
                <Dialog
                    autoOpen
                    ref={replyResultDialogRef}
                    type="modal"
                    title="网络错误"
                    showCloseButton
                    closeOnBackdropClick
                    closeOnEscape
                >
                    <div className="layout-flex-column">
                        <p className="text-align-left">{replyState?.networkError?.message}</p>
                        <br/>
                        <div className="layout-flex-row justify-content-flex-end">
                            <span style={{flexGrow: 3.1}}></span>
                            <Button type="default"
                                    style={{flexGrow: 1}} onClick={() => {
                                replyResultDialogRef.current?.close();
                            }}>返回</Button>
                        </div>
                    </div>

                </Dialog>}
            finishedComponent={
                <Dialog
                    ref={replyResultDialogRef}
                    autoOpen
                    type="modal"
                    title={"回复" + ReturnObject.Status.ChineseName.get(replyState?.returnObject?.status)}
                    showCloseButton
                    closeOnBackdropClick
                    closeOnEscape
                    onClose={() => {
                        if (replyState?.returnObject?.status === ReturnObject.Status.SUCCESS) {
                            repliesHandlerRef.current?.recover();
                            repliesHandlerRef.current?.request({postId: postDTO.postId});
                        }
                    }}
                >
                    <div className="layout-flex-column">
                        {replyState?.returnObject?.status === ReturnObject.Status.SUCCESS ? (
                            <p className="text-align-left">回复成功</p>
                        ) : (
                            <p className="text-align-left">{replyState?.returnObject?.message}
                            </p>
                        )}
                        <br/>
                        <div className="layout-flex-row justify-content-flex-end">
                            <span style={{flexGrow: 3.1}}></span>
                            <Button
                                type={(replyState?.returnObject?.status === ReturnObject.Status.SUCCESS) ? "primary" : "default"}
                                style={{flexGrow: 1}} onClick={() => {
                                replyResultDialogRef.current?.close();
                            }}>{(replyState?.returnObject?.status === ReturnObject.Status.SUCCESS) ? "确定" : "返回"}</Button>
                        </div>
                    </div>
                </Dialog>
            }
        />
    );

    return (
        <>
            {ReportResultDialog}
            {ReplyResultDialog}
            {ReportDialog}

            <div className="post-card">

                <h1 className="post-title">{postDTO.title}</h1>
                <div className="post-content">
                    <p className="text-align-left">{postDTO.content}</p>
                </div>
                <div className="post-meta">
                    <div className="author-info">
                        <div className="author-avatar">{postDTO.displayName[0]}</div>
                        <span className="author-name">{postDTO.displayName}</span>
                    </div>
                    <div className="publish-time">
                        <span className="time-icon">📅</span>
                        <span>{'' + postDTO.publishTime}</span>
                        <span> </span>
                        {mode === 'browse' && <Button type="default" onClick={() => {
                            reportDialogRef.current?.open()
                        }}>举报该贴</Button>}
                        {/*<span>{value.publishTime.getFullYear()+''}年{value.publishTime.getMonth()}月{value.publishTime.getDay()}日 {value.publishTime.getHours()}:{value.publishTime.getMinutes()}</span>*/}
                    </div>
                </div>
                <div className="replies-section">

                    <ResponseHandler<{ postId: number }, ReplyDTO[]>
                        ref={repliesHandlerRef}
                        request={postController.getAllReplies}
                        setResponseState={setRepliesState}
                        autoRequest={{postId: postDTO.postId}}
                        idleComponent={
                            <h2 className="section-title">
                                <i className="far fa-comments"></i> 未获取回复列表
                            </h2>
                        }
                        loadingComponent={
                            <h2 className="section-title">
                                <i className="far fa-comments"></i>
                                <Loading type="dots" text='加载回复列表中...' color="#2196f3" size="large"/>
                            </h2>
                        }
                        handlingReturnObjectComponent={
                            <h2 className="section-title">
                                <i className="far fa-comments"></i>
                                <Loading type="dots" text='处理回复列表中...' color="#2196f3" size="large"/>
                            </h2>
                        }
                        networkErrorComponent={
                            <div>
                                <h2 className="section-title">
                                    <i className="far fa-comments"></i> 网络错误
                                </h2>
                                <div className="reply-card">
                                    <div className="reply-content">详情：{repliesState?.networkError?.message}</div>
                                </div>
                            </div>
                        }
                        finishedComponent={(!(repliesState?.returnObject?.status === ReturnObject.Status.SUCCESS)) ? (
                            <div>
                                <h2 className="section-title">
                                    <i className="far fa-comments"></i> 获取回复列表{ReturnObject.Status.ChineseName.get(repliesState?.returnObject?.status)}
                                </h2>
                                <div className="reply-card">
                                    <div className="reply-content">详情：{repliesState?.returnObject?.message}</div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="section-title">
                                    <i className="far fa-comments"></i> 回复
                                    <span className="replies-count">{repliesState?.returnObject?.data?.length}</span>
                                </h2>
                                {replayCardList}
                                <div className="reply-form">
                                    <h2 className="form-title">
                                        <i className="far fa-edit"></i> {mode === 'report' ? "审核操作" : "发表回复"}
                                    </h2>
                                    {mode === 'browse' &&
                                        <form id="replyForm" onSubmit={summitReplay}>
                                            <div className="form-group">
                                                <Textarea
                                                    ref={replyContentTextareaRef}
                                                    label="回复内容"
                                                    placeholder="请输入您的回复内容..."
                                                    validationRules={Reply.ValidationRules.content}
                                                    onChange={TextareaCallback.handleDataChange<ReplyRequest>("content", setReplyFormData, null)}
                                                    required
                                                />
                                            </div>
                                            <Button type="default" summit block>提交回复</Button>
                                        </form>
                                    }
                                    {mode === 'report' &&
                                        <form>
                                            <div className="layout-flex-row">
                                                <Button type="primary" summit block>删除该贴</Button>
                                            </div>
                                        </form>
                                    }
                                </div>
                            </div>

                        )}
                    />
                </div>
            </div>
        </>)
}