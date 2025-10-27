package com.ucaacp.backend.entity.DTO;

import com.ucaacp.backend.entity.enums.ReviewStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PsychKnowledgeDTO {
    private Integer knowledgeId;
    private String title;
    private String content;
    private String teacherPublisherUsername;
    private String teacherPublisherDisplayName;
    private LocalDateTime publishTime = LocalDateTime.now();
    private String adminReviewerUsername;
    private LocalDateTime reviewTime;
    private ReviewStatus reviewStatus = ReviewStatus.PENDING;
}
