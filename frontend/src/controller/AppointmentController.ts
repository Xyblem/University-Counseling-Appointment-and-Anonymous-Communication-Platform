import {ReturnObject} from "../common/response/ReturnObject";
import api from "../utils/api/api_config";
import {AppointmentDTO} from "../entity/AppointmentDTO";
import {AppointmentStatus} from "../entity/enums/AppointmentStatus";


export interface AppointmentRequest {
    studentUsername:string;
    teacherUsername:string;
    description:string;
    startTime:string;
    endTime:string;
}

export interface FindAppointmentRequest {
    by:'studentUsername'|'teacherUsername';
    username:string;
}

export interface AppointmentHandingRequest {
    appointmentId:number;
    status:AppointmentStatus;
}

export class AppointmentController {

    /**
     * 添加预约
     * @param appointmentRequest 预约请求体
     */
    addAppointment=async (appointmentRequest:AppointmentRequest):Promise<ReturnObject> => {
        let result:ReturnObject={code:0,status:"",timestamp:0};
        await api.post<ReturnObject>("api/appointment/add",appointmentRequest).then(response => {
            //@ts-ignore
            result=response;
        })
        return result;
    }

    /**
     * 查询预约
     * @param findAppointmentRequest
     */
    findById=async (findAppointmentRequest:FindAppointmentRequest):Promise<ReturnObject<AppointmentDTO[]>> => {
        let result:ReturnObject={code:0,status:"",timestamp:0};
        await api.get("api/appointment/find_by",{params:findAppointmentRequest}).then(response => {
            //@ts-ignore
            result=response;
        })
        return result;
    }

    /**
     * 获取教师未处理的预约
     * @param teacherUsername 教师用户名
     */
    findTeacherPending=async(teacherUsername:string):Promise<ReturnObject<AppointmentDTO[]>> => {
        let result:ReturnObject={code:0,status:"",timestamp:0};
        await api.get("api/appointment/teacher/pending",{params:{teacherUsername:teacherUsername}}).then(response => {
            //@ts-ignore
            result=response;
        })
        return result;
    }

    /**
     * 获取教师未处理的预约
     * @param teacherUsername 教师用户名
     */
    findTeacherNonPending=async(teacherUsername:string):Promise<ReturnObject<AppointmentDTO[]>> => {
        let result:ReturnObject={code:0,status:"",timestamp:0};
        await api.get("api/appointment/teacher/non-pending",{params:{teacherUsername:teacherUsername}}).then(response => {
            //@ts-ignore
            result=response;
        })
        return result;
    }


    /**
     * 处理预约
     * @param appointmentHandingRequest 处理请求体
     */
    handle=async (appointmentHandingRequest:AppointmentHandingRequest):Promise<ReturnObject> => {
        let result:ReturnObject={code:0,status:"",timestamp:0};
        await api.post("api/appointment/handle",appointmentHandingRequest).then(response => {
            //@ts-ignore
            result=response;
        })
        return result;
    }





}