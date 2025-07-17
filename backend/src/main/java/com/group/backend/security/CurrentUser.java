package com.group.backend.security;

import com.group.backend.entity.User;
import com.group.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;


@Component
public class CurrentUser {

    @Autowired
    private UserRepository userRepo;

    public User getCurrentUser() {
        String currentEmail = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            currentEmail = authentication.getName();
        }
        User currentUser = userRepo.findByEmail(currentEmail).orElseThrow();
        return currentUser;
    }
}
