package com.group.backend.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "Customer_Order")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String receiverName;
    @Column(nullable = false)
    private String receiverPhone;
    @Column(nullable = false)
    private String shippingAddress;
    @Column(nullable = false)
    private long totalPrice;
    private LocalDate orderDate;
    private String note;

    @ManyToOne
    @JoinColumn(name = "UserID")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "StatusID")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "Payment_Method_ID")
    private Payment_Method paymentMethod;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Order_Detail> orderDetails;
}
