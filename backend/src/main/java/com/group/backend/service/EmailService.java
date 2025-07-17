package com.group.backend.service;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmail(String to) throws MessagingException;
}
