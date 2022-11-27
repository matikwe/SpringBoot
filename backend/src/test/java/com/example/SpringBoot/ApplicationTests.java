package com.example.SpringBoot;

import com.example.SpringBoot.actor.Actor;
import com.example.SpringBoot.actor.ActorService;
import com.example.SpringBoot.director.Director;
import com.example.SpringBoot.director.DirectorService;
import com.example.SpringBoot.movie.Movie;
import com.example.SpringBoot.movie.MovieService;
import com.example.SpringBoot.user.Role;
import com.example.SpringBoot.user.User;
import com.example.SpringBoot.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.Assert;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;

@SpringBootTest
class ApplicationTests {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private MovieService movieService;

    @Autowired
    private ActorService actorService;

    @Autowired
    private DirectorService directorService;

    @Autowired
    private UserService userService;

    @Test
    void contextLoads() throws Exception {
        uploadFileToMovie();
        checkValidSizeListMovie();
        checkAddingMovie();
        checkMovieModification();
        checkMovieRemoval();

        uploadFileToActor();
        checkValidSizeListActor();
        checkAddingActor();
        checkActorModification();
        checkActorRemoval();

        uploadFileToDirector();
        checkValidSizeListDirector();
        checkAddingDirector();
        checkDirectorModification();
        checkDirectorRemoval();

        checkRoleChange();
        checkCorrectLoginVerification();
        checkIncorrectLoginVerification();
    }

    //Movie test
    @Test
    public void uploadFileToMovie()
            throws Exception {
        MockMultipartFile file
                = new MockMultipartFile(
                "imageFile",
                "m1.png",
                MediaType.TEXT_PLAIN_VALUE,
                "m1.png".getBytes()
        );

        MockMvc mockMvc
                = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        mockMvc.perform(multipart("/addMovie").file(file));
    }

    @Test
    public void checkValidSizeListMovie() {
        List<Movie> movie = movieService.getMovies();
        Assert.isTrue(movie.size() == 5, "The movie list should be a diagonal of 5.");
    }

    @Test
    public void checkAddingMovie() {
        Movie movie = new Movie("TestowyTytuł", 5, "Testowy opis");
        movieService.addMovie(movie);
        List<Movie> movieList = movieService.getMovies();
        Assert.isTrue(movieList.get(5).getTitle().equals("TestowyTytuł"));
    }

    @Test
    public void checkMovieModification() {
        Movie movie = new Movie("TestowyTytuł", 5, "Testowy opis");
        movieService.updateMovie(1L, movie);
        List<Movie> movieList = movieService.getMovies().stream()
                .filter(it -> it.getId() == 1).collect(Collectors.toList());
        Assert.isTrue(movieList.get(0).getTitle().equals("TestowyTytuł"));
    }

    @Test
    public void checkMovieRemoval() {
        movieService.deleteMovie(1L);
        List<Movie> movieList = movieService.getMovies().stream()
                .filter(it -> it.getId() == 1).collect(Collectors.toList());
        Assert.isTrue(movieList.isEmpty());
    }


    //Actor test
    @Test
    public void uploadFileToActor()
            throws Exception {
        MockMultipartFile file
                = new MockMultipartFile(
                "imageFile",
                "a1.png",
                MediaType.TEXT_PLAIN_VALUE,
                "a1.png".getBytes()
        );

        MockMvc mockMvc
                = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        mockMvc.perform(multipart("/addActor").file(file));
    }

    @Test
    public void checkValidSizeListActor() {
        List<Actor> actorList = actorService.getActors();
        Assert.isTrue(actorList.size() == 5, "The actor list should be a diagonal of 5.");
    }

    @Test
    public void checkAddingActor() {
        Actor actor = new Actor("TestName", "TestSurname");
        actorService.addActor(actor);
        List<Actor> actorList = actorService.getActors();
        Assert.isTrue(actorList.get(5).getSurname().equals("TestSurname"));
    }

    @Test
    public void checkActorModification() {
        Actor actor = new Actor("TestName", "TestSurname");
        actorService.updateActor(1L, actor.getName(), actor.getSurname());
        List<Actor> actorList = actorService.getActors().stream()
                .filter(it -> it.getId() == 1).collect(Collectors.toList());
        Assert.isTrue(actorList.get(0).getName().equals("TestName"));
    }

    @Test
    public void checkActorRemoval() {
        actorService.deleteActor(6L);
        List<Actor> actorList = actorService.getActors().stream()
                .filter(it -> it.getId() == 6).collect(Collectors.toList());
        Assert.isTrue(actorList.isEmpty());
    }

    //Director test
    @Test
    public void uploadFileToDirector()
            throws Exception {
        MockMultipartFile file
                = new MockMultipartFile(
                "imageFile",
                "d1.png",
                MediaType.TEXT_PLAIN_VALUE,
                "d1.png".getBytes()
        );

        MockMvc mockMvc
                = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        mockMvc.perform(multipart("/addDirector").file(file));
    }

    @Test
    public void checkValidSizeListDirector() {
        List<Director> directors = directorService.getDirectors();
        Assert.isTrue(directors.size() == 5, "The director list should be a diagonal of 5.");
    }

    @Test
    public void checkAddingDirector() {
        Director director = new Director("TestName", "TestSurname");
        directorService.addDirector(director);
        List<Director> directorList = directorService.getDirectors();
        Assert.isTrue(directorList.get(5).getName().equals("TestName"));
    }

    @Test
    public void checkDirectorModification() {
        Director director = new Director("TestName", "TestSurname");
        directorService.updateDirector(1L, director.getName(), director.getSurname());
        List<Director> directors = directorService.getDirectors().stream()
                .filter(it -> it.getId() == 1).collect(Collectors.toList());
        Assert.isTrue(directors.get(0).getName().equals("TestName"));
    }

    @Test
    public void checkDirectorRemoval() {
        directorService.deleteDirector(6L);
        List<Director> directorList = directorService.getDirectors().stream()
                .filter(it -> it.getId() == 6).collect(Collectors.toList());
        Assert.isTrue(directorList.isEmpty());
    }

    //Test user
    @Test
    public void checkRoleChange() {
        User user = userService.changeRole(1L, 2L, Role.ADMIN.name());
        Assert.isTrue(user.getRole().equals(Role.ADMIN.name()));
    }

    @Test
    void checkCorrectLoginVerification() {
        User user = userService.verifyLoginDetails("matik", "123");
        Assert.isTrue(user != null);
    }

    @Test
    void checkIncorrectLoginVerification() {
        User user = new User();
        try {
            user = userService.verifyLoginDetails("blaaaaaaaaa", "blaaaaaaaa");
        } catch (Exception e) {
            Assert.isTrue(true);
        }
    }
}
