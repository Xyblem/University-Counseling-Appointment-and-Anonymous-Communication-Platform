/**
 * 用户职务枚举
 * 职务长度2-20个字符，只能是['未指定','学生','心理部咨询员','心理部负责人','非心理部教职工']
 */
export enum UserPosition {
    UNKNOWN="未指定",
    STUDENT="学生",
    PSYCHOLOGICAL_COUNSELING_STAFF="心理部咨询员",
    HEAD_OF_THE_PSYCHOLOGICAL_DEPARTMENT="心理部负责人",
    NON_PSYCHOLOGICAL_DEPARTMENT_STAFF="非心理部教职工"
}


export namespace UserPosition {
    /**
     * 根据用户职务枚举(用户职务名称获取用户职务名称)
     */
    export const ChineseName:Map<string,string>=new Map<string,string>([
        [UserPosition.UNKNOWN,"未指定"],
        [UserPosition.STUDENT,"学生"],
        [UserPosition.PSYCHOLOGICAL_COUNSELING_STAFF,"心理部咨询员"],
        [UserPosition.HEAD_OF_THE_PSYCHOLOGICAL_DEPARTMENT,"心理部负责人"],
        [UserPosition.NON_PSYCHOLOGICAL_DEPARTMENT_STAFF,"非心理部教职工"],
        ["UNKNOWN","未指定"],
        ["STUDENT","学生"],
        ["PSYCHOLOGICAL_COUNSELING_STAFF","心理部咨询员"],
        ["HEAD_OF_THE_PSYCHOLOGICAL_DEPARTMENT","心理部负责人"],
        ["NON_PSYCHOLOGICAL_DEPARTMENT_STAFF","非心理部教职工"]
    ]);
}
