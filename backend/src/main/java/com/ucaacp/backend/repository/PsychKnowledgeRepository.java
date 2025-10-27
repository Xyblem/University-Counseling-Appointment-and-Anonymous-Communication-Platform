package com.ucaacp.backend.repository;

import com.ucaacp.backend.entity.DTO.PsychKnowledgeDTO;
import com.ucaacp.backend.entity.PsychKnowledge;
import com.ucaacp.backend.entity.enums.ReviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PsychKnowledgeRepository extends JpaRepository<PsychKnowledge, Integer> {



    //用户只能看到审核通过的科普
    @Query("SELECT new com.ucaacp.backend.entity.DTO.PsychKnowledgeDTO(p.knowledgeId,p.title,p.content,p.teacherPublisherUsername," +
            "       CASE WHEN u.nickname IS NOT NULL AND u.nickname != '' THEN u.nickname " +
            "            ELSE u.username END , " +
            "       p.publishTime,p.adminReviewerUsername," +
            "       p.reviewTime,p.reviewStatus) FROM PsychKnowledge p " +
            "JOIN User u ON p.teacherPublisherUsername = u.username WHERE p.reviewStatus='PASSED' ORDER BY p.publishTime DESC")
    List<PsychKnowledgeDTO> findAllPassedPsychKnowledgeDTO();


    //教师能看到自己发布的所有科普
    @Query("SELECT new com.ucaacp.backend.entity.DTO.PsychKnowledgeDTO(p.knowledgeId,p.title,p.content,p.teacherPublisherUsername," +
            "       CASE WHEN u.nickname IS NOT NULL AND u.nickname != '' THEN u.nickname " +
            "            ELSE u.username END , " +
            "       p.publishTime,p.adminReviewerUsername," +
            "       p.reviewTime,p.reviewStatus) FROM PsychKnowledge p " +
            "JOIN User u ON p.teacherPublisherUsername = u.username WHERE p.teacherPublisherUsername=:username ORDER BY p.publishTime DESC")
    List<PsychKnowledgeDTO> findByTeacherPublisherUsername(@Param("username") String username);


    //教师发布科普
    // 直接用PsychKnowledgeRepository.save(PsychKnowledge psychKnowledge);


    //管理员审核科普修改状态为PASSED(审核通过)、BANNED(审核驳回)，
    //教师撤销自己的科普可以修改状态为REVOKED(已撤销)
    @Modifying
    @Query("UPDATE PsychKnowledge p SET p.reviewStatus=:reviewStatus WHERE p.knowledgeId=:knowledgeId")
    int updateReviewStatus(@Param("knowledgeId")Integer knowledgeId,@Param("reviewStatus") ReviewStatus reviewStatus);

    @Modifying
    @Query("UPDATE PsychKnowledge p SET p.reviewStatus=:reviewStatus,p.adminReviewerUsername=:adminReviewerUsername,p.reviewTime=:reviewTime WHERE p.knowledgeId=:knowledgeId")
    int updateReviewStatusAdmin(@Param("knowledgeId")Integer knowledgeId, @Param("adminReviewerUsername")String adminReviewerUsername, @Param("reviewTime")LocalDateTime reviewTime, @Param("reviewStatus") ReviewStatus reviewStatus);



    //管理员需要看到所有未审核的科普
    @Query("SELECT new com.ucaacp.backend.entity.DTO.PsychKnowledgeDTO(p.knowledgeId,p.title,p.content,p.teacherPublisherUsername," +
            "       CASE WHEN u.nickname IS NOT NULL AND u.nickname != '' THEN u.nickname " +
            "            ELSE u.username END , " +
            "       p.publishTime,p.adminReviewerUsername," +
            "       p.reviewTime,p.reviewStatus) FROM PsychKnowledge p " +
            "JOIN User u ON p.teacherPublisherUsername = u.username WHERE p.reviewStatus='PENDING' ORDER BY p.publishTime DESC")
    List<PsychKnowledgeDTO> findAllPendingPsychKnowledgeDTO();

    //管理员还需要看到所有已审核的科普
    @Query("SELECT new com.ucaacp.backend.entity.DTO.PsychKnowledgeDTO(p.knowledgeId,p.title,p.content,p.teacherPublisherUsername," +
            "       CASE WHEN u.nickname IS NOT NULL AND u.nickname != '' THEN u.nickname " +
            "            ELSE u.username END , " +
            "       p.publishTime,p.adminReviewerUsername," +
            "       p.reviewTime,p.reviewStatus) FROM PsychKnowledge p " +
            "JOIN User u ON p.teacherPublisherUsername = u.username WHERE p.reviewStatus!='PENDING' ORDER BY p.publishTime DESC")
    List<PsychKnowledgeDTO> findAllNonPendingPsychKnowledgeDTO();

    //管理员还需要看到所有被举报的科普
    @Query("SELECT DISTINCT new com.ucaacp.backend.entity.DTO.PsychKnowledgeDTO(p.knowledgeId,p.title,p.content,p.teacherPublisherUsername," +
            "       CASE WHEN u.nickname IS NOT NULL AND u.nickname != '' THEN u.nickname " +
            "            ELSE u.username END , " +
            "       p.publishTime,p.adminReviewerUsername," +
            "       p.reviewTime,p.reviewStatus) FROM PsychKnowledge p " +
            "JOIN User u ON p.teacherPublisherUsername = u.username " +
            "JOIN PsychKnowledgeReport pr ON pr.knowledgeId = p.knowledgeId WHERE p.reviewStatus!='REVOKED' ORDER BY p.publishTime DESC")
    List<PsychKnowledgeDTO> findAllReportedPsychKnowledgeDTO();


    //管理员自己审核的所有科普
    @Query("SELECT DISTINCT new com.ucaacp.backend.entity.DTO.PsychKnowledgeDTO(p.knowledgeId,p.title,p.content,p.teacherPublisherUsername," +
            "       CASE WHEN u.nickname IS NOT NULL AND u.nickname != '' THEN u.nickname " +
            "            ELSE u.username END , " +
            "       p.publishTime,p.adminReviewerUsername," +
            "       p.reviewTime,p.reviewStatus) FROM PsychKnowledge p " +
            "JOIN User u ON p.teacherPublisherUsername = u.username " +
            "WHERE p.adminReviewerUsername=:adminReviewerUsername ORDER BY p.publishTime DESC")
    List<PsychKnowledgeDTO> findAllPsychKnowledgeDTOReviewedByAdmin(@Param("adminReviewerUsername")String adminReviewerUsername);


}
