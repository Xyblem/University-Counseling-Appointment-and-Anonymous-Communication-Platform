
//心理题目选项
import {ReturnObject} from "../common/response/ReturnObject";
import api from "../utils/api/api_config";

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



export class PsychTestController{

    /**
     * 根据名称获取测试问卷
     * @param test 心理测试问卷类名
     */
    getTest=async (test:string): Promise<PsychTest|null> => {
        let result:PsychTest|null = null;
        await api.get<ReturnObject<PsychTest>>("api/psych_test/get",{params:{test:test}}).then(response => {
            //@ts-ignore
            if (response.code === ReturnCode.SUCCESS) {
                //@ts-ignore
                result = response.data;
                //@ts-ignore
            }else if(response.code===ReturnCode.UNAUTHORIZED){
                result=null;
            }else{
                result=null;
                //@ts-ignore
                throw Error(response.message)
            }
        })
        return result;
    }

    /**
     * 列出所有心理测试问卷类名
     */
    listAll=async (): Promise<PsychTestQueryListItem[]|null> => {
        let result:PsychTestQueryListItem[]|null = null;
        await api.get<ReturnObject<PsychTestQueryListItem[]>>("api/psych_test/list_all").then(response => {
            //@ts-ignore
            if (response.code === ReturnCode.SUCCESS) {
                //@ts-ignore
                result = response.data;
                //@ts-ignore
            }else{
                result=null;
                //@ts-ignore
                throw Error(response.message)
            }
        })
        return result;
    }


    /**
     * 回答测试题
     */
    answer=async (psychTestAnswer:PsychTestAnswer): Promise<PsychTestResult|null> => {
        let result:PsychTestResult|null=null;
        await api.post<ReturnObject<PsychTestResult>>("api/psych_test/answer",psychTestAnswer).then(response => {
            //@ts-ignore
            if (response.code === ReturnCode.SUCCESS) {
                //@ts-ignore
                result = response.data;
                //@ts-ignore
            }else{
                result=null;
                //@ts-ignore
                throw Error(response.message)
            }
        })
        return result;
    }
}