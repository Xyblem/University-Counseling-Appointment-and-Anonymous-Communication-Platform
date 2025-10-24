export interface PostDTO {
    postId:number;
    title:string;
    content:string;
    displayName:string;
    username:string|null;
    isAnonymous:boolean;
    isPublic:boolean;
    publishTime:Date;
}