package com.ucaacp.backend.interceptor;

import com.alibaba.fastjson.JSON;
import com.ucaacp.backend.annotation.CheckLogin;
import com.ucaacp.backend.annotation.CheckUserRole;
import com.ucaacp.backend.entity.User;
import com.ucaacp.backend.utils.return_object.ReturnCode;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.lang.reflect.Method;

@Component
public class CheckUserRoleInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 如果不是映射到方法，直接通过
        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        Method method = handlerMethod.getMethod();

        // 检查方法是否有CheckUserRole注解
        CheckUserRole checkUserRole = method.getAnnotation(CheckUserRole.class);
        if (checkUserRole == null) {
            // 如果没有注解，直接通过
            return true;
        }



        // 检查session中是否有用户信息
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");

        if (user == null) {
            // 未登录，返回错误信息
            response.setContentType("application/json;charset=utf-8");
            response.getWriter().write(JSON.toJSONString(ReturnObject.fail(ReturnCode.UNAUTHORIZED.getCode(),"用户未登录")));
            return false;
        }


        if(!user.getRole().equals(checkUserRole.value())){
            response.setContentType("application/json;charset=utf-8");
            response.getWriter().write(JSON.toJSONString(ReturnObject.fail(ReturnCode.UNAUTHORIZED.getCode(),"用户角色错误，需要角色："+checkUserRole.value().getName())));
        }

        return true;
    }
}
