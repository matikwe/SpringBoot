package com.example.SpringBoot.reservation;

import com.example.SpringBoot.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository
        extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r INNER JOIN r.movie m WHERE r.bookingDate = ?1")
    Optional<Reservation> findReservation(String bookingDate);
}
