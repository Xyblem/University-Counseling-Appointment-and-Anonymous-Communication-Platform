package com.ucaacp.backend.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "psych_knowledge_report")
public class PsychKnowledgeReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Integer reportId;

    @Column(name = "knowledge_id", nullable = false)
    private Integer knowledgeId;

    @Column(name = "report_reason", nullable = false, columnDefinition = "TEXT")
    private String reportReason;

    @Column(name = "reporter_username", length = 50)
    private String reporterUsername;

    @Column(name = "report_time", nullable = false, updatable = false)
    private LocalDateTime reportTime = LocalDateTime.now();

    // 构造方法
    public PsychKnowledgeReport() {}

    public PsychKnowledgeReport(Integer knowledgeId, String reportReason, String reporterUsername) {
        this.knowledgeId = knowledgeId;
        this.reportReason = reportReason;
        this.reporterUsername = reporterUsername;
    }
}