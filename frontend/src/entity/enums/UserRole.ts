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
    export const ChineseName:Map<number,string>=new Map<number,string>([
        [UserRole.UNKNOWN,"未知"],
        [UserRole.STUDENT,"学生"],
        [UserRole.TEACHER,"教师"],
        [UserRole.ADMIN,"管理员"],
        [UserRole.OTHER,"其他"]
    ]);
}


