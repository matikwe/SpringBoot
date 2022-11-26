package com.example.SpringBoot.user;

import com.example.SpringBoot.utils.OldPassword;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping(path = "register")
    public User registerNewUser(
            @RequestBody User user) {
        user.setRole(Role.USER.name());
        return userService.addNewUser(user);
    }

    @DeleteMapping(path = "{userId}")
    public User deleteUser(
            @PathVariable("userId") Long id,
            @RequestBody OldPassword oldPassword) {
        return userService.deleteUser(id, oldPassword);
    }

    @PutMapping(path = "{userId}")
    public User updateUser(
            @PathVariable("userId") Long id,
            @RequestBody User user,
            @RequestParam String oldPassword) {
        return userService.updateUser(id, user, oldPassword);
    }

    @PostMapping(path = "login")
    public User verifyLoginDetails(
            @RequestBody User user) {
        return userService.verifyLoginDetails(user.getLogin(), user.getPassword());
    }

    @PutMapping(path = "changeRole/{userIdToChange}")
    public void changeRole(@PathVariable("userIdToChange") Long userIdToChange, @RequestParam Long currentUserId, @RequestParam String role) {
        userService.changeRole(userIdToChange, currentUserId, role);
    }
}
