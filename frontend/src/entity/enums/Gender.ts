/**
 * 性别枚举
 * 使用国家性别编码[0未知，1男性，2女性，9未指定(其他)]，符合国家标准【中华人民共和国国家标准:人的性别代码(GB 2261-1980)】
 */
export enum Gender {
    UNKNOWN=0,
    MALE,
    FEMALE,
    OTHER=9
}

export namespace Gender {
    /**
     * 根据性别枚举(性别编码获取性别名称)
     */
    export const ChineseName:Map<number,string>=new Map<number,string>([
        [Gender.UNKNOWN,"未知"],
        [Gender.MALE,"男"],
        [Gender.FEMALE,"女"],
        [Gender.OTHER,"其他"]
    ]);
}


