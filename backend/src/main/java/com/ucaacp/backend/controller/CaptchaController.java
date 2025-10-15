package com.ucaacp.backend.controller;


import com.ucaacp.backend.utils.ReturnObject;
import com.wf.captcha.SpecCaptcha;
import com.wf.captcha.base.Captcha;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CaptchaController {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @GetMapping("/captcha")
    public ReturnObject getCaptcha(){

        // 生成验证码（指定宽、高、位数）:cite[1]
        SpecCaptcha specCaptcha = new SpecCaptcha(100, 38, 4);
        // 设置字体（可选）:cite[1]
        try {
            specCaptcha.setFont(Captcha.FONT_1);
        } catch (IOException | FontFormatException e) {
            return ReturnObject.error(e.getMessage());
        }
        // 获取验证码文本
        String code = specCaptcha.text().toLowerCase();
        // 获取Base64编码的图片数据
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        specCaptcha.out(outputStream);
        String base64Image ="data:image/png;base64,"+Base64.getEncoder().encodeToString(outputStream.toByteArray());

        // 生成一个唯一的Redis Key
        String captchaKey = UUID.randomUUID().toString();
        // 将验证码文本存入Redis，并设置5分钟过期
        //redisTemplate.opsForValue().set(captchaKey, code, 5, TimeUnit.MINUTES);

        // 将key和base64图片返回给前端
        Map<String,Object> map = new HashMap<>();
        map.put("captchaKey",captchaKey);
        map.put("base64Image",base64Image);
        return ReturnObject.success(map);
    }
}