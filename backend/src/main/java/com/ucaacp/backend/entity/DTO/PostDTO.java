package com.ucaacp.backend.entity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    private Integer postId;
    private String title;
    private String content;
    private String displayName;
    private String username;
    private Boolean isAnonymous;
    private Boolean isPublic;
    private LocalDateTime publishTime;

}
