package com.example.SpringBoot.movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
    public void addMovie(
            @RequestBody Movie movie) {
        movieService.addMovie(movie);
    }

    @DeleteMapping(path = "{movieId}")
    public void deleteMovie(
            @PathVariable("movieId") Long movieId) {
        movieService.deleteMovie(movieId);
    }

    @PutMapping(path = "{movieId}")
    public void updateMovie(
            @PathVariable("movieId") Long movieId,
            @RequestParam String title) {
        movieService.updateMovie(movieId, title);
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
}
