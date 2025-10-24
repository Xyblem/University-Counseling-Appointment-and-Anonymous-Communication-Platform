//React框架
import React, {useEffect, useRef, useState} from "react";
import {useOutletContext} from "react-router";
import {Homepage} from "../HomepageForm";
import {PostController, PostRequest} from "../../../controller/PostController";
import {useNavigate} from "react-router-dom";
import {ResponseHandler, ResponseHandlerRef} from "../../../common/response/ResponseHandler";
import {InputCallback, InputRef} from "../../../common/view/input/Input";
import {TextareaCallback, TextareaRef} from "../../../common/view/input/Textarea";
import {SwitchCallback, SwitchRef} from "../../../common/view/input/Switch";
import {Dialog, DialogRef} from "../../../common/view/container/Dialog";
import {ResponseState} from "../../../common/response/ResponseState";
import {Loading} from "../../../common/view/display/Loading";
import {Button} from "../../../common/view/controller/Button";
import {ReturnObject} from "../../../common/response/ReturnObject";
import {Input} from "../../../common/view/input/Input";
import {Textarea} from "../../../common/view/input/Textarea";
import {Switch} from "../../../common/view/input/Switch";
import {Post} from "../../../entity/Post";


export const PostForm:React.FC = () => {
    const context=useOutletContext<Homepage.OutletContext>();
    //控制器
    const postController = new PostController();
    //路由
    const navigate = useNavigate();
    //状态
    const [postState,setPostState]=useState<ResponseState>()
    const [postFormData, setPostFormData] = useState<PostRequest>({
        title: "",
        content: "",
        username: "",
        isAnonymous: false,
        isPublic: false
    });
    //引用
    const postHandlerRef=useRef<ResponseHandlerRef<PostRequest,any>>(null);
    const postTitleInputRef = useRef<InputRef>(null);
    const postContentInputRef = useRef<TextareaRef>(null);
    const postIsAnonymousSwitchRef = useRef<SwitchRef>(null);
    const postIsPublicSwitchRef = useRef<SwitchRef>(null);
    const postResultDialogRef = useRef<DialogRef>(null);

    //处理发帖表单提交
    const handlePostSubmit = (event: { preventDefault: () => void; }) => {
        // 手动验证所有字段
        const isPostTitleValid = postTitleInputRef.current?.validate();
        const isPostContentValid = postContentInputRef.current?.validate();
        const isAnonymousValid = postIsAnonymousSwitchRef.current?.validate();
        const isPublicValid = postIsPublicSwitchRef.current?.validate();
        postFormData.username =''+context.user?.username;
        // 阻止默认提交
        event.preventDefault();
        if (isPostTitleValid && isPostContentValid && isAnonymousValid && isPublicValid) {
            //console.log("暂停测试：",postFormData);alert("暂停测试");
            postHandlerRef.current?.request(postFormData);
        } else {
            alert('请检查表单错误!');
        }
    };

    const postResultDialog=(
        <ResponseHandler<PostRequest,any>
            ref={postHandlerRef}
            request={postController.post}
            setResponseState={setPostState}

            loadingComponent={<Loading type="dots" text='发布倾述中...' color="#2196f3" size="large"
                                       fullScreen></Loading>}

            handlingReturnObjectComponent={<Loading type="dots" text='处理发布倾述结果中...' color="#2196f3" size="large"
                                                    fullScreen></Loading>}

            networkErrorComponent={
                <Dialog
                    autoOpen
                    ref={postResultDialogRef}
                    type="modal"
                    title="网络错误"
                    showCloseButton
                    closeOnBackdropClick
                    closeOnEscape
                >
                    <div className="layout-flex-column">
                        <p className="text-align-left">{postState?.networkError?.message}</p>
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
                    ref={postResultDialogRef}
                    autoOpen
                    type="modal"
                    title={"发布倾述" + ReturnObject.Status.ChineseName.get(postState?.returnObject?.status)}
                    showCloseButton
                    closeOnBackdropClick
                    closeOnEscape
                    onClose={() => {
                        if (postState?.returnObject?.status===ReturnObject.Status.SUCCESS) {
                            navigate("/home/community/browse");
                        }
                    }}
                >
                    <div className="layout-flex-column">
                        {postState?.returnObject?.status===ReturnObject.Status.SUCCESS?(
                            <p className="text-align-left">发布成功</p>
                        ):(
                            <p className="text-align-left">{postState?.returnObject?.message}
                            </p>
                        )}
                        <br/>
                        <div className="layout-flex-row justify-content-flex-end">
                            <span style={{flexGrow: 3.1}}></span>
                            <Button type={(postState?.returnObject?.status===ReturnObject.Status.SUCCESS) ? "primary" : "default"}
                                    style={{flexGrow: 1}} onClick={() => {
                                postResultDialogRef.current?.close();
                            }}>{(postState?.returnObject?.status===ReturnObject.Status.SUCCESS) ? "确定" : "返回"}</Button>
                        </div>
                    </div>
                </Dialog>
            }
        />
    );

    const mainForm = (<div className="home-community-box layout-flex-column">
        <form onSubmit={handlePostSubmit} style={{flexGrow: 1}}>
            <Input
                ref={postTitleInputRef}
                type="text"
                label="标题"
                placeholder="请输入标题"
                validationRules={Post.ValidationRules.title}
                onChange={InputCallback.handleDataChange("title", setPostFormData, null)}
                required
            />
            <Textarea
                ref={postContentInputRef}
                label="内容"
                placeholder="请输入倾述内容"
                validationRules={Post.ValidationRules.content}
                onChange={TextareaCallback.handleDataChange("content", setPostFormData, null)}
                required
            />
            <div style={{flexGrow: 1}}></div>
            <div className="layout-flex-row">
                <Switch
                    ref={postIsPublicSwitchRef}
                    style={{flexGrow: 1}}
                    checkedLabel="公开"
                    unCheckedLabel="私有"
                    size="large"
                    onChange={SwitchCallback.handleDataChange("isPublic", setPostFormData)}
                />
                <div style={{flexGrow: 0.1}}></div>
                <Switch
                    ref={postIsAnonymousSwitchRef}
                    style={{flexGrow: 1}}
                    checkedLabel="匿 名"
                    unCheckedLabel="不匿名"
                    size="large"
                    onChange={SwitchCallback.handleDataChange("isAnonymous", setPostFormData)}
                />
                <div style={{flexGrow: 1}}></div>
                <Button style={{flexGrow: 10}} type="primary" summit>发布</Button>
            </div>
        </form>
    </div>);

    return (<div>
        {postResultDialog}
        {mainForm}
    </div>);
}