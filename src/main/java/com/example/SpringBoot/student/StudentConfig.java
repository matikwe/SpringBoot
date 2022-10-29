package com.example.SpringBoot.student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class StudentConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> {
            Student marian = new Student(
                    "Marian",
                    "marian@wp.pl",
                    LocalDate.of(1955, Month.JANUARY, 5)
            );

            Student alex = new Student(
                    "Alex",
                    "alex@wp.pl",
                    LocalDate.of(1998, Month.FEBRUARY, 11)
            );

            repository.saveAll(
                    List.of(marian, alex)
            );
        };
    }
}
