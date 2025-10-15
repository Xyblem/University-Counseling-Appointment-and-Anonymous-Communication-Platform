package com.ucaacp.backend.controller;


import com.ucaacp.backend.entity.attribute_converter.UserRoleConverter;
import com.ucaacp.backend.service.CaptchaService;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ucaacp.backend.service.UserService;
import com.ucaacp.backend.entity.User;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000") // 开发环境使用
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CaptchaService captchaService;

    @GetMapping("/login")
    public ReturnObject login(@RequestParam Map<String,Object> params, HttpSession session ) {
        try {
            Optional<User> user = userService.login(params.get("username").toString(), params.get("password").toString());
            Integer roleCode=Integer.parseInt(params.get("role").toString());
            UserRoleConverter userRoleConverter=new UserRoleConverter();
            if(!captchaService.validate(session,params.get("captchaKey").toString(),params.get("captcha").toString())){
                return ReturnObject.fail("验证码错误");
            }
            if (user.isEmpty()) {
                return ReturnObject.fail("用户名或密码错误");
            }
            else if(user.get().getRole().equals(userRoleConverter.convertToEntityAttribute(roleCode))) {
                session.setAttribute("user", user.get());
                return ReturnObject.success();
            }else{
                return ReturnObject.fail("用户角色错误");
            }
        }catch (Exception e) {
            return ReturnObject.error(e.getMessage());
        }
    }

    @GetMapping("/signup")
    public ReturnObject signup(@RequestParam Map<String,Object> params) {

        return ReturnObject.success();
    }

//
//
//    @GetMapping("/{username}")
//    public ResponseEntity<User> getUser(@PathVariable String username) {
//        Optional<User> user = userService.getUserByUsername(username);
//        return user.map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @PostMapping
//    public ResponseEntity<User> createUser(@RequestBody User user) {
//        if (userService.isUsernameExists(user.getUsername())) {
//            return ResponseEntity.badRequest().body(null);
//        }
//        User savedUser = userService.saveUser(user);
//        return ResponseEntity.ok(savedUser);
//    }
//
//    @GetMapping
//    public ResponseEntity<Page<User>> getUsers(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        Page<User> users = userService.getUsersByPage(pageable);
//        return ResponseEntity.ok(users);
//    }
//
//    @DeleteMapping("/{username}")
//    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
//        userService.deleteUser(username);
//        return ResponseEntity.ok().build();
//    }

}
