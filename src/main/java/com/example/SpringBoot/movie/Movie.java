package com.example.SpringBoot.movie;

import com.example.SpringBoot.actor.Actor;
import com.example.SpringBoot.category.Category;
import com.example.SpringBoot.director.Director;
import org.hibernate.annotations.Cascade;

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
    @OneToMany
    @JoinColumn(name = "director_id")
    private List<Director> director;

    @OneToMany
    @JoinColumn(name = "category_id")
    private List<Category> category;

    @OneToMany
    @JoinColumn(name = "actor_id")
    private List<Actor> actor;

    public Movie() {
    }

    public Movie(String title) {
        this.title = title;
        director = new ArrayList<>();
        category = new ArrayList<>();
        actor = new ArrayList<>();
    }

    public List<Actor> getActor() {
        return actor;
    }

    public void setActor(List<Actor> actor) {
        this.actor = actor;
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
