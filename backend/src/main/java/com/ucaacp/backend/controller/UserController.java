package com.ucaacp.backend.controller;


import com.ucaacp.backend.entity.attribute_converter.GenderConverter;
import com.ucaacp.backend.entity.attribute_converter.ProvinceCN_Converter;
import com.ucaacp.backend.entity.attribute_converter.UserPositionConverter;
import com.ucaacp.backend.entity.attribute_converter.UserRoleConverter;
import com.ucaacp.backend.entity.enums.Gender;
import com.ucaacp.backend.service.CaptchaService;
import com.ucaacp.backend.utils.return_object.ReturnCode;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.ucaacp.backend.service.UserService;
import com.ucaacp.backend.entity.User;

import java.util.*;

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
        UserRoleConverter userRoleConverter = new UserRoleConverter();
        //获取参数
        String username=params.get("username")==null?null:params.get("username").toString();
        String password=params.get("password")==null?null:params.get("password").toString();
        String role=params.get("role")==null?null:params.get("role").toString();
        Integer roleCode = role==null?null:Integer.parseInt(role);
        String captchaKey=params.get("captchaKey")==null?null:params.get("captchaKey").toString();
        String captcha=params.get("captcha")==null?null:params.get("captcha").toString();

        //校验验证码
        if (!captchaService.validate(session, captchaKey, captcha)) {
            return ReturnObject.fail("验证码错误");
        }

        //执行登录
        Optional<User> userOptional = userService.login(username, password);

        //校验登录
        if (userOptional.isEmpty()) {
            return ReturnObject.fail("用户名或密码错误");
        } else if (userOptional.get().getRole().equals(userRoleConverter.convertToEntityAttribute(roleCode))) {
            User user = userOptional.get();
            user.setPassword(null);//保护密码
            session.setAttribute("user", user);
            return ReturnObject.success();
        } else {
            return ReturnObject.fail("用户角色错误");
        }
    }

    @GetMapping("/signup")
    public ReturnObject signup(@RequestParam Map<String,Object> params,HttpSession session) {
        GenderConverter genderConverter=new GenderConverter();
        ProvinceCN_Converter provinceCN_Converter=new ProvinceCN_Converter();
        UserRoleConverter userRoleConverter=new UserRoleConverter();
        UserPositionConverter userPositionConverter=new UserPositionConverter();
        //获取参数
        String username=params.get("username")==null?null:params.get("username").toString();
        String name=params.get("name")==null?null:params.get("name").toString();
        String password=params.get("password")==null?null:params.get("password").toString();
        String confirmedPassword=params.get("confirmedPassword")==null?null:params.get("confirmedPassword").toString();
        String gender=params.get("gender")==null?null:params.get("gender").toString();
        String schoolProvince=params.get("schoolProvince")==null?null:params.get("schoolProvince").toString();
        String school=params.get("school")==null?null:params.get("school").toString();
        String secondaryUnit=params.get("secondaryUnit")==null?null:params.get("secondaryUnit").toString();
        String major=params.get("major")==null?null:params.get("major").toString();
        String role=params.get("role")==null?null:params.get("role").toString();
        String position=params.get("position")==null?null:params.get("position").toString();
        String email=params.get("email")==null?null:params.get("email").toString();
        String phoneNumber=params.get("phoneNumber")==null?null:params.get("phoneNumber").toString();
        String qq=params.get("qq")==null?null:params.get("qq").toString();
        String wechat=params.get("wechat")==null?null:params.get("wechat").toString();
        String captchaKey=params.get("captchaKey")==null?null:params.get("captchaKey").toString();
        String captcha=params.get("captcha")==null?null:params.get("captcha").toString();


        //确认密码
        if(!Objects.equals(password, confirmedPassword)) {
            return ReturnObject.fail("两次密码输入不一致");
        }

        //校验验证码
        if (!captchaService.validate(session, captchaKey, captcha)) {
            return ReturnObject.fail("验证码错误");
        }


        //检查用户名是否已经存在
        if(userService.exits(username)){
            return ReturnObject.fail("用户名\""+username+"\"已经存在");
        }

        //创建新用户
        User user=new User();
        user.setUsername(username);
        user.setNickname(username);
        user.setDescription("");
        user.setName(name);
        user.setPassword(password);
        user.setGender(gender==null?null:genderConverter.convertToEntityAttribute(Integer.parseInt(gender)));
        user.setSchoolProvince(schoolProvince==null?null:provinceCN_Converter.convertToEntityAttribute(Long.parseLong(schoolProvince)));
        user.setSchool(school);
        user.setSecondaryUnit(secondaryUnit);
        user.setMajor(major);
        user.setRole(role==null?null:userRoleConverter.convertToEntityAttribute(Integer.parseInt(role)));
        user.setPosition(userPositionConverter.convertToEntityAttribute(position));
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setQq(qq);
        user.setWechat(wechat);
        user.setRegistrationTime(new Date());

        //保存用户，执行注册
        if(userService.signUp(user)!=null){
            return ReturnObject.success();
        }else{
            return ReturnObject.fail();
        }
    }


    @GetMapping("/check_login")
    public ReturnObject checkLogin(HttpSession session){
        Map<String,String> data=new HashMap<>();
        boolean isLogin=session.getAttribute("user") != null;
        if(isLogin){
            data.put("isLogin","true");
        }else{
            data.put("isLogin","false");
        }
        return ReturnObject.success(data);
    }

    @GetMapping("/logged-in_user")
    public ReturnObject loggedInUser(HttpSession session){
        boolean isLogin=session.getAttribute("user") != null;
        if(!isLogin){
            return ReturnObject.fail(ReturnCode.UNAUTHORIZED.getCode(),"用户未登录");
        }
        return ReturnObject.success(session.getAttribute("user"));
    }

    @GetMapping("/logout")
    public ReturnObject logout(HttpSession session){
        boolean isLogin=session.getAttribute("user") != null;
        if(!isLogin){
            return ReturnObject.fail(ReturnCode.UNAUTHORIZED.getCode(),"用户未登录");
        }
        session.removeAttribute("user");
        return ReturnObject.success("用户已登出");
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
