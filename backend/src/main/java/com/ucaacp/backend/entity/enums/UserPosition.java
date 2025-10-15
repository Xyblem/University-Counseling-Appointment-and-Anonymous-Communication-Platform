package com.ucaacp.backend.entity.enums;

import lombok.Getter;

/**
 * 用户职务枚举
 * 职务长度2-20个字符，只能是['未指定','学生','心理部咨询员','心理部负责人','非心理部教职工']
 */
@Getter
public enum UserPosition {
    UNKNOWN("未指定"),
    STUDENT("学生"),
    PSYCHOLOGICAL_COUNSELING_STAFF("心理部咨询员"),
    HEAD_OF_THE_PSYCHOLOGICAL_DEPARTMENT("心理部负责人"),
    NON_PSYCHOLOGICAL_DEPARTMENT_STAFF("非心理部教职工");

    private final String value;

    private UserPosition(String value) {
        this.value = value;
    }

    public static UserPosition getFromValue(String value) {
        for (UserPosition userPosition : UserPosition.values()) {
            if (userPosition.getValue().equals(value)) {
                return userPosition;
            }
        }
        return UNKNOWN;
    }
}
