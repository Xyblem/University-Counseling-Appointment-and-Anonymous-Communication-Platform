package com.ucaacp.backend.controller;

import com.ucaacp.backend.utils.return_object.ReturnObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // 开发环境使用
public class HelloController {
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!,Hello University Counseling Appointment and Anonymous Communication Platform!";
    }

    @GetMapping("/test_return_success")
    public ReturnObject test_return_success() {
        return ReturnObject.success("Test OK!");
    }

    @GetMapping("/test_return_failed")
    public ReturnObject test_return_failed() {
        return ReturnObject.fail("Test Failed!");
    }

}
