package com.example.SpringBoot.movie;

import com.example.SpringBoot.actor.Actor;
import com.example.SpringBoot.actor.ActorRepository;
import com.example.SpringBoot.category.Category;
import com.example.SpringBoot.category.CategoryRepository;
import com.example.SpringBoot.director.Director;
import com.example.SpringBoot.director.DirectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final DirectorRepository directorRepository;
    private final CategoryRepository categoryRepository;
    private final ActorRepository actorRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository, DirectorRepository directorRepository, CategoryRepository categoryRepository, ActorRepository actorRepository) {
        this.movieRepository = movieRepository;
        this.directorRepository = directorRepository;
        this.categoryRepository = categoryRepository;
        this.actorRepository = actorRepository;
    }

    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    public Movie addMovie(Movie movie) {
        Optional<Movie> movieExist = movieRepository.checkExistMovie(movie.getTitle());

        if (movieExist.isPresent()) {
            throw new IllegalStateException("Movie :" + movie.getTitle() + " exist!");
        }
        movieRepository.save(movie);
        return movie;
    }

    public ResponseEntity deleteMovie(Long movieId) {
        boolean exist = movieRepository.existsById(movieId);

        if (!exist) {
            throw new IllegalStateException("Movie with id: " + movieId + " does not exist !");
        }
        movieRepository.deleteById(movieId);
        return new ResponseEntity("Movie deleted successfully.", HttpStatus.OK);
    }

    @Transactional
    public Movie updateMovie(Long movieId, Movie movie) {
        Movie movieExist = findMovieById(movieId);

        if (movie.getTitle() != null && movie.getTitle().length() > 0 &&
                !Objects.equals(movie.getTitle(), movieExist.getTitle())) {
            movieExist.setTitle(movie.getTitle());
        }

        if (movie.getQuantity() >= 0 && movie.getQuantity() != movieExist.getQuantity()) {
            movieExist.setQuantity(movie.getQuantity());
        }

        if (movie.getDescription() != null && movie.getDescription().length() > 0 &&
                !Objects.equals(movie.getDescription(), movieExist.getDescription())) {
            movieExist.setDescription(movie.getDescription());
        }

        if (movie.getCategory() != null) {
            movieExist.setCategory(movie.getCategory());
        }

        if (movie.getActor() != null) {
            movieExist.setActor(movie.getActor());
        }

        if (movie.getDirector() != null) {
            movieExist.setDirector(movie.getDirector());
        }
        return movieExist;
    }

    @Transactional
    public void addDirectorToMovie(Long movieId, Long directorId) {
        Movie movie = findMovieById(movieId);
        Director director = findDirectorById(directorId);

        List<Director> directorList = movie.getDirector();
        long count = directorList.stream().filter(it -> it.getId().equals(director.getId())).count();

        if (count == 0) {
            directorList.add(director);
            movie.setDirector(directorList);
        } else {
            throw new IllegalStateException("Director with id " + director.getId() + " is add to current movie !");
        }
    }

    @Transactional
    public void removeDirectorFromMovie(Long movieId, Long directorId) {
        Movie movie = findMovieById(movieId);
        Director director = findDirectorById(directorId);

        List<Director> directorList = movie.getDirector();
        long count = directorList.stream()
                .filter(it -> it.getId().equals(director.getId())).count();

        if (count != 0) {
            directorList.remove(director);
            movie.setDirector(directorList);
        } else {
            throw new IllegalStateException("Director with id " + director.getId() + " cannot be removed.");
        }
    }

    @Transactional
    public void addCategoryToMovie(Long movieId, Long categoryId) {
        Movie movie = findMovieById(movieId);
        Category category = findCategoryById(categoryId);

        List<Category> categoryList = movie.getCategory();
        long count = categoryList.stream().filter(it -> it.getId().equals(category.getId())).count();

        if (count == 0) {
            categoryList.add(category);
            movie.setCategory(categoryList);
        } else {
            throw new IllegalStateException("Category with id " + category.getId() + " is add to current movie !");
        }
    }

    @Transactional
    public void removeCategoryFromMovie(Long movieId, Long categoryId) {
        Movie movie = findMovieById(movieId);
        Category category = findCategoryById(categoryId);

        List<Category> categoryList = movie.getCategory();
        long count = categoryList.stream().filter(it -> it.getId().equals(category.getId())).count();

        if (count != 0) {
            categoryList.remove(category);
            movie.setCategory(categoryList);
        } else {
            throw new IllegalStateException("Category with id " + category.getId() + " cannot be removed.");
        }
    }

    @Transactional
    public void addActorToMovie(Long movieId, Long actorId) {
        Movie movie = findMovieById(movieId);
        Actor actor = findActorById(actorId);

        List<Actor> actorList = movie.getActor();
        long count = actorList.stream().filter(it -> it.getId().equals(actor.getId())).count();

        if (count == 0) {
            actorList.add(actor);
            movie.setActor(actorList);
        } else {
            throw new IllegalStateException("Actor with id " + actor.getId() + " is add to current movie !");
        }
    }

    @Transactional
    public void removeActorFromMovie(Long movieId, Long actorId) {
        Movie movie = findMovieById(movieId);
        Actor actor = findActorById(actorId);

        List<Actor> actorList = movie.getActor();
        long count = actorList.stream().filter(it -> it.getId().equals(actor.getId())).count();

        if (count != 0) {
            actorList.remove(actor);
            movie.setActor(actorList);
        } else {
            throw new IllegalStateException("Actor with id " + actor.getId() + " cannot be removed.");
        }
    }

    public byte[] getImage(Long movieId) {
        Movie movieExist = findMovieById(movieId);
        return movieExist.getMovieImage().get(0).getPicByte();
    }

    private Movie findMovieById(Long movieId) {
        return movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException(
                        "Movie with id: " + movieId + " doesn't exist!"
                ));
    }

    private Director findDirectorById(Long directorId) {
        return directorRepository.findById(directorId)
                .orElseThrow(() -> new IllegalStateException(
                        "Director with id: " + directorId + " doesn't exist!"
                ));
    }

    private Category findCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalStateException(
                        "Category with id: " + categoryId + " doesn't exist!"
                ));
    }

    private Actor findActorById(Long actorId) {
        return actorRepository.findById(actorId)
                .orElseThrow(() -> new IllegalStateException(
                        "Actor with id: " + actorId + " doesn't exist!"
                ));
    }
}
