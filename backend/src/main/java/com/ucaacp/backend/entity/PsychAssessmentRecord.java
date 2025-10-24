package com.ucaacp.backend.entity;

import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "psych_assessment_record")
public class PsychAssessmentRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assessment_id")
    private Integer assessmentId;

    @Column(name = "assessment_class", nullable = false, length = 50)
    private String assessmentClass;

    @Column(name = "assessment_name", nullable = false, length = 100)
    private String assessmentName;

    @Column(name = "test_username", length = 50)
    private String testUsername;

    @Column(name = "assessment_report", nullable = false, columnDefinition = "TEXT")
    private String assessmentReport;

    @Column(name = "assessment_time", nullable = false, updatable = false)
    private LocalDateTime assessmentTime = LocalDateTime.now();

    // 构造方法
    public PsychAssessmentRecord() {}

    public PsychAssessmentRecord(String assessmentClass, String assessmentName,
                                 String testUsername, String assessmentReport) {
        this.assessmentClass = assessmentClass;
        this.assessmentName = assessmentName;
        this.testUsername = testUsername;
        this.assessmentReport = assessmentReport;
    }
}
