package com.ucaacp.backend.service;

import com.ucaacp.backend.entity.DTO.PsychAssessmentRecordDTO;
import com.ucaacp.backend.entity.DTO.PsychKnowledgeDTO;
import com.ucaacp.backend.entity.PsychKnowledge;
import com.ucaacp.backend.entity.PsychKnowledgeReport;
import com.ucaacp.backend.entity.enums.ReviewStatus;
import com.ucaacp.backend.repository.PsychKnowledgeReportRepository;
import com.ucaacp.backend.repository.PsychKnowledgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class PsychKnowledgeService {
    @Autowired
    private PsychKnowledgeRepository psychKnowledgeRepository;

    @Autowired
    private PsychKnowledgeReportRepository psychKnowledgeReportRepository;


    public List<PsychKnowledgeDTO> findAllPassedPsychKnowledgeDTO(){
        return psychKnowledgeRepository.findAllPassedPsychKnowledgeDTO();
    }

    public PsychKnowledgeReport report(PsychKnowledgeReport psychKnowledgeReport){
        return psychKnowledgeReportRepository.save(psychKnowledgeReport);
    }

    public List<PsychKnowledgeDTO> findPsychKnowledgeReportDTOByTeacher(String username){
        return psychKnowledgeRepository.findByTeacherPublisherUsername(username);
    }

    public PsychKnowledge post(PsychKnowledge psychKnowledge){
        return psychKnowledgeRepository.save(psychKnowledge);
    }

    public int invoke(Integer psychKnowledgeId){
        return psychKnowledgeRepository.updateReviewStatus(psychKnowledgeId, ReviewStatus.REVOKED);
    }

    public int pass(Integer knowledgeId, String adminReviewerUsername,LocalDateTime reviewTime){
        return psychKnowledgeRepository.updateReviewStatusAdmin(knowledgeId,adminReviewerUsername,reviewTime,ReviewStatus.PASSED);
    }

    public int ban(Integer knowledgeId, String adminReviewerUsername,LocalDateTime reviewTime){
        return psychKnowledgeRepository.updateReviewStatusAdmin(knowledgeId,adminReviewerUsername,reviewTime,ReviewStatus.BANNED);
    }


    public List<PsychKnowledgeDTO> findAllPsychKnowledgeDTOReviewedByAdmin(String adminReviewerUsername){
        return psychKnowledgeRepository.findAllPsychKnowledgeDTOReviewedByAdmin(adminReviewerUsername);
    }


    public List<PsychKnowledgeDTO> findAllPendingPsychKnowledgeDTO(){
        return psychKnowledgeRepository.findAllPendingPsychKnowledgeDTO();
    }

    public List<PsychKnowledgeDTO> findAllReportedPsychKnowledgeDTO(){
        return psychKnowledgeRepository.findAllReportedPsychKnowledgeDTO();
    }

    public List<PsychKnowledgeReport> findAllReportByKnowledgeId(Integer knowledgeId){
        return psychKnowledgeReportRepository.findByKnowledgeId(knowledgeId);
    }

    public void deleteReport(Integer reportId){
        psychKnowledgeReportRepository.deleteByReportId(reportId);
    }

}
