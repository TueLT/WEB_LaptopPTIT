package com.group.backend.controller;

import com.group.backend.dto.ChangeUserRoleDTO;
import com.group.backend.dto.UserDTO;
import com.group.backend.entity.User;
import com.group.backend.security.CurrentUser;
import com.group.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.group.backend.dto.PasswordDTO;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private CurrentUser currentUser;

    @GetMapping("/info")
    public ResponseEntity<UserDTO> showInformation(){
        return ResponseEntity.ok(userService.getInformation());
    }

    @GetMapping("/admin/getAllUsers")
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/admin/getThisMonthUsers")
    public ResponseEntity<Long> countThisMonthUsers(){
        return ResponseEntity.ok(userService.getThisMonthUsers());
    }

    @PutMapping("/changeInfo")
    public ResponseEntity<UserDTO> changeInfo(@RequestBody UserDTO userDTO){
        return ResponseEntity.ok(userService.changeInfo(userDTO));
    }

    @PutMapping("/changePass")
    public ResponseEntity<String> changePass(@RequestBody PasswordDTO passwordDTO){
        User thisUser = currentUser.getCurrentUser();
        return ResponseEntity.ok(userService.changePass(thisUser, passwordDTO));
    }

    @PutMapping("/admin/changeUsersRole")
    public ResponseEntity<String> changeUsersRole(@RequestBody ChangeUserRoleDTO changeUserRoleDTO){
        return ResponseEntity.ok(userService.changeUsersRole(changeUserRoleDTO));
    }

    @DeleteMapping("/admin/deleteUsers")
    public ResponseEntity<String> deleteUsers(@RequestBody List<Long> list){
        return ResponseEntity.ok(userService.deleteUsers(list));
    }
}
