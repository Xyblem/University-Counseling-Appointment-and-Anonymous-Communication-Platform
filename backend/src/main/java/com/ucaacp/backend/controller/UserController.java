package com.ucaacp.backend.controller;


import com.ucaacp.backend.utils.ReturnObject;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000") // 开发环境使用
public class UserController {

    @GetMapping("/login")
    public ReturnObject login(@RequestParam Map<String,Object> params) {
        return ReturnObject.success(params);
    }

    @GetMapping("/signup")
    public ReturnObject signup(@RequestParam Map<String,Object> params) {

        return ReturnObject.success();
    }


}
