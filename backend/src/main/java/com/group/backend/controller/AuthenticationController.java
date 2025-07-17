package com.group.backend.controller;

import com.group.backend.dto.UserDTO;
import com.group.backend.dto.payload.LoginRequest;
import com.group.backend.dto.payload.RegisterRequest;
import com.group.backend.dto.AuthenticationResponse;
import com.group.backend.security.CurrentUser;
import com.group.backend.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private CurrentUser currentUser;
    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        return authenticationService.refreshToken(request, response);
    }

    @GetMapping("/check-accessToken")
    public ResponseEntity<String> checkAccessToken(){
        return ResponseEntity.ok("Token is still valid");
    }

    @GetMapping("/currentUser")
    public ResponseEntity<UserDTO> getCurrentUser(){
        return ResponseEntity.ok(modelMapper.map(currentUser.getCurrentUser(), UserDTO.class));
    }
}
