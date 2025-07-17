package com.group.backend.dto.payload;

import lombok.Data;

@Data
public class LoginRequest {
    private String dataEmail;
    private String dataUserPassword;
}
