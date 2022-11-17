package com.example.SpringBoot.actor;

import com.example.SpringBoot.movie.Movie;

import javax.persistence.*;
import java.util.List;

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
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Movie> movie;

    public Actor(){}
    public Actor(String name, String surname) {
        this.name = name;
        this.surname = surname;
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
