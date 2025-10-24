import {AppointmentStatus} from "./enums/AppointmentStatus";

export interface AppointmentDTO {
    appointmentId:number;
    studentUsername:string;
    studentName:string;
    teacherUsername:string;
    teacherName:string;
    description:string;
    startTime:Date;
    endTime:Date;
    applyTime:Date;
    status:AppointmentStatus;
}