package com.group.backend.service;

import com.group.backend.dto.PasswordDTO;
import jakarta.mail.MessagingException;

public interface PasswordResetService {
    String sendResetMail(String email) throws MessagingException;
    String resetPassword(String email, PasswordDTO passwordDTO);

    String checkEmail(String email);
}
