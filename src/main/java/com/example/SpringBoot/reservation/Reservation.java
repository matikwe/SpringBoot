package com.example.SpringBoot.reservation;

import javax.persistence.*;

@Entity(name = "Reservation")
@Table(
        name = "reservation"
)
public class Reservation {
    @Id
    @SequenceGenerator(name = "reservation_sequence",
            sequenceName = "reservation_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "reservation_sequence"
    )
    private Long id;
}
