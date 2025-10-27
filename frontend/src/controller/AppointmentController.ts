import {ReturnObject} from "../common/response/ReturnObject";
import api from "../utils/api/api_config";
import {AppointmentDTO} from "../entity/AppointmentDTO";
import {AppointmentStatus} from "../entity/enums/AppointmentStatus";
import {Controller} from "./Controller";


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

export class AppointmentController extends Controller{

    //添加预约
    addAppointment=this._post<AppointmentRequest,any>("api/appointment/add");

    //查询预约
    findById=this._get<FindAppointmentRequest,AppointmentDTO[]>("api/appointment/find_by");

    //获取教师未处理的预约
    findTeacherPending=this._get<{teacherUsername:string},AppointmentDTO[]>("api/appointment/teacher/pending")

    //获取教师未处理的预约
    findTeacherNonPending=this._get<{teacherUsername:string},AppointmentDTO[]>("api/appointment/teacher/non-pending")

    //处理预约
    handle=this._post<AppointmentHandingRequest,any>("api/appointment/handle");

    //列出所有预约
    listAll=this._get<any,AppointmentDTO[]>("api/appointment/list_all");


}