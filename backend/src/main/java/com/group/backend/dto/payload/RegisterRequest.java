package com.group.backend.dto.payload;

import lombok.Data;

@Data
public class RegisterRequest {
    private String dataName;
    private String dataEmail;
    private String dataUserPassword;
}
