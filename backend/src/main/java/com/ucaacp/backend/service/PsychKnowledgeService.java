package com.ucaacp.backend.service;

import com.ucaacp.backend.entity.DTO.PsychKnowledgeDTO;
import com.ucaacp.backend.entity.PsychKnowledge;
import com.ucaacp.backend.entity.PsychKnowledgeReport;
import com.ucaacp.backend.entity.enums.ReviewStatus;
import com.ucaacp.backend.repository.PsychKnowledgeReportRepository;
import com.ucaacp.backend.repository.PsychKnowledgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

}
