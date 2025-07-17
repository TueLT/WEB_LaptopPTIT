package com.group.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDTO {
    private long id;
    private long userId;
    private String userName;
    private String content;
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
    private LocalDateTime postAt;
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
    private LocalDateTime updateAt;
}
