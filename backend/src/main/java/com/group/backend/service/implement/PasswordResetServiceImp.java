package com.group.backend.service.implement;

import com.group.backend.dto.PasswordDTO;
import com.group.backend.entity.User;
import com.group.backend.repository.UserRepository;
import com.group.backend.service.EmailService;
import com.group.backend.service.PasswordResetService;
import com.group.backend.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetServiceImp implements PasswordResetService {

    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private UserRepository userRepo;

    @Override
    public String sendResetMail(String email) throws MessagingException {
        if(userDetailsService.loadUserByUsername(email) == null) {
            return "User not found";
        }
        emailService.sendEmail(email);
        return "Email sent successfully";
    }

    @Override
    public String resetPassword(String email, PasswordDTO passwordDTO){
        User user = userRepo.findByEmail(email).orElse(null);
        userService.changePass(user, passwordDTO);
        return "Password reset successfully";
    }

    @Override
    public String checkEmail(String email) {
        User user = userRepo.findByEmail(email).orElse(null);
        if(user == null) {
            return "User not found";
        }
        return "User found";
    }
}
