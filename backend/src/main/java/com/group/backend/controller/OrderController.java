package com.group.backend.controller;

import com.group.backend.dto.ChangeOrderStatusDTO;
import com.group.backend.dto.OrderDTO;
import com.group.backend.entity.Order;
import com.group.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/admin/getAllOrders")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return  ResponseEntity.ok(orderService.getAllOrders());
    }
    @GetMapping("/getCurrentUserOrder")
    public ResponseEntity<List<OrderDTO>> getCurrentOrder(){
        return ResponseEntity.ok(orderService.getOrderByUser());
    }
    @GetMapping("/admin/getThisMonthRevenue")
    public ResponseEntity<Long> getThisMonthRevenue(){
        return ResponseEntity.ok(orderService.getThisMonthRevenue());
    }

    @GetMapping("/admin/countThisMonthOrder")
    public ResponseEntity<Long> getThisMonthOrderNumber(){
        return ResponseEntity.ok(orderService.countThisMonthOrder());
    }

    @PostMapping("/createOrderFromCart")
    public ResponseEntity<Order> createOrderFromCart(@RequestBody OrderDTO orderDTO){
        return ResponseEntity.ok(orderService.createOrderFromCart(orderDTO));
    }

    @DeleteMapping("/deleteUserOrder")
    public ResponseEntity<String> deleteUserOrder(){
        return ResponseEntity.ok(orderService.deleteUserOrder());
    }

    @PutMapping("/admin/updateOrderStatus")
    public ResponseEntity<String> updateOrderStatus(@RequestBody ChangeOrderStatusDTO changeOrderStatusDTO){
        return ResponseEntity.ok(orderService.updateStatus(changeOrderStatusDTO));
    }
}
