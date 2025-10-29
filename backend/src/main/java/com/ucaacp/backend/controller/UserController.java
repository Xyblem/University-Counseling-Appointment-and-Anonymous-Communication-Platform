package com.ucaacp.backend.controller;

import com.ucaacp.backend.annotation.CheckCaptcha;
import com.ucaacp.backend.annotation.CheckLogin;
import com.ucaacp.backend.annotation.CheckUserRole;
import com.ucaacp.backend.entity.DTO.UserDTO;
import com.ucaacp.backend.entity.attribute_converter.GenderConverter;
import com.ucaacp.backend.entity.attribute_converter.ProvinceCN_Converter;
import com.ucaacp.backend.entity.attribute_converter.UserPositionConverter;
import com.ucaacp.backend.entity.attribute_converter.UserRoleConverter;
import com.ucaacp.backend.entity.enums.UserRole;
import com.ucaacp.backend.service.CaptchaService;
import com.ucaacp.backend.utils.return_object.ReturnCode;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
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

    /**
     * 用户登录
     * @param loginRequestBody 用户登录请求体
     * @param session 会话
     * @return 返回对象
     */
    @CheckCaptcha(captchaKeyField = "captchaKey", captchaField = "captcha")
    @PostMapping("/login")
    public ReturnObject login(@RequestBody Map<String,Object> loginRequestBody, HttpSession session ) {
        UserRoleConverter userRoleConverter = new UserRoleConverter();
        //获取参数
        String username=loginRequestBody.get("username")==null?null:loginRequestBody.get("username").toString();
        String password=loginRequestBody.get("password")==null?null:loginRequestBody.get("password").toString();
        String role=loginRequestBody.get("role")==null?null:loginRequestBody.get("role").toString();
        Integer roleCode = role==null?null:Integer.parseInt(role);
        //执行登录
        Optional<User> userOptional = userService.login(username, password);
        //校验登录
        if (userOptional.isEmpty()) {
            return ReturnObject.fail("用户名或密码错误");
        } else if (userOptional.get().getRole().equals(userRoleConverter.convertToEntityAttribute(roleCode))) {
            User user = userOptional.get();
            user.setPassword(null);//保护密码
            session.setAttribute("user", user);
            session.setAttribute("password", password);
            return ReturnObject.success("登录成功");
        } else {
            return ReturnObject.fail("用户角色错误");
        }
    }

    /**
     * 用户注册
     * @param signupRequestBody 用户注册请求体
     * @param session 会话
     * @return 返回对象
     */
    @CheckCaptcha(captchaKeyField = "captchaKey", captchaField = "captcha")
    @PostMapping("/signup")
    public ReturnObject signup(@RequestBody Map<String,Object> signupRequestBody,HttpSession session) {
        GenderConverter genderConverter=new GenderConverter();
        ProvinceCN_Converter provinceCN_Converter=new ProvinceCN_Converter();
        UserRoleConverter userRoleConverter=new UserRoleConverter();
        UserPositionConverter userPositionConverter=new UserPositionConverter();
        //获取参数
        String username=signupRequestBody.get("username")==null?null:signupRequestBody.get("username").toString();
        String name=signupRequestBody.get("name")==null?null:signupRequestBody.get("name").toString();
        String password=signupRequestBody.get("password")==null?null:signupRequestBody.get("password").toString();
        String confirmedPassword=signupRequestBody.get("confirmedPassword")==null?null:signupRequestBody.get("confirmedPassword").toString();
        String gender=signupRequestBody.get("gender")==null?null:signupRequestBody.get("gender").toString();
        String schoolProvince=signupRequestBody.get("schoolProvince")==null?null:signupRequestBody.get("schoolProvince").toString();
        String school=signupRequestBody.get("school")==null?null:signupRequestBody.get("school").toString();
        String secondaryUnit=signupRequestBody.get("secondaryUnit")==null?null:signupRequestBody.get("secondaryUnit").toString();
        String major=signupRequestBody.get("major")==null?null:signupRequestBody.get("major").toString();
        String role=signupRequestBody.get("role")==null?null:signupRequestBody.get("role").toString();
        String position=signupRequestBody.get("position")==null?null:signupRequestBody.get("position").toString();
        String email=signupRequestBody.get("email")==null?null:signupRequestBody.get("email").toString();
        String phoneNumber=signupRequestBody.get("phoneNumber")==null?null:signupRequestBody.get("phoneNumber").toString();
        String qq=signupRequestBody.get("qq")==null?null:signupRequestBody.get("qq").toString();
        String wechat=signupRequestBody.get("wechat")==null?null:signupRequestBody.get("wechat").toString();

        //确认密码
        if(!Objects.equals(password, confirmedPassword)) {
            return ReturnObject.fail("两次密码输入不一致");
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
            return ReturnObject.success("注册成功");
        }else{
            return ReturnObject.fail("注册失败");
        }
    }


    /**
     *  检查用户是否登录
     * @param session 会话
     * @return 返回对象
     */
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

    /**
     * 获取已登录的用户实体（密码保护）
     * @param session 会话
     * @return 返回对象
     */
    @CheckLogin
    @GetMapping("/logged-in_user")
    public ReturnObject loggedInUser(HttpSession session){
        return ReturnObject.success(((User)session.getAttribute("user")).getReturnData());
    }

    /**
     * 用户登出
     * @param session 会话
     * @return 返回对象
     */
    @CheckLogin
    @PostMapping("/logout")
    public ReturnObject logout(HttpSession session){
        session.removeAttribute("user");
        session.removeAttribute("password");
        return ReturnObject.success("用户已登出");
    }


    /**
     * 用户更新密码
     * @param updatePasswordRequestBody 用户更新密码请求体
     * @param session 会话
     * @return 返回对象
     */
    @CheckLogin
    @CheckCaptcha(captchaKeyField = "captchaKey", captchaField = "captcha")
    @PostMapping("/update_password")
    public ReturnObject updatePassword(@RequestBody Map<String,Object> updatePasswordRequestBody,HttpSession session){
        //获取参数
        String username=updatePasswordRequestBody.get("username")==null?null:updatePasswordRequestBody.get("username").toString();
        String oldPassword=updatePasswordRequestBody.get("oldPassword")==null?null:updatePasswordRequestBody.get("oldPassword").toString();
        String newPassword=updatePasswordRequestBody.get("newPassword")==null?null:updatePasswordRequestBody.get("newPassword").toString();
        String confirmedNewPassword=updatePasswordRequestBody.get("confirmedNewPassword")==null?null:updatePasswordRequestBody.get("confirmedNewPassword").toString();

        //确认新密码
        if(!Objects.equals(newPassword, confirmedNewPassword)) {
            return ReturnObject.fail("两次新密码输入不一致");
        }

        //检查新旧密码是否相同
        if(Objects.equals(oldPassword,newPassword)){
            return ReturnObject.fail("新密码不能与旧密码相同");
        }

        //检查用户名是否匹配
        if(!((User)session.getAttribute("user")).getUsername().equals(username)){
            return ReturnObject.fail(ReturnCode.UNAUTHORIZED.getCode(),"用户名错误");
        }

        //检查用户是否存在
        if(!userService.exits(username)){
            return ReturnObject.fail("用户名\""+username+"\"不存在");
        }

        //检查密码是否匹配
        if(userService.login(username,oldPassword).isEmpty()){
            return ReturnObject.fail("用户名密码错误");
        }

        //执行更新密码操作
        if(userService.updatePassword(username,newPassword)>=0){
            return ReturnObject.success("更新密码成功");
        }else {
            return ReturnObject.fail("更新密码失败");
        }
    }

    /**
     * 注销账号
     * @param closeAccountRequestBody 注销账号请求体
     * @param session 会话
     * @return 返回对象
     */
    @CheckLogin
    @CheckCaptcha(captchaKeyField = "captchaKey", captchaField = "captcha")
    @PostMapping("/close_account")
    public ReturnObject closeAccount(@RequestBody Map<String,Object> closeAccountRequestBody,HttpSession session){
        //获取参数
        String username=closeAccountRequestBody.get("username")==null?null:closeAccountRequestBody.get("username").toString();
        String password=closeAccountRequestBody.get("password")==null?null:closeAccountRequestBody.get("password").toString();

        //检查用户名是否匹配
        if(!((User)session.getAttribute("user")).getUsername().equals(username)){
            return ReturnObject.fail(ReturnCode.UNAUTHORIZED.getCode(),"用户名错误");
        }

        //检查用户是否存在
        if(!userService.exits(username)){
            return ReturnObject.fail("用户名\""+username+"\"不存在");
        }

        //检查密码是否匹配
        if(userService.login(username,password).isEmpty()){
            return ReturnObject.fail("用户名密码错误");
        }

        //执行注销操作
        if(userService.closeAccount(username)!=null){
            session.removeAttribute("user");
            session.removeAttribute("password");
            return ReturnObject.success("注销账号成功");
        }else {
            return ReturnObject.fail("注销账号失败");
        }

    }


    /**
     * 更新用户个人信息
     * @param updateUserRequestBody 更新用户个人信息请求体
     * @param session 会话
     * @return 返回对象
     */
    @CheckLogin
    @CheckCaptcha(captchaKeyField = "captchaKey", captchaField = "captcha")
    @PostMapping("update_user")
    public ReturnObject updateIndividualInformation(@RequestBody Map<String,Object> updateUserRequestBody,HttpSession session){
        GenderConverter genderConverter=new GenderConverter();
        ProvinceCN_Converter provinceCN_Converter=new ProvinceCN_Converter();
        UserPositionConverter userPositionConverter=new UserPositionConverter();
        //获取参数
        String username=updateUserRequestBody.get("username")==null?null:updateUserRequestBody.get("username").toString();
        String nickname=updateUserRequestBody.get("nickname")==null?null:updateUserRequestBody.get("nickname").toString();
        String description=updateUserRequestBody.get("description")==null?null:updateUserRequestBody.get("description").toString();
        String name=updateUserRequestBody.get("name")==null?null:updateUserRequestBody.get("name").toString();
        String gender=updateUserRequestBody.get("gender")==null?null:updateUserRequestBody.get("gender").toString();
        String schoolProvince=updateUserRequestBody.get("schoolProvince")==null?null:updateUserRequestBody.get("schoolProvince").toString();
        String school=updateUserRequestBody.get("school")==null?null:updateUserRequestBody.get("school").toString();
        String secondaryUnit=updateUserRequestBody.get("secondaryUnit")==null?null:updateUserRequestBody.get("secondaryUnit").toString();
        String major=updateUserRequestBody.get("major")==null?null:updateUserRequestBody.get("major").toString();
        String position=updateUserRequestBody.get("position")==null?null:updateUserRequestBody.get("position").toString();
        String email=updateUserRequestBody.get("email")==null?null:updateUserRequestBody.get("email").toString();
        String phoneNumber=updateUserRequestBody.get("phoneNumber")==null?null:updateUserRequestBody.get("phoneNumber").toString();
        String qq=updateUserRequestBody.get("qq")==null?null:updateUserRequestBody.get("qq").toString();
        String wechat=updateUserRequestBody.get("wechat")==null?null:updateUserRequestBody.get("wechat").toString();

        String password=session.getAttribute("password").toString();

        //检查用户是否存在
        if(!userService.exits(username)){
            return ReturnObject.fail("用户名\""+username+"\"不存在");
        }

        Optional<User> optionalUser=userService.login(username,password);
        //检查密码是否匹配
        if(optionalUser.isEmpty()){
            return ReturnObject.fail("用户名密码错误");
        }

        User user=optionalUser.get();
        user.setNickname(nickname);
        user.setDescription(description);
        user.setName(name);
        user.setPassword(password);
        user.setGender(gender==null?null:genderConverter.convertToEntityAttribute(Integer.parseInt(gender)));
        user.setSchoolProvince(schoolProvince==null?null:provinceCN_Converter.convertToEntityAttribute(Long.parseLong(schoolProvince)));
        user.setSchool(school);
        user.setSecondaryUnit(secondaryUnit);
        user.setMajor(major);
        user.setPosition(userPositionConverter.convertToEntityAttribute(position));
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setQq(qq);
        user.setWechat(wechat);
        //执行修改
        if(userService.updateUser(user)!=null){
            //再登录验证修改
            session.setAttribute("user", user);

            return ReturnObject.success("修改用户信息成功");
        }else {
            return ReturnObject.fail("修改用户信息失败");
        }
    }


    @CheckLogin
    @GetMapping("all_teachers")
    public ReturnObject getAllTeachers(@RequestParam Map<String,String> params,HttpSession session) {

        ProvinceCN_Converter provinceCN_Converter=new ProvinceCN_Converter();
        String schoolProvince=params.get("schoolProvince");
        String school=params.get("school");


        if(schoolProvince==null||schoolProvince.isEmpty()){
            return ReturnObject.fail("请选择学校所在省份");
        }

        if(school==null||school.isEmpty()){
            return ReturnObject.fail("请填写学校名称");
        }


        List<UserDTO> teachers=userService.findAllTeachersBySchoolProvinceAndSchool(provinceCN_Converter.convertToEntityAttribute(Long.valueOf(schoolProvince)),school);

        if(teachers!=null){
            return ReturnObject.success(teachers);
        }else{
            return ReturnObject.fail("学校所在省份或学校错误");
        }
    }


    @CheckLogin
    @CheckUserRole(UserRole.ADMIN)
    @GetMapping("list_all")
    public ReturnObject listAll(HttpSession session){
        List<UserDTO> userDTOList=userService.findAllUserDTO();
        if(userDTOList!=null){
            return ReturnObject.success(userDTOList);
        }else{
            return ReturnObject.fail("获取失败");
        }
    }
}
