package com.example.SpringBoot.reservation;

import com.example.SpringBoot.movie.Movie;
import com.example.SpringBoot.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "Reservation")
@Table(
        name = "reservation"
)
public class Reservation {
    @Id
    @SequenceGenerator(name = "reservation_sequence",
            sequenceName = "reservation_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "reservation_sequence"
    )
    private Long id;
    private LocalDateTime localDateTime;
    @ManyToMany
    @JoinColumn(name = "movie_id")
    private List<Movie> movie;
    @ManyToMany
    @JoinColumn(name = "users_id")
    private List<User> user;

    public Reservation() {
    }

    public Reservation(LocalDateTime localDateTime) {
        this.localDateTime = localDateTime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMovie(List<Movie> movie) {
        this.movie = movie;
    }

    public void setUser(List<User> user) {
        this.user = user;
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime(LocalDateTime localDateTime) {
        this.localDateTime = localDateTime;
    }

    public List<Movie> getMovie() {
        return movie;
    }

    public List<User> getUser() {
        return user;
    }

    public Long getId() {
        return id;
    }
}
