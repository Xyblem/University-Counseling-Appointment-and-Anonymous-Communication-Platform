import {ValidationRule} from "../common/view/input/Textarea";
import {User} from "./User";

export interface Reply {
    replyId:number;
    content:string;
    postId:number;
    username:string;
    replyTime:Date;
}


export namespace Reply {

    export namespace ValidationRules{

        export const content: ValidationRule[] = [
            {required: true, message: '内容不能为空'}
        ];

        export const username: ValidationRule[] = User.ValidationRules.username;
    }
}