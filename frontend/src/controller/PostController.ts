import {ReturnObject} from "../common/response/ReturnObject";
import api from "../utils/api/api_config";
import {PostDTO} from "../entity/PostDTO";
import {ReplyDTO} from "../entity/ReplyDTO";
import {as} from "react-router/dist/production/routeModules-BmVo7q9e";
import {Controller} from "./Controller";

export interface PostRequest {
    title: string;
    content: string;
    username: string;
    isAnonymous: boolean;
    isPublic: boolean;
}

export interface ReplyRequest {
    postId:number;
    content:string;
    username:string;
}

export interface PostReportRequest {
    postId:number;
    reportReason:string;
    reporterUsername:string;
}


export class PostController extends Controller{


    //发帖
    post =this._post<PostRequest,any>("api/post/post");
    //回帖
    reply=this._post<ReplyRequest,any>("api/post/reply");
    //获取所有公开发帖
    getAllPublicPost=this._get<null,PostDTO[]>("api/post/all_public_post");
    //获取被举报的发帖
    getAllReportedPost=this._get<null,PostDTO[]>("api/post/all_reported_post");
    //获取某一帖子下的所有回复
    getAllReplies=this._get<{postId:number},ReplyDTO[]>("api/post/all_replies");
    //举报帖子
    report=this._post<PostReportRequest,any>("api/post/report");

}