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
import com.example.SpringBoot.utils.ImageModel;
import com.example.SpringBoot.utils.PasswordUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
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

            String securePassword = PasswordUtils.generateSecurePassword("123", getSalt(saltRepository));

            List<ImageModel> imageForDirector = new ArrayList<>();
            imageForDirector.add(new ImageModel("director1.png", "image/png", getImage("tmp/d1-min.png")));
            imageForDirector.add(new ImageModel("director2.png", "image/png", getImage("tmp/d2-min.png")));
            imageForDirector.add(new ImageModel("director3.png", "image/png", getImage("tmp/d3-min.png")));
            imageForDirector.add(new ImageModel("director4.png", "image/png", getImage("tmp/d4-min.png")));
            imageForDirector.add(new ImageModel("director5.png", "image/png", getImage("tmp/d5-min.png")));

            List<ImageModel> imageForMovie = new ArrayList<>();
            imageForMovie.add(new ImageModel("actor1.png", "image/png", getImage("tmp/m1-min.png")));
            imageForMovie.add(new ImageModel("actor2.png", "image/png", getImage("tmp/m2-min.png")));
            imageForMovie.add(new ImageModel("actor3.png", "image/png", getImage("tmp/m3-min.png")));
            imageForMovie.add(new ImageModel("actor4.png", "image/png", getImage("tmp/m4-min.png")));
            imageForMovie.add(new ImageModel("actor5.png", "image/png", getImage("tmp/m5-min.png")));

            List<ImageModel> imageForActor = new ArrayList<>();
            imageForActor.add(new ImageModel("movie1.png", "image/png", getImage("tmp/a1-min.png")));
            imageForActor.add(new ImageModel("movie2.png", "image/png", getImage("tmp/a2-min.png")));
            imageForActor.add(new ImageModel("movie3.png", "image/png", getImage("tmp/a3-min.png")));
            imageForActor.add(new ImageModel("movie4.png", "image/png", getImage("tmp/a4-min.png")));
            imageForActor.add(new ImageModel("movie5.png", "image/png", getImage("tmp/a5-min.png")));

            List<ImageModel> imageForCategory = new ArrayList<>();
            imageForCategory.add(new ImageModel("c1.png", "image/png", getImage("tmp/c1.png")));
            imageForCategory.add(new ImageModel("c2.png", "image/png", getImage("tmp/c2.png")));
            imageForCategory.add(new ImageModel("c3.png", "image/png", getImage("tmp/c3.png")));
            imageForCategory.add(new ImageModel("c4.png", "image/png", getImage("tmp/c4.png")));
            imageForCategory.add(new ImageModel("c5.png", "image/png", getImage("tmp/c5.png")));

            User user = new User("matik", securePassword, "matik@wp.pl", "Mati", "Racz", Role.USER.toString());
            User user1 = new User("matik1", securePassword, "matik1@wp.pl", "Mati", "Racz", Role.ADMIN.toString());
            User user2 = new User("kacper", securePassword, "kacper@wp.pl", "Kac", "Gaw", Role.ADMIN.toString());
            User user3 = new User("jankow", securePassword, "jankow@wp.pl", "Janusz", "Kowalski", Role.ADMIN.toString());

            Optional<Salt> salt = saltRepository.checkExistSalt(1L);
            if (salt.isPresent()) {
                user.setSalt(salt.get());
                user1.setSalt(salt.get());
                user2.setSalt(salt.get());
                user3.setSalt(salt.get());
            }

            List<Director> directorList = new ArrayList<>(List.of(
                    new Director("Patryk", "Vega"),
                    new Director("Stanley", "Kubrick"),
                    new Director("Quentin", "Tarantino"),
                    new Director("Sergio", "Leone"),
                    new Director("Wes", "Anderson")
            ));

            List<Category> categoryList = new ArrayList<>(List.of(
                    new Category("Horror"),
                    new Category("Komedia"),
                    new Category("Przygodowy"),
                    new Category("Fantasy"),
                    new Category("Dramat")
            ));

            List<Actor> actorList = new ArrayList<>(List.of(
                    new Actor("Artur", "Żmijewski"),
                    new Actor("Maciej", "Stuhr"),
                    new Actor("Johnny", "Depp"),
                    new Actor("Tom", "Hanks"),
                    new Actor("Paweł", "Nowicz")
            ));

            List<Movie> movieList = new ArrayList<>(List.of(
                    new Movie("SKAZANI NA SHAWSHANK", 1, "Adaptacja opowiadania Stephena Kinga. Niesłusznie skazany na dożywocie bankier, stara się przetrwać w brutalnym, więziennym świecie."),
                    new Movie("NIETYKALNI", 3, "Sparaliżowany milioner zatrudnia do opieki młodego chłopaka z przedmieścia, który właśnie wyszedł z więzienia."),
                    new Movie("ZIELONA MILA", 2, "Emerytowany strażnik więzienny opowiada przyjaciółce o niezwykłym mężczyźnie, którego skazano na śmierć za zabójstwo dwóch 9-letnich dziewczynek."),
                    new Movie("OJCIEC CHRZESTNY", 3, "Opowieść o nowojorskiej rodzinie mafijnej. Starzejący się Don Corleone pragnie przekazać władzę swojemu synowi."),
                    new Movie("DWUNASTU GNIEWNYCH LUDZI", 1, "Dwunastu przysięgłych ma wydać wyrok w procesie o morderstwo. Jeden z nich ma wątpliwości dotyczące winy oskarżonego.")
            ));

            for (int i = 0; i < movieList.size(); i++) {
                Movie movie = movieList.get(i);
                movie.setDirector(List.of(directorList.get(i)));
                movie.setCategory(List.of(categoryList.get(i)));
                movie.setActor(List.of(actorList.get(i)));
                movie.setMovieImage(List.of(imageForMovie.get(i)));

                Actor actor = actorList.get(i);
                actor.setActorImage(List.of(imageForActor.get(i)));

                Director director = directorList.get(i);
                director.setDirectorImage(List.of(imageForDirector.get(i)));

                Category category = categoryList.get(i);
                category.setCategoryImage(List.of(imageForCategory.get(i)));
            }

            userRepository.saveAll(List.of(user, user1, user2, user3));
            categoryRepository.saveAll(categoryList);
            actorRepository.saveAll(actorList);
            directorRepository.saveAll(directorList);
            movieRepository.saveAll(movieList);
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

    private byte[] getImage(String name) throws IOException {
        File fi = new File(name);
        return Files.readAllBytes(fi.toPath());
    }

}
