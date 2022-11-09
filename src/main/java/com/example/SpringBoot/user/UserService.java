package com.example.SpringBoot.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public void addNewUser(User user) {
        Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
        if (userByEmail.isPresent()) {
            throw new IllegalStateException("email: " + user.getEmail() + " exists!");
        }

        Optional<User> userByLogin = userRepository.findUserByLogin(user.getLogin());
        if (userByLogin.isPresent()) {
            throw new IllegalStateException("login: " + user.getLogin() + " exists!");
        }
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        boolean exists = userRepository.existsById(userId);
        if (!exists) {
            throw new IllegalStateException("user with id: " + userId + " does not exist !");
        }
        userRepository.deleteById(userId);
    }

    @Transactional
    public void updateUser(Long userId,
                           String login,
                           String password,
                           String email,
                           String name,
                           String surname) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "user with id: " + userId + " does not exist!"
                ));

        if (login != null && login.length() > 0 &&
                !Objects.equals(user.getLogin(), login)) {
            Optional<User> userByLogin = userRepository.findUserByLogin(login);
            if (userByLogin.isPresent()) {
                throw new IllegalStateException("login: " + user.getLogin() + " exists!");
            }
            user.setLogin(login);
        }

        if (password != null && password.length() > 0 &&
                !Objects.equals(user.getPassword(), password)) {
            user.setPassword(password);
        }

        if (email != null && email.length() > 0 &&
                !Objects.equals(user.getEmail(), email)) {
            Optional<User> userByEmail = userRepository.findUserByEmail(email);
            if (userByEmail.isPresent()) {
                throw new IllegalStateException("email: " + user.getEmail() + " exists!");
            }
            user.setEmail(email);
        }

        if (name != null && name.length() > 0 &&
                !Objects.equals(user.getName(), name)) {
            user.setName(name);
        }

        if (surname != null && surname.length() > 0 &&
                !Objects.equals(user.getSurname(), surname)) {
            user.setSurname(surname);
        }
    }

    public void verifyLoginDetails(String login, String password) {
        Optional<User> user = userRepository.checkLoginAndPassword(login, password);
        if (!user.isPresent()) {
            throw new IllegalStateException("Login or password is incorrect.");
        }
    }

    @Transactional
    public void changeRole(Long userIdToChange, Long currentUserId, String role) {
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new IllegalStateException(
                        "user with id: " + currentUserId + " does not exist!"
                ));

        User userToChangeRole = userRepository.findById(userIdToChange)
                .orElseThrow(() -> new IllegalStateException(
                        "user with id: " + userIdToChange + " does not exist!"
                ));

        if (currentUser.getRole().equals(Role.ADMIN.toString())) {
            if ((role.equals(Role.ADMIN.name()) || role.equals(Role.USER.name()))) {
                if (!Objects.equals(userToChangeRole.getRole(), role)) {
                    userToChangeRole.setRole(role);
                } else {
                    throw new IllegalStateException("niby ma role" + role);
                }
            } else {
                throw new IllegalStateException("Role: " + role + " don't exists");
            }
        } else {
            throw new IllegalStateException("user with id: " + currentUserId + " cannot modify role !");
        }

    }
}
