package com.example.SpringBoot.movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MovieRepository
        extends JpaRepository<Movie, Long> {

    @Query("SELECT m FROM Movie m WHERE m.title = ?1")
    Optional<Movie> checkExistMovie(String title);
}
