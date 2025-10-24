package com.ucaacp.backend.controller;

import com.ucaacp.backend.annotation.CheckLogin;
import com.ucaacp.backend.entity.DTO.PsychAssessmentRecordDTO;
import com.ucaacp.backend.entity.User;
import com.ucaacp.backend.service.PsychTestService;
import com.ucaacp.backend.service.UserService;
import com.ucaacp.backend.utils.psychtest.classes.PsychTest;
import com.ucaacp.backend.utils.psychtest.classes.PsychTestAnswer;
import com.ucaacp.backend.utils.psychtest.classes.PsychTestResult;
import com.ucaacp.backend.utils.return_object.ReturnCode;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/psych_test")
@CrossOrigin(origins = "http://localhost:3000") // 开发环境使用
public class PsychTestController {

    @Autowired
    private PsychTestService psychTestService;

    @Autowired
    private UserService userService;

    @CheckLogin
    @GetMapping("/get")
    public ReturnObject get(@RequestParam Map<String,Object> params, HttpSession session) throws Exception {

        String test=params.get("test").toString();
        try {
            return ReturnObject.success(psychTestService.getPsychTestByClassName(test));
        }catch (ClassNotFoundException e){
            ReturnObject.fail("未知的测试名："+test);
        } catch (Exception e) {
            throw new Exception("类目解析错误",e);
        }
        return ReturnObject.fail();
    }

    @CheckLogin
    @GetMapping("/list_all")
    public ReturnObject list_all(@RequestParam Map<String,Object> params, HttpSession session) throws Exception {
        List<QueryListItem> testList=new ArrayList<QueryListItem>();
        testList.add(new QueryListItem("ExampleTest"));
        return ReturnObject.success(testList);
    }


    @CheckLogin
    @PostMapping("/answer")
    public ReturnObject answer(@RequestBody Map<String,Object> params, HttpSession session) throws Exception {

        String test=params.get("test").toString();

        List<List<String>> answer= params.get("answer")==null?new ArrayList<>():(List<List<String>>) params.get("answer");
        PsychTest psychTest=psychTestService.getPsychTestByClassName(test);
        if(answer==null){
            ReturnObject.fail("回答为空");
        }
        PsychTestAnswer psychTestAnswer=new PsychTestAnswer(answer);
        PsychTestResult psychTestResult=psychTest.answer(psychTestAnswer);
        psychTestService.record(test,psychTest.getTitle(),((User)session.getAttribute("user")).getUsername(),psychTestResult.getMessage());
        return ReturnObject.success(psychTestResult);
    }

    @CheckLogin
    @GetMapping("record/list_mine")
    public ReturnObject listMine(HttpSession session) throws Exception {

        String username=((User)session.getAttribute("user")).getUsername();

        List<PsychAssessmentRecordDTO> psychAssessmentRecordDTOList=psychTestService.findDTOByTestUsername(username);

        if(psychAssessmentRecordDTOList!=null){
            return ReturnObject.success(psychAssessmentRecordDTOList);
        }else{
            return ReturnObject.fail("获取失败");
        }
    }



    @Data
    public static class QueryListItem{
        private String className;
        private String title;
        private String description;
        private Integer questionsNumber;
        public QueryListItem(String className) throws ClassNotFoundException, InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
            PsychTestService psychTestService=new PsychTestService();
            this.className = className;
            PsychTest psychTest = psychTestService.getPsychTestByClassName(className);
            this.title=psychTest.getTitle();
            this.description=psychTest.getDescription();
            this.questionsNumber=psychTest.getQuestions().size();
        }
    }
}
