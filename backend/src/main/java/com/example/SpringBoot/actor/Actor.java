package com.example.SpringBoot.actor;

import com.example.SpringBoot.movie.Movie;
import com.example.SpringBoot.utils.ImageModel;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity(name = "Actor")
@Table(
        name = "actor"
)
public class Actor {
    @Id
    @SequenceGenerator(name = "actor_sequence",
            sequenceName = "actor_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "actor_sequence"
    )
    private Long id;
    private String name;
    private String surname;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "actor_images",
            joinColumns = {
                    @JoinColumn(name = "id")
            }, inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    }
    )
    private List<ImageModel> actorImage;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Movie> movie;

    public Actor() {
    }

    public Actor(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    public List<ImageModel> getActorImage() {
        return actorImage;
    }

    public void setActorImage(List<ImageModel> actorImage) {
        this.actorImage = actorImage;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}
