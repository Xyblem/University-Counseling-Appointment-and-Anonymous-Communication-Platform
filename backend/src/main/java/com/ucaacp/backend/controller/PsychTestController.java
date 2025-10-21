package com.ucaacp.backend.controller;

import com.ucaacp.backend.service.PsychTestService;
import com.ucaacp.backend.utils.package_scan.PackageScanner;
import com.ucaacp.backend.utils.psychtest.classes.PsychTest;
import com.ucaacp.backend.utils.psychtest.classes.PsychTestAnswer;
import com.ucaacp.backend.utils.psychtest.test.ExampleTest;
import com.ucaacp.backend.utils.return_object.ReturnCode;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/psych_test")
@CrossOrigin(origins = "http://localhost:3000") // 开发环境使用
public class PsychTestController {

    @Autowired
    private PsychTestService psychTestService;

    @GetMapping("/get")
    public ReturnObject get(@RequestParam Map<String,Object> params, HttpSession session) throws Exception {
        boolean isLogin=session.getAttribute("user") != null;
        if(!isLogin){
            return ReturnObject.fail(ReturnCode.UNAUTHORIZED.getCode(),"用户未登录");
        }
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

    @GetMapping("/list_all")
    public ReturnObject list_all(@RequestParam Map<String,Object> params, HttpSession session) throws Exception {
        boolean isLogin=session.getAttribute("user") != null;
        if(!isLogin){
            return ReturnObject.fail(ReturnCode.UNAUTHORIZED.getCode(),"用户未登录");
        }

        List<QueryListItem> testList=new ArrayList<QueryListItem>();
        testList.add(new QueryListItem("ExampleTest"));
        return ReturnObject.success(testList);
    }


    @PostMapping("/answer")
    public ReturnObject answer(@RequestBody Map<String,Object> params, HttpSession session) throws Exception {
        boolean isLogin=session.getAttribute("user") != null;
        if(!isLogin){
            return ReturnObject.fail(ReturnCode.UNAUTHORIZED.getCode(),"用户未登录");
        }
        String test=params.get("test").toString();

        List<List<String>> answer= params.get("answer")==null?new ArrayList<>():(List<List<String>>) params.get("answer");
        PsychTest psychTest=psychTestService.getPsychTestByClassName(test);
        if(answer==null){
            ReturnObject.fail("回答为空");
        }
        PsychTestAnswer psychTestAnswer=new PsychTestAnswer(answer);
        return ReturnObject.success(psychTest.answer(psychTestAnswer));
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
