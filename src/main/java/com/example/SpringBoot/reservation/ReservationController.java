package com.example.SpringBoot.reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    public void addReservation(
            @RequestParam("movieId") Long movieId,
            @RequestParam("userId") Long userId,
            @RequestParam("bookingDate") String bookingDate){
        reservationService.addReservation(movieId, userId, bookingDate);
    }

    @DeleteMapping(path = "{reservationId}")
    public void deleteReservation(
            @PathVariable("reservationId") Long reservationId){
        reservationService.deleteReservation(reservationId);
    }
}
