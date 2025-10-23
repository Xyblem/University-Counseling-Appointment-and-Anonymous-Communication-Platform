package com.ucaacp.backend.service;

import com.ucaacp.backend.entity.Post;
import com.ucaacp.backend.repository.PostRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post post(@Valid Post post) {
        return postRepository.save(post);
    }
}
