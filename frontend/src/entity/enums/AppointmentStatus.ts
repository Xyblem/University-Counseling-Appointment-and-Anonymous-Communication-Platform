// 预约状态枚举
export enum AppointmentStatus {
    PENDING="PENDING",
    CONFIRM="CONFIRM",
    REJECT="REJECT",
    RESCHEDULE="RESCHEDULE",
}


export namespace AppointmentStatus {
    /**
     * 根据预约状态枚举(预约状态获取预约状态名称)
     */
    export const ChineseName:Map<string,string>=new Map<string,string>([
        [AppointmentStatus.PENDING,"待处理"],
        [AppointmentStatus.CONFIRM,"确认"],
        [AppointmentStatus.REJECT,"拒绝"],
        [AppointmentStatus.RESCHEDULE,"改期"],
    ]);
}