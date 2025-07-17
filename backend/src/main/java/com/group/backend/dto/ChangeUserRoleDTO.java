package com.group.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ChangeUserRoleDTO {
    private List<Long> userIds;
    private String role;
}
