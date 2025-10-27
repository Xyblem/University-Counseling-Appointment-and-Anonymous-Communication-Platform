package com.ucaacp.backend.controller;

import com.ucaacp.backend.annotation.CheckLogin;
import com.ucaacp.backend.annotation.CheckUserRole;
import com.ucaacp.backend.entity.Appointment;
import com.ucaacp.backend.entity.DTO.AppointmentDTO;
import com.ucaacp.backend.entity.User;
import com.ucaacp.backend.entity.enums.AppointmentStatus;
import com.ucaacp.backend.entity.enums.UserRole;
import com.ucaacp.backend.service.AppointmentService;
import com.ucaacp.backend.service.UserService;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointment")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    @CheckLogin
    @PostMapping("add")
    public ReturnObject addAppointment(@RequestBody Map<String,Object> appointmentRequest, HttpSession session) {

        String studentUsername=appointmentRequest.get("studentUsername")==null?"":appointmentRequest.get("studentUsername").toString();
        String teacherUsername=appointmentRequest.get("teacherUsername")==null?"":appointmentRequest.get("teacherUsername").toString();
        String description=appointmentRequest.get("description")==null?"":appointmentRequest.get("description").toString();
        String startTime=appointmentRequest.get("startTime")==null?"":appointmentRequest.get("startTime").toString();
        String endTime=appointmentRequest.get("endTime")==null?"":appointmentRequest.get("endTime").toString();

        //检查用户是否存在
        if(!userService.exits(studentUsername)){
            return ReturnObject.fail("学生用户名\""+studentUsername+"\"不存在");
        }
        //检查用户是否存在
        if(!userService.exits(teacherUsername)){
            return ReturnObject.fail("教师用户名\""+teacherUsername+"\"不存在");
        }


        String password=session.getAttribute("password").toString();
        Optional<User> optionalUser=userService.login(studentUsername,password);
        //检查密码是否匹配
        if(optionalUser.isEmpty()){
            return ReturnObject.fail("学生用户名密码错误");
        }

        Appointment appointment=new Appointment();
        appointment.setStudentUsername(studentUsername);
        appointment.setTeacherUsername(teacherUsername);
        appointment.setDescription(description);
        appointment.setStartTime(LocalDateTime.parse(startTime));
        appointment.setEndTime(LocalDateTime.parse(endTime));

        if(appointment.getStartTime().isBefore(LocalDateTime.now())){
            return ReturnObject.fail("预约开始时间不得早于现在");
        }

        if(appointment.getEndTime().isBefore(appointment.getStartTime())){
            return ReturnObject.fail("预约结束时间不得早于预约开始时间");
        }


        if(appointmentService.addAppointment(appointment)!=null){
            return ReturnObject.success();
        }else{
            return ReturnObject.fail("预约失败");
        }

    }

    @CheckLogin
    @GetMapping("find_by")
    public ReturnObject find(@RequestParam Map<String,Object> params, HttpSession session) {

        String by=params.get("by")==null?"":params.get("by").toString();
        String username=params.get("username")==null?"":params.get("username").toString();

        //检查用户是否存在
        if(!userService.exits(username)){
            return ReturnObject.fail("用户名\""+username+"\"不存在");
        }

        String password=session.getAttribute("password").toString();
        Optional<User> optionalUser=userService.login(username,password);
        //检查密码是否匹配
        if(optionalUser.isEmpty()){
            return ReturnObject.fail("用户名密码错误");
        }

        if(by.equals("studentUsername")){
            List<AppointmentDTO> appointmentList= appointmentService.getAppointmentDTOsByStudentUsername(username);
            if(appointmentList!=null){
                return ReturnObject.success(appointmentList);
            }else{
                return ReturnObject.fail("获取预约失败");
            }

        }else if(by.equals("teacherUsername")){
            List<AppointmentDTO> appointmentList= appointmentService.getAppointmentDTOsByTeacherUsername(username);
            if(appointmentList!=null){
                return ReturnObject.success(appointmentList);
            }else{
                return ReturnObject.fail("获取预约失败");
            }
        }else{
            return ReturnObject.fail("Unknown 'by' ");
        }
    }


    @CheckLogin
    @GetMapping("teacher/pending")
    public ReturnObject findTeacherPending(@RequestParam Map<String,Object> params, HttpSession session) {

        String teacherUsername=params.get("teacherUsername")==null?"":params.get("teacherUsername").toString();

        //检查用户是否存在
        if(!userService.exits(teacherUsername)){
            return ReturnObject.fail("教师用户名\""+teacherUsername+"\"不存在");
        }

        String password=session.getAttribute("password").toString();
        Optional<User> optionalUser=userService.login(teacherUsername,password);
        //检查密码是否匹配
        if(optionalUser.isEmpty()){
            return ReturnObject.fail("教师用户名密码错误");
        }

        List<AppointmentDTO> appointmentList= appointmentService.getAppointmentDTOsByTeacherUsernamePending(teacherUsername);
        if(appointmentList!=null){
            return ReturnObject.success(appointmentList);
        }else{
            return ReturnObject.fail("获取预约列表失败");
        }
    }

    @CheckLogin
    @GetMapping("teacher/non-pending")
    public ReturnObject findTeacherNonPending(@RequestParam Map<String,Object> params, HttpSession session) {

        String teacherUsername=params.get("teacherUsername")==null?"":params.get("teacherUsername").toString();

        //检查用户是否存在
        if(!userService.exits(teacherUsername)){
            return ReturnObject.fail("教师用户名\""+teacherUsername+"\"不存在");
        }

        String password=session.getAttribute("password").toString();
        Optional<User> optionalUser=userService.login(teacherUsername,password);
        //检查密码是否匹配
        if(optionalUser.isEmpty()){
            return ReturnObject.fail("教师用户名密码错误");
        }

        List<AppointmentDTO> appointmentList= appointmentService.getAppointmentDTOsByTeacherUsernameNonPending(teacherUsername);
        if(appointmentList!=null){
            return ReturnObject.success(appointmentList);
        }else{
            return ReturnObject.fail("获取预约列表失败");
        }
    }

    @CheckLogin
    @PostMapping("handle")
    @CheckUserRole(UserRole.TEACHER)
    public ReturnObject handle(@RequestBody Map<String,Object> handleRequest, HttpSession session) {


        String appointmentId=handleRequest.get("appointmentId")==null?"":handleRequest.get("appointmentId").toString();
        String status=handleRequest.get("status")==null?"":handleRequest.get("status").toString();

        if(appointmentService.handle(Integer.valueOf(appointmentId), AppointmentStatus.valueOf(status))>=0){
            return ReturnObject.success();
        }else{
            return ReturnObject.fail("处理失败");
        }
    }

    @CheckLogin
    @CheckUserRole(UserRole.ADMIN)
    @GetMapping("list_all")
    public ReturnObject listAll(@RequestParam Map<String,Object> params, HttpSession session) {
        List<AppointmentDTO> appointmentDTOList=appointmentService.findAllAppointmentDTO();
        if(appointmentDTOList!=null){
            return ReturnObject.success(appointmentDTOList);
        }else{
            return ReturnObject.fail("查询失败");
        }
    }

}
