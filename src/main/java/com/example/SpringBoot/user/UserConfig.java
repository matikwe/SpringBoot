package com.example.SpringBoot.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository) {
        return args -> {
            User user = new User(
                    "matik",
                    "123",
                    "matik@wp.pl",
                    "Mati",
                    "Racz"
            );
            repository.saveAll(
                    List.of(user)
            );
        };
    }
}


