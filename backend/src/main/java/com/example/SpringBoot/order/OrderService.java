package com.example.SpringBoot.order;

import com.example.SpringBoot.reservation.Reservation;
import com.example.SpringBoot.reservation.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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


    @Transactional
    public Order addOrder(Long reservationId) {
        removeExpiredBooking();
        Reservation reservation = getReservation(reservationId);
        List<Reservation> reservationList = reservationRepository.findAll();
        List<Reservation> listWithCandidatesToOrder = getListWithCandidatesToOrder(reservationList, reservation);
        List<Reservation> listWithBookingMovies = getListWithBookingMovies(reservationList, reservation);

        if (listWithCandidatesToOrder.get(0).getUser().get(0).getId().equals(reservation.getUser().get(0).getId())) {
            if (reservation.getMovie().get(0).getQuantity() > listWithBookingMovies.size()) {
                return orderMovie(reservation);
            } else {
                throw new IllegalStateException("On day " + reservation.getBookingDate() + " there was no film. Try another day.");
            }
        } else {
            throw new IllegalStateException("The selection algorithm has appointed another user to accept the order! Wait your turn!");
        }
    }

    private Order orderMovie(Reservation reservation) {
        Order order = new Order(reservation.getBookingDate());
        reservation.setReserved(true);
        reservationRepository.save(reservation);
        order.setReservation(reservation);
        orderRepository.save(order);
        return order;
    }

    private void removeExpiredBooking() {
        List<Reservation> reservationList = reservationRepository.findAll();
        List<Reservation> list = reservationList.stream()
                .filter(it -> !it.isReserved() && calcDaysBetween(convertStringToDate(it.getBookingDate())) < 0)
                .collect(Collectors.toList());
        reservationRepository.deleteAll(list);
    }

    private List<Reservation> getListWithCandidatesToOrder(List<Reservation> reservationList, Reservation reservation) {
        return reservationList.stream()
                .filter(it -> it.getBookingDate().equals(reservation.getBookingDate()) &&
                        it.getMovie().get(0).getId().equals(reservation.getMovie().get(0).getId())
                        && !it.isReserved())
                .collect(Collectors.toList());
    }

    private List<Reservation> getListWithBookingMovies(List<Reservation> reservationList, Reservation reservation) {
        return reservationList.stream()
                .filter(it -> it.isReserved() && it.getBookingDate().equals(reservation.getBookingDate())
                        && it.getMovie().get(0).getId().equals(reservation.getMovie().get(0).getId()))
                .collect(Collectors.toList());
    }

    private Reservation getReservation(Long reservationId) {
        return reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalStateException(
                        "Your booking has expired !"
                ));
    }

    private long calcDaysBetween(LocalDate bookingDate) {
        return ChronoUnit.DAYS.between(LocalDate.now(), bookingDate);
    }

    private LocalDate convertStringToDate(String date) {
        return LocalDate.of(
                Integer.parseInt(date.substring(6, 10)),
                Integer.parseInt(date.substring(3, 5)),
                Integer.parseInt(date.substring(0, 2))
        );
    }
}
