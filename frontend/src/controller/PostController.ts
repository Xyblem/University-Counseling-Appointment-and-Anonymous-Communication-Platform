import {ReturnObject} from "../common/response/ReturnObject";
import api from "../utils/api/api_config";
import {PostDTO} from "../entity/PostDTO";
import {ReplyDTO} from "../entity/ReplyDTO";
import {as} from "react-router/dist/production/routeModules-BmVo7q9e";

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


export class PostController {


    /**
     * 发帖
     * @param postRequest 发帖请求体
     */
    post =async(postRequest:PostRequest):Promise<ReturnObject> => {
        let result:ReturnObject={code:0,status:"",timestamp:0};
        await api.post<ReturnObject>("api/post/post",postRequest).then(response=>{
            //@ts-ignore
            result=response;
        });
        return result;
    }

    /**
     * 回帖
     * @param replyRequest 回帖请求体
     */
    reply=async(replyRequest:ReplyRequest):Promise<ReturnObject> => {
        let result:ReturnObject={code:0,status:"",timestamp:0};
        await api.post<ReturnObject>("api/post/reply",replyRequest).then(response=>{
            //@ts-ignore
            result=response;
        })
        return result;
    }

    /**
     * 获取所有公开发帖
     */
    getAllPublicPost=async():Promise<ReturnObject<PostDTO[]>> => {
    let result:ReturnObject={code:0,status:"",timestamp:0};
    await api.get<ReturnObject>("api/post/all_public_post").then(response=>{
        //@ts-ignore
        result=response;
    });
    return result;
    }

    /**
     * 获取某一帖子下的所有回复
     * @param postId
     */
    getAllReplies=async(postId:number):Promise<ReturnObject<ReplyDTO[]>> => {
        let result:ReturnObject<ReplyDTO[]>={code:0,status:"",timestamp:0};
        await api.get<ReturnObject<ReplyDTO[]>>("api/post/all_replies",{params:{postId:postId}}).then(response=>{
            //@ts-ignore
            result=response;
        });
        return result;
    }


}