package com.group.backend.config.handler;

import com.group.backend.entity.Token;
import com.group.backend.repository.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomLogoutHandler implements LogoutHandler {

    @Autowired
    private TokenRepository tokenRepo;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null && !authHeader.startsWith("Bearer ")) {
            return;
        }

        String accessToken = authHeader.substring(7);
        Token storedToken = tokenRepo.findByAccessToken(accessToken).orElse(null);

        if(accessToken != null){
            storedToken.setLoggedOut(true);
            tokenRepo.save(storedToken);
        }
    }
}
