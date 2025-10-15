package com.ucaacp.backend.controller;


import com.ucaacp.backend.service.CaptchaService;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import com.wf.captcha.SpecCaptcha;
import com.wf.captcha.base.Captcha;
import com.wf.captcha.servlet.CaptchaServlet;
import com.wf.captcha.utils.CaptchaUtil;
import jakarta.servlet.http.HttpSession;
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
    private CaptchaService captchaService;

    @GetMapping("/captcha")
    public ReturnObject getCaptcha(HttpSession session){
        try {
            return ReturnObject.success(captchaService.specCaptcha(session));
        } catch (Exception e) {
            return ReturnObject.error(e.getMessage());
        }
    }
}