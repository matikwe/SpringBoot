package com.example.SpringBoot.reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/reservation")
public class ReservationController {
    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public List<Reservation> getReservation() {
        return reservationService.getReservations();
    }

    @PostMapping("addReservation")
    public Reservation addReservation(
            @RequestParam("movieId") Long movieId,
            @RequestParam("userId") Long userId,
            @RequestParam("bookingDate") String bookingDate) {
        return reservationService.addReservation(movieId, userId, bookingDate);
    }

    @DeleteMapping(path = "{reservationId}")
    public ResponseEntity deleteReservation(
            @PathVariable("reservationId") Long reservationId) {
        return reservationService.deleteReservation(reservationId);
    }

    @GetMapping("getReservationsForUserId")
    private List<Reservation> getReservationsForUserId(@RequestParam("userId") Long userId) {
        return reservationService.getReservationsForUserId(userId);
    }
}
