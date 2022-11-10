package com.example.SpringBoot.movie;

import com.example.SpringBoot.director.Director;

import javax.persistence.*;
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
    @OneToMany(targetEntity = Director.class,cascade = CascadeType.ALL)
    @JoinColumn(name ="cp_fk",referencedColumnName = "id")
    private Set<Director> director;

    public Movie() {
    }

    public Movie(String title, Set<Director> director) {
        this.title = title;
        this.director = director;
    }

    public Long getId() {
        return id;
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

    public Set<Director> getDirector() {
        return director;
    }

    public void setDirector(Set<Director> director) {
        this.director = director;
    }
}
