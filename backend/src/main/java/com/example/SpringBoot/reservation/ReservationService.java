package com.example.SpringBoot.reservation;

import com.example.SpringBoot.movie.Movie;
import com.example.SpringBoot.movie.MovieRepository;
import com.example.SpringBoot.user.User;
import com.example.SpringBoot.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, MovieRepository movieRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
    }

    public List<Reservation> getReservations() {
        return reservationRepository.findAll();
    }

    public void addReservation(Long movieId, Long userId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException(
                        "Movie with id: " + movieId + " doesn't exist!"
                ));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "User with id: " + userId + " doesn't exist!"
                ));

        LocalDateTime now = LocalDateTime.now();

        //if (movie.getQuantity() >= 1) {
          //  movie.setQuantity(movie.getQuantity() - 1);
            Reservation reservation = new Reservation(now);
            reservation.setUser(List.of(user));
            reservation.setMovie(List.of(movie));
            //movieRepository.save(movie);
            reservationRepository.save(reservation);
        //} else {
          //  throw new IllegalStateException("No video on time: " + now);
    //    }
    }

    @Transactional
    public void deleteReservation(Long reservationId) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);

        if (reservation.isPresent()) {
            //Long movieId = reservation.get().getMovie().get(0).getId();
            //Optional<Movie> movie = movieRepository.findById(movieId);
            //movie.ifPresent(value -> value.setQuantity(value.getQuantity() + 1));
            reservationRepository.deleteById(reservationId);
        } else {
            throw new IllegalStateException("Reservation with id: " + reservationId + " does not exist !");
        }
    }
}
