package com.group.backend.service.implement;

import com.group.backend.dto.PaymentMethodDTO;
import com.group.backend.repository.PaymentMethodRepository;
import com.group.backend.service.PaymentMethodService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentMethodServiceImp implements PaymentMethodService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public PaymentMethodDTO getPaymentMethodById(long id) {
        return modelMapper.map(paymentMethodRepo.findById(id), PaymentMethodDTO.class);
    }
}
