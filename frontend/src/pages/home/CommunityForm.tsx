//React框架
import React, {useEffect, useRef, useState} from "react";
//样式
import './Home.css'
import '../../css/LayoutFlex.css'
import {UserController} from "../../controller/UserController";
import {PostController, PostRequest} from "../../controller/PostController";
import {useNavigate} from "react-router-dom";
import {useOutletContext, useSearchParams} from "react-router";
import {ReturnObject} from "../../common/response/ReturnObject";
import {InputCallback, InputRef} from "../../common/view/input/Input";
import {TextareaCallback, TextareaRef} from "../../common/view/input/Textarea";
import {SwitchCallback, SwitchRef} from "../../common/view/input/Switch";
import {DialogRef} from "../../common/view/container/Dialog";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {Homepage} from "./HomepageForm";
import {Button} from "../../common/view/controller/Button";
import {Textarea} from "../../common/view/input/Textarea";
import {Switch} from "../../common/view/input/Switch";
import {Input} from "../../common/view/input/Input";
import {PostValidationRules} from "../../entity/Post";
import {Loading} from "../../common/view/display/Loading";
import {Dialog} from "../../common/view/container/Dialog";
//自定义组件



//主页
export const CommunityForm: React.FC = () => {
    //控制器
    const userController = new UserController();
    const postController = new PostController();
    //路由
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const context=useOutletContext<Homepage.OutletContext>();
    //状态
    const [mode, setMode] = useState<'browse' | 'post'>('browse');
    const postHandler=useRef<ResponseHandlerRef<PostRequest,any>>(null);
    const [postFormData, setPostFormData] = useState<PostRequest>({
        title: "",
        content: "",
        username: "",
        isAnonymous: true,
        isPublic: true
    });
    //引用
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
            postHandler.current?.request(postFormData);
        } else {
            alert('请检查表单错误!');
        }
    };


    useEffect(() => {
        const keyword = searchParams.get('mode');
        if (keyword === 'browse') {
            setMode(keyword);
        } else if (keyword === 'post') {
            setMode(keyword);
        } else {
            navigate("?mode=browse");
        }
    }, []);

    const postResultDialog=(
        <ResponseHandler<PostRequest,any>
            ref={postHandler}
            request={postController.post}
            loadingComponent={<Loading type="dots" text='发布倾述中...' color="#2196f3" size="large"
                                       fullScreen></Loading>}

            handlingReturnObjectComponent={<Loading type="dots" text='处理发布倾述结果中...' color="#2196f3" size="large"
                                                    fullScreen></Loading>}

            networkErrorComponent={
                <Dialog
                    ref={postResultDialogRef}
                    type="modal"
                    title="网络错误"
                    showCloseButton
                    closeOnBackdropClick
                    closeOnEscape
                    onClose={() => {
                        postResultDialogRef.current?.close();
                    }}
                >
                    <div className="layout-flex-column">
                        <p className="text-align-left">{postHandler.current?.networkError?.message}</p>
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
                    type="modal"
                    title={"发布倾述" + ReturnObject.Status.ChineseName.get(postHandler.current?.returnObject?.status)}
                    showCloseButton
                    closeOnBackdropClick
                    closeOnEscape
                    onClose={() => {
                        if (postHandler.current?.returnObject?.status===ReturnObject.Status.SUCCESS) {
                            window.location.href = "/home/community?mode=browse";
                        }
                        postResultDialogRef.current?.close();
                    }}
                >
                    <div className="layout-flex-column">
                        <p className="text-align-left">发布倾述{ReturnObject.Status.ChineseName.get(postHandler.current?.returnObject?.status)}</p>
                        <br/>
                        <div className="layout-flex-row justify-content-flex-end">
                            <span style={{flexGrow: 3.1}}></span>
                            <Button type={(postHandler.current?.returnObject?.status===ReturnObject.Status.SUCCESS) ? "primary" : "default"}
                                    style={{flexGrow: 1}} onClick={() => {
                                postResultDialogRef.current?.close();
                            }}>{(postHandler.current?.returnObject?.status===ReturnObject.Status.SUCCESS) ? "确定" : "返回"}</Button>
                        </div>
                    </div>
                </Dialog>
            }
        />
    );


    const browseForm = (<div className="home-community-box">

    </div>);

    const postForm = (<div className="home-community-box layout-flex-column">
        <form onSubmit={handlePostSubmit} style={{flexGrow: 1}}>
            <Input
                ref={postTitleInputRef}
                type="text"
                label="标题"
                placeholder="请输入标题"
                validationRules={PostValidationRules.title}
                onChange={InputCallback.handleDataChange("title", setPostFormData, null)}
                required
            />
            <Textarea
                ref={postContentInputRef}
                label="内容"
                placeholder="请输入倾述内容"
                validationRules={PostValidationRules.content}
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


    return (<div className="layout-flex-column">
        {postResultDialog}
            <div>
                <div className="home-community-header">
                    <h2 style={{flexGrow: 1}}>{mode === 'browse' && "社区浏览"}{mode === 'post' && "发布倾述"}</h2>
                    <span style={{flexGrow: 0.1}}></span>
                    <Button type="default" style={{flexGrow: 2}} onClick={() => {
                        if (mode === 'browse') {
                            navigate("?mode=post");
                        } else if (mode === 'post') {
                            navigate("?mode=browse");
                        }
                        window.location.reload();
                    }}>{mode === 'browse' && "发布倾述"}{mode === 'post' && "社区浏览"}</Button>
                    <span style={{flexGrow: 20}}></span>
                </div>
                {mode === 'browse' && browseForm}{mode === 'post' && postForm}
            </div>
    </div>)
}