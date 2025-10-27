/**
 * 用户角色枚举使用本项目的用户类型编码[0未知，1学生，2(心理咨询)教师 3(学校心理中心)管理员 9未指定(其他)]，参考【2022级软件工程+软件工程综合实践+项目选题】
 */
export enum UserRole {
    UNKNOWN=0,
    STUDENT,
    TEACHER,
    ADMIN,
    OTHER=9
}


export namespace UserRole {
    /**
     * 根据用户角色枚举(用户角色编码获取用户角色名称)
     */
    export const ChineseName:Map<number|undefined|string,string>=new Map<number|undefined|string,string>([
        [UserRole.UNKNOWN,"未知"],
        [UserRole.STUDENT,"学生"],
        [UserRole.TEACHER,"教师"],
        [UserRole.ADMIN,"管理员"],
        [UserRole.OTHER,"其他"],
        ["UNKNOWN","未知"],
        ["STUDENT","学生"],
        ["TEACHER","教师"],
        ["ADMIN","管理员"],
        ["OTHER","其他"],
        [undefined,"未定义"]
    ]);

    /**
     * 根据用户角色枚举(用户角色编码获取用户角色称呼)
     */
    export const ChineseNameAppellation:Map<number|undefined,string>=new Map<number|undefined,string>([
        [UserRole.UNKNOWN,"用户"],
        [UserRole.STUDENT,"同学"],
        [UserRole.TEACHER,"老师"],
        [UserRole.ADMIN,"管理员"],
        [UserRole.OTHER,"其他"],
        [undefined,"未定义"]
    ]);



}


