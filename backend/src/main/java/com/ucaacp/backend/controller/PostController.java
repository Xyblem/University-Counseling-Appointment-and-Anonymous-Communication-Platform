package com.ucaacp.backend.controller;


import com.ucaacp.backend.entity.Post;
import com.ucaacp.backend.entity.User;
import com.ucaacp.backend.service.PostService;
import com.ucaacp.backend.service.UserService;
import com.ucaacp.backend.utils.return_object.ReturnCode;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/post")
    public ReturnObject post(@RequestBody Map<String,Object> postRequestBody, HttpSession session){
        //检查是否登录
        boolean isLogin=session.getAttribute("user") != null;
        if(!isLogin){
            return ReturnObject.fail(ReturnCode.UNAUTHORIZED.getCode(),"用户未登录");
        }

        String title=(String)postRequestBody.get("title");
        String content=(String)postRequestBody.get("content");
        String username=(String)postRequestBody.get("username");
        String isAnonymous=(String)postRequestBody.get("isAnonymous");
        String isPublic=(String)postRequestBody.get("isPublic");
        
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
        post.setIsAnonymous(Boolean.valueOf(isAnonymous));
        post.setIsPublic(Boolean.valueOf(isPublic));

        if(postService.post(post)!=null){
            return ReturnObject.success();
        }else{
            return ReturnObject.fail("发布失败");
        }
    }
}
