import {ValidationRule} from "../common/view/input/Textarea";
import {User} from "./User";


export interface Post {
    postId: number;
    title: string;
    content: string;
    username: string;
    publishTime:Date;
    isAnonymous: boolean;
    isPublic: boolean;
}


export namespace PostValidationRules{
    //发帖标题输入验证规则
    export const title: ValidationRule[] = [
        {required: true, message: '标题不能为空'},
        {maxLength: 255, message: '标题长度长度不能超过255个字符'}
    ];

    export const content: ValidationRule[] = [
        {required: true, message: '内容不能为空'}
    ];

    export const username: ValidationRule[] = User.ValidationRules.username;
    
}


