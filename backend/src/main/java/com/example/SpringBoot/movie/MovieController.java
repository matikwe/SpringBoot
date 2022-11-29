package com.example.SpringBoot.movie;

import com.example.SpringBoot.utils.ImageModel;
import com.example.SpringBoot.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/movie")
public class MovieController {
    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public List<Movie> getMovies() {
        return movieService.getMovies();
    }

    @PostMapping(path = "addMovie")
    public Movie addMovie(
            @RequestPart("movie") String movie,
            @RequestPart("imageFile") MultipartFile[] imageFile) {
        Movie movieJson = Utils.getMovieJson(movie);
        try {
            List<ImageModel> images = Utils.uploadImage(imageFile);
            movieJson.setMovieImage(images);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return movieService.addMovie(movieJson);
    }

    @DeleteMapping(path = "{movieId}")
    public ResponseEntity deleteMovie(
            @PathVariable("movieId") Long movieId) {
        return movieService.deleteMovie(movieId);
    }

    @PutMapping(path = "{movieId}")
    public Movie updateMovie(
            @PathVariable("movieId") Long movieId,
            @RequestBody Movie movie) {
        return movieService.updateMovie(movieId, movie);
    }

    @GetMapping(path = "{movieId}/addDirector")
    public void addDirectorToMovie(
            @PathVariable("movieId") Long movieId,
            @RequestParam Long directorId) {
        movieService.addDirectorToMovie(movieId, directorId);
    }

    @PutMapping(path = "{movieId}/removeDirector")
    public void removeDirectorFromMovie(
            @PathVariable("movieId") Long movieId,
            @RequestParam Long directorId) {
        movieService.removeDirectorFromMovie(movieId, directorId);
    }

    @GetMapping(path = "{movieId}/addCategory")
    public void addCategoryToMovie(
            @PathVariable("movieId") Long movieId,
            @RequestParam Long categoryId) {
        movieService.addCategoryToMovie(movieId, categoryId);
    }

    @PutMapping(path = "{movieId}/removeCategory")
    public void removeCategoryFromMovie(
            @PathVariable("movieId") Long movieId,
            @RequestParam Long categoryId) {
        movieService.removeCategoryFromMovie(movieId, categoryId);
    }

    @GetMapping(path = "{movieId}/addActor")
    public void addActorToMovie(
            @PathVariable("movieId") Long movieId,
            @RequestParam Long actorId) {
        movieService.addActorToMovie(movieId, actorId);
    }

    @PutMapping(path = "{movieId}/removeActor")
    public void removeActorFromMovie(
            @PathVariable("movieId") Long movieId,
            @RequestParam Long actorId) {
        movieService.removeActorFromMovie(movieId, actorId);
    }

    @GetMapping(path = "getImage/{movieId}")
    public ResponseEntity<?> getImage(@PathVariable("movieId") Long movieId) {
        byte[] image = movieService.getImage(movieId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }
}
