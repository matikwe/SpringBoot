package com.example.SpringBoot;

import com.example.SpringBoot.actor.Actor;
import com.example.SpringBoot.actor.ActorRepository;
import com.example.SpringBoot.category.Category;
import com.example.SpringBoot.category.CategoryRepository;
import com.example.SpringBoot.director.Director;
import com.example.SpringBoot.director.DirectorRepository;
import com.example.SpringBoot.movie.Movie;
import com.example.SpringBoot.movie.MovieRepository;
import com.example.SpringBoot.salt.Salt;
import com.example.SpringBoot.salt.SaltRepository;
import com.example.SpringBoot.user.Role;
import com.example.SpringBoot.user.User;
import com.example.SpringBoot.user.UserRepository;
import com.example.SpringBoot.utils.PasswordUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootApplication

public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository, DirectorRepository directorRepository,
                                        MovieRepository movieRepository, SaltRepository saltRepository, CategoryRepository categoryRepository,
                                        ActorRepository actorRepository) {
        return args -> {

            String securePassword = PasswordUtils.generateSecurePassword(
                    "123",
                    getSalt(saltRepository)
            );

            User user = new User(
                    "matik",
                    securePassword,
                    "matik@wp.pl",
                    "Mati",
                    "Racz",
                    Role.USER.toString()
            );

            User user1 = new User(
                    "matik1",
                    securePassword,
                    "matik1@wp.pl",
                    "Mati",
                    "Racz",
                    Role.ADMIN.toString()
            );

            Director director = new Director("Patryk", "Vega");
            Director director1 = new Director("Janusz", "Pi");
            List<Director> directorList = new ArrayList<>(List.of(director));
            Category category = new Category("Komedia");
            Actor actor = new Actor("Artur", "Żmijewski");
            Movie movie = new Movie("film1");
            movie.setDirector(directorList);
            movie.setCategory(List.of(category));
            movie.setActor(List.of(actor));
            Optional<Salt> salt = saltRepository.checkExistSalt(1L);
            if (salt.isPresent()) {
                user.setSalt(salt.get());
                user1.setSalt(salt.get());
            }

            userRepository.saveAll(
                    List.of(user, user1)
            );
            actorRepository.save(actor);
            categoryRepository.save(category);
            directorRepository.saveAll(List.of(director, director1));
            movieRepository.save(movie);

        };
    }

    private String getSalt(SaltRepository saltRepository) {
        Optional<Salt> salt = saltRepository.checkExistSalt(1L);
        if (salt.isPresent()) {
            return salt.get().getSalt();
        } else {
            Salt newSalt = new Salt(PasswordUtils.getSalt(30));
            saltRepository.save(newSalt);
            return newSalt.getSalt();
        }
    }
}
