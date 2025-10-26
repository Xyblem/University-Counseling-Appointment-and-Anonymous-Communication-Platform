import React, {useRef, useState} from "react";
import {useOutletContext} from "react-router";
import {Homepage} from "../HomepageForm";
import {UserRole} from "../../../entity/enums/UserRole";
import {PostController} from "../../../controller/PostController";
import {ResponseState} from "../../../common/response/ResponseState";
import {PostDTO} from "../../../entity/PostDTO";
import {ResponseHandler, ResponseHandlerRef} from "../../../common/response/ResponseHandler";
import {PostCard} from "./PostCard";
import {Loading} from "../../../common/view/display/Loading";

export const ReportForm:React.FC = () => {
    const context = useOutletContext<Homepage.OutletContext>();
    //控制器
    const postController = new PostController();
    const [publicPostState, setPublicPostState] = useState<ResponseState<PostDTO[]>>();
    const publicPostHandler = useRef<ResponseHandlerRef<null, PostDTO[]>>(null);


    const publicPostList = publicPostState?.returnObject?.data?.map((value: PostDTO) =>
        <PostCard mode="report" username={context.user == null ? "" : context.user.username} key={value.postId}
                  postDTO={value} onDeletePost={()=>{
            publicPostHandler.current?.recover();
            publicPostHandler.current?.request(null);
        }}/>
    );


    const mainForm = (
        <div className="home-community-box">
            <ResponseHandler<null, PostDTO[]>
                ref={publicPostHandler}
                request={postController.getAllReportedPost}
                setResponseState={setPublicPostState}
                autoRequest={null}
                idleComponent={
                    <p>未获取公开倾述列表</p>
                }
                loadingComponent={
                    <Loading type="dots" text='加载社区倾述中...' color="#2196f3" size="large"
                             fullScreen></Loading>
                }
                handlingReturnObjectComponent={<Loading type="dots" text='处理加载社区倾述结果中...' color="#2196f3"
                                                        size="large"
                                                        fullScreen></Loading>}
                networkErrorComponent={
                    <div>
                        <h2>网络错误</h2>
                        <p>详情：{publicPostState?.networkError?.message}</p>
                    </div>

                }
                finishedComponent={
                    <div className="post-container">{publicPostList}</div>
                }
            />
        </div>
    );


    return (
        <div>{mainForm}</div>
    );
}