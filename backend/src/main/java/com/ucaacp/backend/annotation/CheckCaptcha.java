package com.ucaacp.backend.annotation;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface CheckCaptcha {
    // 验证码key的字段名，默认是"captchaKey"
    String captchaKeyField() default "captchaKey";

    // 验证码的字段名，默认是"captcha"
    String captchaField() default "captcha";

    // 是否必须验证（可以设置为false在某些情况下跳过验证）
    boolean required() default true;
}
