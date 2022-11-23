package com.example.SpringBoot.movie;

import com.example.SpringBoot.utils.ImageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    public void addMovie(
            @RequestPart("movie") Movie movie,
            @RequestPart("imageFile") MultipartFile[] file) {
        try {
            Set<ImageModel> images = uploadImage(file);
            movie.setMovieImage(images);
            movieService.addMovie(movie);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @DeleteMapping(path = "{movieId}")
    public void deleteMovie(
            @PathVariable("movieId") Long movieId) {
        movieService.deleteMovie(movieId);
    }

    @PutMapping(path = "{movieId}")
    public void updateMovie(
            @PathVariable("movieId") Long movieId,
            @RequestBody Movie movie) {
        movieService.updateMovie(movieId, movie);
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

    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();

        for (MultipartFile file : multipartFiles) {
            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            imageModels.add(imageModel);
        }
        return imageModels;
    }
}
