package com.group.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDTO {
    private long id;
    private String name;
    private String email;
    private String address;
    private String phone;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate registrationDate;
    private String role;
}
