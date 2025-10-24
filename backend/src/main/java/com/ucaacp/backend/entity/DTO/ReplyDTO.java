package com.ucaacp.backend.entity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReplyDTO {

    private Integer replyId;
    private String content;
    private Integer postId;
    private String displayName;
    private String username;
    private LocalDateTime replyTime;


}
