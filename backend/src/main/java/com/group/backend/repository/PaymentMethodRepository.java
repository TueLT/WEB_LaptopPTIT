package com.group.backend.repository;

import com.group.backend.entity.Payment_Method;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentMethodRepository extends JpaRepository<Payment_Method, Long> {
    Payment_Method findById(long id);
}
