package com.ucaacp.backend.config;

import com.ucaacp.backend.annotation.CheckUserRole;
import com.ucaacp.backend.interceptor.CheckLoginInterceptor;
import com.ucaacp.backend.interceptor.CheckUserRoleInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private CheckLoginInterceptor checkLoginInterceptor;

    @Autowired
    private CheckUserRoleInterceptor checkUserRoleInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(checkLoginInterceptor)
                .addPathPatterns("/**") // 拦截所有路径
                .excludePathPatterns("/login", "/register", "/error"); // 排除登录、注册等接口


        registry.addInterceptor(checkUserRoleInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/login", "/register", "/error");
    }
}
