package com.example.SpringBoot.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CategoryRepository
        extends JpaRepository<Category, Long> {
    @Query("SELECT c FROM Category c WHERE c.category = ?1")
    Optional<Category> checkExistCategory(String category);
}
