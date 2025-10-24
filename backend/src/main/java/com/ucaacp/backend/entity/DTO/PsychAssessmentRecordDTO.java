package com.ucaacp.backend.entity.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PsychAssessmentRecordDTO{

    private Integer assessmentId;
    private String assessmentClass;
    private String assessmentName;
    private String testUsername;
    private String testName;
    private String assessmentReport;
    private LocalDateTime assessmentTime;

}
