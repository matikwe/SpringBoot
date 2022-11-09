package com.example.SpringBoot.user;

import javax.persistence.*;

@Entity(name = "Users")
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(name = "email_unique", columnNames = "email"),
                @UniqueConstraint(name = "login_unique", columnNames = "login")
        }
)
public class User {
    @Id
    @SequenceGenerator(name = "users_sequence",
            sequenceName = "users_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "users_sequence"
    )
    private Long id;
    private String login;
    private String password;
    private String email;
    private String name;
    private String surname;
    private String role;

    public User() {
    }

    public User(Long id, String login, String password, String email, String name, String surname, String role) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.role = role;
    }

    public User(String login, String password, String email, String name, String surname, String role) {
        this.login = login;
        this.password = password;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
