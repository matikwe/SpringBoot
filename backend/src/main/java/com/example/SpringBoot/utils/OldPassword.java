package com.example.SpringBoot.utils;

import com.example.SpringBoot.user.User;

import javax.persistence.*;

@Entity(name = "OldPassword")
@Table(name = "oldPassword")
public class OldPassword {
    @Id
    private Long id;
    private String oldPassword;
    @OneToOne(cascade = CascadeType.ALL)
    User user;

    public String getOldPassword() {
        return oldPassword;
    }

    public OldPassword() {
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }
}
