import {ReturnObject} from "../utils/api/ReturnObject";
import api from "../utils/api/api_config";


export interface PostRequest {
    title: string;
    content: string;
    username: string;
    isAnonymous: boolean;
    isPublic: boolean;
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


}