package com.example.SpringBoot.director;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface DirectorRepository extends JpaRepository<Director, Long> {
    @Query("SELECT d FROM Director d WHERE d.name = ?1 AND d.surname = ?2")
    Optional<Director> checkExistsDirector(String name, String surname);
}
