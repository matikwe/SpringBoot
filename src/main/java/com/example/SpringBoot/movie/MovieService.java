package com.example.SpringBoot.movie;

import com.example.SpringBoot.director.Director;
import com.example.SpringBoot.director.DirectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final DirectorRepository directorRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository, DirectorRepository directorRepository) {
        this.movieRepository = movieRepository;
        this.directorRepository = directorRepository;
    }

    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    public void addMovie(Movie movie) {
        Optional<Movie> movieExist = movieRepository.checkExistMovie(movie.getTitle());
        if (movieExist.isPresent()) {
            throw new IllegalStateException("Movie :" + movie.getTitle() + " exist!");
        }
        movieRepository.save(movie);
    }

    public void deleteMovie(Long movieId) {
        boolean exist = movieRepository.existsById(movieId);
        if (!exist) {
            throw new IllegalStateException("Movie with id: " + movieId + " does not exist !");
        }
        movieRepository.deleteById(movieId);
    }

    @Transactional
    public void updateMovie(Long movieId, String title) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException(
                        "Movie with id: " + movieId + " doesn't exist!"
                ));

        if (title != null && title.length() > 0 &&
                !Objects.equals(movie.getTitle(), title)) {
            movie.setTitle(title);
        }
    }

    @Transactional
    public void addDirectorToMovie(Long movieId, Long directorId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException(
                        "Movie with id: " + movieId + " doesn't exist!"
                ));

        Director director = directorRepository.findById(directorId)
                .orElseThrow(() -> new IllegalStateException(
                        "Director with id: " + directorId + " doesn't exist!"
                ));

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
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException(
                        "Movie with id: " + movieId + " doesn't exist!"
                ));

        Director director = directorRepository.findById(directorId)
                .orElseThrow(() -> new IllegalStateException(
                        "Director with id: " + directorId + " doesn't exist!"
                ));

        List<Director> directorList = movie.getDirector();
        long count = directorList.stream().filter(it -> it.getId().equals(director.getId())).count();

        if (count != 0) {
            directorList.remove(director);
            movie.setDirector(directorList);
        } else {
            throw new IllegalStateException("Director with id " + director.getId() + " cannot be removed.");
        }
    }
}
