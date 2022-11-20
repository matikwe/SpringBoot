package com.example.SpringBoot.order;

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
}
