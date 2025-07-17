package com.group.backend.service.implement;

import com.group.backend.dto.CommentDTO;
import com.group.backend.entity.Comment;
import com.group.backend.entity.Laptop;
import com.group.backend.entity.User;
import com.group.backend.repository.CommentRepository;
import com.group.backend.repository.LaptopRepository;
import com.group.backend.security.CurrentUser;
import com.group.backend.service.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImp implements CommentService {

    @Autowired
    private CurrentUser currentUser;
    @Autowired
    private LaptopRepository laptopRepo;
    @Autowired
    private CommentRepository commentRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String postComment(CommentDTO commentDTO, long laptopId) {
        Comment comment = modelMapper.map(commentDTO, Comment.class);
        User user = currentUser.getCurrentUser();
        Laptop laptop = laptopRepo.findById(laptopId).orElse(null);
        comment.setUser(user);
        comment.setLaptop(laptop);
        comment.setPostAt(LocalDateTime.now());
        commentRepo.save(comment);
        return "Comment posted successfully";
    }

    @Override
    public String updateComment(CommentDTO commentDTO) {
        Comment comment = commentRepo.findById(commentDTO.getId()).orElseThrow(() -> new RuntimeException("Comment with id: " + commentDTO.getId() + " not found"));
        comment.setUpdateAt(LocalDateTime.now());
        comment.setContent(commentDTO.getContent());
        commentRepo.save(comment);
        return "Comment updated successfully";
    }

    @Override
    public String deleteComment(long id) {
        Comment comment = commentRepo.findById(id).orElseThrow(() -> new RuntimeException("Comment with id: " + id + " not found"));
        commentRepo.deleteById(id);
        return "Comment deleted successfully";
    }

    @Override
    public List<CommentDTO> getAllComment () {
        List<Comment> list = commentRepo.findAll();
        return list.stream()
                .map(tmp -> modelMapper.map(tmp, CommentDTO.class))
                .collect(Collectors.toList());
    }
}
