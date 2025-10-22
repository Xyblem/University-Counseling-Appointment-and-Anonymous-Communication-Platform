
/*** 返回的数据*/
export interface ReturnObject<T=any>{
    code: number;
    message?: string;
    status: string;
    data?: T;
    timestamp: number;
}

/**返回码枚举*/
export enum ReturnCode {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
    BUSINESS_ERROR = 1000,
    VALIDATION_ERROR = 1001,
    DATA_ACCESS_ERROR = 1002
}


/**返回状态枚举*/
export enum ReturnStatus {
    SUCCESS = "success",
    FAIL = "fail",
    ERROR = "error",
    UNAUTHORIZED = "unauthorized",
    FORBIDDEN = "forbidden",
    NOT_FOUND = "not_found",
    VALIDATION_ERROR = "validation_error",
    BUSINESS_ERROR = "business_error"
}

/**
 * 根据返回状态枚举(返回状态枚举获取返回状态名称)
 */
export const ReturnStatusNamesCN=new Map<string|null|undefined,string>([
    [ReturnStatus.SUCCESS,"成功"],
    [ReturnStatus.FAIL,"失败"],
    [ReturnStatus.ERROR,"出错"],
    [ReturnStatus.UNAUTHORIZED,"未授权"],
    [ReturnStatus.FORBIDDEN,"禁止访问"],
    [ReturnStatus.NOT_FOUND,"资源不存在"],
    [ReturnStatus.VALIDATION_ERROR,"参数验证失败"],
    [ReturnStatus.BUSINESS_ERROR,"业务异常"],
    [null,"NULL"],
    [undefined,"未定义"]
]);
