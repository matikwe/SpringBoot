package com.example.SpringBoot.user;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository
        extends JpaRepository<User, Long> {
    @Query("SELECT u FROM Users u WHERE u.email = ?1")
    Optional<User> findUserByEmail(String email);

    @Query("SELECT u FROM Users u WHERE u.login = ?1")
    Optional<User> findUserByLogin(String login);

    @Query("SELECT u FROM Users u WHERE u.login = ?1 and u.password = ?2")
    Optional<User> checkLoginAndPassword(String login, String password);
}
