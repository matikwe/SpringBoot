package com.example.SpringBoot.actor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ActorRepository
        extends JpaRepository<Actor, Long> {

    @Query("SELECT a FROM Actor a WHERE a.name = ?1 AND a.surname = ?2")
    Optional<Actor> checkExistActor(String name, String surname);
}
