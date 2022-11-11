package com.example.SpringBoot.salt;

import javax.persistence.*;

@Entity(name = "Salt")
@Table(
        name = "salt"
)
public class Salt {
    @Id
    @SequenceGenerator(name = "salt_sequence",
            sequenceName = "salt_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "salt_sequence"
    )
    private Long id;
    private String salt;

    public Salt() {
    }

    public Salt(String salt) {
        this.salt = salt;
    }

    public String getSalt() {
        return salt;
    }
}
