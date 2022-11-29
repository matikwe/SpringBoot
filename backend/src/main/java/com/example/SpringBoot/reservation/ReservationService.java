package com.example.SpringBoot.reservation;

import com.example.SpringBoot.movie.Movie;
import com.example.SpringBoot.movie.MovieRepository;
import com.example.SpringBoot.user.User;
import com.example.SpringBoot.user.UserRepository;
import com.example.SpringBoot.utils.DateValidatorUsingDateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        Movie movie = findMovieById(movieId);
        User user = findUserById(userId);
        List<Reservation> reservation = reservationRepository.findAll();
        List<Reservation> listWithDuplicatedReservation = getListWithDuplicatedReservation(reservation, movieId, userId, bookingDate);

        DateValidatorUsingDateFormat validator = new DateValidatorUsingDateFormat("dd/MM/yyyy");
        if (validator.isValid(bookingDate)) {
            if (listWithDuplicatedReservation.size() > 0) {
                throw new IllegalStateException("The user has already booked this video on this date !");
            } else {
                Reservation currentReservation = new Reservation(bookingDate);
                currentReservation.setUser(List.of(user));
                currentReservation.setMovie(List.of(movie));
                reservationRepository.save(currentReservation);
            }
        } else {
            throw new IllegalStateException("Please enter a valid date format (dd/MM/yyyy) !");
        }
    }

    @Transactional
    public ResponseEntity deleteReservation(Long reservationId) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);

        if (reservation.isPresent()) {
            reservationRepository.deleteById(reservationId);
        } else {
            throw new IllegalStateException("Reservation with id: " + reservationId + " does not exist !");
        }
        return new ResponseEntity("Reservation deleted successfully.", HttpStatus.OK);
    }

    public List<Reservation> getReservationsForUserId(Long userId) {
        List<Reservation> reservation = reservationRepository.findAll();
        return reservation.stream()
                .filter(it -> it.getUser().get(0).getId().equals(userId) && !it.isReserved())
                .collect(Collectors.toList());
    }

    private List<Reservation> getListWithDuplicatedReservation(List<Reservation> reservation, Long movieId, Long userId, String bookingDate) {
        return reservation.stream()
                .filter(it -> it.getBookingDate().equals(bookingDate) &&
                        it.getMovie().get(0).getId().equals(movieId) &&
                        it.getUser().get(0).getId().equals(userId))
                .collect(Collectors.toList());
    }

    private Movie findMovieById(Long movieId) {
        return movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalStateException(
                        "Movie with id: " + movieId + " doesn't exist!"
                ));
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "User with id: " + userId + " doesn't exist!"
                ));
    }
}
