package com.group.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ExceptionDetail> handleException(RuntimeException e) {
        ExceptionDetail ed = new ExceptionDetail();
        ed.setName("Data not found");
        ed.setDetail(e.getMessage());
        ed.setTime(LocalDateTime.now());
        return new ResponseEntity<>(ed, HttpStatus.NOT_FOUND);
    }
}
