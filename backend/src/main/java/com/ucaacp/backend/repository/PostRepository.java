package com.ucaacp.backend.repository;

import com.ucaacp.backend.entity.Post;
import com.ucaacp.backend.entity.DTO.PostDTO;
import com.ucaacp.backend.entity.DTO.ReplyDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {


    @Query("SELECT new com.ucaacp.backend.entity.DTO.PostDTO(" +
            "p.postId, p.title, p.content, " +
            "CASE " +
            "   WHEN p.isAnonymous = true THEN '匿名用户' " +
            "   WHEN u.nickname IS NOT NULL AND u.nickname != '' THEN u.nickname " +
            "   ELSE u.username " +
            "END, " +
            "CASE " +
            "   WHEN p.isAnonymous = true THEN NULL " +
            "   ELSE u.username " +
            "END, " +
            "p.isAnonymous, p.isPublic,p.publishTime)  " +
            "FROM Post p " +
            "JOIN User u ON u.username=p.username " +
            "WHERE p.isPublic = true " +
            "ORDER BY p.publishTime DESC")
    List<PostDTO> findPublicPosts();


    @Query("SELECT DISTINCT new com.ucaacp.backend.entity.DTO.PostDTO(" +
            "p.postId, p.title, p.content, " +
            "CASE " +
            "   WHEN p.isAnonymous = true THEN '匿名用户' " +
            "   WHEN u.nickname IS NOT NULL AND u.nickname != '' THEN u.nickname " +
            "   ELSE u.username " +
            "END, " +
            "CASE " +
            "   WHEN p.isAnonymous = true THEN NULL " +
            "   ELSE u.username " +
            "END, " +
            "p.isAnonymous, p.isPublic,p.publishTime)  " +
            "FROM Post p " +
            "JOIN User u ON u.username=p.username " +
            "JOIN PostReport pr ON pr.postId=p.postId " +
            "WHERE p.isPublic = true " +
            "ORDER BY p.publishTime DESC")
    List<PostDTO> findReportedPosts();




    @Query("SELECT new com.ucaacp.backend.entity.DTO.ReplyDTO(r.replyId, r.content, r.postId, " +
            "       CASE WHEN u.nickname IS NOT NULL AND u.nickname != '' THEN u.nickname " +
            "            ELSE u.username" +
            "           END," +
            "       r.username,r.replyTime) " +
            "FROM Reply r JOIN User u ON r.username = u.username " +
            "WHERE r.postId=:postId "+
            "ORDER BY r.replyTime ASC")
    List<ReplyDTO> findRepliesByPostId(@Param("postId") Integer postId);


}
