package com.group.backend.service.implement;

import com.group.backend.dto.OrderDetailDTO;
import com.group.backend.entity.Order;
import com.group.backend.entity.Order_Detail;
import com.group.backend.repository.OrderDetailRepository;
import com.group.backend.service.OrderDetailService;
import com.group.backend.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailServiceImp implements OrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private OrderService orderService;

    @Override
    public List<OrderDetailDTO> getOrderDetailsByOrderId(long orderId) {
        List<OrderDetailDTO> thisOrderDetail = orderDetailRepo.findByOrderId(orderId).stream()
                .map(odetail -> modelMapper.map(odetail, OrderDetailDTO.class))
                .collect(Collectors.toList());
        return thisOrderDetail;
    }

    @Override
    public void addOrderDetail(List<OrderDetailDTO> orderDetailsDTO) {
        Order order = orderService.getLastOrderByUser();
        List<Order_Detail> orderDetails = orderDetailsDTO.stream()
                .map(tmp -> {
                    Order_Detail res = modelMapper.map(tmp, Order_Detail.class);
                    res.setOrder(order);
                    return res;
                })
                .collect(Collectors.toList());
        orderDetailRepo.saveAll(orderDetails);
    }
}
