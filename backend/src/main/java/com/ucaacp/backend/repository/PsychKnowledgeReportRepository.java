package com.ucaacp.backend.repository;

import com.ucaacp.backend.entity.PsychKnowledgeReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PsychKnowledgeReportRepository extends JpaRepository<PsychKnowledgeReport, Integer> {

    //管理员需要看到针对某科普的举报列表
    List<PsychKnowledgeReport> findByKnowledgeId(Integer knowledgeId);

    //管理员可以删除某条举报
     void deleteByReportId(Integer reportId);

    //用户发起举报
    //直接用PsychKnowledgeReportRepository.save(PsychKnowledgeReport psychKnowledgeReport);
}
