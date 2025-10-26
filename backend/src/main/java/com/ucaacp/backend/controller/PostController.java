package com.ucaacp.backend.controller;


import com.ucaacp.backend.annotation.CheckLogin;
import com.ucaacp.backend.entity.*;
import com.ucaacp.backend.entity.DTO.PostDTO;
import com.ucaacp.backend.entity.DTO.ReplyDTO;
import com.ucaacp.backend.service.PostService;
import com.ucaacp.backend.service.UserService;
import com.ucaacp.backend.utils.return_object.ReturnCode;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.persistence.Column;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/post")
@CrossOrigin(origins = "http://localhost:3000") // 开发环境使用
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;


    @CheckLogin
    @PostMapping("/post")
    public ReturnObject post(@RequestBody Map<String,Object> postRequestBody, HttpSession session){

        String title=(String)postRequestBody.get("title");
        String content=(String)postRequestBody.get("content");
        String username=(String)postRequestBody.get("username");
        Boolean isAnonymous=(Boolean)postRequestBody.get("isAnonymous");
        Boolean isPublic=(Boolean)postRequestBody.get("isPublic");
        
        String password=session.getAttribute("password").toString();

        //检查用户是否存在
        if(!userService.exits(username)){
            return ReturnObject.fail("用户名\""+username+"\"不存在");
        }

        Optional<User> optionalUser=userService.login(username,password);
        //检查存储的密码是否匹配
        if(optionalUser.isEmpty()){
            return ReturnObject.fail("用户名密码错误");
        }

        Post post=new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setUsername(username);
        post.setIsAnonymous(isAnonymous);
        post.setIsPublic(isPublic);

        if(postService.post(post)!=null){
            return ReturnObject.success();
        }else{
            return ReturnObject.fail("发布失败");
        }
    }

    @CheckLogin
    @PostMapping("reply")
    public ReturnObject reply(@RequestBody Map<String,Object> replyRequestBody, HttpSession session){

        Integer postId=(Integer)replyRequestBody.get("postId");
        String username=(String)replyRequestBody.get("username");
        String content=(String)replyRequestBody.get("content");

        String password=session.getAttribute("password").toString();

        //检查用户是否存在
        if(!userService.exits(username)){
            return ReturnObject.fail("用户名\""+username+"\"不存在");
        }

        Optional<User> optionalUser=userService.login(username,password);
        //检查存储的密码是否匹配
        if(optionalUser.isEmpty()){
            return ReturnObject.fail("用户名密码错误");
        }

        Reply reply=new Reply();
        reply.setPostId(postId);
        reply.setUsername(username);
        reply.setContent(content);

        if(postService.reply(reply)!=null){
            return ReturnObject.success();
        }else{
            return ReturnObject.fail("发布失败");
        }

    }


    @CheckLogin
    @GetMapping("/all_public_post")
    public ReturnObject getAllPublicPost(HttpSession session){

        List<PostDTO> postDTOList=postService.allPublicPosts();
        if(postDTOList!=null&&!postDTOList.isEmpty()){
            return ReturnObject.success(postDTOList);
        }else {
            return ReturnObject.fail("获取社区倾述列表失败");
        }
    }

    @CheckLogin
    @GetMapping("/all_reported_post")
    public ReturnObject getAllReportedPost(HttpSession session){

        List<PostDTO> postDTOList=postService.allReportedPosts();
        if(postDTOList!=null&&!postDTOList.isEmpty()){
            return ReturnObject.success(postDTOList);
        }else {
            return ReturnObject.fail("获取社区倾述列表失败");
        }
    }

    @CheckLogin
    @GetMapping("/all_replies")
    public ReturnObject getAllReplies(@RequestParam Map<String,Object> params,HttpSession session){

        String postId=(String)params.get("postId");
        List<ReplyDTO> replyDTOList=postService.allRepliesByPostId(Integer.valueOf(postId));
        if(replyDTOList!=null){
            return ReturnObject.success(replyDTOList);
        }else{
            return ReturnObject.fail("获取回复列表失败");
        }
    }



    @CheckLogin
    @PostMapping("/report")
    public ReturnObject report(@RequestBody Map<String,Object> reportRequestBody, HttpSession session){

        String postId=reportRequestBody.get("postId").toString();
        String reportReason=reportRequestBody.get("reportReason").toString();
        String reporterUsername=reportRequestBody.get("reporterUsername").toString();


        String password=session.getAttribute("password").toString();

        //检查用户是否存在
        if(!userService.exits(reporterUsername)){
            return ReturnObject.fail("用户名\""+reporterUsername+"\"不存在");
        }

        Optional<User> optionalUser=userService.login(reporterUsername,password);
        //检查存储的密码是否匹配
        if(optionalUser.isEmpty()){
            return ReturnObject.fail("用户名密码错误");
        }

        PostReport postReport=new PostReport();
        postReport.setPostId(Integer.valueOf(postId));
        postReport.setReportReason(reportReason);
        postReport.setReporterUsername(reporterUsername);

        if(postService.report(postReport)!=null){
            return ReturnObject.success();
        }else{
            return ReturnObject.fail("举报失败");
        }
    }


    @CheckLogin
    @GetMapping("/all_reports")
    public ReturnObject getAllReports(@RequestParam Map<String,Object> params,HttpSession session) {
        String postId = (String) params.get("postId");
        List<PostReport> postReportList=postService.allPostReportsByPostId(Integer.valueOf(postId));
        if(postReportList!=null){
            return ReturnObject.success(postReportList);
        }else{
            return ReturnObject.fail("获取举报列表失败");
        }
    }

}
