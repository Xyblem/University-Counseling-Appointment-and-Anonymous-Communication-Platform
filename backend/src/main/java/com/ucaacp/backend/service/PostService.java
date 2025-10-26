package com.ucaacp.backend.service;

import com.ucaacp.backend.entity.Post;
import com.ucaacp.backend.entity.DTO.PostDTO;
import com.ucaacp.backend.entity.PostReport;
import com.ucaacp.backend.entity.Reply;
import com.ucaacp.backend.entity.DTO.ReplyDTO;
import com.ucaacp.backend.repository.PostReportRepository;
import com.ucaacp.backend.repository.PostRepository;
import com.ucaacp.backend.repository.ReplyRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private PostReportRepository postReportRepository;

    public Post post(@Valid Post post) {
        return postRepository.save(post);
    }

    public Reply reply(@Valid Reply reply) {
        return replyRepository.save(reply);
    }

    public List<PostDTO> allPublicPosts() {
        return postRepository.findPublicPosts();
    }

    public List<PostDTO> allReportedPosts() {
        return postRepository.findReportedPosts();
    }

    public List<PostReport> allPostReportsByPostId(Integer postId) {
        return postReportRepository.findByPostId(postId);
    }

    public List<ReplyDTO> allRepliesByPostId(Integer postId) {
        return postRepository.findRepliesByPostId(postId);
    }

    public PostReport report(@Valid PostReport postReport) {
        return postReportRepository.save(postReport);
    }


}
