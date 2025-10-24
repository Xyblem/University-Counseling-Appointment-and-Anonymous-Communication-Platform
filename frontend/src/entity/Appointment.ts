import {AppointmentStatus} from "./enums/AppointmentStatus";

export interface Appointment{
    appointmentId:number;
    studentUsername:string;
    teacherUsername:string;
    description:string;
    startTime:Date;
    endTime:Date;
    applyTime:Date;
    status:AppointmentStatus;
}