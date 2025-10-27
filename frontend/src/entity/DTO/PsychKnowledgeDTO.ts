import {ReviewStatus} from "../enums/ReviewStatus";

export interface PsychKnowledgeDTO {
    knowledgeId:number;
    title:string;
    content:string;
    teacherPublisherUsername: string;
    teacherPublisherDisplayName:string;
    publishTime:Date;
    adminReviewerUsername?:string|null;
    reviewTime?:Date|null;
    reviewStatus:ReviewStatus;
}