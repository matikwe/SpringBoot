package com.example.SpringBoot;

import com.example.SpringBoot.director.Director;
import com.example.SpringBoot.director.DirectorRepository;
import com.example.SpringBoot.movie.Movie;
import com.example.SpringBoot.movie.MovieRepository;
import com.example.SpringBoot.user.Role;
import com.example.SpringBoot.user.User;
import com.example.SpringBoot.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication

public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository, DirectorRepository directorRepository, MovieRepository movieRepository) {
        return args -> {
            User user = new User(
                    "matik",
                    "123",
                    "matik@wp.pl",
                    "Mati",
                    "Racz",
                    Role.USER.toString()
            );
            User user1 = new User(
                    "matik1",
                    "123",
                    "matik1@wp.pl",
                    "Mati",
                    "Racz",
                    Role.ADMIN.toString()
            );
            userRepository.saveAll(
                    List.of(user, user1)
            );
            Director director = new Director("Patryk", "Vega");
            Director director1 = new Director("Janusz", "Pi");
            List<Director> directorList = new ArrayList<>(List.of(director));
            Movie movie = new Movie("film1");
            movie.setDirector(directorList);

            directorRepository.saveAll(List.of(director, director1));
            movieRepository.save(movie);


        };
    }
}
