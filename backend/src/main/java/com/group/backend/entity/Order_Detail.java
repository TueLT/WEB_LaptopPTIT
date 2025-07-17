package com.group.backend.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Order_Detail")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Order_Detail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private int unitPrice;
    @Column(nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "LaptopID")
    private Laptop laptop;

    @ManyToOne
    @JoinColumn(name = "Customer_Order_ID")
    @JsonIgnore
    private Order order;
}
