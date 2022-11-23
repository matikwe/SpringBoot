package com.example.SpringBoot.director;

import com.example.SpringBoot.movie.Movie;
import com.example.SpringBoot.utils.ImageModel;

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
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "director_images",
            joinColumns = {
                    @JoinColumn(name = "id")
            }, inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    }
    )
    private Set<ImageModel> directorImage;
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Movie> movie;


    public Director() {
    }

    public Director(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    public Set<ImageModel> getDirectorImage() {
        return directorImage;
    }

    public void setDirectorImage(Set<ImageModel> directorImage) {
        this.directorImage = directorImage;
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
