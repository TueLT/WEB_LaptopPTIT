package com.group.backend.controller;

import com.group.backend.dto.CartDetailDTO;
import com.group.backend.dto.OrderDetailDTO;
import com.group.backend.service.OrderDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/order-detail")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/{id}")
    public ResponseEntity<List<OrderDetailDTO>> getOrderDetailByOrderId(@PathVariable long id) {
        return ResponseEntity.ok(orderDetailService.getOrderDetailsByOrderId(id));
    }
    @PostMapping("/add")
    public ResponseEntity<Void> addOrderDetail(@RequestBody List<CartDetailDTO> cartDetailDTOS) {
        List<OrderDetailDTO> orderDetailDTOS = cartDetailDTOS.stream()
                        .map(tmp -> modelMapper.map(tmp, OrderDetailDTO.class))
                        .collect(Collectors.toList());
        orderDetailService.addOrderDetail(orderDetailDTOS);
        return ResponseEntity.ok().build();
    }
}
