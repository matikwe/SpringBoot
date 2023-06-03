package com.example.SpringBoot.user;

import com.example.SpringBoot.salt.Salt;
import com.example.SpringBoot.salt.SaltRepository;
import com.example.SpringBoot.utils.OldPassword;
import com.example.SpringBoot.utils.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final SaltRepository saltRepository;

    @Autowired
    public UserService(UserRepository userRepository, SaltRepository saltRepository) {
        this.userRepository = userRepository;
        this.saltRepository = saltRepository;
    }


    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User addNewUser(User user) {
        Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
        if (userByEmail.isPresent()) {
            throw new IllegalStateException("email: " + user.getEmail() + " exists!");
        }

        Optional<User> userByLogin = userRepository.findUserByLogin(user.getLogin());
        if (userByLogin.isPresent()) {
            throw new IllegalStateException("login: " + user.getLogin() + " exists!");
        }

        if (isValidPassword(user.getPassword()).length() > 0) {
            throw new IllegalStateException(isValidPassword(user.getPassword()));
        }

        user.setSalt(generateSalt(user));
        user.setPassword(generateSecurePassword(user.getPassword(), user.getSalt()));
        userRepository.save(user);
        return user;
    }

    public ResponseEntity deleteUser(Long userId, OldPassword oldPassword) {
        User userRepo = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "user with id: " + userId + " does not exist!"
                ));

        if (userRepo.getPassword().equals(generateSecurePassword(oldPassword.getOldPassword(), userRepo.getSalt()))) {
            userRepository.deleteById(userId);
        } else {
            throw new IllegalStateException("The entered passwords are different.");
        }
        return new ResponseEntity("Account deleted successfully.", HttpStatus.OK);
    }

    @Transactional
    public User updateUser(Long userId,
                           User user,
                           String oldPassword) {
        User userRepo = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "user with id: " + userId + " does not exist!"
                ));

        if (user.getLogin() != null && user.getLogin().length() > 0 &&
                !Objects.equals(userRepo.getLogin(), user.getLogin())) {
            Optional<User> userByLogin = userRepository.findUserByLogin(user.getLogin());
            if (userByLogin.isPresent()) {
                throw new IllegalStateException("login: " + user.getLogin() + " exists!");
            }
            userRepo.setLogin(user.getLogin());
        }

        if (generateSecurePassword(oldPassword, userRepo.getSalt()).equals(userRepo.getPassword())) {
            if (user.getPassword() != null && user.getPassword().length() > 0 &&
                    !Objects.equals(userRepo.getPassword(), generateSecurePassword(user.getPassword(), userRepo.getSalt()))) {
                userRepo.setPassword(generateSecurePassword(user.getPassword(), userRepo.getSalt()));
            }
        } else {
            throw new IllegalStateException("The entered passwords are different.");
        }

        if (user.getEmail() != null && user.getEmail().length() > 0 &&
                !Objects.equals(userRepo.getEmail(), user.getEmail())) {
            Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
            if (userByEmail.isPresent()) {
                throw new IllegalStateException("email: " + user.getEmail() + " exists!");
            }
            userRepo.setEmail(user.getEmail());
        }

        if (user.getName() != null && user.getName().length() > 0 &&
                !Objects.equals(userRepo.getName(), user.getName())) {
            userRepo.setName(user.getName());
        }

        if (user.getSurname() != null && user.getSurname().length() > 0 &&
                !Objects.equals(userRepo.getSurname(), user.getSurname())) {
            userRepo.setSurname(user.getSurname());
        }

        return userRepo;
    }

    public User verifyLoginDetails(String login, String password) {
        Optional<User> getUserByLogin = userRepository.findUserByLogin(login);
        if (getUserByLogin.isPresent()) {
            return userRepository.checkLoginAndPassword(login, generateSecurePassword(password, getUserByLogin.get().getSalt()))
                    .orElseThrow(() -> new IllegalStateException(
                            "Login or password is incorrect."
                    ));
        } else {
            throw new IllegalStateException("Login is incorrect.");
        }
    }

    @Transactional
    public User changeRole(Long userIdToChange, Long currentUserId, String role) {
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
                    throw new IllegalStateException("Currently has a role: " + role);
                }
            } else {
                throw new IllegalStateException("Role: " + role + " don't exists");
            }
        } else {
            throw new IllegalStateException("user with id: " + currentUserId + " cannot modify role !");
        }
        return userToChangeRole;
    }

    public ResponseEntity deleteUserFromAdminPanel(Long currentUser, Long userIdToDelete) {
        User user = userRepository.findById(currentUser)
                .orElseThrow(() -> new IllegalStateException(
                        "user with id: " + currentUser + " does not exist!"
                ));

        if (user.getRole().equals(Role.ADMIN.name())) {
            userRepository.deleteById(userIdToDelete);
        } else {
            throw new IllegalStateException("You must have ADMIN permission to delete a user.");
        }
        return new ResponseEntity("Account deleted successfully.", HttpStatus.OK);
    }

    private String generateSecurePassword(String password, Long salt_id) {
        Optional<Salt> salt = saltRepository.checkExistSalt(salt_id);
        System.out.println("salt: " + salt.get().getSalt());
        return salt.map(value -> PasswordUtils.generateSecurePassword(password, value.getSalt())).orElse(null);
    }

    private Salt generateSalt(User user) {
        Salt newSalt = new Salt(PasswordUtils.getSalt(30));
        saltRepository.save(newSalt);
        user.setSalt(newSalt);
        return newSalt;
    }

    private String isValidPassword(String password) {
        List<String> regex = getRegex();
        List<String> messageList = getMessage();
        StringBuilder message = new StringBuilder();
        if (password == null || password.isEmpty()) {
            return "Enter your password.";
        }
        for (String mess : messageList) {
            if (!checkRegex(password, regex.get(messageList.indexOf(mess)))) {
                message.append(mess);
            }
        }
        return message.toString();
    }

    private boolean checkRegex(String password, String regex) {
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(password);

        return m.matches();
    }

    private List<String> getRegex() {
        List<String> regex = new ArrayList<>();
        regex.add(".*[0-9]{1,}.*");
        regex.add(".*[a-z]{1,}.*");
        regex.add(".*[A-Z]{1,}.*");
        regex.add(".*[@#$%^&+=]{1,}.*");
        regex.add("^(?=\\S+$).{8,20}$");
        return regex;
    }

    private List<String> getMessage() {
        List<String> messageList = new ArrayList<>();
        messageList.add("The password must contain a number. ");
        messageList.add("The password must contain a lowercase character. ");
        messageList.add("The password must contain a capital character. ");
        messageList.add("The password must contain a special character. ");
        messageList.add("The password must contain between 8 and 20 characters. ");
        return messageList;
    }
}
