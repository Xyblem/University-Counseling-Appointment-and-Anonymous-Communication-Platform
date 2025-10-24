package com.ucaacp.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "post_report")
public class PostReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Integer reportId;

    @Column(name = "post_id", nullable = false)
    private Integer postId;

    @Column(name = "report_reason", nullable = false, columnDefinition = "TEXT")
    private String reportReason;

    @Column(name = "reporter_username", length = 50)
    private String reporterUsername;

    @Column(name = "report_time", nullable = false, updatable = false)
    private LocalDateTime reportTime = LocalDateTime.now();

    // 构造方法
    public PostReport() {}

    public PostReport(Integer postId, String reportReason, String reporterUsername) {
        this.postId = postId;
        this.reportReason = reportReason;
        this.reporterUsername = reporterUsername;
    }
}
