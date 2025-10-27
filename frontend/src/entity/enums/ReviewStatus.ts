
export enum ReviewStatus {
    PENDING="PENDING", PASSED="PASSED", BANNED="BANNED", REVOKED="REVOKED"
}


export namespace ReviewStatus {
    /**
     * 根据预约状态枚举(预约状态获取预约状态名称)
     */
    export const ChineseName:Map<string,string>=new Map<string,string>([
        [ReviewStatus.PENDING,"待处理"],
        [ReviewStatus.PASSED,"通过"],
        [ReviewStatus.BANNED,"驳回"],
        [ReviewStatus.REVOKED,"撤回"],
    ]);
}