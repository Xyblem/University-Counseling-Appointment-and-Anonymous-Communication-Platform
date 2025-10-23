
/*** 返回的数据*/
export interface ReturnObject<T=any>{
    code: number;
    status: string;
    message?: string;
    data?: T;
    timestamp: number;
}

export namespace ReturnObject{
    /**返回码枚举*/
    export enum Code {
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
    export enum Status {
        SUCCESS = "success",
        FAIL = "fail",
        ERROR = "error",
        UNAUTHORIZED = "unauthorized",
        FORBIDDEN = "forbidden",
        NOT_FOUND = "not_found",
        VALIDATION_ERROR = "validation_error",
        BUSINESS_ERROR = "business_error"
    }


    export namespace Status {
        /**
         * 根据返回状态枚举(返回状态枚举获取返回状态名称)
         */
        export const ChineseName:Map<string|null|undefined,string>=new Map<string|null|undefined,string>([
            [Status.SUCCESS,"成功"],
            [Status.FAIL,"失败"],
            [Status.ERROR,"出错"],
            [Status.UNAUTHORIZED,"未授权"],
            [Status.FORBIDDEN,"禁止访问"],
            [Status.NOT_FOUND,"资源不存在"],
            [Status.VALIDATION_ERROR,"参数验证失败"],
            [Status.BUSINESS_ERROR,"业务异常"],
            [null,"NULL"],
            [undefined,"未定义"]
        ]);
    }
}







