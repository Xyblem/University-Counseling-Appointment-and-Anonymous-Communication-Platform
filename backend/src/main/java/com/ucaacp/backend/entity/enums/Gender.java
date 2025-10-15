package com.ucaacp.backend.entity.enums;

import lombok.Getter;

import java.util.Objects;

/**
 * 性别枚举
 * 使用国家性别编码[0未知，1男性，2女性，9未指定(其他)]，符合国家标准【中华人民共和国国家标准:人的性别代码(GB 2261-1980)】
 */
@Getter
public enum Gender {
    UNKNOWN(0,"未知"),
    MALE(1,"男性"),
    FEMALE(2,"女性"),
    OTHER(9,"其他");
    private final Integer code;
    private final String name;
    private Gender(Integer code,String name){
        this.code = code;
        this.name = name;
    }

    public static Gender getByCode(Integer code){
        for(Gender gender : Gender.values()){
            if(Objects.equals(gender.code, code)){
                return gender;
            }
        }
        return UNKNOWN;
    }

    public static Gender getByName(String name){
        for(Gender gender : Gender.values()){
            if(gender.name.equals(name)){
                return gender;
            }
        }
        return UNKNOWN;
    }

}
