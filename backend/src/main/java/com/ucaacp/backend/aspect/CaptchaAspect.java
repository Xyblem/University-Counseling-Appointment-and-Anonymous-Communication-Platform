package com.ucaacp.backend.aspect;

import com.ucaacp.backend.annotation.CheckCaptcha;
import com.ucaacp.backend.service.CaptchaService;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Map;

@EnableAspectJAutoProxy
@Aspect
@Component
public class CaptchaAspect {

    @Autowired
    private CaptchaService captchaService;

    @Around("@annotation(checkCaptcha)")
    public Object checkCaptcha(ProceedingJoinPoint joinPoint, CheckCaptcha checkCaptcha) throws Throwable {
        // 如果不需要验证，直接放行
        if (!checkCaptcha.required()) {
            return joinPoint.proceed();
        }

        // 获取HttpServletRequest和Session
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null) {
            throw new RuntimeException("无法获取请求信息");
        }

        HttpServletRequest request = attributes.getRequest();
        HttpSession session = request.getSession();

        // 获取方法参数
        Object[] args = joinPoint.getArgs();
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        String[] parameterNames = signature.getParameterNames();

        // 提取captchaKey和captcha参数
        String captchaKey = extractParameterValue(args, parameterNames, checkCaptcha.captchaKeyField());
        String captcha = extractParameterValue(args, parameterNames, checkCaptcha.captchaField());

        // 校验验证码
        if (!captchaService.validate(session, captchaKey, captcha)) {
            return ReturnObject.fail("验证码错误");
        }

        // 验证通过，继续执行原方法
        return joinPoint.proceed();
    }

    /**
     * 从方法参数中提取指定字段的值
     */
    private String extractParameterValue(Object[] args, String[] parameterNames, String fieldName) {
        for (int i = 0; i < args.length; i++) {
            Object arg = args[i];

            if (arg == null) continue;

            // 1. Map类型
            if (arg instanceof Map) {
                Map<?, ?> map = (Map<?, ?>) arg;
                Object value = map.get(fieldName);
                if (value != null) return value.toString();
            }

            // 2. 自定义对象 - 反射获取字段
            try {
                Field field = arg.getClass().getDeclaredField(fieldName);
                field.setAccessible(true);
                Object value = field.get(arg);
                if (value != null) return value.toString();
            } catch (Exception e) {
                // 忽略，尝试其他方式
            }

            // 3. 自定义对象 - 通过getter方法
            try {
                String getterName = "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
                Method getter = arg.getClass().getMethod(getterName);
                Object value = getter.invoke(arg);
                if (value != null) return value.toString();
            } catch (Exception e) {
                // 忽略，尝试其他方式
            }

            // 4. 直接参数匹配
            if (parameterNames[i].equals(fieldName)) {
                return args[i].toString();
            }
        }
        return null;
    }
}
