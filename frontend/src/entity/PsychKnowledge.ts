import {ReviewStatus} from "./enums/ReviewStatus";
import {User} from "./User";
import {ValidationRule} from "../common/view/input/Textarea";

export interface PsychKnowledge {
    knowledgeId: number;
    title: string;
    content: string;
    teacherPublisherUsername: string;
    publishTime: Date;
    adminReviewerUsername: string;
    reviewTime: Date;
    reviewStatus: ReviewStatus;
}

export namespace PsychKnowledge {
    export namespace ValidationRules {
        export const teacherPublisherUsername=User.ValidationRules.username;
        export const title: ValidationRule[] = [
            {required: true, message: '标题不能为空'},
            {maxLength: 255, message: '标题长度长度不能超过255个字符'}
        ];

        export const content: ValidationRule[] = [
            {required: true, message: '内容不能为空'}
        ];
    }
}

