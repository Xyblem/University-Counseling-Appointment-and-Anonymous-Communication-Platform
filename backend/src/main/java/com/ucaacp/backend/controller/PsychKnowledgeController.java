package com.ucaacp.backend.controller;

import com.ucaacp.backend.annotation.CheckLogin;
import com.ucaacp.backend.annotation.CheckUserRole;
import com.ucaacp.backend.entity.DTO.PsychKnowledgeDTO;
import com.ucaacp.backend.entity.PsychKnowledge;
import com.ucaacp.backend.entity.PsychKnowledgeReport;
import com.ucaacp.backend.entity.enums.UserRole;
import com.ucaacp.backend.service.PsychKnowledgeService;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/psych_knowledge")
@CrossOrigin(origins = "http://localhost:3000") // 开发环境使用
public class PsychKnowledgeController {

    @Autowired
    private PsychKnowledgeService psychKnowledgeService;

    @CheckLogin
    @GetMapping("/list_public")
    public ReturnObject listPublic(HttpSession session) {
        List<PsychKnowledgeDTO> knowledgeDTOList=psychKnowledgeService.findAllPassedPsychKnowledgeDTO();
        if(knowledgeDTOList!=null){
            return ReturnObject.success(knowledgeDTOList);
        }else{
            return ReturnObject.fail("获取心理知识科普失败");
        }
    }



    @CheckLogin
    @PostMapping("/report")
    public ReturnObject report(@RequestBody Map<String,Object> reportRequest,HttpSession session) {

        Integer knowledgeId=(Integer)reportRequest.get("knowledgeId");
        String reportReason=(String)reportRequest.get("reportReason");
        String reporterUsername=(String)reportRequest.get("reporterUsername");

        PsychKnowledgeReport psychKnowledgeReport=new PsychKnowledgeReport();
        psychKnowledgeReport.setKnowledgeId(knowledgeId);
        psychKnowledgeReport.setReportReason(reportReason);
        psychKnowledgeReport.setReporterUsername(reporterUsername);

        if(psychKnowledgeService.report(psychKnowledgeReport)!=null){
            return ReturnObject.success();
        }else{
            return ReturnObject.fail("举报失败");
        }
    }

    @CheckLogin
    @GetMapping("/teacher/mine")
    public ReturnObject teacherMine(@RequestParam Map<String,Object> params,HttpSession session) {
        String teacherUsername=(String)params.get("teacherUsername");
        List<PsychKnowledgeDTO> psychKnowledgeDTOList=psychKnowledgeService.findPsychKnowledgeReportDTOByTeacher(teacherUsername);
        if(psychKnowledgeDTOList!=null){
            return ReturnObject.success(psychKnowledgeDTOList);
        }else{
            return ReturnObject.fail("获取心理知识科普失败");
        }
    }


    @CheckLogin
    @CheckUserRole(UserRole.TEACHER)
    @PostMapping("/teacher/post")
    public ReturnObject teacherPost(@RequestBody Map<String,Object> postRequest,HttpSession session) {
        String teacherUsername=(String)postRequest.get("teacherPublisherUsername");
        String title=(String)postRequest.get("title");
        String content=(String)postRequest.get("content");

        PsychKnowledge psychKnowledge=new PsychKnowledge(title,content,teacherUsername);

        if(psychKnowledgeService.post(psychKnowledge)!=null){
            return ReturnObject.success();
        }else{
            return ReturnObject.fail("提交失败");
        }

    }

    @CheckLogin
    @CheckUserRole(UserRole.TEACHER)
    @PostMapping("/teacher/invoke")
    public ReturnObject teacherInvoke(@RequestBody Map<String,Object> invokeRequest,HttpSession session) {
        Integer knowledgeId=(Integer)invokeRequest.get("knowledgeId");
        if(psychKnowledgeService.invoke(knowledgeId)>=0){
            return ReturnObject.success();
        }else{
            return ReturnObject.fail("撤回失败");
        }
    }

}
