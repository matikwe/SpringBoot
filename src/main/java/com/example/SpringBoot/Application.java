package com.example.SpringBoot;

import com.example.SpringBoot.student.Student;
import com.example.SpringBoot.student.StudentRepository;
import com.example.SpringBoot.user.User;
import com.example.SpringBoot.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@SpringBootApplication

public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository, UserRepository userRepository) {
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

            studentRepository.saveAll(
                    List.of(marian, alex)
            );




            User user = new User(
                    "matik",
                    "123",
                    "matik@wp.pl",
                    "Mati",
                    "Racz"
            );
            userRepository.saveAll(
                    List.of(user)
            );
        };
    }
}
