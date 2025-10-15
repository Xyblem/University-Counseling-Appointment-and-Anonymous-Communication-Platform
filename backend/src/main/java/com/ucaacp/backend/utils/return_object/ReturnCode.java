package com.ucaacp.backend.utils.return_object;

import lombok.Getter;

/**
 * 返回码枚举
 */
@Getter
public enum ReturnCode {
    SUCCESS(200, "成功"),
    BAD_REQUEST(400, "请求参数错误"),
    UNAUTHORIZED(401, "未授权"),
    FORBIDDEN(403, "禁止访问"),
    NOT_FOUND(404, "资源不存在"),
    INTERNAL_SERVER_ERROR(500, "服务器内部错误"),
    SERVICE_UNAVAILABLE(503, "服务不可用"),
    BUSINESS_ERROR(1000, "业务异常"),
    VALIDATION_ERROR(1001, "参数验证失败"),
    DATA_ACCESS_ERROR(1002, "数据访问异常");

    private final int code;
    private final String message;

    ReturnCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
