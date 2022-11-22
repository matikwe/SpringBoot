package com.example.SpringBoot.reservation;

import com.example.SpringBoot.movie.Movie;
import com.example.SpringBoot.movie.MovieRepository;
import com.example.SpringBoot.user.User;
import com.example.SpringBoot.user.UserRepository;
import com.example.SpringBoot.utils.DateValidatorUsingDateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public void addReservation(Long movieId, Long userId, String bookingDate) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException(
                        "Movie with id: " + movieId + " doesn't exist!"
                ));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "User with id: " + userId + " doesn't exist!"
                ));

        DateValidatorUsingDateFormat validator = new DateValidatorUsingDateFormat("dd/MM/yyyy");
        if (validator.isValid(bookingDate)) {
            Reservation reservation = new Reservation(bookingDate);
            reservation.setUser(List.of(user));
            reservation.setMovie(List.of(movie));
            reservationRepository.save(reservation);
        } else {
            throw new IllegalStateException("Please enter a valid date format (dd/MM/yyyy) !");
        }
    }

    @Transactional
    public void deleteReservation(Long reservationId) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);

        if (reservation.isPresent()) {
            reservationRepository.deleteById(reservationId);
        } else {
            throw new IllegalStateException("Reservation with id: " + reservationId + " does not exist !");
        }
    }
}
