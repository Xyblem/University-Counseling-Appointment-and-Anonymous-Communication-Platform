package com.ucaacp.backend.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Integer postId;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "username", nullable = false, length = 45)
    private String username;

    @Column(name = "publish_time", nullable = false, updatable = false)
    private LocalDateTime publishTime = LocalDateTime.now();

    @Column(name = "is_anonymous", nullable = false)
    private Boolean isAnonymous = false;

    @Column(name = "is_public", nullable = false)
    private Boolean isPublic = true;

    // 构造方法
    public Post() {}
}
