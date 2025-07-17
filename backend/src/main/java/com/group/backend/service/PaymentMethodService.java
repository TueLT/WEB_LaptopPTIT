package com.group.backend.service;

import com.group.backend.dto.PaymentMethodDTO;

public interface PaymentMethodService {
    PaymentMethodDTO getPaymentMethodById(long id);
}
