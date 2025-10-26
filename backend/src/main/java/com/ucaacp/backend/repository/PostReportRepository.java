package com.ucaacp.backend.repository;

import com.ucaacp.backend.entity.PostReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostReportRepository extends JpaRepository<PostReport, Integer> {

    public List<PostReport> findByPostId(Integer postId);
}
