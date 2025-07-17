package com.group.backend.service;

import com.group.backend.dto.CommentDTO;

import java.util.List;

public interface CommentService {
    String postComment(CommentDTO comment, long laptopId);
    String updateComment(CommentDTO commentDTO);
    String deleteComment(long id);

    List<CommentDTO> getAllComment();
}
