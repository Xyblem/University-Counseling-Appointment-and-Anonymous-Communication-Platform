import {Controller} from "./Controller";
import {PsychKnowledgeDTO} from "../entity/DTO/PsychKnowledgeDTO";
import {PsychKnowledgeReport} from "../entity/PsychKnowledgeReport";



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

export interface PsychKnowledgePassRequest{
    knowledgeId:number;
    adminReviewerUsername:string;
}

export interface PsychKnowledgeBanRequest{
    knowledgeId:number;
    adminReviewerUsername:string;
}



export class PsychKnowledgeController extends Controller{
    //列出所有已通过审核的科普
    listPublic=this._get<null,PsychKnowledgeDTO[]>("/api/psych_knowledge/list_public");
    //推荐一个科普
    recommend=this._get<null,PsychKnowledgeDTO>("/api/psych_knowledge/recommend");
    //举报心理知识科普
    report=this._post<PsychKnowledgeReportRequest,any>("api/psych_knowledge/report");
    //列出教师发布的心理知识科普
    teacherMine=this._get<{teacherUsername:string},PsychKnowledgeDTO[]>("api/psych_knowledge/teacher/mine");
    //教师提交科普
    teacherPost=this._post<PsychKnowledgePostRequest,any>("api/psych_knowledge/teacher/post");
    //教师撤回科普
    teacherInvoke=this._post<{knowledgeId:number},any>("api/psych_knowledge/teacher/invoke");
    //列出管理员审核的心理知识科普
    adminReviewed=this._get<{adminReviewerUsername:string},any>("api/psych_knowledge/admin/reviewed");
    //管理员通过心理知识科普
    adminPass=this._post<PsychKnowledgePassRequest,any>("api/psych_knowledge/admin/pass");
    //管理员审核心理知识科普
    adminBan=this._post<PsychKnowledgeBanRequest,any>("api/psych_knowledge/admin/ban");
    //获取所有未处理的心理知识科普
    pending=this._get<null,PsychKnowledgeDTO[]>("/api/psych_knowledge/pending");
    //获取所有被举报的心理知识科普
    reported=this._get<null,PsychKnowledgeDTO[]>("/api/psych_knowledge/reported");
    //获取某科普的所有举报列表
    listReport=this._get<{knowledgeId:number},PsychKnowledgeReport[]>("api/psych_knowledge/list_report");
    //删除某条举报
    adminReportDelete=this._post<{reportId:number},any>("api/psych_knowledge/admin/report/delete")
}