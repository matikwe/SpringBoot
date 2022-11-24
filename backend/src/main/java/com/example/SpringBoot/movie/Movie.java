package com.example.SpringBoot.movie;

import com.example.SpringBoot.actor.Actor;
import com.example.SpringBoot.category.Category;
import com.example.SpringBoot.director.Director;
import com.example.SpringBoot.reservation.Reservation;
import com.example.SpringBoot.utils.ImageModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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

    private String description;
    private int quantity;
    @ManyToMany
    @JoinColumn(name = "director_id")
    private List<Director> director;

    @ManyToMany
    @JoinColumn(name = "category_id")
    private List<Category> category;

    @ManyToMany
    @JoinColumn(name = "actor_id")
    private List<Actor> actor;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "movie_images",
            joinColumns = {
                    @JoinColumn(name = "id")
            }, inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    }
    )
    private List<ImageModel> movieImage;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Reservation> reservation;

    public Movie() {
    }

    public Movie(String title, int quantity, String description) {
        this.title = title;
        this.quantity = quantity;
        this.description = description;
        director = new ArrayList<>();
        category = new ArrayList<>();
        actor = new ArrayList<>();
    }

    public List<ImageModel> getMovieImage() {
        return movieImage;
    }

    public void setMovieImage(List<ImageModel> movieImage) {
        this.movieImage = movieImage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
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
