package com.example.SpringBoot.order;

import com.example.SpringBoot.reservation.Reservation;
import com.example.SpringBoot.reservation.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ReservationRepository reservationRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, ReservationRepository reservationRepository) {
        this.orderRepository = orderRepository;
        this.reservationRepository = reservationRepository;
    }

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }


    public void addOrder(Long reservationId) {
        LocalDate now = LocalDate.now();
        List<Reservation> reservationList = reservationRepository.findAll();
        List<Reservation> list = reservationList.stream()
                .filter(it -> calcDaysBetween(now, convertStringToDate(it.getBookingDate())) < 0)
                .collect(Collectors.toList());
        reservationRepository.deleteAll(list);

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalStateException(
                        "Reservation with id: " + reservationId + " doesn't exist!"
                ));

    }

    private long calcDaysBetween(LocalDate now, LocalDate bookingDate) {
        return ChronoUnit.DAYS.between(now, bookingDate);
    }

    private LocalDate convertStringToDate(String date) {
        return LocalDate.of(
                Integer.parseInt(date.substring(6, 10)),
                Integer.parseInt(date.substring(3, 5)),
                Integer.parseInt(date.substring(0, 2))
        );
    }
}
