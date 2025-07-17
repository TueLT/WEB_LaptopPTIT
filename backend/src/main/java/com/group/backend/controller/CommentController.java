package com.group.backend.controller;


import com.group.backend.dto.CommentDTO;
import com.group.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;


    @GetMapping("/admin/getAllComment")
    public ResponseEntity<List<CommentDTO>> getAllComment(){
        return ResponseEntity.ok(commentService.getAllComment());
    }

    @PostMapping("/post")
    public ResponseEntity<String> postComment(@RequestBody CommentDTO commentDTO, @RequestParam long laptopId){
        return ResponseEntity.ok(commentService.postComment(commentDTO, laptopId));
    }

    @PutMapping("/modify")
    public ResponseEntity<String> modifyComment(@RequestBody CommentDTO commentDTO){
        return ResponseEntity.ok(commentService.updateComment(commentDTO));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable long id){
        return ResponseEntity.ok(commentService.deleteComment(id));
    }
}
