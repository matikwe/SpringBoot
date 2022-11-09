package com.example.SpringBoot.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
    public void registerNewUser(
            @RequestBody User user) {
        user.setRole(Role.USER.name());
        userService.addNewUser(user);
    }

    @DeleteMapping(path = "{userId}")
    public void deleteUser(
            @PathVariable("userId") Long id) {
        userService.deleteUser(id);
    }

    @PutMapping(path = "{userId}")
    public void updateUser(
            @PathVariable("userId") Long id,
            @RequestParam(required = false) String login,
            @RequestParam(required = false) String password,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String surname) {
        userService.updateUser(id, login, password, email, name, surname);
    }

    @GetMapping(path = "login")
    public void verifyLoginDetails(
            @RequestParam String login,
            @RequestParam String password) {
        userService.verifyLoginDetails(login, password);
    }

    @PutMapping(path = "changeRole/{userIdToChange}")
    public void changeRole(@PathVariable("userIdToChange") Long userIdToChange, @RequestParam Long currentUserId, @RequestParam String role) {
        userService.changeRole(userIdToChange, currentUserId, role);
    }
}
