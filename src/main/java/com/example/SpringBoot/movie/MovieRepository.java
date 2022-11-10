package com.example.SpringBoot.movie;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository
        extends JpaRepository<Movie, Long> {

}
