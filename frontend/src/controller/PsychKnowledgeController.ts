import {Controller} from "./Controller";
import {PsychKnowledgeDTO} from "../entity/DTO/PsychKnowledgeDTO";



export interface PsychKnowledgeReportRequest {
    knowledgeId:number;
    reportReason:string;
    reporterUsername:string;
}

export interface PsychKnowledgePostRequest {
    title:string;
    content:string;
    teacherPublisherUsername:string;
}

export class PsychKnowledgeController extends Controller{
    //列出所有已通过审核的科普
    listPublic=this._get<null,PsychKnowledgeDTO[]>("/api/psych_knowledge/list_public");
    //举报心理知识科普
    report=this._post<PsychKnowledgeReportRequest,any>("api/psych_knowledge/report");
    //列出教师发布的心理知识科普
    teacherMine=this._get<{teacherUsername:string},PsychKnowledgeDTO[]>("api/psych_knowledge/teacher/mine");
    //教师提交科普
    teacherPost=this._post<PsychKnowledgePostRequest,any>("api/psych_knowledge/teacher/post");
    //教师撤回科普
    teacherInvoke=this._post<{knowledgeId:number},any>("api/psych_knowledge/teacher/invoke");
}