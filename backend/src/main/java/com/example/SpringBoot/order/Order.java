package com.example.SpringBoot.order;

import com.example.SpringBoot.reservation.Reservation;

import javax.persistence.*;

@Entity(name = "Orders")
@Table(
        name = "orders"
)
public class Order {
    @Id
    @SequenceGenerator(name = "orders_sequence",
            sequenceName = "orders_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "orders_sequence"
    )
    private Long id;
    private String bookingDate;

    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    public Order() {
    }

    public Order(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }
}
