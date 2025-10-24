import React, {useRef} from "react";
import {PostController, ReplyRequest} from "../../../controller/PostController";
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

export interface PostCardProps {
    username:string;
    postDTO: PostDTO;
}


export const PostCard:React.FC<PostCardProps>=({username,postDTO}) => {

    //控制器
    const postController = new PostController();
    const [repliesState, setRepliesState] = React.useState<ResponseState<ReplyDTO[]>>();
    const repliesHandlerRef = useRef<ResponseHandlerRef<number, ReplyDTO[]>>(null);

    const [replyState, setReplyState] = React.useState<ResponseState<any>>();
    const replyHandlerRef = useRef<ResponseHandlerRef<ReplyRequest, any>>(null);
    const replyContentTextareaRef = useRef<TextareaRef>(null);
    const replyResultDialogRef=useRef<DialogRef>(null);
    const [replyFormData, setReplyFormData] = React.useState<ReplyRequest>({
        content: "", postId: 0, username: username
    });


    const replayCardList = repliesState?.returnObject?.data?.map((value: ReplyDTO) =>
        <div className="reply-card">
            <div className="reply-content">
                <p>{value.content}</p>
            </div>
            <div className="reply-meta">
                <div className="reply-author">
                    <div className="reply-avatar">{value.displayName[0]}</div>
                    <span className="author-name">{value.displayName}</span>
                </div>
                <div className="reply-time">
                    <span className="time-icon"><i className="far fa-clock"></i></span>
                    <span>{'' + value.replyTime}</span>
                </div>
            </div>
        </div>
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
                        if(replyState?.returnObject?.status===ReturnObject.Status.SUCCESS) {
                            repliesHandlerRef.current?.recover();
                            repliesHandlerRef.current?.request(postDTO.postId);
                        }
                    }}
                >
                    <div className="layout-flex-column">
                        {replyState?.returnObject?.status===ReturnObject.Status.SUCCESS?(
                            <p className="text-align-left">回复成功</p>
                        ):(
                            <p className="text-align-left">{replyState?.returnObject?.message}
                            </p>
                        )}
                        <br/>
                        <div className="layout-flex-row justify-content-flex-end">
                            <span style={{flexGrow: 3.1}}></span>
                            <Button type={(replyState?.returnObject?.status===ReturnObject.Status.SUCCESS) ? "primary" : "default"}
                                    style={{flexGrow: 1}} onClick={() => {
                                replyResultDialogRef.current?.close();
                            }}>{(replyState?.returnObject?.status===ReturnObject.Status.SUCCESS) ? "确定" : "返回"}</Button>
                        </div>
                    </div>
                </Dialog>
            }
        />
    );

    return (
        <>
            {ReplyResultDialog}


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
                {/*<span>{value.publishTime.getFullYear()+''}年{value.publishTime.getMonth()}月{value.publishTime.getDay()}日 {value.publishTime.getHours()}:{value.publishTime.getMinutes()}</span>*/}
            </div>
        </div>
        <div className="replies-section">

            <ResponseHandler<number, ReplyDTO[]>
                ref={repliesHandlerRef}
                request={postController.getAllReplies}
                setResponseState={setRepliesState}
                autoRequest={postDTO.postId}
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
                                <i className="far fa-edit"></i> 发表回复
                            </h2>
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
                        </div>
                    </div>

                )}
            />
        </div>
    </div></>)
}