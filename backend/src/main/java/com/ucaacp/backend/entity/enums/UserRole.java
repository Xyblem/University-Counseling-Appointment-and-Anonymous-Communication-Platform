package com.ucaacp.backend.entity.enums;

import lombok.Getter;

/**
 * 用户角色枚举使用本项目的用户类型编码[0未知，1学生，2(心理咨询)教师 3(学校心理中心)管理员 9未指定(其他)]，参考【2022级软件工程+软件工程综合实践+项目选题】
 */
@Getter
public enum UserRole {
    UNKNOWN(0,"未知"),
    STUDENT(1,"学生"),
    TEACHER(2,"教师"),
    ADMIN(3,"管理员"),
    OTHER(9,"其他");
    private final Integer code;
    private final String name;
    private UserRole(Integer code,String name){
        this.code = code;
        this.name = name;
    }

    public static UserRole getByCode(Integer code){
        for(UserRole role : values()){
            if(role.code.equals(code)){
                return role;
            }
        }
        return UNKNOWN;
    }

    public static UserRole getByName(String name){
        for(UserRole role : values()){
            if(role.name.equals(name)){
                return role;
            }
        }
        return UNKNOWN;
    }

    @Override
    public String toString() {
        return this.code.toString();
    }
}
