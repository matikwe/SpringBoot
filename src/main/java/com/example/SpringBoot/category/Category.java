package com.example.SpringBoot.category;

import com.example.SpringBoot.movie.Movie;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "Category")
@Table(
        name = "category"
)
public class Category {
    @Id
    @SequenceGenerator(name = "category_sequence",
            sequenceName = "category_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "category_sequence"
    )
    private Long id;
    private String category;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Movie> movie;

    public Category() {
    }

    public Category(String category) {
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
