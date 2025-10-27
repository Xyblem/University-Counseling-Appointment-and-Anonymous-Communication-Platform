package com.ucaacp.backend.repository;

import com.ucaacp.backend.entity.DTO.PsychAssessmentRecordDTO;
import com.ucaacp.backend.entity.PsychAssessmentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PsychAssessmentRepository extends JpaRepository<PsychAssessmentRecord,Integer> {



    @Query("SELECT DISTINCT new com.ucaacp.backend.entity.DTO.PsychAssessmentRecordDTO(p.assessmentId,p.assessmentClass,p.assessmentName,p.testUsername," +
            "       u.name," +
            "       p.assessmentReport,p.assessmentTime) " +
            "FROM PsychAssessmentRecord p " +
            "JOIN User u ON p.testUsername = u.username " +
            "WHERE p.testUsername=:testUsername")
    List<PsychAssessmentRecordDTO> findDTOByTestUsername(@Param("testUsername") String testUsername);
}
