package com.group.backend.service;

import com.group.backend.dto.AuthenticationResponse;
import com.group.backend.dto.payload.LoginRequest;
import com.group.backend.dto.payload.RegisterRequest;
import com.group.backend.entity.Token;
import com.group.backend.entity.User;
import com.group.backend.repository.TokenRepository;
import com.group.backend.repository.UserRepository;
import com.group.backend.security.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;

@Service
public class AuthenticationService {

    private final BCryptPasswordEncoder encoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepo;
    private final TokenRepository tokenRepository;
    private final UserDetailsService userDetailsService;

    public AuthenticationService(BCryptPasswordEncoder encoder, UserRepository userRepo, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager, TokenRepository tokenRepository, UserDetailsService userDetailsService) {
        this.encoder = encoder;
        this.userRepo = userRepo;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.tokenRepository = tokenRepository;
        this.userDetailsService = userDetailsService;
    }


    public AuthenticationResponse register(@RequestBody RegisterRequest request) {
        if(userRepo.findByEmail(request.getDataEmail()).isPresent()) {
            return new AuthenticationResponse(null, null, "Email is already in use");
        }
        User user = new User();
        user.setName(request.getDataName());
        user.setEmail(request.getDataEmail());
        user.setPass(encoder.encode(request.getDataUserPassword()));
        if(request.getDataName().equals("Admin") || request.getDataName().equals("admin")) {
            user.setRole("Admin");
        }else{
            user.setRole("Customer");
        }
        user.setRegistrationDate(LocalDate.now());

        userRepo.save(user);

        String accessToken = jwtTokenProvider.generateAccessToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        saveUserToken(accessToken, refreshToken, user);

        return new AuthenticationResponse(accessToken, refreshToken, "User registration successful");
    }


    public AuthenticationResponse login(@RequestBody LoginRequest request) {

        User user = userRepo.findByEmail(request.getDataEmail()).orElse(null);
        if(user == null){
            return new AuthenticationResponse(null, null, "User not found");
        }
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getDataEmail(), request.getDataUserPassword()));
        }catch (BadCredentialsException e) {
            return new AuthenticationResponse(null, null, "Password is incorrect");
        }

        String accessToken = jwtTokenProvider.generateAccessToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        List<Token> validTokenByUser = tokenRepository.findAllAccessTokenByUser(user.getId());
        if (!validTokenByUser.isEmpty()) {
            validTokenByUser.forEach(t -> {
                t.setLoggedOut(true);
            });
        }

        saveUserToken(accessToken, refreshToken, user);

        return new AuthenticationResponse(accessToken, refreshToken, "User login successful");
    }

    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        String token = authHeader.substring(7);
        String username = jwtTokenProvider.extractEmail(token);

        User user = userRepo.findByEmail(username).orElse(null);
        if(user == null){
            return new ResponseEntity(new AuthenticationResponse(null, null, "User not found"), HttpStatus.UNAUTHORIZED);
        }

        if (jwtTokenProvider.isValidRefreshToken(token, user)) {
            String accessToken = jwtTokenProvider.generateAccessToken(user);
            String refreshToken = jwtTokenProvider.generateRefreshToken(user);

            saveUserToken(accessToken, refreshToken, user);

            return new ResponseEntity(new AuthenticationResponse(accessToken, refreshToken, "New Token generated"), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }

    private void saveUserToken(String accessToken, String refreshToken, User user) {
        Token token = new Token();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }
}
