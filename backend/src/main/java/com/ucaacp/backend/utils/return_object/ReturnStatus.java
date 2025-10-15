package com.ucaacp.backend.utils.return_object;

import lombok.Getter;

/**
 * 返回状态枚举
 */
@Getter
public enum ReturnStatus {
    SUCCESS("success", "操作成功"),
    FAIL("fail", "操作失败"),
    ERROR("error", "系统错误"),
    UNAUTHORIZED("unauthorized", "未授权"),
    FORBIDDEN("forbidden", "禁止访问"),
    NOT_FOUND("not_found", "资源不存在"),
    VALIDATION_ERROR("validation_error", "参数验证失败"),
    BUSINESS_ERROR("business_error", "业务异常");

    private final String status;
    private final String description;

    ReturnStatus(String status, String description) {
        this.status = status;
        this.description = description;
    }
}
