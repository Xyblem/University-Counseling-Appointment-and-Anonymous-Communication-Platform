
//心理题目选项
import {ReturnObject} from "../common/response/ReturnObject";
import api from "../utils/api/api_config";
import {Controller} from "./Controller";

export interface PsychOptions{
    key: string;
    text: string;
    score: number;
}

//心理问卷题目
export interface PsychQuestion{
    id: number;
    title: string;
    content: string;
    options: PsychOptions[];
    multiOptional: boolean;
}

//心理问卷
export interface PsychTest{
    id: number;
    title: string;
    description: string;
    questions: PsychQuestion[];
}

export interface PsychTestResult{
    message: string;
}



export interface PsychTestAnswer{
    test?: string;
    answer?: string[][];
}


export interface PsychTestQueryListItem {
    className:string;
    title:string;
    description:string;
    questionsNumber:number;
}

export interface PsychAssessmentRecordDTO {
    assessmentId: number;
    assessmentClass: string;
    assessmentName: string;
    testUsername: string;
    testName: string;
    assessmentReport: string;
    assessmentTime: Date;
}

export class PsychTestController extends Controller{

    //根据名称获取测试问卷
    getTest=this._get<{test:string},PsychTest>("api/psych_test/get");

    //列出所有心理测试问卷类名
    listAll=this._get<null,PsychTestQueryListItem[]>("api/psych_test/list_all");

    //回答测试题
    answer=this._post<PsychTestAnswer,PsychTestResult>("api/psych_test/answer");

    //列出我的测评记录
    listMine=this._get<null,PsychAssessmentRecordDTO[]>("api/psych_test/record/list_mine");
}