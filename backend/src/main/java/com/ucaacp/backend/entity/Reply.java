package com.ucaacp.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "reply")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reply_id")
    private Integer replyId;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "post_id", nullable = false)
    private Integer postId;

    @Column(name = "username", nullable = false, length = 45)
    private String username;

    @Column(name = "reply_time", nullable = false, updatable = false)
    private LocalDateTime replyTime = LocalDateTime.now();

    // 构造方法
    public Reply() {}
}