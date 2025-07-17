package com.group.backend.service;

import com.group.backend.dto.ChangeUserRoleDTO;
import com.group.backend.dto.PasswordDTO;
import com.group.backend.dto.UserDTO;
import com.group.backend.entity.User;

import java.util.List;

public interface UserService {
    UserDTO getInformation();
    UserDTO changeInfo(UserDTO userDTO);
    String changePass(User user, PasswordDTO passwordDTO);
    String changeUsersRole(ChangeUserRoleDTO changeUserRoleDTO);
    String deleteUsers(List<Long> list);
    List<UserDTO> getAllUsers();
    Long getThisMonthUsers();
}
