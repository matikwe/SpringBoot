package com.example.SpringBoot.order;

import com.example.SpringBoot.reservation.Reservation;

import javax.persistence.*;

@Entity(name = "Order")
@Table(
        name = "order"
)
public class Order {
    @Id
    @SequenceGenerator(name = "order_sequence",
            sequenceName = "order_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_sequence"
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
