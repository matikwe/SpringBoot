package com.example.SpringBoot.director;

import com.example.SpringBoot.movie.Movie;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity(name = "Director")
@Table(
        name = "director"
)
public class Director {
    @Id
    @SequenceGenerator(name = "director_sequence",
            sequenceName = "director_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "director_sequence"
    )
    private Long id;
    private String name;
    private String surname;
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Movie> movie;


    public Director() {
    }

    public Director(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    public Director(Long id, String name, String surname) {
        this.id = id;
        this.name = name;
        this.surname = surname;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
