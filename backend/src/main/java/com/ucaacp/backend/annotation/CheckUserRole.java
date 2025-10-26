package com.ucaacp.backend.annotation;

import com.ucaacp.backend.entity.enums.UserRole;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface CheckUserRole {
    UserRole value();
    // 可以添加其他参数，比如需要的权限等
    boolean required() default true;
}
