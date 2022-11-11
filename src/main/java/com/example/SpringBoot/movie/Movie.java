package com.example.SpringBoot.movie;

import com.example.SpringBoot.category.Category;
import com.example.SpringBoot.director.Director;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Movie")
@Table(
        name = "movie"
)
public class Movie {
    @Id
    @SequenceGenerator(name = "movie_sequence",
            sequenceName = "movie_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "movie_sequence"
    )
    private Long id;
    private String title;
    @ManyToMany
    @JoinColumn(name = "director_id")
    private List<Director> director;

    @ManyToMany
    @JoinColumn(name = "category_id")
    private List<Category> category;

    public Movie() {
    }

    public Movie(String title) {
        this.title = title;
        director = new ArrayList<>();
        category = new ArrayList<>();
    }

    public void setDirector(List<Director> director) {
        this.director = director;
    }

    public void setCategory(List<Category> category) {
        this.category = category;
    }

    public List<Category> getCategory() {
        return category;
    }

    public Long getId() {
        return id;
    }

    public List<Director> getDirector() {
        return director;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
