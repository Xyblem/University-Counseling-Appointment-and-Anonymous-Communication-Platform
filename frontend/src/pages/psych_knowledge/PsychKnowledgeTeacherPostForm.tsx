import React, {useRef, useState} from "react";
import {useOutletContext} from "react-router";
import {PsychKnowledgeRoot} from "./PsychKnowledgeRootPage";
import {Button} from "../../common/view/controller/Button";
import {Divider} from "../../common/view/decoration/Divider";
import {useNavigate} from "react-router-dom";
import {Input, InputCallback, InputRef} from "../../common/view/input/Input";
import {Post} from "../../entity/Post";
import {Textarea, TextareaCallback, TextareaRef} from "../../common/view/input/Textarea";
import {ResponseState} from "../../common/response/ResponseState";
import {PsychKnowledgeController, PsychKnowledgePostRequest} from "../../controller/PsychKnowledgeController";
import {PsychKnowledgeDTO} from "../../entity/DTO/PsychKnowledgeDTO";
import {ReviewStatus} from "../../entity/enums/ReviewStatus";
import {Dialog, DialogRef} from "../../common/view/container/Dialog";
import {PsychKnowledgeCard} from "../../component/view/PsychKnowledgeCard";
import {Loading} from "../../common/view/display/Loading";
import {ReturnObject} from "../../common/response/ReturnObject";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {UserRole} from "../../entity/enums/UserRole";

export const PsychKnowledgeTeacherPostForm:React.FC = () => {

    const psychKnowledgeController=new PsychKnowledgeController();
    const context = useOutletContext<PsychKnowledgeRoot.OutletContext>();
    const navigate = useNavigate();
    const postTitleInputRef = useRef<InputRef>(null);
    const postContentInputRef = useRef<TextareaRef>(null);
    const [postState, setPostState] = useState<ResponseState>()
    const psychKnowledgePostHandlerRef=useRef<ResponseHandlerRef<PsychKnowledgePostRequest,any>>(null);
    const [postFormData, setPostFormData] = useState<PsychKnowledgePostRequest>({
        content: "", teacherPublisherUsername: context.user == null ? "" : context.user.username, title: ""
    });
    const previewDialogRef = useRef<DialogRef>(null);
    const [previewData, setPreviewData] = useState<PsychKnowledgeDTO>({
        adminReviewerUsername: null,
        content: "",
        knowledgeId: 0,
        publishTime: new Date(),
        reviewStatus: ReviewStatus.PENDING,
        reviewTime: null,
        teacherPublisherDisplayName: context.user == null ? "" : (context.user.nickname == null ? context.user.username : context.user.nickname),
        teacherPublisherUsername: context.user == null ? "" : context.user.username,
        title: ""
    });
    const postConfirmDialogRef = useRef<DialogRef>(null);
    const postResultDialogRef = useRef<DialogRef>(null);

    const handlePostSummit = (event: { preventDefault: () => void; }) => {
        // 手动验证所有字段
        const isTitleValid = postTitleInputRef.current?.validate();
        const isContentValid = postContentInputRef.current?.validate();
        // 阻止默认提交
        event.preventDefault();
        if (isTitleValid && isContentValid) {
            //console.log("暂停测试：",formData);alert("暂停测试");
            postConfirmDialogRef.current?.open();
        } else {
            alert('请检查表单错误!');
        }
    };



    const PostResultDialog=(<ResponseHandler<PsychKnowledgePostRequest,any>
        ref={psychKnowledgePostHandlerRef}
        request={psychKnowledgeController.teacherPost}
        setResponseState={setPostState}
        idleComponent={<></>}
        loadingComponent={<Loading type="dots" text='提交中...' color="#2196f3" size="large" fullScreen></Loading>}
        handlingReturnObjectComponent={<Loading type="dots" text='处理提交结果中...' color="#2196f3" size="large" fullScreen></Loading>}
        networkErrorComponent={<Dialog
            autoOpen
            ref={postResultDialogRef}
            type="modal"
            title="网络错误"
            showCloseButton
            closeOnBackdropClick
            closeOnEscape
        >
            <div className="layout-flex-column">
                <p className="text-align-left">详情：{postState?.networkError?.message}</p>
                <br/>
                <div className="layout-flex-row justify-content-flex-end">
                    <span style={{flexGrow: 3.1}}></span>
                    <Button type="default"
                            style={{flexGrow: 1}} onClick={() => {
                        postResultDialogRef.current?.close();
                    }}>返回</Button>
                </div>
            </div>

        </Dialog>
        }
        finishedComponent={
            <Dialog
                autoOpen
                ref={postResultDialogRef}
                type="modal"
                title={"提交" + ReturnObject.Status.ChineseName.get(postState?.returnObject?.status)}
                showCloseButton
                closeOnBackdropClick
                closeOnEscape
                onClose={() => {
                    if (postState?.returnObject?.status === ReturnObject.Status.SUCCESS) {
                        navigate("/home/main");
                    }
                }}
            >
                <div className="layout-flex-column">
                    <p className="text-align-left">{postState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "提交成功，即将返回主页面" : postState?.returnObject?.message}</p>
                    <br/>
                    <div className="layout-flex-row justify-content-flex-end">
                        <span style={{flexGrow: 3.1}}></span>
                        <Button type={postState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "primary" : "default"}
                                style={{flexGrow: 1}} onClick={() => {
                            postResultDialogRef.current?.close();
                        }}>{postState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "确定" : "返回"}</Button>

                    </div>
                </div>

            </Dialog>
        }
    />);



    const PostConfirmDialog = (<Dialog
        ref={postConfirmDialogRef}
        type="modal"
        title="提交审核"
        showCloseButton
        closeOnBackdropClick
        closeOnEscape
    >
        <div className="layout-flex-column">
            <p className="text-align-left">确定要提交审核登录吗？</p>
            <br/>
            <div className="layout-flex-row justify-content-flex-end">
                <span style={{flexGrow: 2}}></span>
                <Button type="default" style={{flexGrow: 1}} onClick={() => {
                    postConfirmDialogRef.current?.close();
                }}>返回</Button>
                <span style={{flexGrow: 0.1}}></span>
                <Button type="primary" style={{flexGrow: 1}} onClick={() => {
                    postConfirmDialogRef.current?.close();
                    psychKnowledgePostHandlerRef.current?.request(postFormData);
                }}>确定</Button>
            </div>
        </div>
    </Dialog>);


    const PreviewDialog = (<Dialog
        ref={previewDialogRef}
        type="modal"
        title="科普预览"
        width={"1300px"}
        showCloseButton
        closeOnBackdropClick
        closeOnEscape
    >
        <div className="layout-flex-column">
            <PsychKnowledgeCard
                username={context.user == null ? "" : context.user.username}
                mode="mine"
                data={previewData}
                role={context.user==null?UserRole.UNKNOWN:context.user.role}
            />
            <br/>
            <div className="layout-flex-row justify-content-flex-end">
                <span style={{flexGrow: 3.1}}></span>
                <Button type="default"
                        style={{flexGrow: 1}} onClick={() => {
                    previewDialogRef.current?.close();
                }}>返回</Button>
            </div>
        </div>

    </Dialog>);

    return (
        <>
            {PreviewDialog}
            {PostConfirmDialog}
            {PostResultDialog}
            <div className="layout-flex-column">
                <div className="layout-flex-row">
                    <span style={{flexGrow: 1}}></span>
                    <h2>发表科普</h2>
                    <span style={{flexGrow: 1}}></span>
                    <Button type="default" onClick={() => {
                        navigate("/home/main");
                    }}>返回</Button>
                </div>
                <Divider color="Black" spacing="0"/>

                <form onSubmit={handlePostSummit}>
                    <Input
                        ref={postTitleInputRef}
                        type="text"
                        label="标题"
                        placeholder="请输入标题"
                        validationRules={Post.ValidationRules.title}
                        onChange={InputCallback.handleDataChange<PsychKnowledgePostRequest>("title", setPostFormData, null)}
                        required
                    />
                    <Textarea
                        ref={postContentInputRef}
                        label="内容"
                        placeholder="请输入科普内容"
                        validationRules={Post.ValidationRules.content}
                        onChange={TextareaCallback.handleDataChange<PsychKnowledgePostRequest>("content", setPostFormData, null)}
                        required
                    />
                    <div style={{flexGrow: 1}}></div>
                    <div className="layout-flex-row">
                        <Button style={{flexGrow: 100}} type="default" onClick={() => {
                            previewData.content = postFormData.content;
                            previewData.title = postFormData.title;
                            previewDialogRef.current?.open();
                        }}>预览</Button>
                        <span style={{flexGrow: 1}}></span>
                        <Button style={{flexGrow: 100}} type="primary" summit>提交审核</Button>
                    </div>
                </form>
            </div>
        </>)
}