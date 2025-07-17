package com.group.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class OrderDTO {
    private long id;
    private String receiverName;
    private String receiverPhone;
    private String shippingAddress;
    private String note;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate orderDate;
    private long totalPrice;
    private StatusDTO status;
    private PaymentMethodDTO paymentMethod;
}