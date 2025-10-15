package com.ucaacp.backend.service;

import com.ucaacp.backend.utils.return_object.ReturnObject;
import com.wf.captcha.SpecCaptcha;
import com.wf.captcha.base.Captcha;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional
public class CaptchaService {

    @Value("${captcha.enable}")
    private boolean enabled;

    public CaptchaFrontendObject specCaptcha(HttpSession session) throws IOException, FontFormatException {
        // 生成验证码（指定宽、高、位数）
        SpecCaptcha specCaptcha = new SpecCaptcha(100, 38, 4);
        // 设置字体（可选）
        specCaptcha.setFont(Captcha.FONT_1);
        // 获取验证码文本
        String code = specCaptcha.text().toLowerCase();
        // 获取Base64编码的图片数据
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        specCaptcha.out(outputStream);
        String base64Image ="data:image/png;base64,"+ Base64.getEncoder().encodeToString(outputStream.toByteArray());
        // 生成一个唯一的Redis Key
        String captchaKey = UUID.randomUUID().toString();
        // 将key和code存入Session
        session.setAttribute("captcha", new CaptchaBackendObject(captchaKey,code));
        // 将key和base64图片返回给前端
        return new CaptchaFrontendObject(captchaKey,base64Image);
    }

    public boolean validate(HttpSession session,String captchaKey,String code){
       CaptchaBackendObject captchaBackendObject = (CaptchaBackendObject) session.getAttribute("captcha");
       session.removeAttribute("captcha");
       return (!enabled)||(captchaBackendObject != null && captchaBackendObject.getCaptchaKey().equals(captchaKey) && captchaBackendObject.getCode().equals(code));
    }

    @Data
    public static class CaptchaFrontendObject {
        private String captchaKey;
        private String base64Image;

        public CaptchaFrontendObject(String captchaKey, String base64Image) {
            this.captchaKey = captchaKey;
            this.base64Image = base64Image;
        }
    }

    @Data
    public static class CaptchaBackendObject {
        private String captchaKey;
        private String code;
        public CaptchaBackendObject(String captchaKey, String code) {
            this.captchaKey = captchaKey;
            this.code = code;
        }
    }
}
