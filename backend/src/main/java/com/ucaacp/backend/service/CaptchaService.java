package com.ucaacp.backend.service;

import com.wf.captcha.ArithmeticCaptcha;
import com.wf.captcha.GifCaptcha;
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
import java.util.*;

@Service
@Transactional
public class CaptchaService {

    @Value("${captcha.enable}")
    private boolean enabled;

    public CaptchaFrontendObject specCaptcha(HttpSession session) throws IOException, FontFormatException {
        // 生成验证码（指定宽、高、位数）
        SpecCaptcha specCaptcha = new SpecCaptcha(100, 38, 4);
        // 设置字体（可选）
        Random rand = new Random(System.currentTimeMillis());
        specCaptcha.setFont(rand.nextInt(Captcha.FONT_1,Captcha.FONT_10));
        return getFrontendObject(specCaptcha,"png",session);
    }

    public CaptchaFrontendObject gifCaptcha(HttpSession session) throws IOException, FontFormatException {
        // 生成验证码（指定宽、高、位数）
        GifCaptcha gifCaptcha=new GifCaptcha(100,38,4);
        // 设置字体（可选）
        Random rand = new Random(System.currentTimeMillis());
        gifCaptcha.setFont(rand.nextInt(Captcha.FONT_1,Captcha.FONT_10));
        return getFrontendObject(gifCaptcha,"gif",session);
    }

    public CaptchaFrontendObject arithmeticCaptcha(HttpSession session) throws IOException, FontFormatException {
        // 生成验证码（指定宽、高、位数）
        ArithmeticCaptcha arithmeticCaptcha=new ArithmeticCaptcha(100,38,4);
        // 设置字体（可选）
        Random rand = new Random(System.currentTimeMillis());
        arithmeticCaptcha.setFont(rand.nextInt(Captcha.FONT_1,Captcha.FONT_10));
        return getFrontendObject(arithmeticCaptcha,"gif",session);
    }

    protected CaptchaFrontendObject  getFrontendObject(Captcha captcha,String image_type,HttpSession session){
        // 获取验证码文本
        String code = captcha.text().toLowerCase();
        // 获取Base64编码的图片数据
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        captcha.out(outputStream);
        String base64Image ="data:image/"+image_type+";base64,"+ Base64.getEncoder().encodeToString(outputStream.toByteArray());
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
